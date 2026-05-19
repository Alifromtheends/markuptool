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

### Chrome Web Store (Recommended)

1. Visit the [Markup extension page](https://chromewebstore.google.com/) on the Chrome Web Store
2. Click **Add to Chrome**
3. Confirm the installation when prompted
4. The Markup icon will appear in your toolbar

### Developer Mode (Load Unpacked)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `extension/` folder inside this project
5. The Markup icon will appear in your toolbar

### Sideloading (Enterprise / Policy)

For enterprise deployments or managed Chrome installations:

1. Package the `extension/` folder as a ZIP file
2. In the Chrome Admin Console, navigate to **Devices > Chrome > Apps & Extensions**
3. Click **Add app by extension ID** or upload the CRX/zip file
4. Set the installation policy to **Force install** or **Allow install**
5. Alternatively, use the Windows Registry or macOS Managed Preferences to point to the unpacked extension directory:
   - **Windows:** `HKEY_LOCAL_MACHINE\Software\Policies\Google\Chrome\ExtensionInstallForcelist`
   - **macOS:** `/Library/Managed Preferences/com.google.Chrome.plist`

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

### Full Editor (New Tab)

Click **New Document** in the popup to open the full-screen editor. This provides:
- Resizable split-pane layout
- Live preview with word count
- Theme selector
- Export HTML and Copy HTML buttons
- Mobile-responsive toggle for small screens

### GitHub

When viewing any GitHub repository with a README, an **"Edit in Markup"** button appears next to the README title. Click it to load the README into the side panel editor.

### Textareas

Hover over any large `<textarea>` on any website and a small **M** icon appears in the corner. Click it to open that textarea's content in Markup.

### Context Menu

Select any text on any page, right-click, and choose **"Edit in Markup"** to load it into the side panel.

### .md Links

Hold **Shift** or **Alt** and click any link ending in `.md` or `.markdown` to open it in Markup.

## Settings

Open the settings page by right-clicking the Markup icon and selecting **Options**:

- **Default Theme** — Choose Dark, Minimal, or Editorial
- **Backend URL** — Optional self-hosted sync server
- **API Key** — Required only if using a custom backend
- **Keyboard Shortcuts** — View and customize shortcuts at `chrome://extensions/shortcuts`
- **Clear Data** — Remove all local notes and settings

## File Structure

```
extension/
├── manifest.json          # Manifest V3 configuration
├── popup.html             # Toolbar popup UI
├── popup.js               # Popup logic
├── sidepanel.html         # Side panel editor UI
├── sidepanel.js           # Side panel editor logic
├── editor.html            # Full-screen editor (new tab)
├── editor.js              # Full-screen editor logic
├── content.js             # Page integrations (GitHub, textareas, .md links)
├── background.js          # Service worker (context menus, side panel, sync)
├── options.html           # Extension settings page
├── options.js             # Settings logic
├── store-assets/          # Chrome Web Store screenshots & promo tiles
├── store-listing.md       # Store listing copy
├── privacy-policy.md      # Extension privacy policy
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
| `storage` | Save notes, recent documents, and editor content locally |
| `sidePanel` | Open the editor in Chrome's side panel |
| `contextMenus` | Add "Edit in Markup" to right-click menus |
| `activeTab` | Interact with the current page for content extraction |
| `host_permissions` | GitHub domain access for README button injection |

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + Shift + M` | Open Markup popup |
| `Ctrl/Cmd + Shift + U` | Open Markup side panel |
| `Ctrl/Cmd + Enter` | Save quick note (in popup) |
| `Tab` | Insert 2 spaces (in editor) |

## Themes

- **Dark** — The signature black & neon green aesthetic
- **Minimal** — Clean light theme with blue accents
- **Editorial** — Warm serif typography with gold accents

## Notes

- The extension uses **Manifest V3** and requires Chrome 114+ for side panel support.
- All content is stored locally in `chrome.storage.local`. Nothing is sent to any server unless you configure a custom backend.
- The editor works offline once installed.

## License

Same as the main Markup project.
