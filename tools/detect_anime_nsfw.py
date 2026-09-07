"""Worker local persistente para segmentar zonas NSFW en ilustraciones anime.

Lee solicitudes JSONL por stdin y devuelve cajas, polígonos y confianza por
stdout. El modelo se carga una sola vez mientras el servidor sigue abierto.
"""

import contextlib
import json
import os
import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MODEL = PROJECT_ROOT / "models" / "nsfw-anime-xl-x1280.pt"
DEFAULT_IMAGE_SIZE = 1280


def emit(payload):
    print(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), flush=True)


def normalize(value):
    return " ".join(str(value).strip().lower().replace("_", "-").split())


def load_model():
    try:
        from ultralytics import YOLO
    except ImportError as exc:
        raise RuntimeError(
            "Falta ultralytics. Instala dependencias con: "
            "python -m pip install -r requirements.txt"
        ) from exc

    model_path = Path(os.environ.get("ANIME_NSFW_MODEL_PATH", DEFAULT_MODEL))
    if not model_path.exists():
        raise RuntimeError(
            f"No se encontro el modelo anime NSFW en {model_path}. "
            "Descarga nsfw-anime-xl-x1280.pt y colocala en models."
        )

    with contextlib.redirect_stdout(sys.stderr), contextlib.redirect_stderr(sys.stderr):
        model = YOLO(str(model_path))
    return model


def names_for(result):
    names = result.names or {}
    return names if isinstance(names, dict) else {index: name for index, name in enumerate(names)}


def predict(model, request):
    image_path = request["imagePath"]
    threshold = max(0.01, min(0.99, float(request.get("threshold", 0.5))))
    requested_classes = {
        normalize(value)
        for value in request.get("classes", [])
        if normalize(value)
    }

    with contextlib.redirect_stdout(sys.stderr), contextlib.redirect_stderr(sys.stderr):
        predictions = model.predict(
            source=image_path,
            conf=threshold,
            iou=0.45,
            imgsz=int(os.environ.get("ANIME_NSFW_IMAGE_SIZE", DEFAULT_IMAGE_SIZE)),
            retina_masks=True,
            verbose=False,
        )

    detections = []
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
            if requested_classes and normalize(class_name) not in requested_classes:
                continue
            if index >= len(polygons):
                continue

            x1, y1, x2, y2 = box
            polygon = [
                [max(0, int(round(point[0]))), max(0, int(round(point[1])))]
                for point in polygons[index].tolist()
            ]
            if len(polygon) < 3:
                continue

            detections.append({
                "class": class_name,
                "score": float(score),
                "box": [
                    max(0, int(round(x1))),
                    max(0, int(round(y1))),
                    max(1, int(round(x2 - x1))),
                    max(1, int(round(y2 - y1))),
                ],
                "polygon": polygon,
            })
    return detections


def main():
    try:
        model = load_model()
    except Exception as exc:
        emit({"ok": False, "error": str(exc)})
        return 1

    for line in sys.stdin:
        line = line.lstrip("\ufeff")
        if not line.strip():
            continue
        try:
            emit({"ok": True, "detections": predict(model, json.loads(line))})
        except Exception as exc:
            emit({"ok": False, "error": str(exc)})
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
