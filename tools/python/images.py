"""Format, metadata and save helpers shared by image-processing workers."""

from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image


def source_mime(image: Image.Image) -> str:
    return {"PNG": "image/png", "WEBP": "image/webp", "JPEG": "image/jpeg", "JPG": "image/jpeg"}.get((image.format or "").upper(), "image/webp")


def source_format(image: Image.Image) -> str:
    return {"PNG": "png", "WEBP": "webp", "JPEG": "jpeg", "JPG": "jpeg"}.get((image.format or "").upper(), "webp")


def output_details(format_name: str) -> tuple[str, str]:
    return {"png": ("image/png", ".png"), "webp": ("image/webp", ".webp"), "jpeg": ("image/jpeg", ".jpg")}[format_name]


def image_metadata(source: Image.Image) -> dict[str, object]:
    metadata: dict[str, object] = {}
    if source.info.get("icc_profile"):
        metadata["icc_profile"] = source.info["icc_profile"]
    if source.info.get("dpi"):
        metadata["dpi"] = source.info["dpi"]
    return metadata


def save_optimized(source_path: Path, output_path: Path, requested_format: str, quality: int, lossless: bool) -> dict[str, object]:
    """Optimize an image and return only stable response fields for the API."""
    with Image.open(source_path) as source:
        width, height = source.size
        source_type = source_format(source)
        target_format = "png" if lossless else requested_format
        if target_format == "original":
            target_format = source_type
        if target_format not in {"png", "webp", "jpeg"}:
            target_format = "webp"

        mime, extension = output_details(target_format)
        metadata = image_metadata(source)
        if target_format == "png":
            source.save(output_path, format="PNG", optimize=True, compress_level=9, **metadata)
        elif target_format == "webp":
            source.save(output_path, format="WEBP", quality=min(95, max(1, quality)), method=6)
        else:
            image = source
            if image.mode not in {"RGB", "L"}:
                if "transparency" in image.info or image.mode in {"RGBA", "LA"}:
                    background = Image.new("RGB", image.size, "white")
                    alpha = image.getchannel("A") if "A" in image.getbands() else None
                    background.paste(image.convert("RGBA"), mask=alpha)
                    image = background
                else:
                    image = image.convert("RGB")
            image.save(output_path, format="JPEG", quality=min(95, max(1, quality)), optimize=True, progressive=True, **metadata)

        if lossless and target_format == source_type and output_path.stat().st_size >= source_path.stat().st_size:
            shutil.copyfile(source_path, output_path)
            mime = source_mime(source)
            extension = ".jpg" if mime == "image/jpeg" else f".{source_type}"

        return {"mime": mime, "extension": extension, "width": width, "height": height, "lossless": lossless or target_format == "png"}
