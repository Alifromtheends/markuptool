# Markup — Analytics Tracking Plan

*Privacy-first measurement. No Google Analytics. No cookies. Just signal.*

---

## Philosophy

Markup is privacy-first. Its analytics should be too. We track only what we need to make the product better — no fingerprinting, no cross-site tracking, no personal data collection.

**Recommended tools:**
- **Plausible** (https://plausible.io) — Open source, lightweight, GDPR/CCPA compliant, ~1KB script
- **Umami** (https://umami.is) — Self-hostable, open source, no cookies, GDPR-compliant by design
- **Simple Analytics** (https://simpleanalytics.com) — Privacy-first, clean UI, no cookie banner needed

**Free / low-cost hosting:**
- Plausible: $9/month for up to 10K pageviews (shared hosting) or self-host via Docker
- Umami: Free if self-hosted on Railway, Render, or Fly.io (~$5/month)
- Simple Analytics: $19/month (skip unless revenue justifies it)

**Recommendation for launch:** Start with **Plausible** ($9/month) or self-host **Umami**. Either can be running in 15 minutes.

---

## Key Metrics to Track

### 1. Traffic Metrics

| Metric | Why It Matters | Tool |
|--------|----------------|------|
| **Unique visitors / day** | Baseline growth | Plausible / Umami |
| **Page views / day** | Engagement depth | Plausible / Umami |
| **Referrers** | Which channels work | Plausible / Umami |
| **Top pages** | Is the landing page sticky? | Plausible / Umami |
| **Country / device** | Where is traction coming from? | Plausible / Umami |

### 2. Product Metrics

| Metric | Why It Matters | How to Track |
|--------|----------------|--------------|
| **Editor opens** | Are people actually using it? | Custom event: `editor_opened` |
| **Exports initiated** | Core value prop validation | Custom event: `export_clicked` |
| **Copies to clipboard** | Secondary output method | Custom event: `copy_html_clicked` |
| **Theme switches** | Feature engagement | Custom event: `theme_switched` (include theme name) |
| **Time in editor** | Stickiness | Plausible / Umami page engagement or custom heartbeat |
| **Return visits** | Retention | Plausible / Umami returning visitors |

### 3. Business Metrics

| Metric | Why It Matters | How to Track |
|--------|----------------|--------------|
| **GitHub stars / day** | Developer interest | GitHub API or manual check |
| **Chrome extension installs** | Distribution channel health | Chrome Web Store dashboard |
| **Stripe conversions** | Revenue (when paid tiers launch) | Stripe dashboard |
| **Newsletter mentions** | PR reach | Google Alerts + manual tracking |

---

## Implementation Guide

### Option A: Plausible (Fastest — 10 minutes)

1. Sign up at https://plausible.io/register
2. Add site: `alifromtheends.github.io/markuptool`
3. Copy the tracking script:

```html
<script defer data-domain="alifromtheends.github.io" src="https://plausible.io/js/script.js"></script>
```

4. Paste into `<head>` of `index.html` before the `</head>` tag.
5. Verify: Visit the site, check Plausible dashboard for real-time visitor.

**Cost:** $9/month (or free trial, then pay)

### Option B: Umami (Self-hosted — 30 minutes)

1. Deploy Umami to Railway: https://railway.app/template/umami
2. Or deploy to Render: https://render.com/docs/deploy-umami
3. Add website in Umami dashboard → copy tracking script
4. Paste into `<head>` of `index.html`
5. Verify in Umami dashboard

**Cost:** ~$5/month hosting

### Custom Events Setup

Add these event triggers to `index.html`:

```javascript
// Plausible custom events
function trackEvent(eventName, props = {}) {
  if (window.plausible) {
    plausible(eventName, { props });
  }
}

// Umami custom events
function trackEvent(eventName, data = {}) {
  if (window.umami) {
    umami.track(eventName, data);
  }
}

// Usage examples (add to existing event handlers):
// On export button click:
trackEvent('export_clicked', { theme: currentTheme });

// On copy HTML button click:
trackEvent('copy_html_clicked');

// On theme switch:
trackEvent('theme_switched', { theme: newTheme });

// On editor first interaction (debounced):
let editorOpened = false;
editor.addEventListener('input', () => {
  if (!editorOpened) {
    trackEvent('editor_opened');
    editorOpened = true;
  }
});
```

---

## Conversion Funnel Definition

```
AWARENESS          CONSIDERATION         ACTIVATION           ENGAGEMENT           ADVOCACY
   │                    │                    │                    │                   │
   ▼                    ▼                    ▼                    ▼                   ▼
Lands on         Clicks "Try it"     Types in editor    Exports or copies    GitHub star,
site via         or scrolls to       (editor_opened)    HTML                 tweet, shares
HN/Reddit/       editor
Twitter          
   │                    │                    │                    │                   │
   ▼                    ▼                    ▼                    ▼                   ▼
Track:           Track:              Track:             Track:               Track:
- referrer       - scroll depth      - editor_opened    - export_clicked     - github_stars
- country        - time on page      - time in editor   - copy_html_clicked  - twitter_mentions
- device         - bounce rate       - theme_switched   - return_visit       - newsletter_mentions

Target conversion rates:
- Landing → Editor opened: 40%+
- Editor opened → Export: 20%+
- Export → Return visit within 7 days: 10%+
```

---

## 30-Day Growth Targets

| Metric | Day 7 | Day 14 | Day 30 | How to Hit It |
|--------|-------|--------|--------|---------------|
| **Unique visitors** | 3,000 | 6,000 | 15,000 | HN + Reddit front page, Twitter thread, newsletter pickups |
| **GitHub stars** | 100 | 180 | 400 | Pin repo link in every post, add "Star on GitHub" CTA in editor |
| **Exports** | 300 | 700 | 2,000 | Smooth export UX, prominent CTA, "try exporting this demo doc" |
| **Twitter followers** | +50 | +100 | +250 | Reply to every comment, thread daily, quote-tweet praise |
| **Newsletter mentions** | 1 | 2 | 5 | Batch outreach Days 2–7, follow up once if no response |
| **Chrome extension installs** | 20 | 60 | 200 | Add install banner on site, mention in Twitter threads |

### Weekly Review Template

Copy this into a note every Sunday:

```
## Week X Review — [Date]

### Traffic
- Unique visitors: ____
- Top referrer: ____
- Bounce rate: ____

### Product
- Editor opens: ____
- Exports: ____
- Theme switches: ____

### Distribution
- GitHub stars this week: ____ (total: ____)
- Twitter follower growth: ____
- Newsletter mentions: ____
- Chrome extension installs: ____

### What worked?
1.
2.

### What didn't?
1.
2.

### Next week's focus:
```

---

## Privacy Compliance Checklist

- [ ] No cookies set by analytics (Plausible/Umami/Simple — all cookie-free)
- [ ] No personal data collected (no IP storage, no fingerprinting)
- [ ] No cross-site tracking
- [ ] No data sold or shared
- [ ] Optional: Add "Privacy" section to site explaining tracking (one sentence is enough)

**One-liner for site:**
> "We use Plausible Analytics to understand how Markup is used. It doesn't use cookies and doesn't collect personal data."

---

## Quick Links

| Resource | URL |
|----------|-----|
| Plausible | https://plausible.io |
| Umami | https://umami.is |
| Simple Analytics | https://simpleanalytics.com |
| Railway (hosting) | https://railway.app |
| Render (hosting) | https://render.com |
| Live product | https://alifromtheends.github.io/markuptool/ |

---

*Last updated: 2026-05-19*
