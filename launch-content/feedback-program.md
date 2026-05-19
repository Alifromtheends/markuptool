# Markup — Bug Bounty & Feedback Program

*Turn early users into co-builders. Make giving feedback effortless.*

---

## Philosophy

You don't have a support team. You have Twitter, GitHub, and honesty. The goal is to lower the friction for reporting bugs and requesting features so much that users actually do it.

**Principles:**
1. **Public by default** — Use GitHub Issues for bugs and features. Transparency builds trust.
2. **Fast acknowledgment** — Reply to every issue within 24 hours, even if it's just "Looking into this."
3. **No bureaucracy** — No forms that require 10 fields. One box for "what happened," one for "what you expected."
4. **Reward signal** — Public shoutouts, contributor credits, and eventually small bounties for real bugs.

---

## Community Setup

### Option 1: Discord (Recommended for real-time feedback)

**Why Discord:**
- Free
- Instant feedback loop
- Users can share screenshots/files easily
- Creates a sense of belonging

**Setup steps:**
1. Create a server at https://discord.com/create
2. Name it: **Markup**
3. Create channels:
   - `#general` — casual chat, introductions
   - `#bugs` — bug reports (link to template below)
   - `#features` — feature requests (link to template below)
   - `#showcase` — users share what they exported
   - `#dev` — technical discussion, contributing
4. Set rules in `#rules`:
   > Be kind. No spam. Bugs go in #bugs. Features go in #features. Share your exports in #showcase.
5. Create invite link (never expires): `Server Settings → Invites → Create`
6. Add link to:
   - GitHub README
   - Website footer
   - Twitter bio (temporarily during launch week)

**Invite link to use:** `https://discord.gg/YOURCODE` (generate and replace)

### Option 2: GitHub Discussions (Zero-maintenance alternative)

If Discord feels like too much overhead, use GitHub Discussions:

1. Enable Discussions: Repo → Settings → General → Discussions → Check "Enable"
2. Create categories:
   - **General** — open conversation
   - **Ideas** — feature requests
   - **Q&A** — help and how-tos
   - **Show and tell** — user showcases
3. Pin a welcome post with links to bug/feature templates

**Best of both worlds:** Use GitHub Discussions for async feedback + Discord for launch-week hype and real-time chat.

---

## Bug Report Template

Save this as `.github/ISSUE_TEMPLATE/bug_report.md` in the repo:

```markdown
---
name: Bug report
about: Something isn't working right
title: '[BUG] '
labels: bug
assignees: Alifromtheends
---

**What happened?**
A clear description of the bug. What did you see?

**What did you expect?**
What should have happened instead?

**Steps to reproduce**
1. Go to '...'
2. Click on '...'
3. Type '...'
4. See error

**Screenshots**
If applicable, add screenshots. Drag and drop them here.

**Environment**
- OS: [e.g. macOS 14, Windows 11, iOS 17]
- Browser: [e.g. Chrome 124, Safari 17, Firefox 125]
- Device: [e.g. MacBook, iPhone, Android]

**Exported file?**
If the bug is in the exported HTML, attach the file or paste the relevant snippet.

**Additional context**
Anything else we should know?
```

### Quick Bug Report (Discord / Twitter / Email)

For users who won't open GitHub:

> **Copy-paste this into any message:**
>
> Bug report for Markup:
> - What I did: ____________
> - What I expected: ____________
> - What happened instead: ____________
> - Browser / OS: ____________
> - Screenshot: [attach if possible]

---

## Feature Request Template

Save this as `.github/ISSUE_TEMPLATE/feature_request.md` in the repo:

```markdown
---
name: Feature request
about: Suggest an idea for Markup
title: '[FEATURE] '
labels: enhancement
assignees: Alifromtheends
---

**What problem does this solve?**
Describe the pain point. What can't you do today?

**Describe the solution you'd like**
What should happen? Be specific.

**Describe alternatives you've considered**
How are you working around this today?

**Who else would benefit?**
Is this just for you, or would others find it useful too?

**Additional context**
Mockups, examples, or references are welcome.
```

### Quick Feature Request (Discord / Twitter)

> **Copy-paste this into any message:**
>
> Feature idea for Markup:
> - I want to: ____________
> - So that I can: ____________
> - Right now I work around it by: ____________

---

## Bug Bounty Program (Lightweight)

You don't need a formal bug bounty with cash prizes on day one. Start with **social credit** and scale up.

### Phase 1: Launch Week (Social Rewards Only)

| Reward | For |
|--------|-----|
| Twitter shoutout | Any bug report with reproduction steps |
| "Found by [name]" in changelog | First report of a confirmed bug |
| Contributor credit in README | Submitted a fix via PR |

### Phase 2: Post-Launch (Small Bounties)

If Markup generates revenue or you want to accelerate quality:

| Severity | Definition | Bounty |
|----------|------------|--------|
| **Critical** | Data loss, security issue, complete breakage | $50 + shoutout |
| **Major** | Core feature broken, export fails | $25 + shoutout |
| **Minor** | UI glitch, non-critical bug | $10 + shoutout |
| **Cosmetic** | Typos, spacing issues | Shoutout only |

**Rules:**
- First reporter gets the bounty (not duplicates)
- Must include reproduction steps
- Bounty paid via PayPal or Buy Me a Coffee within 48 hours of fix
- Discretionary — you judge severity

### Phase 3: Formal Program (If Needed)

Only if Markup becomes a real business:
- Set up on HackerOne or Bugcrowd
- Define clear scope and rules
- Budget $500–$1,000/month

**Recommendation:** Skip Phase 3 for now. Phases 1–2 are plenty.

---

## Feedback Collection Workflow

```
User reports bug
      │
      ▼
┌─────────────────┐
│ Is it on GitHub?│
└─────────────────┘
   │           │
   Yes         No
   │           │
   ▼           ▼
Acknowledge   Reply: "Thanks! Can you file this on GitHub
within 4h     so we can track it? [link]" OR copy it yourself
   │
   ▼
Can you reproduce?
   │
   ├─ Yes → Label `confirmed`, add to changelog / roadmap
   │
   └─ No → Ask for more info (browser, steps, screenshot)
   │
   ▼
Fix it or add to `ROADMAP.md`
   │
   ▼
Reply to user: "Fixed in [commit]. Thanks [name]!"
   │
   ▼
Tweet / Discord shoutout for significant fixes
```

---

## Launch-Week Feedback Blitz

During Days 1–7, do this aggressively:

| Day | Action |
|-----|--------|
| 1 | Add "Found a bug?" link in site footer pointing to GitHub Issues |
| 1 | Pin Discord invite in Twitter bio |
| 1 | Tweet: *"Try it. Break it. Tell me what sucks. GitHub issues or replies here — I read everything."* |
| 2 | Post in Discord: *"First 5 people to file a confirmed bug get a shoutout in the changelog."* |
| 3 | Quote-tweet a bug report: *"User found a CSS bug in Safari. Fixed and shipped. This is why I read every reply."* |
| 5 | Update README with "How to report bugs" section |
| 7 | Compile all feedback into a public `FEEDBACK-ROUNDUP.md` — shows you're listening |

---

## Feedback → Roadmap Pipeline

Create `ROADMAP.md` in the repo root. Update it weekly based on feedback.

```markdown
# Markup Roadmap

*Last updated: 2026-05-19*

## Recently Shipped
- [x] Live preview
- [x] 3 built-in themes
- [x] Single-file export
- [x] Copy HTML to clipboard

## Next Up (high demand)
- [ ] Custom theme upload / editor
- [ ] CLI export tool
- [ ] More markdown features (footnotes, math, diagrams)

## Under Consideration
- [ ] Chrome extension improvements
- [ ] PDF export
- [ ] Markdown import

## Won't Do (intentionally out of scope)
- Cloud sync / accounts
- Real-time collaboration
- Mobile app
```

---

## Quick Links for Users

| Resource | URL |
|----------|-----|
| **GitHub Issues (bugs)** | https://github.com/Alifromtheends/markuptool/issues |
| **GitHub Discussions** | https://github.com/Alifromtheends/markuptool/discussions |
| **Discord** | https://discord.gg/YOURCODE *(update with real invite)* |
| **Twitter/X** | https://twitter.com/alibulatsalamov |
| **Email** | ali@alifromtheends.dev *(update or remove if not monitored)* |

---

*Last updated: 2026-05-19*
