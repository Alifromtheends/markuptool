# Stripe Setup — Copy & Paste

You should have the Stripe dashboard open in Chrome now.

---

## Step 1: Get your API Keys

1. In the Stripe tab, make sure you're in **Test mode** (toggle at top right)
2. Go to: Developers → API keys
3. Copy the **Secret key** (starts with `sk_test_`)

```
sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Step 2: Create Product + Price

1. Go to: Products → Add product
2. **Name:** `Markup Pro`
3. **Description:** `Unlimited documents, custom domains, and analytics`
4. Click **Save product**
5. Under "Pricing", click **Add pricing**
6. **Pricing model:** Standard pricing
7. **Price:** $5.00
8. **Billing period:** Monthly
9. Click **Save price**
10. Click the price to expand it
11. Copy the **Price ID** (starts with `price_`)

```
price_xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Step 3: Set up Webhook

1. Go to: Developers → Webhooks → Add endpoint
2. **Endpoint URL:** `https://markuptool-backend.onrender.com/api/webhook`
   - (Replace with your actual Render URL after deploy)
3. Click **Select events**
4. Search and select:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

```
whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Step 4: Add to Render

1. Switch to the **Render** tab
2. After deploying (see DEPLOY-now.sh), click your service
3. Go to **Environment** tab
4. Add these variables one by one:

| Key | Value |
|-----|-------|
| `STRIPE_SECRET_KEY` | `sk_test_...` (from Step 1) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (from Step 3) |
| `STRIPE_PRICE_ID` | `price_...` (from Step 2) |
| `FRONTEND_URL` | `https://alifromtheends.github.io/markuptool` |

5. Click **Save Changes**
6. Click **Manual Deploy** → **Deploy latest commit**

---

## Step 5: Test Payment

1. Open your live site: https://alifromtheends.github.io/markuptool/
2. Try to save more than 5 documents
3. Click **Upgrade to Pro**
4. Use Stripe test card: `4242 4242 4242 4242`
5. Any future date, any 3-digit CVC, any ZIP
6. You should see "Pro" badge appear

---

## Done!

Your monetization is live. Every $5 subscription goes to your Stripe account.
