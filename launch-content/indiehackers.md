# IndieHackers Milestone Post

---

## Title

Shipped v1.0 of Markup — a privacy-first markdown editor that exports single-file websites

---

## Full Post

### The Milestone

Today I'm shipping **Markup v1.0** — a browser-based markdown editor with live preview, multiple themes, and one-click export to a completely standalone HTML file.

No build step. No dependencies. No server. No tracking.

**Live:** https://alifromtheends.github.io/markuptool/
**Repo:** https://github.com/Alifromtheends/markuptool

---

### The Journey

I'm Ali — AI systems engineer by trade, builder by compulsion. Some of you might know me from [G0DM0D3](https://github.com/Alifromtheends/G0DM0D3), an open-source project I launched earlier this year.

Markup started as a weekend itch. I write a lot: documentation, notes, one-off landing pages, client deliverables. Every tool I reached for had friction:

- **Notion / HackMD** — great collaboration, but they own my data and require an account
- **Typora** — beautiful, but proprietary and doesn't export to portable formats cleanly
- **Obsidian** — powerful, but overkill for a single page and tied to a vault structure
- **Static site generators** — Jekyll, Hugo, Eleventy... powerful, but I don't want a build pipeline for a one-page doc

I wanted something dumber. Something that just let me write markdown and get a file I could email, archive, or drop on a server. A file that would still render in 2035.

So I built it.

---

### What I Actually Built

**The editor:** A single HTML file. Open it in a browser. Write markdown on the left, see preview on the right. Pick a theme. Hit export.

**The export:** One `.html` file with everything inlined — CSS, fonts, the rendered markdown. Zero external requests. Zero tracking. Opens offline in any browser.

**The stack:** There isn't one. Vanilla HTML/CSS/JS. Custom markdown parser (~300 lines). Pure CSS themes. Export logic is a few regex passes. I deliberately avoided `npm install` to see how far I could get. Answer: v1.0 shipped with zero dependencies.

---

### Key Decisions

**Single-file export over asset folders**

Folders break. Links rot. Assets get orphaned. A single HTML file is atomic — the PDF of web publishing, but built on open standards. You can email it, IPFS it, or put it on a floppy disk.

**Privacy-first by default**

No email gate. No cloud sync. No cookies. No Google Fonts. No analytics. Your words stay on your machine until *you* decide what to do with them. Privacy isn't a feature I added — it's the absence of things I didn't build.

**No framework**

I wanted Markup to be understandable by opening the source. No build step means no barrier to contribution. No dependencies means no supply chain attacks or deprecation spirals. It's boring technology, and boring is an asset.

---

### Revenue Goals and Plans

**Current status:** $0 MRR. Completely free and open source (MIT).

**Monetization hypothesis:** I'm not sure Markup *should* make money. It's a utility, not a platform. But if there's demand, here are the paths I'm considering:

1. **Pro themes / templates** — Premium CSS themes for specific use cases (resumes, portfolios, documentation)
2. **Desktop wrapper** — A native wrapper with file system access, auto-save, and recent files. Maybe a one-time purchase.
3. **Stay free** — Keep it MIT, accept GitHub Sponsors, use it as a portfolio piece

**Decision threshold:** If 1,000+ people star the repo or 100+ people actively use it daily, I'll explore a pro tier. Until then, it stays free. I'm optimizing for reach, not revenue.

---

### Metrics I'm Tracking

| Metric | Current | Goal (30 days) |
|--------|---------|----------------|
| GitHub stars | ~0 | 500 |
| Unique visitors/week | ~0 | 2,000 |
| Exported files created | ~0 | 500 |
| Contributing developers | 1 (me) | 3+ |

---

### What I Need From You

**Feedback I'm actively seeking:**

1. **Export format** — Does the single-file HTML approach solve a real problem for you? What's missing?
2. **Themes** — What themes would you actually use? (Resumes? Docs? Portfolios?)
3. **Edge cases** — What markdown features break? (Tables? Code blocks? Math?)
4. **Use cases** — Where would you use this that existing tools don't fit?

Drop a comment, open a GitHub issue, or DM me. I read everything.

---

### The Real Win

Shipping v1.0 taught me that "minimum viable" is smaller than I thought. The entire product is under 50KB of source. It took ~3 weekends. The biggest time sink wasn't coding — it was deciding what *not* to build.

If you're sitting on a side project, here's my advice: ship it smaller than you think is shippable. You can always add. You can't un-ship scope creep.

---

## Quick Stats Box (for replies/comments)

- **Launch date:** Today
- **File size:** Editor < 50KB, export 40–120KB
- **Lines of code:** ~600 total (parser + UI + export)
- **Dependencies:** 0
- **Build step:** None
- **License:** MIT
- **Maker:** Ali Bulatsalamov
- **Twitter:** @alibulatsalamov

---

*Thanks for reading. Now go break my thing:* https://alifromtheends.github.io/markuptool/
