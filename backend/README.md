# Markup Backend

FastAPI backend for **Markup** — a markdown editor that exports beautiful HTML sites.

## Features

- **Document API** — create, read, update, delete, and clone markdown docs with short shareable slugs
- **SQLite + SQLAlchemy async** — lightweight, zero-config database
- **Stripe integration** — Pro subscriptions ($5/mo) via Checkout + webhook handling
- **Tiered limits** — Free: 5 docs. Pro: unlimited docs, custom domains, analytics
- **Docker & docker-compose** — one-command local deploy
- **Deployment ready** — Railway, Render, Fly.io compatible

## Quick Start

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Copy and fill env vars
cp .env.example .env

# Run
uvicorn main:app --reload --port 8000
```

Open http://localhost:8000/docs for interactive API docs.

## Docker

```bash
docker-compose up --build
```

SQLite data is persisted in the `markup-data` Docker volume.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | SQLite connection string |
| `STRIPE_SECRET_KEY` | Stripe secret key (test/live) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook endpoint secret |
| `STRIPE_PRICE_ID` | Stripe Price ID for Pro subscription |
| `FRONTEND_URL` | Origin of the frontend app |
| `API_KEY_HEADER` | Header name for auth (default: `X-API-Key`) |

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/doc` | Create document |
| GET | `/api/doc/{slug}` | Get document (increments view count) |
| PATCH | `/api/doc/{slug}` | Update document |
| DELETE | `/api/doc/{slug}` | Delete document |
| POST | `/api/doc/{slug}/clone` | Clone/fork a document |
| GET | `/api/me/docs` | List my documents |
| GET | `/api/me` | Get current user + sub status |
| POST | `/api/checkout/session` | Create Stripe Checkout session |
| POST | `/api/webhook` | Stripe webhook endpoint |

## Stripe Setup

1. Create a subscription product in Stripe Dashboard
2. Copy the Price ID into `STRIPE_PRICE_ID`
3. Install Stripe CLI and forward webhooks:
   ```bash
   stripe listen --forward-to localhost:8000/api/webhook
   ```
4. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`

## Deployment

### Railway
1. Push repo to GitHub
2. Create project from GitHub repo
3. Add environment variables in Railway dashboard
4. Deploy — Railway auto-detects Dockerfile

### Render
1. Create new Web Service
2. Connect GitHub repo
3. Set build command: `docker build -t markup .`
4. Set start command: `docker run -p 10000:8000 markup`
5. Add env vars

### Fly.io
```bash
fly launch
fly secrets set STRIPE_SECRET_KEY=... STRIPE_WEBHOOK_SECRET=... STRIPE_PRICE_ID=...
```

## Frontend Integration

The frontend should:
- Generate and store an API key in `localStorage` (e.g. `crypto.randomUUID()`)
- Send it as `X-API-Key: <key>` on authenticated requests
- Call `POST /api/checkout/session` with `{ api_key }` to start Pro upgrade
- Listen to `?checkout=success` / `?checkout=cancel` query params
