"""Stripe integration for Markup Pro subscriptions."""

import os
import logging
from typing import Any

import stripe
from fastapi import APIRouter, HTTPException, Header, Request, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db, get_or_create_user, User

logger = logging.getLogger(__name__)

STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")
STRIPE_PRICE_ID = os.getenv("STRIPE_PRICE_ID", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
API_KEY_HEADER = os.getenv("API_KEY_HEADER", "X-API-Key")

stripe.api_key = STRIPE_SECRET_KEY

router = APIRouter(prefix="/api", tags=["stripe"])


class CheckoutSessionRequest(BaseModel):
    api_key: str


@router.post("/checkout/session")
async def create_checkout_session(
    payload: CheckoutSessionRequest,
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    """Create a Stripe Checkout session for Pro subscription."""
    if not STRIPE_SECRET_KEY or not STRIPE_PRICE_ID:
        raise HTTPException(status_code=500, detail="Stripe is not configured")

    user = await get_or_create_user(db, payload.api_key)

    # Create Stripe customer if needed
    if not user.stripe_customer_id:
        customer = stripe.Customer.create(
            metadata={"api_key": payload.api_key},
        )
        user.stripe_customer_id = customer.id  # type: ignore[assignment]
        await db.commit()

    try:
        session = stripe.checkout.Session.create(
            customer=user.stripe_customer_id,
            payment_method_types=["card"],
            line_items=[
                {
                    "price": STRIPE_PRICE_ID,
                    "quantity": 1,
                }
            ],
            mode="subscription",
            success_url=f"{FRONTEND_URL}/?checkout=success",
            cancel_url=f"{FRONTEND_URL}/?checkout=cancel",
            subscription_data={
                "metadata": {"api_key": payload.api_key},
            },
        )
    except stripe.error.StripeError as exc:
        logger.error("Stripe error creating checkout session: %s", exc)
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    return {"url": session.url}


@router.post("/webhook")
async def stripe_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db),
    stripe_signature: str = Header(None, alias="Stripe-Signature"),
) -> dict[str, str]:
    """Handle Stripe webhook events for subscription lifecycle."""
    if not STRIPE_WEBHOOK_SECRET:
        raise HTTPException(status_code=500, detail="Webhook secret not configured")

    payload = await request.body()

    try:
        event = stripe.Webhook.construct_event(
            payload, stripe_signature or "", STRIPE_WEBHOOK_SECRET
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail="Invalid payload") from exc
    except stripe.error.SignatureVerificationError as exc:
        raise HTTPException(status_code=400, detail="Invalid signature") from exc

    event_type = event["type"]
    data_object = event["data"]["object"]

    if event_type in ("checkout.session.completed", "invoice.payment_succeeded"):
        subscription = data_object
        if event_type == "checkout.session.completed":
            subscription = stripe.Subscription.retrieve(data_object["subscription"])

        api_key = subscription.get("metadata", {}).get("api_key")
        if api_key:
            user = await get_or_create_user(db, api_key)
            user.subscription_status = "active"
            user.stripe_customer_id = subscription.get("customer") or user.stripe_customer_id
            await db.commit()
            logger.info("Activated Pro for user %s", api_key[:8])

    elif event_type in ("invoice.payment_failed", "customer.subscription.deleted"):
        subscription = data_object
        api_key = subscription.get("metadata", {}).get("api_key")
        if not api_key and subscription.get("customer"):
            # Fallback: lookup by customer id
            result = await db.execute(
                select(User).where(
                    User.stripe_customer_id == subscription["customer"]
                )
            )
            user = result.scalar_one_or_none()
            if user:
                api_key = user.api_key

        if api_key:
            user = await get_or_create_user(db, api_key)
            user.subscription_status = "inactive"
            await db.commit()
            logger.info("Deactivated Pro for user %s", api_key[:8])

    return {"status": "ok"}
