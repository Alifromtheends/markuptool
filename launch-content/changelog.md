# Changelog — Markup v1.0

---

*The version where we stopped adding features and started shipping.*

---

## v1.0 — "The Atomic File" — 2026-05-19

### New

- **Live Preview** — Type markdown on the left. See it on the right. Magic? No. Just `keyup` listeners and a 300-line parser. But it *feels* like magic the first time.
- **Single-File Export** — Hit the export button. Get one `.html` file with everything inlined — CSS, fonts, rendered markdown, your hopes and dreams. Email it. Archive it. Put it on a floppy disk. It doesn't care.
- **3 Themes** — Light, Dark, and "why does every app look the same." Each theme is pure CSS, zero JavaScript. Switching themes doesn't re-render. It just... changes. Because that's how CSS works when you don't overcomplicate it.
- **Custom Markdown Parser** — We looked at marked.js, md-it, and others. Then we wrote our own in ~300 lines. It handles paragraphs, headers, lists, links, code blocks, bold, italic, and the existential dread of tables. No regex-based HTML injection. We're not animals.
- **Zero Dependencies** — No npm. No yarn. No pnpm. No `node_modules` folder the size of a small nation. The entire editor is one HTML file you can save from your browser and use forever.
- **Privacy-First by Absence** — We didn't "add privacy features." We simply didn't build the things that violate privacy. No analytics. No cookies. No external fonts from Google. No server-side processing. No account to create. Your words stay where they belong: on your machine.

### Changed

- **Architecture** — Started with "what if we used Vite and React?" Ended with "what if we just used the platform?" The diff is -47MB and +∞ maintainability.
- **Philosophy** — Shifted from "what features can we add?" to "what can we remove and still have a tool that works?" The answer was: most things.

### Fixed

- **The "I need a build pipeline to write a paragraph" bug** — Eliminated. You can now write markdown without configuring webpack. Revolutionary, we know.
- **The "where did my asset folder go" bug** — Fixed by not having an asset folder. All assets are inlined. You can't lose what doesn't exist.
- **The "this tool won't exist in 5 years because the startup got acquired" bug** — Mitigated. It's a single HTML file. It'll outlive us all.

### Known Issues

- **Tables** — They work. Mostly. If your table has 47 columns, consider a spreadsheet. Or therapy.
- **No Undo Stack** — `Ctrl+Z` works in the textarea because the browser is smarter than us. We didn't build our own undo because we have self-respect.
- **Mobile Experience** — It works, but it's optimized for people who write on keyboards. If you're writing markdown on a phone, we admire your commitment and question your life choices.
- **No Cloud Sync** — This is intentional. If you want sync, export the file and put it in Dropbox. Or Syncthing. Or a USB stick. Or carve it into stone.

### Technical Details

| Metric | Value |
|--------|-------|
| Total dependencies | 0 |
| Build steps | 0 |
| Source files | 1 |
| Size (editor) | < 50KB |
| Size (typical export) | 40–120KB |
| Lines of code | ~600 |
| External requests | 0 |
| Tracking pixels | 0 |
| VC funding raised | $0 |
| Users required to create accounts | 0 |

### What's Next (Maybe)

- Custom theme uploads (let you bring your own CSS)
- Better table handling (for the table enthusiasts among you)
- Math rendering (for the 3 people who write markdown with LaTeX)
- A desktop wrapper with file system access (if enough people ask)
- PDF export (if we can do it without adding a dependency the size of a operating system)

### How to Upgrade

You don't. Save the HTML file. That's it. Future versions will be new HTML files. There's no auto-update, no telemetry, no "a new version is available" popup. If the current version works for you, keep using it forever. That's the point.

---

## v0.9 — "The Almost" — Internal

- Realized we were over-engineering
- Deleted 80% of the codebase
- Felt better

## v0.1 — "The Prototype" — Internal

- `contenteditable` was a mistake
- Learned this the hard way
- Switched to a `<textarea>` like a sensible person

---

*Markup v1.0 — built with spite, caffeine, and the radical belief that software doesn't need to be complicated to be useful.*

*If you find a bug, it's a feature. If you find a feature, it's probably a bug we haven't documented yet.*

**Full source:** https://github.com/Alifromtheends/markuptool
