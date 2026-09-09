"""Small JSON Lines protocol used between Node and persistent Python workers."""

from __future__ import annotations

import json
import sys
from collections.abc import Callable, Iterator
from typing import Any


def emit(payload: dict[str, Any]) -> None:
    """Write exactly one JSON response line and flush it immediately."""
    print(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), flush=True)


def requests() -> Iterator[dict[str, Any]]:
    """Yield valid requests, ignoring empty lines and an optional BOM."""
    for line in sys.stdin:
        line = line.lstrip("\ufeff").strip()
        if not line:
            continue
        try:
            payload = json.loads(line)
        except json.JSONDecodeError as error:
            emit({"ok": False, "error": f"Solicitud JSON inválida: {error.msg}"})
            continue
        if not isinstance(payload, dict):
            emit({"ok": False, "error": "La solicitud debe ser un objeto JSON."})
            continue
        yield payload


def serve(handler: Callable[[dict[str, Any]], dict[str, Any]]) -> None:
    """Run a request handler while keeping the worker alive after failures."""
    for payload in requests():
        try:
            emit({"ok": True, **handler(payload)})
        except Exception as error:  # noqa: BLE001 - errors must remain protocol responses
            emit({"ok": False, "error": str(error)})
