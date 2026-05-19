# Markup — Chrome Extension

A lightweight Chrome Extension wrapper for **Markup**, a privacy-first markdown editor that exports beautiful, single-file HTML sites.

## Features

- **Side Panel Editor** — Full markdown editor with live preview, themes, and HTML export directly in Chrome's side panel
- **Action Popup** — Quick access to new documents, recent notes, and a scratchpad
- **GitHub Integration** — "Edit in Markup" button appears on GitHub README pages
- **Textarea Enhancement** — Floating Markup icon on any large textarea; click to edit its content
- **Context Menu** — Right-click any selected text and choose "Edit in Markup"
- **.md Link Intercept** — Shift+click or Alt+click any `.md` link to open it in Markup
- **Three Themes** — Dark, Minimal, and Editorial
- **Zero Dependencies** — Everything is inline; no external network calls
- **No Tracking** — All data stays in `chrome.storage.local`

## Installation

### Developer Mode (Unpacked)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `extension/` folder inside this project
5. The Markup icon will appear in your toolbar

### Chrome Web Store (Coming Soon)

Once published, you can install directly from the Chrome Web Store.

## How to Use

### Popup (Toolbar Icon)

Click the Markup icon in your toolbar to open the popup:

- **New Document** — Opens the full editor in a new tab
- **Open Side Panel** — Opens Markup in Chrome's side panel
- **Recent Quick Notes** — Your last 5 saved scratchpad notes
- **Quick Note** — Jot something down and save it instantly

### Side Panel

Click **Open Side Panel** in the popup, or right-click anywhere on a page and choose **Open Markup Side Panel**.

The side panel gives you a compact stacked editor:
- Top half: Markdown editor
- Bottom half: Live preview
- Theme selector and Export/Copy buttons in the header

### GitHub

When viewing any GitHub repository with a README, an **"Edit in Markup"** button appears next to the README title. Click it to load the README into the side panel editor.

### Textareas

Hover over any large `<textarea>` on any website and a small **M** icon appears in the corner. Click it to open that textarea's content in Markup.

### Context Menu

Select any text on any page, right-click, and choose **"Edit in Markup"** to load it into the side panel.

### .md Links

Hold **Shift** or **Alt** and click any link ending in `.md` or `.markdown` to open it in Markup.

## File Structure

```
extension/
├── manifest.json      # Manifest V3 configuration
├── popup.html         # Toolbar popup UI
├── popup.js           # Popup logic
├── sidepanel.html     # Side panel editor UI
├── sidepanel.js       # Side panel editor logic
├── editor.html        # Full-screen editor (new tab)
├── editor.js          # Full-screen editor logic
├── content.js         # Page integrations (GitHub, textareas, .md links)
├── background.js      # Service worker (context menus, side panel, sync)
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## Permissions

| Permission | Purpose |
|---|---|
| `storage` | Save notes, recent documents, and editor content |
| `sidePanel` | Open the editor in Chrome's side panel |
| `contextMenus` | Add "Edit in Markup" to right-click menus |
| `activeTab` | Interact with the current page for content extraction |
| `host_permissions` | GitHub domain access for README button injection |

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + Enter` | Save quick note (in popup) |
| `Tab` | Insert 2 spaces (in editor) |

## Themes

- **Dark** — The signature black & neon green aesthetic
- **Minimal** — Clean light theme with blue accents
- **Editorial** — Warm serif typography with gold accents

## Notes

- The extension uses **Manifest V3** and requires Chrome 114+ for side panel support.
- All content is stored locally in `chrome.storage.local`. Nothing is sent to any server.
- The editor works offline once installed.

## License

Same as the main Markup project.
