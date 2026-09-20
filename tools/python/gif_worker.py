"""Persistent JSONL entry point for GIF extraction and assembly."""

from __future__ import annotations

from . import gif as gif_module
from .protocol import emit, requests


def main() -> None:
    for payload in requests():
        try:
            action = str(payload.get("action", ""))
            if action == "extract" and payload.get("progress"):
                total_holder: dict[str, int] = {}
                # Peek the frame count first so progress lines carry the total.
                from PIL import Image

                with Image.open(payload["imagePath"]) as probe:
                    total_holder["total"] = int(getattr(probe, "n_frames", 1))

                def on_progress(done: int, total: int) -> None:
                    emit({"ok": True, "progress": True, "done": done, "total": total})

                payload = {**payload, "on_progress": on_progress}
                result = gif_module.extract(payload)
                emit({"ok": True, "done": True, **result})
            elif action == "extract":
                emit({"ok": True, "done": True, **gif_module.extract(payload)})
            elif action == "assemble":
                emit({"ok": True, "done": True, **gif_module.assemble(payload)})
            else:
                emit({"ok": False, "error": f"Acción GIF inválida: {action or 'vacía'}."})
        except Exception as error:  # noqa: BLE001 - errors must remain protocol responses
            emit({"ok": False, "error": str(error)})


if __name__ == "__main__":
    main()
