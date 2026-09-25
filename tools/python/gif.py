"""GIF frame extraction and re-assembly.

Desktop path: Pillow is always available (already in requirements.txt).
The ``gifski`` CLI binary (AGPL-3.0+, Rust, https://gif.ski) is used when it
is found in PATH *and* the frame delays are uniform, because the gifski CLI
only supports a single ``--fps`` for the whole animation. Anything else
(variable delays, missing binary, gifski failure) falls back to Pillow,
which supports per-frame durations and therefore preserves timing exactly.
"""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path
from typing import Any

from PIL import Image

MAX_GIF_FRAMES = 300
MIN_DELAY_MS = 10
MAX_DELAY_MS = 10000
GIFSKI_QUALITY_DEFAULT = 90
GIFSKI_TIMEOUT_SECONDS = 180


def _clamp_int(value: Any, low: int, high: int, fallback: int) -> int:
    try:
        number = int(value)
    except (TypeError, ValueError):
        return fallback
    return max(low, min(high, number))


def gifski_binary() -> str | None:
    """Return the gifski executable path when installed, else None."""
    return shutil.which("gifski")


def delays_are_uniform(delays: list[int], tolerance_ms: int = 20) -> bool:
    """Check whether one fps value can represent every frame delay."""
    if not delays:
        return False
    return max(delays) - min(delays) <= tolerance_ms


def extract(request: dict[str, Any]) -> dict[str, object]:
    """Split a GIF into full-canvas PNG frames.

    Expects ``imagePath`` (input GIF) and ``framesDir`` (output directory).
    Pillow's sequential ``seek`` already composites partial-frame patches
    and disposal correctly, so every PNG is a full-canvas RGBA frame.

    ``on_progress`` may be a callable receiving ``(done, total)``; it is
    invoked after each saved frame so long extractions can report progress.
    """
    image_path = Path(request["imagePath"])
    frames_dir = Path(request["framesDir"])
    frames_dir.mkdir(parents=True, exist_ok=True)
    max_frames = _clamp_int(request.get("maxFrames"), 1, MAX_GIF_FRAMES, MAX_GIF_FRAMES)
    on_progress = request.get("on_progress")
    with Image.open(image_path) as source:
        total = getattr(source, "n_frames", 1)
        if total > max_frames:
            raise RuntimeError(f"El GIF tiene {total} frames; el máximo es {max_frames}.")
        width, height = source.size
        loop = int(source.info.get("loop", 0) or 0)
        frames: list[dict[str, object]] = []
        for index in range(total):
            source.seek(index)
            delay = _clamp_int(source.info.get("duration", 100), MIN_DELAY_MS, MAX_DELAY_MS, 100)
            with source.convert("RGBA") as frame:
                name = f"frame-{index:04d}.png"
                frame.save(frames_dir / name, format="PNG")
                frames.append({"index": index, "delay": delay, "file": name, "width": frame.width, "height": frame.height})
            if callable(on_progress):
                on_progress(index + 1, total)
        return {"width": width, "height": height, "loop": max(0, loop), "frameCount": total, "frames": frames}


def _assemble_with_gifski(frame_files: list[Path], delays: list[int], loop: int, quality: int, output_path: Path) -> None:
    binary = gifski_binary()
    if not binary:
        raise RuntimeError("Gifski no está instalado.")
    # GIF delays are quantized to 10 ms. Use the animation's average frame
    # duration so a 24 fps source (40/50 ms encoded delays) stays at 24 fps.
    fps = max(1, min(100, round(1000 * len(delays) / sum(delays))))
    command = [
        binary, "-o", str(output_path),
        "--quality", str(quality),
        "--repeat", str(max(0, loop)),
        "--fps", str(fps),
        "--no-sort",
        *(str(path) for path in frame_files),
    ]
    completed = subprocess.run(command, capture_output=True, text=True, timeout=GIFSKI_TIMEOUT_SECONDS)
    if completed.returncode != 0:
        detail = (completed.stderr or completed.stdout or "").strip()
        raise RuntimeError(f"Gifski falló: {detail or 'código ' + str(completed.returncode)}")


def _assemble_with_pillow(frame_files: list[Path], delays: list[int], loop: int, output_path: Path) -> None:
    frames = [Image.open(path).convert("RGBA") for path in frame_files]
    try:
        frames[0].save(
            output_path, format="GIF", save_all=True, append_images=frames[1:],
            duration=list(delays), loop=max(0, loop), disposal=1,
        )
    finally:
        for frame in frames:
            frame.close()


def assemble(request: dict[str, Any]) -> dict[str, object]:
    """Rebuild a GIF from PNG frame files already placed in ``framesDir``.

    ``request["frames"]`` is a list of ``{index, delay, file}``; files are
    read in index order so timing matches the original animation.
    """
    frames_dir = Path(request["framesDir"])
    output_path = Path(request["outputPath"])
    metas = sorted(request.get("frames", []), key=lambda item: int(item["index"]))
    if not metas:
        raise RuntimeError("Sin frames para ensamblar el GIF.")
    quality = _clamp_int(request.get("quality"), 1, 100, GIFSKI_QUALITY_DEFAULT)
    loop = max(0, _clamp_int(request.get("loop"), 0, 65535, 0))
    frame_files = [frames_dir / str(item["file"]) for item in metas]
    missing = [str(path) for path in frame_files if not path.exists()]
    if missing:
        raise RuntimeError(f"Faltan {len(missing)} frames para ensamblar el GIF.")
    delays = [_clamp_int(item.get("delay"), MIN_DELAY_MS, MAX_DELAY_MS, 100) for item in metas]

    encoder = "pillow"
    if gifski_binary() and delays_are_uniform(delays):
        try:
            _assemble_with_gifski(frame_files, delays, loop, quality, output_path)
            encoder = "gifski"
        except Exception:
            _assemble_with_pillow(frame_files, delays, loop, output_path)
    else:
        _assemble_with_pillow(frame_files, delays, loop, output_path)
    return {"encoder": encoder, "frames": len(frame_files), "loop": loop}


def handle(request: dict[str, Any]) -> dict[str, object]:
    """Dispatch worker requests by action for the JSONL protocol."""
    action = str(request.get("action", ""))
    if action == "extract":
        return extract(request)
    if action == "assemble":
        return assemble(request)
    raise RuntimeError(f"Acción GIF inválida: {action or 'vacía'}.")
