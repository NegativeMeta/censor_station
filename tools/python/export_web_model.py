"""Export the local detector checkpoint for browser inference.

The generated ONNX file is intentionally not committed. Browser deployments
can host it under ``public/models`` or point the web provider at a versioned
model URL.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from ultralytics import YOLO

from .config import DEFAULT_IMAGE_SIZE, model_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Export the detector checkpoint to ONNX for ONNX Runtime Web.")
    parser.add_argument("--output", type=Path, default=None, help="Optional output directory for the exported model.")
    parser.add_argument("--imgsz", type=int, default=DEFAULT_IMAGE_SIZE, help="Square input size used by the browser model.")
    parser.add_argument("--opset", type=int, default=17, help="ONNX opset version.")
    args = parser.parse_args()

    checkpoint = model_path()
    if not checkpoint.exists():
        raise SystemExit(f"Model not found: {checkpoint}")

    model = YOLO(str(checkpoint))
    exported = model.export(
        format="onnx",
        imgsz=args.imgsz,
        opset=args.opset,
        dynamic=False,
        simplify=True,
        nms=False,
        optimize=False,
        half=False,
        device="cpu",
    )

    exported_path = Path(exported)
    if args.output:
        args.output.mkdir(parents=True, exist_ok=True)
        target = args.output / exported_path.name
        if exported_path.resolve() != target.resolve():
            target.write_bytes(exported_path.read_bytes())
        exported_path = target

    print(f"Exported ONNX model: {exported_path.resolve()}")


if __name__ == "__main__":
    main()
