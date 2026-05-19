"""Markup backend API — FastAPI server."""

import os
import logging
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import Any

from fastapi import FastAPI, HTTPException, Header, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession

from db import (
    init_db,
    get_db,
    Document,
    User,
    generate_slug,
    get_or_create_user,
    doc_count_for_user,
    is_user_pro,
)
import stripe_handler

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
API_KEY_HEADER = os.getenv("API_KEY_HEADER", "X-API-Key")
FREE_DOC_LIMIT = 5


# ---------------------------------------------------------------------------
# Pydantic schemas
# ---------------------------------------------------------------------------

class DocumentCreate(BaseModel):
    title: str = Field(default="Untitled", max_length=255)
    content: str = Field(default="")
    theme: str = Field(default="default", max_length=32)


class DocumentResponse(BaseModel):
    id: int
    slug: str
    title: str
    content: str
    theme: str
    created_at: datetime
    updated_at: datetime
    view_count: int
    is_pro: bool

    class Config:
        from_attributes = True


class DocumentUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=255)
    content: str | None = None
    theme: str | None = Field(default=None, max_length=32)


# ---------------------------------------------------------------------------
# Lifespan
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):  # noqa: ARG001
    await init_db()
    yield


app = FastAPI(
    title="Markup API",
    description="Backend for Markup — a markdown editor that exports beautiful HTML sites.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stripe_handler.router)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

async def get_current_user(
    db: AsyncSession = Depends(get_db),
    x_api_key: str | None = Header(None, alias=API_KEY_HEADER),
) -> User:
    if not x_api_key:
        raise HTTPException(status_code=401, detail="Missing API key header")
    return await get_or_create_user(db, x_api_key)


async def get_doc_or_404(session: AsyncSession, slug: str) -> Document:
    result = await session.execute(select(Document).where(Document.slug == slug))
    doc = result.scalar_one_or_none()
    if doc is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/doc", response_model=DocumentResponse, status_code=201)
async def create_document(
    payload: DocumentCreate,
    db: AsyncSession = Depends(get_db),
    x_api_key: str | None = Header(None, alias=API_KEY_HEADER),
) -> Document:
    """Save a new document and return a shareable short URL slug."""
    owner_key: str | None = x_api_key

    # Enforce free tier limit
    if owner_key and not await is_user_pro(db, owner_key):
        count = await doc_count_for_user(db, owner_key)
        if count >= FREE_DOC_LIMIT:
            raise HTTPException(
                status_code=403,
                detail="Free tier limit reached. Upgrade to Pro for unlimited documents.",
            )

    slug = generate_slug()
    # Ensure uniqueness
    while True:
        result = await db.execute(select(Document).where(Document.slug == slug))
        if result.scalar_one_or_none() is None:
            break
        slug = generate_slug()

    doc = Document(
        slug=slug,
        title=payload.title,
        content=payload.content,
        theme=payload.theme,
        owner_api_key=owner_key,
    )
    db.add(doc)
    await db.commit()
    await db.refresh(doc)
    return doc


@app.get("/api/doc/{slug}", response_model=DocumentResponse)
async def get_document(
    slug: str,
    db: AsyncSession = Depends(get_db),
) -> Document:
    """Retrieve a document by its slug."""
    doc = await get_doc_or_404(db, slug)
    doc.view_count += 1
    await db.commit()
    return doc


@app.post("/api/doc/{slug}/clone", response_model=DocumentResponse, status_code=201)
async def clone_document(
    slug: str,
    db: AsyncSession = Depends(get_db),
    x_api_key: str | None = Header(None, alias=API_KEY_HEADER),
) -> Document:
    """Fork/clone an existing document."""
    owner_key: str | None = x_api_key

    # Enforce free tier limit
    if owner_key and not await is_user_pro(db, owner_key):
        count = await doc_count_for_user(db, owner_key)
        if count >= FREE_DOC_LIMIT:
            raise HTTPException(
                status_code=403,
                detail="Free tier limit reached. Upgrade to Pro for unlimited documents.",
            )

    original = await get_doc_or_404(db, slug)

    new_slug = generate_slug()
    while True:
        result = await db.execute(select(Document).where(Document.slug == new_slug))
        if result.scalar_one_or_none() is None:
            break
        new_slug = generate_slug()

    clone = Document(
        slug=new_slug,
        title=f"{original.title} (Copy)",
        content=original.content,
        theme=original.theme,
        owner_api_key=owner_key,
    )
    db.add(clone)
    await db.commit()
    await db.refresh(clone)
    return clone


@app.patch("/api/doc/{slug}", response_model=DocumentResponse)
async def update_document(
    slug: str,
    payload: DocumentUpdate,
    db: AsyncSession = Depends(get_db),
    x_api_key: str | None = Header(None, alias=API_KEY_HEADER),
) -> Document:
    """Update an existing document (owner only)."""
    doc = await get_doc_or_404(db, slug)

    if doc.owner_api_key and doc.owner_api_key != x_api_key:
        raise HTTPException(status_code=403, detail="Not authorized to edit this document")

    if payload.title is not None:
        doc.title = payload.title
    if payload.content is not None:
        doc.content = payload.content
    if payload.theme is not None:
        doc.theme = payload.theme

    doc.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(doc)
    return doc


@app.delete("/api/doc/{slug}")
async def delete_document(
    slug: str,
    db: AsyncSession = Depends(get_db),
    x_api_key: str | None = Header(None, alias=API_KEY_HEADER),
) -> dict[str, str]:
    """Delete a document (owner only)."""
    doc = await get_doc_or_404(db, slug)

    if doc.owner_api_key and doc.owner_api_key != x_api_key:
        raise HTTPException(status_code=403, detail="Not authorized to delete this document")

    await db.delete(doc)
    await db.commit()
    return {"status": "deleted"}


@app.get("/api/me/docs", response_model=list[DocumentResponse])
async def list_my_documents(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
) -> list[Document]:
    """List all documents owned by the authenticated user."""
    result = await db.execute(
        select(Document)
        .where(Document.owner_api_key == user.api_key)
        .order_by(desc(Document.updated_at))
    )
    return list(result.scalars().all())


@app.get("/api/me")
async def get_me(
    user: User = Depends(get_current_user),
) -> dict[str, Any]:
    """Get current user info including subscription status."""
    return {
        "api_key": user.api_key,
        "subscription_status": user.subscription_status,
        "created_at": user.created_at,
    }


# ---------------------------------------------------------------------------
# Exception handlers
# ---------------------------------------------------------------------------

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.error("Unhandled exception at %s: %s", request.url.path, exc)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )
