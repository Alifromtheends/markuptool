// Content script for Markup extension
// Adds "Edit in Markup" buttons on GitHub, floating icon on textareas, intercepts .md links

(function() {
  'use strict';

  const ICON_SVG = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block">
    <rect width="16" height="16" rx="4" fill="#0a0a0a"/>
    <text x="8" y="12" font-family="monospace" font-size="10" font-weight="bold" fill="#00ff88" text-anchor="middle">M</text>
  </svg>`;

  // ===== GitHub README button =====
  function injectGitHubButton() {
    if (!location.hostname.includes('github.com')) return;
    if (document.getElementById('markup-github-btn')) return;

    const article = document.querySelector('article.markdown-body');
    if (!article) return;

    const readmeHeader = document.querySelector('[data-testid="readme-title"]');
    let anchor = readmeHeader;
    if (!anchor) {
      const headings = article.querySelectorAll('h1, h2');
      anchor = headings[0];
    }
    if (!anchor) anchor = article;

    const btn = document.createElement('a');
    btn.id = 'markup-github-btn';
    btn.href = '#';
    btn.title = 'Edit this README in Markup';
    btn.innerHTML = `${ICON_SVG}<span style="margin-left:5px">Edit in Markup</span>`;
    btn.style.cssText = `
      display: inline-flex;
      align-items: center;
      padding: 3px 10px;
      background: #0a0a0a;
      border: 1px solid #30363d;
      border-radius: 6px;
      color: #00ff88;
      font-family: SFMono-Regular, Consolas, monospace;
      font-size: 11px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      margin-left: 8px;
      transition: border-color 0.15s, opacity 0.15s;
      line-height: 1.4;
      opacity: 0.85;
    `;
    btn.onmouseenter = () => { btn.style.borderColor = '#00ff88'; btn.style.opacity = '1'; };
    btn.onmouseleave = () => { btn.style.borderColor = '#30363d'; btn.style.opacity = '0.85'; };
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      extractGitHubMarkdown(article);
    };

    if (readmeHeader && readmeHeader.parentElement) {
      const parent = readmeHeader.parentElement;
      parent.style.display = 'flex';
      parent.style.alignItems = 'center';
      parent.appendChild(btn);
    } else if (anchor === article) {
      const first = article.firstChild;
      if (first) article.insertBefore(btn, first);
      else article.appendChild(btn);
      btn.style.margin = '0 0 12px 0';
    } else if (anchor && anchor.parentElement) {
      anchor.parentElement.insertBefore(btn, anchor.nextSibling);
      btn.style.margin = '8px 0';
    }
  }

  function extractGitHubMarkdown(article) {
    const rawLinks = Array.from(document.querySelectorAll('a'));
    const rawLink = rawLinks.find(a => a.href && a.href.includes('/raw/') && a.href.endsWith('.md'));
    if (rawLink) {
      fetch(rawLink.href)
        .then(r => r.text())
        .then(text => openInMarkup(text))
        .catch(() => openInMarkup(fallbackExtract(article)));
      return;
    }
    openInMarkup(fallbackExtract(article));
  }

  function fallbackExtract(article) {
    let md = '';
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        md += node.textContent;
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tag = node.tagName.toLowerCase();
      switch (tag) {
        case 'h1': md += '\n# '; walkChildren(node); md += '\n\n'; break;
        case 'h2': md += '\n## '; walkChildren(node); md += '\n\n'; break;
        case 'h3': md += '\n### '; walkChildren(node); md += '\n\n'; break;
        case 'h4': md += '\n#### '; walkChildren(node); md += '\n\n'; break;
        case 'p': walkChildren(node); md += '\n\n'; break;
        case 'br': md += '\n'; break;
        case 'strong': case 'b': md += '**'; walkChildren(node); md += '**'; break;
        case 'em': case 'i': md += '*'; walkChildren(node); md += '*'; break;
        case 'code':
          if (node.parentElement && node.parentElement.tagName.toLowerCase() === 'pre') {
            const lang = node.className?.match(/language-(\w+)/)?.[1] || '';
            md += '\n```' + lang + '\n'; walkChildren(node); md += '\n```\n';
          } else {
            md += '`'; walkChildren(node); md += '`';
          }
          break;
        case 'pre': walkChildren(node); md += '\n'; break;
        case 'a': {
          const href = node.getAttribute('href') || '';
          const text = node.textContent || '';
          md += `[${text}](${href})`;
          break;
        }
        case 'img': {
          const src = node.getAttribute('src') || '';
          const alt = node.getAttribute('alt') || '';
          md += `![${alt}](${src})`;
          break;
        }
        case 'ul': {
          node.querySelectorAll(':scope > li').forEach(li => { md += '- '; walk(li); md += '\n'; });
          md += '\n';
          break;
        }
        case 'ol': {
          let i = 1;
          node.querySelectorAll(':scope > li').forEach(li => { md += `${i}. `; walk(li); md += '\n'; i++; });
          md += '\n';
          break;
        }
        case 'li': walkChildren(node); break;
        case 'blockquote': {
          let inner = '';
          node.childNodes.forEach(c => { let s = ''; const collect = (n) => { if (n.nodeType === 3) s += n.textContent; else if (n.nodeType === 1) { if (n.tagName.toLowerCase() === 'br') s += '\n'; else n.childNodes.forEach(collect); } }; collect(c); inner += s; });
          inner.split('\n').forEach(line => { md += '> ' + line + '\n'; });
          md += '\n';
          break;
        }
        case 'hr': md += '\n---\n'; break;
        case 'table': {
          const rows = Array.from(node.querySelectorAll('tr'));
          rows.forEach((tr, idx) => {
            const cells = Array.from(tr.querySelectorAll('td, th')).map(c => c.textContent.trim());
            if (cells.length) {
              md += '| ' + cells.join(' | ') + ' |\n';
              if (idx === 0) md += '|' + cells.map(() => ' --- ').join('|') + '|\n';
            }
          });
          md += '\n';
          break;
        }
        case 'div': case 'span': default: walkChildren(node);
      }
    };
    const walkChildren = (node) => node.childNodes.forEach(walk);
    walkChildren(article);
    return md.replace(/\n{3,}/g, '\n\n').trim();
  }

  // ===== Textarea floating icon =====
  const markupButtons = new WeakMap();

  function injectTextareaIcons() {
    const textareas = document.querySelectorAll('textarea:not([data-markup-watched])');
    textareas.forEach(ta => {
      if (ta.dataset.markupWatched) return;
      if (ta.offsetWidth < 120 || ta.offsetHeight < 60) return;
      if (ta.disabled || ta.readOnly) return;

      ta.dataset.markupWatched = '1';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.title = 'Edit in Markup';
      btn.innerHTML = ICON_SVG;
      btn.style.cssText = `
        position: absolute;
        z-index: 99999;
        width: 26px;
        height: 26px;
        padding: 0;
        background: #0a0a0a;
        border: 1px solid #30363d;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.15s, border-color 0.15s;
        pointer-events: auto;
      `;

      const positionBtn = () => {
        const rect = ta.getBoundingClientRect();
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;
        btn.style.left = (rect.right + scrollX - 30) + 'px';
        btn.style.top = (rect.bottom + scrollY - 30) + 'px';
      };

      btn.onmouseenter = () => { btn.style.opacity = '1'; btn.style.borderColor = '#00ff88'; };
      btn.onmouseleave = () => { btn.style.opacity = ta.matches(':hover') ? '0.6' : '0'; btn.style.borderColor = '#30363d'; };
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openInMarkup(ta.value || '');
      };

      ta.addEventListener('mouseenter', () => { positionBtn(); btn.style.opacity = '0.6'; });
      ta.addEventListener('mouseleave', () => { if (!btn.matches(':hover')) btn.style.opacity = '0'; });
      ta.addEventListener('focus', () => { positionBtn(); btn.style.opacity = '0.6'; });
      ta.addEventListener('blur', () => { if (!btn.matches(':hover')) btn.style.opacity = '0'; });
      window.addEventListener('scroll', positionBtn, true);
      window.addEventListener('resize', positionBtn);

      document.body.appendChild(btn);
      markupButtons.set(ta, btn);
      positionBtn();
    });

    // Cleanup buttons for removed textareas
    markupButtons.forEach((btn, ta) => {
      if (!document.contains(ta)) {
        btn.remove();
        markupButtons.delete(ta);
      }
    });
  }

  // ===== Intercept .md links =====
  function interceptMdLinks() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (!href.endsWith('.md') && !href.endsWith('.markdown')) return;
      if (!e.shiftKey && !e.altKey) return;
      e.preventDefault();
      e.stopPropagation();
      const url = new URL(href, location.href).href;
      fetch(url)
        .then(r => r.text())
        .then(text => openInMarkup(text))
        .catch(() => openInMarkup(`# Error\n\nCould not fetch: ${url}`));
    }, true);
  }

  function openInMarkup(content) {
    chrome.runtime.sendMessage({ action: 'openSidePanelWithContent', content });
  }

  function init() {
    injectGitHubButton();
    injectTextareaIcons();
    interceptMdLinks();
  }

  init();

  // Watch for DOM changes (SPAs like GitHub)
  const observer = new MutationObserver(() => {
    injectTextareaIcons();
    injectGitHubButton();
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
})();
