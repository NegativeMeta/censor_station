"""Compare the Python checkpoint with its browser-oriented ONNX export."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image

from .config import DEFAULT_IMAGE_SIZE, DEFAULT_MODEL_PATH


def letterbox(image: Image.Image, size: int) -> tuple[np.ndarray, float, float, float]:
    width, height = image.size
    scale = min(size / width, size / height)
    draw_width = max(1, round(width * scale))
    draw_height = max(1, round(height * scale))
    pad_x = (size - draw_width) / 2
    pad_y = (size - draw_height) / 2
    canvas = Image.new("RGB", (size, size), (114, 114, 114))
    resized = image.convert("RGB").resize((draw_width, draw_height), Image.Resampling.BILINEAR)
    canvas.paste(resized, (round(pad_x), round(pad_y)))
    array = np.asarray(canvas, dtype=np.float32) / 255.0
    return np.transpose(array, (2, 0, 1))[None, ...], draw_width / width, pad_x, pad_y


def browser_detections(model_path: Path, image_path: Path, threshold: float, size: int) -> list[dict[str, object]]:
    import onnxruntime as ort

    image = Image.open(image_path)
    tensor, scale, pad_x, pad_y = letterbox(image, size)
    session = ort.InferenceSession(str(model_path), providers=["CPUExecutionProvider"])
    rows, _proto = session.run(None, {session.get_inputs()[0].name: tensor})
    names = ["anus", "nipple", "penis", "vagina", "female face", "male face", "pubic hair"]
    results: list[dict[str, object]] = []
    for row in rows[0]:
        score = float(row[4])
        if score < threshold:
            continue
        class_id = int(round(float(row[5])))
        x1, y1, x2, y2 = [float(value) for value in row[:4]]
        results.append({
            "class": names[class_id] if 0 <= class_id < len(names) else f"class-{class_id}",
            "score": round(score, 6),
            "box": [
                round(max(0, (x1 - pad_x) / scale)),
                round(max(0, (y1 - pad_y) / scale)),
                round(max(1, (x2 - x1) / scale)),
                round(max(1, (y2 - y1) / scale)),
            ],
        })
    return results


def python_detections(model_path: Path, image_path: Path, threshold: float, size: int) -> list[dict[str, object]]:
    from ultralytics import YOLO

    model = YOLO(str(model_path))
    predictions = model.predict(source=str(image_path), conf=threshold, iou=0.45, imgsz=size, retina_masks=True, verbose=False)
    results: list[dict[str, object]] = []
    for result in predictions:
        names = result.names or {}
        if result.boxes is None:
            continue
        for box, score, class_id in zip(result.boxes.xyxy.cpu().tolist(), result.boxes.conf.cpu().tolist(), result.boxes.cls.cpu().tolist()):
            x1, y1, x2, y2 = box
            results.append({
                "class": str(names.get(int(class_id), f"class-{int(class_id)}")),
                "score": round(float(score), 6),
                "box": [round(x1), round(y1), round(x2 - x1), round(y2 - y1)],
            })
    return results


def main() -> None:
    parser = argparse.ArgumentParser(description="Compare Python and ONNX detector outputs on one image.")
    parser.add_argument("--image", type=Path, default=Path("public/assets/queue-catgirl-upper.png"))
    parser.add_argument("--model", type=Path, default=DEFAULT_MODEL_PATH)
    parser.add_argument("--onnx", type=Path, default=Path("public/models/nsfw-anime-xl-x1280.onnx"))
    parser.add_argument("--threshold", type=float, default=0.35)
    parser.add_argument("--imgsz", type=int, default=DEFAULT_IMAGE_SIZE)
    args = parser.parse_args()
    if not args.image.exists(): raise SystemExit(f"Image not found: {args.image}")
    if not args.model.exists(): raise SystemExit(f"Checkpoint not found: {args.model}")
    if not args.onnx.exists(): raise SystemExit(f"ONNX model not found: {args.onnx}. Export it first.")
    result = {
        "image": str(args.image),
        "threshold": args.threshold,
        "python": python_detections(args.model, args.image, args.threshold, args.imgsz),
        "onnx": browser_detections(args.onnx, args.image, args.threshold, args.imgsz),
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
