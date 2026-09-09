"""Persistent JSONL entry point for image optimization."""

from __future__ import annotations

from .optimizer import optimize
from .protocol import serve


if __name__ == "__main__":
    serve(optimize)
