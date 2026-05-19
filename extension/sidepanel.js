// Sidepanel Markup editor — compact stacked layout

function parseMarkdown(text) {
  let html = text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/```([\w]*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
    .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/___(.*?)___/g, '<strong><em>$1</em></strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/^&gt; (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n)+/g, match => '<ul>' + match + '</ul>')
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
    .replace(/^- \[x\] (.*$)/gim, '<li><input type="checkbox" checked disabled> $1</li>')
    .replace(/^- \[ \] (.*$)/gim, '<li><input type="checkbox" disabled> $1</li>')
    .replace(/^---*$/gim, '<hr>')
    .replace(/\|(.+)\|/g, (match, content) => {
      const cells = content.split('|').map(c => c.trim()).filter(c => c);
      if (cells.length === 0) return match;
      if (cells.every(c => c.replace(/-/g, '').trim() === '')) return '';
      return '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
    })
    .replace(/\n/g, '<br>');

  html = html.replace(/(<blockquote>.*?<\/blockquote><br>)+/g, match => {
    return '<blockquote>' + match.replace(/<\/blockquote><br><blockquote>/g, '<br>').replace(/<blockquote>/, '').replace(/<\/blockquote>/, '') + '</blockquote>';
  });

  const tableRegex = /(<tr>.*?<\/tr><br>)+/g;
  html = html.replace(tableRegex, match => {
    const rows = match.split('<br>').filter(r => r.trim());
    if (rows.length < 2) return match;
    const header = rows[0].replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>');
    const body = rows.slice(1).join('');
    return '<table><thead>' + header + '</thead><tbody>' + body + '</tbody></table>';
  });

  return html;
}

let currentTheme = 'theme-dark';
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const wordCount = document.getElementById('wordCount');

const defaultContent = `# Quick Note

Write markdown here. The preview updates live.

- **Bold**, *italic*, \`code\`
- [Links](https://example.com)
- Checkboxes: - [x] Done

> Blockquotes work too.`;

// Load from storage
chrome.storage.local.get(['markupSidepanelContent', 'markupTheme'], (result) => {
  editor.value = result.markupSidepanelContent || defaultContent;
  const savedTheme = result.markupTheme || 'theme-dark';
  document.getElementById('theme').value = savedTheme;
  changeTheme(savedTheme);
  updatePreview();
});

// Listen for external content (from content script / background)
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'setContent') {
    editor.value = msg.content || '';
    updatePreview();
    sendResponse({ ok: true });
  }
  return true;
});

// Check for pending content that arrived while sidepanel was closed
chrome.storage.local.get(['markupPendingContent'], (result) => {
  if (result.markupPendingContent) {
    editor.value = result.markupPendingContent;
    updatePreview();
    chrome.storage.local.remove('markupPendingContent');
  }
});

function updatePreview() {
  preview.innerHTML = parseMarkdown(editor.value);
  const words = editor.value.trim().split(/\s+/).filter(w => w.length > 0).length;
  wordCount.textContent = words + ' word' + (words !== 1 ? 's' : '');
  chrome.storage.local.set({ markupSidepanelContent: editor.value });
}

editor.addEventListener('input', updatePreview);
editor.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
    editor.selectionStart = editor.selectionEnd = start + 2;
    updatePreview();
  }
});

function changeTheme(theme) {
  preview.classList.remove('theme-dark', 'theme-minimal', 'theme-editorial');
  preview.classList.add(theme);
  currentTheme = theme;
  chrome.storage.local.set({ markupTheme: theme });
}

function getExportedHTML(contentHtml, themeClass) {
  const title = (editor.value.match(/^# (.*$)/m) || ['', 'Exported Document'])[1];
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
:root {
  --bg: #050505; --surface: #0a0a0a; --surface-2: #111;
  --border: #1a1a1a; --text: #e0e0e0; --text-dim: #888;
  --accent: #00ff88; --code-bg: #0d0d0d;
  --font-mono: 'SF Mono', Monaco, Inconsolata, monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: var(--font-sans); background: var(--bg); color: var(--text);
  line-height: 1.7; max-width: 720px; margin: 0 auto; padding: 3rem 2rem;
}
h1, h2, h3, h4 { font-family: var(--font-mono); font-weight: 700; margin: 2rem 0 1rem; }
h1 { font-size: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; }
h2 { font-size: 1.5rem; } h3 { font-size: 1.2rem; }
p { margin: 1rem 0; color: var(--text-dim); }
a { color: var(--accent); text-decoration: none; }
blockquote { border-left: 3px solid var(--accent); margin: 1.5rem 0; padding: 0.5rem 1.5rem; background: var(--surface); }
code { font-family: var(--font-mono); font-size: 0.85em; background: var(--code-bg); padding: 0.15rem 0.4rem; border-radius: 3px; border: 1px solid var(--border); color: var(--accent); }
pre { background: var(--code-bg); border: 1px solid var(--border); border-radius: 6px; padding: 1.2rem; margin: 1.5rem 0; overflow-x: auto; }
pre code { background: none; border: none; padding: 0; color: var(--text); font-size: 0.8rem; }
hr { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }
table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; }
th, td { border: 1px solid var(--border); padding: 0.6rem 1rem; text-align: left; }
th { background: var(--surface); font-family: var(--font-mono); }
tr:nth-child(even) { background: rgba(255,255,255,0.02); }
img { max-width: 100%; border-radius: 4px; }
input[type="checkbox"] { accent-color: var(--accent); margin-right: 0.5rem; }
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
.theme-minimal body { background: #fafafa; color: #222; }
.theme-minimal h1, .theme-minimal h2, .theme-minimal h3, .theme-minimal h4 { color: #111; }
.theme-minimal p { color: #555; }
.theme-minimal a { color: #0066cc; }
.theme-minimal blockquote { background: #f0f0f0; border-left-color: #0066cc; }
.theme-minimal code { background: #eee; color: #d63384; border-color: #ddd; }
.theme-minimal pre { background: #f5f5f5; border-color: #ddd; }
.theme-minimal pre code { color: #333; }
.theme-minimal th { background: #f0f0f0; }
.theme-minimal hr { border-color: #ddd; }
.theme-minimal th, .theme-minimal td { border-color: #ddd; }
.theme-editorial body { background: #0c0c0c; color: #ccc; font-family: Georgia, serif; }
.theme-editorial h1, .theme-editorial h2, .theme-editorial h3, .theme-editorial h4 { font-family: Georgia, serif; color: #fff; }
.theme-editorial p { color: #aaa; }
.theme-editorial a { color: #ffaa00; }
.theme-editorial blockquote { background: #141414; border-left-color: #ffaa00; }
.theme-editorial code { background: #141414; color: #ffaa00; }
</style>
</head>
<body class="${themeClass}">
${contentHtml}
</body>
</html>`;
}

function exportHTML() {
  const exported = getExportedHTML(preview.innerHTML, currentTheme);
  const blob = new Blob([exported], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'index.html';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Exported index.html');
}

function copyHTML() {
  const exported = getExportedHTML(preview.innerHTML, currentTheme);
  navigator.clipboard.writeText(exported).then(() => {
    showToast('HTML copied to clipboard');
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}
