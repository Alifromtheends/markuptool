#!/bin/bash
set -e

echo "═══════════════════════════════════════════════════════"
echo "  MARKUP v1.0 — ONE-CLICK DEPLOYMENT"
echo "═══════════════════════════════════════════════════════"
echo ""

# Step 1: Open Render dashboard
echo "[1/5] Opening Render dashboard..."
open "https://dashboard.render.com/blueprint"

# Step 2: Open Stripe dashboard
echo "[2/5] Opening Stripe dashboard..."
open "https://dashboard.stripe.com/test/apikeys"

# Step 3: Open GitHub repo
echo "[3/5] Opening GitHub repo..."
open "https://github.com/Alifromtheends/markuptool"

# Step 4: Open live site
echo "[4/5] Opening live Markup site..."
open "https://alifromtheends.github.io/markuptool/"

# Step 5: Open Hacker News
echo "[5/5] Opening Hacker News submit..."
open "https://news.ycombinator.com/submit"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  NEXT STEPS (takes ~5 minutes)"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "RENDER DEPLOY:"
echo "  1. Click 'New Blueprint Instance' in Render"
echo "  2. Connect GitHub repo 'Alifromtheends/markuptool'"
echo "  3. Click 'Apply' — backend deploys automatically"
echo "  4. Copy the live URL (e.g., https://markuptool-backend.onrender.com)"
echo ""
echo "STRIPE SETUP:"
echo "  1. In Stripe dashboard, copy 'Secret key' (starts with sk_test_)"
echo "  2. In Render dashboard, go to your service → Environment"
echo "  3. Add: STRIPE_SECRET_KEY=sk_test_..."
echo "  4. Add: FRONTEND_URL=https://alifromtheends.github.io/markuptool"
echo "  5. Create a Product + Price in Stripe, copy Price ID"
echo "  6. Add: STRIPE_PRICE_ID=price_..."
echo "  7. Click 'Manual Deploy' → 'Deploy latest commit'"
echo ""
echo "STRIPE WEBHOOK:"
echo "  1. In Stripe → Developers → Webhooks → Add endpoint"
echo "  2. URL: https://YOUR-RENDER-URL/api/webhook"
echo "  3. Select events: checkout.session.completed, customer.subscription.deleted"
echo "  4. Copy webhook signing secret"
echo "  5. Add to Render env: STRIPE_WEBHOOK_SECRET=whsec_..."
echo ""
echo "DONE! Your backend is live."
echo ""
echo "LAUNCH:"
echo "  Copy-paste content from these files:"
echo "    ~/markuptool/launch-content/hackernews.md"
echo "    ~/markuptool/launch-content/twitter-thread.md"
echo "    ~/markuptool/launch-content/reddit-posts.md"
echo ""
