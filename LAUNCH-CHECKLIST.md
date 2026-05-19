# Markup — Master Launch Checklist

*One checklist to rule them all. Check it off as you go.*

---

## Pre-Launch (Day 0 — T-24h)

> **Goal:** Everything is live, wired, and ready before you go to sleep. Launch day is for execution only — no debugging.

| # | Task | Status | Notes / Links |
|---|------|--------|---------------|
| 1 | **Backend deployed live** | [ ] | Target: Fly.io, Railway, or Render. Verify health endpoint returns 200. |
| 2 | **Frontend wired to backend** | [ ] | Update API base URL in frontend. Test one end-to-end flow (e.g., save/load). |
| 3 | **Stripe account created + keys added** | [ ] | Sign up at https://stripe.com → Get publishable + secret keys → Add to backend env. Test a $0.50 payment in test mode. |
| 4 | **Chrome extension submitted to Web Store** | [ ] | Developer dashboard: https://chrome.google.com/webstore/devconsole — allow 3–7 days for review. |
| 5 | **Product Hunt gallery screenshots captured** | [ ] | Need 3+ screenshots (1280×800 or 1440×900). See `/producthunt/` for assets. |
| 6 | **All social bios updated with Markup link** | [ ] | Twitter/X, GitHub, LinkedIn, personal site. Link: `https://alifromtheends.github.io/markuptool/` |
| 7 | **GitHub repo README polished** | [ ] | Hero GIF/screenshot, clear value prop, install instructions. |
| 8 | **Live URL tested on mobile + desktop** | [ ] | Chrome, Safari, Firefox. Export + open file locally. |
| 9 | **Analytics script added** | [ ] | See `launch-content/analytics.md` — Plausible or Umami snippet in `<head>`. |
| 10 | **Emergency rollback plan documented** | [ ] | Last working commit hash: `__________` — `git revert` or redeploy previous image. |

### Day 0 — Copy-Paste Prep (do this the night before)

- [ ] HN title + body copied to clipboard → `launch-content/hackernews.md`
- [ ] Twitter thread copied to Threadit or Typefully → `launch-content/twitter-thread.md`
- [ ] Reddit posts saved in notes → `launch-content/reddit-posts.md`
- [ ] Email announcement ready to send → `launch-content/email-announcement.md`
- [ ] Product Hunt tagline + description filled in → `launch-content/press-kit.md`
- [ ] Calendar alarms set for all launch-day posts (see times below)

---

## Launch Day (Day 1 — T-0)

> **Goal:** Maximum signal in a 4-hour window. Be present. Reply fast. Ride the algorithm.

| Time (PST) | Time (EST) | Action | Platform | Copy-Paste Ready? |
|------------|------------|--------|----------|-------------------|
| **07:30** | 10:30 | Wake up, coffee, verify site is up. | — | Check `/health` or open live URL. |
| **08:00** | 11:00 | **Post "Show HN"** | [news.ycombinator.com](https://news.ycombinator.com/submit) | Title: `Show HN: Markup – A privacy-first markdown editor that exports single-file sites` |
| **08:05** | 11:05 | Paste link in Twitter bio / send to 3 friends for early upvotes. | Twitter/X, iMessage | *"Just posted on HN — would appreciate an honest look:"* + link |
| **09:00** | 12:00 | **Post Twitter thread** | [twitter.com](https://twitter.com/compose/tweet) | `launch-content/twitter-thread.md` — Tweet 1 is the hook. |
| **09:15** | 12:15 | Cross-post Tweet 1 to LinkedIn with professional rewording. | LinkedIn | *"I shipped a new tool this week..."* |
| **10:00** | 13:00 | **Post Reddit — r/webdev** | [reddit.com/r/webdev](https://reddit.com/r/webdev) | `launch-content/reddit-posts.md` — "webdev" version |
| **10:15** | 13:15 | **Post Reddit — r/selfhosted** | [reddit.com/r/selfhosted](https://reddit.com/r/selfhosted) | `launch-content/reddit-posts.md` — "selfhosted" version |
| **11:00** | 14:00 | **Post IndieHackers milestone** | [indiehackers.com](https://indiehackers.com) | `launch-content/indiehackers.md` |
| **11:30** | 14:30 | **Send email announcement** | Your email tool | `launch-content/email-announcement.md` — Segment: devs, writers, privacy folks. |
| **12:00** | 15:00 | **Submit Product Hunt** (if not scheduled) | [producthunt.com](https://producthunt.com) — or schedule via Ship for tomorrow 00:01 PST | `launch-content/press-kit.md` for description + screenshots |
| **12:30** | 15:30 | Lunch. But keep notifications on. | — | |

### Launch Day — Golden Rules

1. **Reply to every HN comment in the first 2 hours.** Engagement velocity = ranking.
2. **Reply to every tweet reply in the first 90 minutes.** Quote-tweet the best ones.
3. **Don't argue.** Even unfair criticism gets a *"Fair point — noted."*
4. **Refresh obsessively.** First 4 hours determine 80% of launch traffic.
5. **Screenshot everything.** Milestones, nice comments, traffic spikes. Content for follow-up posts.

---

## Post-Launch (Days 2–7)

> **Goal:** Convert launch traffic into sustained usage, feedback, and backlinks.

| Day | Task | Status | Notes |
|-----|------|--------|-------|
| 2 | Reply to all remaining comments (HN, Reddit, Twitter, IH) within 1 hour | [ ] | Set phone alerts. Sleep with phone nearby if needed. |
| 2 | Post follow-up Twitter thread: "24 hours since launch — numbers + learnings" | [ ] | Even if numbers are small, the transparency builds trust. |
| 2 | Add "built with Markup" page to repo / site (seed with your own exports) | [ ] | Social proof loop. |
| 3 | Post follow-up tweet: specific feature deep-dive (e.g., export mechanics) | [ ] | `launch-content/social-schedule.md` — Week 1, Day 3 |
| 3 | Reach out to 3 newsletters/blogs | [ ] | `launch-content/newsletter-pitches.md` — TLDR, Console, Pointer |
| 4 | Reach out to 3 more newsletters/blogs | [ ] | JavaScript Weekly, Frontend Focus, Hacker Newsletter |
| 4 | Post Twitter poll: "What's your biggest pain point with markdown tools?" | [ ] | Engagement bait + market research. |
| 5 | Reach out to 4 more newsletters/blogs | [ ] | CSS-Tricks, Smashing Mag, Indie Hackers podcast, etc. |
| 5 | Publish "Behind the scenes" thread or blog post | [ ] | Why zero dependencies, how the parser works, file size tricks. |
| 6 | Post user tip / tutorial tweet | [ ] | e.g., "How to self-host Markup on GitHub Pages in 30 seconds" |
| 6 | Monitor analytics dashboard — identify top referrers | [ ] | `launch-content/analytics.md` |
| 7 | Weekly review: what worked, what didn't, what to build next | [ ] | Write 5 bullets. Share on Twitter for accountability. |
| 7 | Collect testimonials / nice comments into a doc | [ ] | Future landing page social proof. |

---

## Emergency Contacts & Quick Links

| Resource | URL |
|----------|-----|
| **Live product** | https://alifromtheends.github.io/markuptool/ |
| **GitHub repo** | https://github.com/Alifromtheends/markuptool |
| **Twitter/X** | https://twitter.com/alibulatsalamov |
| **Hacker News Submit** | https://news.ycombinator.com/submit |
| **Product Hunt Dashboard** | https://www.producthunt.com/dashboard |
| **Reddit r/webdev** | https://reddit.com/r/webdev |
| **Reddit r/selfhosted** | https://reddit.com/r/selfhosted |
| **IndieHackers** | https://indiehackers.com |
| **Stripe Dashboard** | https://dashboard.stripe.com |

---

## Post-Launch Success Metrics (30 Days)

| Metric | Target | Where to check |
|--------|--------|----------------|
| Unique visitors | 5,000 | Analytics dashboard |
| GitHub stars | 200 | Repo page |
| Exported files (if trackable) | 500 | Backend logs or localStorage telemetry |
| Newsletter/blog mentions | 3 | Google Alerts for "Markup markdown editor" |
| Paying customers (if applicable) | 10 | Stripe dashboard |
| Twitter followers gained | 100 | Twitter analytics |

---

*Last updated: 2026-05-19 | Markup v1.0 Launch*
