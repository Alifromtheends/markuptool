# Markup Backend Deployment Guide

## Platform: Render (Recommended)

Render offers a **free tier** with a **persistent disk** — perfect for SQLite.

---

## One-Click Deploy (Blueprint)

### 1. Push this repo to GitHub

Already done: `https://github.com/Alifromtheends/markuptool`

### 2. Create a Render account

Go to [https://dashboard.render.com](https://dashboard.render.com) and sign up (free).

### 3. Deploy via Blueprint

1. In the Render dashboard, click **"New +"** → **"Blueprint"**
2. Connect your GitHub repo: `Alifromtheends/markuptool`
3. Render will read `backend/render.yaml` and create:
   - A **Web Service** (`markuptool-backend`)
   - A **1 GB persistent disk** mounted at `/data`
4. Click **"Apply"**

### 4. Configure Stripe secrets (after deploy)

In your Render dashboard → **markuptool-backend** → **Environment**:

| Key | Value |
|-----|-------|
| `STRIPE_SECRET_KEY` | `sk_live_...` or `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (see Webhook section below) |
| `STRIPE_PRICE_ID` | `price_...` |

Click **Save Changes** — Render will redeploy automatically.

---

## Stripe Webhook Setup

Stripe needs a live URL to send webhook events.

### 1. Get your backend URL

After deploy, Render gives you a URL like:

```
https://markuptool-backend.onrender.com
```

### 2. Create a Stripe webhook endpoint

In Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**:

- **Endpoint URL**: `https://YOUR_BACKEND_URL/api/webhook`
- **Events to listen to**:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
  - `customer.subscription.deleted`

### 3. Copy the webhook signing secret

After creating the endpoint, copy the **Signing secret** (`whsec_...`) and paste it into Render's `STRIPE_WEBHOOK_SECRET` env var.

---

## Manual Deploy (Without Blueprint)

If you prefer not to use the blueprint:

1. **New Web Service** in Render dashboard
2. Connect GitHub repo `Alifromtheends/markuptool`
3. Set:
   - **Runtime**: Docker
   - **Root Directory**: `backend`
   - **Branch**: `main`
4. Add env vars from `.env.example`
5. Add a **Disk**:
   - Name: `markup-data`
   - Mount Path: `/data`
   - Size: 1 GB
6. Deploy

---

## Health Check

```bash
curl https://YOUR_BACKEND_URL/health
```

Expected response:
```json
{"status": "ok"}
```

---

## Frontend CORS

The backend already allows `https://alifromtheends.github.io` in CORS.
If your frontend moves to a different domain, update `FRONTEND_URL` in Render env vars.

---

## SQLite Persistence

The SQLite database lives at `/data/markup.db` on Render's persistent disk.
**Do NOT** use the default `./markup.db` in production — it would be wiped on every deploy.

The `Dockerfile` and `render.yaml` are already configured for this.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Database locked errors | SQLite on disk with a single worker is fine. If you scale up, switch to PostgreSQL. |
| Stripe webhooks not working | Verify `STRIPE_WEBHOOK_SECRET` and the endpoint URL in Stripe dashboard. |
| CORS errors | Check `FRONTEND_URL` env var matches your actual frontend domain. |
| Data lost on deploy | Make sure the disk is mounted at `/data` and `DATABASE_URL` points to `/data/markup.db`. |

---

## Alternative Platforms

### Railway (free $5 credit)
- Create `railway.json` (not included — use Render blueprint instead)
- Add a volume for SQLite persistence

### Fly.io
- Run `fly launch` in the `backend/` directory
- Create a volume: `fly volumes create markup_data --size 1`
- See `fly.toml` notes if needed

---

## Live URL

After successful deploy, your backend will be at:

```
https://markuptool-backend.onrender.com
```

Or whatever custom name you choose in Render.
