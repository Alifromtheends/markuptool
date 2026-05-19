"""Database models and session management for Markup."""

import os
import secrets
from datetime import datetime, timezone
from typing import AsyncGenerator

from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    String,
    Boolean,
    Text,
    select,
    func,
)
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./markup.db")

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    future=True,
)
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()


class User(Base):  # type: ignore[valid-type, misc]
    """A user identified by an API key."""

    __tablename__ = "users"

    api_key = Column(String(64), primary_key=True, index=True)
    stripe_customer_id = Column(String(128), nullable=True, index=True)
    subscription_status = Column(String(32), default="inactive")  # active, inactive, past_due, canceled
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class Document(Base):  # type: ignore[valid-type, misc]
    """A markdown document."""

    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, autoincrement=True)
    slug = Column(String(16), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False, default="Untitled")
    content = Column(Text, nullable=False, default="")
    theme = Column(String(32), default="default")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    view_count = Column(Integer, default=0)
    is_pro = Column(Boolean, default=False)
    owner_api_key = Column(String(64), nullable=True, index=True)


def generate_slug(length: int = 8) -> str:
    """Generate a short URL-safe slug."""
    return secrets.token_urlsafe(length)[:length]


def generate_api_key() -> str:
    """Generate a new API key for a user."""
    return secrets.token_urlsafe(32)


async def init_db() -> None:
    """Create all tables if they don't exist."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Yield an async database session."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


async def get_or_create_user(session: AsyncSession, api_key: str) -> User:
    """Fetch a user by API key, creating one if it doesn't exist."""
    result = await session.execute(select(User).where(User.api_key == api_key))
    user = result.scalar_one_or_none()
    if user is None:
        user = User(api_key=api_key)
        session.add(user)
        await session.commit()
        await session.refresh(user)
    return user


async def doc_count_for_user(session: AsyncSession, api_key: str) -> int:
    """Return the number of documents owned by this API key."""
    result = await session.execute(
        select(func.count(Document.id)).where(Document.owner_api_key == api_key)
    )
    return result.scalar() or 0


async def is_user_pro(session: AsyncSession, api_key: str) -> bool:
    """Check if the user has an active Pro subscription."""
    result = await session.execute(
        select(User).where(User.api_key == api_key)
    )
    user = result.scalar_one_or_none()
    if user is None:
        return False
    return user.subscription_status == "active"
