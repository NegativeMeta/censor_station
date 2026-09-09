"""Persistent JSONL entry point for anime NSFW segmentation."""

from __future__ import annotations

from .detector import load_model, predict
from .protocol import emit, serve


def main() -> int:
    try:
        model = load_model()
    except Exception as error:  # noqa: BLE001 - Node needs one protocol error response
        emit({"ok": False, "error": str(error)})
        return 1
    serve(lambda request: {"detections": predict(model, request)})
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
