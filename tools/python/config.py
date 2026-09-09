"""Shared paths and tunable defaults for the local Python workers."""

from __future__ import annotations

import os
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[2]
MODELS_DIR = PROJECT_ROOT / "models"
DEFAULT_MODEL_PATH = MODELS_DIR / "nsfw-anime-xl-x1280.pt"
DEFAULT_IMAGE_SIZE = 1280


def model_path() -> Path:
    """Return the optional environment override or the bundled model location."""
    return Path(os.environ.get("ANIME_NSFW_MODEL_PATH", DEFAULT_MODEL_PATH))


def detector_image_size() -> int:
    """Return a safe image size for the detector worker."""
    try:
        return max(32, int(os.environ.get("ANIME_NSFW_IMAGE_SIZE", DEFAULT_IMAGE_SIZE)))
    except ValueError:
        return DEFAULT_IMAGE_SIZE
