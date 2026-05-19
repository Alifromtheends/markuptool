// Options / settings page logic for Markup extension

const $ = (id) => document.getElementById(id);

const DEFAULTS = {
  markupTheme: 'theme-dark',
  markupBackendUrl: '',
  markupApiKey: ''
};

function loadSettings() {
  chrome.storage.local.get(['markupTheme', 'markupBackendUrl', 'markupApiKey'], (result) => {
    $('theme').value = result.markupTheme || DEFAULTS.markupTheme;
    $('backend-url').value = result.markupBackendUrl || DEFAULTS.markupBackendUrl;
    $('api-key').value = result.markupApiKey || DEFAULTS.markupApiKey;
  });
}

function saveSettings() {
  const settings = {
    markupTheme: $('theme').value,
    markupBackendUrl: $('backend-url').value.trim(),
    markupApiKey: $('api-key').value.trim()
  };

  chrome.storage.local.set(settings, () => {
    showStatus('Settings saved.');
  });
}

function resetSettings() {
  $('theme').value = DEFAULTS.markupTheme;
  $('backend-url').value = DEFAULTS.markupBackendUrl;
  $('api-key').value = DEFAULTS.markupApiKey;
  chrome.storage.local.set(DEFAULTS, () => {
    showStatus('Settings reset to defaults.');
  });
}

function clearAllData() {
  if (!confirm('This will delete all your notes, editor content, and settings. Are you sure?')) return;
  chrome.storage.local.clear(() => {
    loadSettings();
    showStatus('All local data cleared.');
  });
}

function showStatus(msg) {
  const status = $('status');
  status.textContent = msg;
  status.classList.add('show');
  setTimeout(() => status.classList.remove('show'), 2500);
}

$('btn-save').addEventListener('click', saveSettings);
$('btn-reset').addEventListener('click', resetSettings);
$('btn-clear').addEventListener('click', clearAllData);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
    saveSettings();
  }
});

// Init
loadSettings();
