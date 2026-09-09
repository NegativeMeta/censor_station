"""Optimization request handler used by the persistent JSONL worker."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from .images import save_optimized


def optimize(request: dict[str, Any]) -> dict[str, object]:
    return save_optimized(Path(request["imagePath"]), Path(request["outputPath"]), str(request.get("format", "original")), int(request.get("quality", 92)), bool(request.get("lossless", False)))
