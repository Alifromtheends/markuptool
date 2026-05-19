// Background service worker for Markup extension

chrome.runtime.onInstalled.addListener(() => {
  // Context menu: Edit selected text in Markup
  chrome.contextMenus.create({
    id: 'markup-edit-selection',
    title: 'Edit in Markup',
    contexts: ['selection'],
    documentUrlPatterns: ['<all_urls>']
  });

  // Context menu: Edit page in Markup (for any page)
  chrome.contextMenus.create({
    id: 'markup-edit-page',
    title: 'Open Markup Side Panel',
    contexts: ['page', 'action'],
    documentUrlPatterns: ['<all_urls>']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'markup-edit-selection') {
    const text = info.selectionText || '';
    openSidePanelWithContent(text, tab.windowId);
  }
  if (info.menuItemId === 'markup-edit-page') {
    openSidePanel(tab.windowId);
  }
});

// Keyboard shortcut: open side panel
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'open-side-panel') {
    openSidePanel(tab?.windowId);
  }
});

// Handle messages from popup, content script, and sidepanel
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'openSidePanel') {
    openSidePanel(sender.tab?.windowId);
    sendResponse({ ok: true });
    return true;
  }

  if (msg.action === 'openSidePanelWithContent') {
    openSidePanelWithContent(msg.content, sender.tab?.windowId);
    sendResponse({ ok: true });
    return true;
  }

  if (msg.action === 'setContent') {
    // Forward content to sidepanel if it's open
    chrome.runtime.sendMessage({ action: 'setContent', content: msg.content }).catch(() => {});
    sendResponse({ ok: true });
    return true;
  }
});

async function openSidePanel(windowId) {
  try {
    if (!windowId) {
      const win = await chrome.windows.getCurrent();
      windowId = win.id;
    }
    await chrome.sidePanel.open({ windowId });
  } catch (e) {
    // Fallback: open side panel for current window
    try {
      const win = await chrome.windows.getCurrent();
      await chrome.sidePanel.open({ windowId: win.id });
    } catch (e2) {
      console.error('Failed to open side panel:', e2);
    }
  }
}

async function openSidePanelWithContent(content, windowId) {
  try {
    if (!windowId) {
      const win = await chrome.windows.getCurrent();
      windowId = win.id;
    }
    await chrome.sidePanel.open({ windowId });
  } catch (e) {
    console.error('Failed to open side panel:', e);
  }

  // Small delay to ensure sidepanel is ready, then send content
  setTimeout(() => {
    chrome.runtime.sendMessage({ action: 'setContent', content }).catch(() => {
      // Sidepanel may not be listening yet; store for later pickup
      chrome.storage.local.set({ markupPendingContent: content });
    });
  }, 300);
}

// Sidepanel content sync is handled via chrome.storage.local + messaging
// (see sidepanel.js for pendingContent pickup on load)
