// Popup script for Markup extension

const $ = (id) => document.getElementById(id);

// Open full editor in new tab
$('btn-new').addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('editor.html') });
  window.close();
});

// Open side panel
$('btn-sidepanel').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'openSidePanel' });
  window.close();
});

// Save quick note
$('btn-save').addEventListener('click', saveQuickNote);
$('quick-note').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
    saveQuickNote();
  }
});

$('btn-clear').addEventListener('click', () => {
  $('quick-note').value = '';
  $('quick-note').focus();
});

function saveQuickNote() {
  const text = $('quick-note').value.trim();
  if (!text) return;

  const note = {
    id: Date.now().toString(36),
    title: text.split('\n')[0].slice(0, 60) || 'Untitled Note',
    content: text,
    date: Date.now()
  };

  chrome.storage.local.get(['markupQuickNotes'], (result) => {
    const notes = result.markupQuickNotes || [];
    notes.unshift(note);
    if (notes.length > 20) notes.pop();
    chrome.storage.local.set({ markupQuickNotes: notes }, () => {
      $('quick-note').value = '';
      renderRecent(notes);
    });
  });
}

// Render recent notes
function renderRecent(notes) {
  const container = $('recent-list');
  if (!notes || notes.length === 0) {
    container.innerHTML = '<div class="recent-empty">No quick notes yet</div>';
    return;
  }

  container.innerHTML = notes.slice(0, 5).map(note => {
    const dateStr = new Date(note.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    return `
      <div class="recent-item" data-id="${note.id}">
        <span class="title">${escapeHtml(note.title)}</span>
        <span style="display:flex;align-items:center;gap:0.4rem">
          <span class="date">${dateStr}</span>
          <button class="delete-btn" data-id="${note.id}" title="Delete">×</button>
        </span>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.recent-item').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) return;
      const id = el.dataset.id;
      const note = notes.find(n => n.id === id);
      if (note) {
        chrome.storage.local.set({ markupOpenNote: note }, () => {
          chrome.tabs.create({ url: chrome.runtime.getURL('editor.html?note=' + id) });
          window.close();
        });
      }
    });
  });

  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const filtered = notes.filter(n => n.id !== id);
      chrome.storage.local.set({ markupQuickNotes: filtered }, () => renderRecent(filtered));
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Init
chrome.storage.local.get(['markupQuickNotes'], (result) => {
  renderRecent(result.markupQuickNotes || []);
});
