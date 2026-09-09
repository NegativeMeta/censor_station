"""Anime NSFW model loading and prediction normalization."""

from __future__ import annotations

import contextlib
import sys
from typing import Any

from .config import detector_image_size, model_path


def normalize(value: object) -> str:
    return " ".join(str(value).strip().lower().replace("_", "-").split())


def load_model() -> Any:
    try:
        from ultralytics import YOLO
    except ImportError as error:
        raise RuntimeError("Falta ultralytics. Instala dependencias con: python -m pip install -r requirements.txt") from error
    path = model_path()
    if not path.exists():
        raise RuntimeError(f"No se encontro el modelo anime NSFW en {path}. Descarga nsfw-anime-xl-x1280.pt y colocala en models.")
    with contextlib.redirect_stdout(sys.stderr), contextlib.redirect_stderr(sys.stderr):
        return YOLO(str(path))


def names_for(result: Any) -> dict[int, str]:
    names = result.names or {}
    return names if isinstance(names, dict) else {index: name for index, name in enumerate(names)}


def predict(model: Any, request: dict[str, Any]) -> list[dict[str, object]]:
    image_path = request["imagePath"]
    threshold = max(0.01, min(0.99, float(request.get("threshold", 0.5))))
    requested_classes = {normalize(value) for value in request.get("classes", []) if normalize(value)}
    with contextlib.redirect_stdout(sys.stderr), contextlib.redirect_stderr(sys.stderr):
        predictions = model.predict(source=image_path, conf=threshold, iou=0.45, imgsz=detector_image_size(), retina_masks=True, verbose=False)

    detections: list[dict[str, object]] = []
    for result in predictions:
        if result.boxes is None or result.masks is None:
            continue
        names = names_for(result)
        boxes = result.boxes.xyxy.cpu().tolist()
        scores = result.boxes.conf.cpu().tolist()
        class_ids = result.boxes.cls.cpu().tolist()
        polygons = result.masks.xy
        for index, (box, score, class_id) in enumerate(zip(boxes, scores, class_ids)):
            class_name = str(names.get(int(class_id), f"clase-{int(class_id)}"))
            if (requested_classes and normalize(class_name) not in requested_classes) or index >= len(polygons):
                continue
            x1, y1, x2, y2 = box
            polygon = [[max(0, int(round(point[0]))), max(0, int(round(point[1])))] for point in polygons[index].tolist()]
            if len(polygon) >= 3:
                detections.append({"class": class_name, "score": float(score), "box": [max(0, int(round(x1))), max(0, int(round(y1))), max(1, int(round(x2 - x1))), max(1, int(round(y2 - y1)))], "polygon": polygon})
    return detections
