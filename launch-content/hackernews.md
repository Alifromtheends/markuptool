# Hacker News — Show HN Launch Content

---

## Title (max 80 chars)

**Show HN: Markup – A privacy-first markdown editor that exports single-file sites**

(78 characters)

---

## Full Post Body

I've been tired of markdown tools that want my email, sync to their cloud, or ship as 200MB Electron apps. So I built **Markup** — a browser-based markdown editor with live preview, 3+ themes, and one-click export to a completely standalone HTML file.

No build step. No dependencies. No server. The exported file opens in any browser, works offline, and contains zero tracking or external requests.

**How it works:** Write markdown on the left. See the rendered output on the right. Pick a theme. Hit export. You get a single `.html` file with everything inlined — CSS, fonts, the works. Pass it around, host it on a static file server, or open it from your desktop. It just works.

The editor itself is a single HTML file too. You can save it locally and use it without ever touching a server.

**Live:** https://alifromtheends.github.io/markuptool/
**Repo:** https://github.com/Alifromtheends/markuptool

Would love your thoughts — especially on the export format and theme system.

---

## Pre-Written Comment Replies

### Reply 1: "How is this different from [existing tool]?"

> Great question. Most markdown editors fall into one of three camps:
> 1. **Cloud-based** (Notion, HackMD) — require accounts, sync to someone else's server
> 2. **Desktop apps** (Typora, Obsidian) — heavy installs, often proprietary formats
> 3. **Static site generators** (Jekyll, Hugo) — powerful but need builds, configs, dependencies
>
> Markup is a fourth option: open the file, write, export a single HTML page. No account. No install. No build pipeline. The export is genuinely standalone — open it in a browser 10 years from now and it'll render exactly the same.

### Reply 2: "What's the file size of the exported HTML?"

> For a typical document with one of the built-in themes, the exported HTML is usually **40–120KB** depending on the theme and content length. The CSS and fonts are inlined, so there's zero latency from external requests. Compare that to loading a Notion page or even a lightweight static site with CDN dependencies.

### Reply 3: "Is the source open? Can I self-host?"

> Fully open source (MIT). The editor itself is a single HTML file — you can literally save it from the browser and run it locally. No build step, no npm install, no Docker. Self-hosting is as simple as dropping the file on any static host (GitHub Pages, Neocities, S3, whatever).

### Reply 4: "Why single-file export instead of a folder with assets?"

> Because folders break. Links get orphaned, assets get lost, relative paths break when you move files. A single HTML file is atomic — you can email it, archive it, put it on IPFS, or open it in 2035 and it'll still work. It's the PDF of web publishing, but editable and standards-based.

### Reply 5: "What's the tech stack?"

> The editor is vanilla HTML/CSS/JS. No frameworks, no bundler, no dependencies. The markdown parser is a lightweight custom implementation. Themes are pure CSS. The export logic inlines everything with a few regex passes. I wanted to see how far I could get without reaching for npm — turns out, pretty far.

---

## Best Time to Post Analysis

| Factor | Recommendation |
|--------|----------------|
| **Optimal day** | Tuesday or Wednesday |
| **Optimal time** | 8:00–10:00 AM Pacific Time (11:00 AM–1:00 PM Eastern) |
| **Why** | HN's core audience (US-based engineers, founders, PMs) is most active mid-morning. European audience is still online. East Coast is back from lunch. West Coast is caffeinated and scrolling. |
| **Avoid** | Fridays after 12 PM PT (weekend drift), Mondays before 9 AM PT (inbox catch-up), US holidays |
| **Backup slot** | Thursday 9:00 AM PT |
| **Pro tip** | Post when you can actively monitor and reply for the first 2 hours. Early engagement heavily influences ranking. Have the replies above ready to copy-paste. |

---

## Quick Copy-Paste Checklist

- [ ] Post title ready (78 chars)
- [ ] Body copied to clipboard
- [ ] Replies 1–5 saved in notes app for quick access
- [ ] Product URL verified: https://alifromtheends.github.io/markuptool/
- [ ] Repo URL verified: https://github.com/Alifromtheends/markuptool
- [ ] Posted between 8–10 AM PT on Tue/Wed/Thu
- [ ] Monitoring for first 2 hours
