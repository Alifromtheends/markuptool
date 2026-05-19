# Reddit Launch Posts

---

## Post 1: r/webdev

### Title

I built a markdown editor that exports to a single, self-contained HTML file — zero dependencies, zero build step

### Body

Hey r/webdev,

I got tired of markdown tools that either require a cloud account or ship as bloated Electron apps. So I built **Markup** — a browser-based markdown editor with live preview and one-click export to a completely standalone HTML file.

**What makes it different:**

- **Single-file export** — CSS, fonts, everything inlined into one `.html` file
- **Zero dependencies** — the editor itself is one HTML file. No npm. No build. No framework.
- **Privacy-first** — no account, no sync, no tracking, no external requests
- **Themes** — 3+ built-in themes, dark mode included
- **Future-proof** — exported files open in any browser, offline, indefinitely

The entire thing is vanilla HTML/CSS/JS. Custom lightweight markdown parser. No React, no Vue, no bundler.

**Live:** https://alifromtheends.github.io/markuptool/
**Repo:** https://github.com/Alifromtheends/markuptool (MIT)

Would love feedback from this community — especially on the export format, CSS architecture, or edge cases I probably missed.

---

## Post 2: r/selfhosted

### Title

Markup: A zero-server markdown editor that exports single-file HTML — no install, no sync, no tracking

### Body

Hey r/selfhosted,

I built a markdown editor that doesn't need a server, doesn't sync anywhere, and doesn't even need to be "installed."

**Markup** runs entirely in your browser. Save the HTML file locally and you have a fully functional markdown editor with live preview and themes. When you're done, export to a single `.html` file with everything inlined — open it anywhere, even offline, years from now.

**Why it fits here:**

- **No server required** — not even for hosting the editor. Save the file, open it locally.
- **Zero network calls** — once loaded, it never phones home. Exported files have zero external dependencies.
- **No account or database** — your content never leaves your machine unless you choose to export it.
- **Self-host in 1 step** — drop the file on any static host (GitHub Pages, Neocities, your NAS, whatever).
- **Future-proof archive format** — single HTML files are the most durable document format we have.

**Links:**
- Live: https://alifromtheends.github.io/markuptool/
- Source: https://github.com/Alifromtheends/markuptool (MIT)

I built this because I wanted a markdown tool that respected the self-hosted ethos without requiring a Docker container. Curious what you all think.

---

## Post 3: r/SideProject

### Title

Launched my weekend project: Markup — a privacy-first markdown editor that exports single-file websites

### Body

Hey r/SideProject,

Over a few weekends I built **Markup**, a markdown editor with a twist: it exports to a single, self-contained HTML file with zero dependencies.

**The backstory:**

I'm an AI systems engineer by day (I also built [G0DM0D3](https://github.com/Alifromtheends/G0DM0D3)). I write a lot of docs, notes, and one-off pages. Every tool I tried wanted my email, synced to a cloud, or required a build pipeline. I just wanted to write markdown and get a file I could email, host, or archive.

**What it does:**

- Live preview while you type
- 3+ themes (including dark mode)
- One-click export to standalone HTML
- The editor itself is a single HTML file — save it locally, use it forever
- No accounts, no tracking, no external fonts, no analytics

**Tech stack that isn't a stack:**

Vanilla HTML/CSS/JS. No frameworks. No build step. The markdown parser is custom and ~300 lines. Export inlines CSS with regex. Total overengineering: zero.

**Where to try it:**
- https://alifromtheends.github.io/markuptool/
- https://github.com/Alifromtheends/markuptool

**What's next:**

- Custom theme uploads
- More export formats (maybe PDF)
- Better table and code block handling

Would love your feedback, feature requests, or roast sessions. Thanks for checking it out!

---

## Cross-Posting Tips

| Subreddit | Best Time (US) | Tone Notes |
|-----------|---------------|------------|
| r/webdev | Tue/Thu 10 AM ET | Technical, focus on implementation details |
| r/selfhosted | Wed/Fri 11 AM ET | Emphasize privacy, no-server, offline capability |
| r/SideProject | Sat/Sun 12 PM ET | Story-driven, journey-focused, ask for feedback |

- **Read each sub's rules** before posting — some have strict self-promo policies
- **Engage in comments** for at least 2 hours after posting
- **Don't post to all three simultaneously** — stagger by 6–12 hours to manage replies
- **Be ready for skeptical comments** — reply honestly, not defensively
