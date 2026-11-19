"""Benchmark the hybrid tracker against the previous single-affine tracker.

Synthetic animation with a known ground-truth region: global pan/zoom/rotation
plus local breathing and an arm swing. Frames are rendered flat-shaded (anime
like) with a lightly textured background, written to a temp dir, and fed to
both trackers exactly as the app does: chained frame to frame, propagating the
same seed layer.

Reports per-frame mask IoU for both trackers. CPU only: no detector, no CUDA,
no OpenCL, no model weights.

Usage:
    python -m tools.python.bench_tracking [--frames 40] [--size 512] [--json]
"""

from __future__ import annotations

import argparse
import copy
import json
import math
import tempfile
from pathlib import Path

import cv2
import numpy as np

from tools.python.tracking import rasterize, track as hybrid_track

WIDTH = HEIGHT = 512


def legacy_track(previous, following, layer):
    """Frozen copy of the pre-hybrid tracker, kept only for comparison."""
    layer = copy.deepcopy(layer)
    height, width = previous.shape
    mask = np.zeros_like(previous)
    polygon = np.asarray(layer.get("polygon", []), dtype=np.float32)
    if not layer.get("manualBlank") and len(polygon) >= 3:
        cv2.fillPoly(mask, [np.round(polygon).astype(np.int32)], 255)
    for edit in layer.get("brushEdits", []):
        cv2.circle(mask, (round(edit["x"]), round(edit["y"])), max(1, round(edit["radius"])),
                   0 if edit.get("mode") == "erase" else 255, -1)
    if not np.any(mask):
        return None
    context = cv2.dilate(mask, np.ones((31, 31), np.uint8))
    features = dict(maxCorners=160, qualityLevel=0.01, minDistance=4, blockSize=5)
    points = cv2.goodFeaturesToTrack(previous, mask=mask, **features)
    if points is None or len(points) < 6:
        points = cv2.goodFeaturesToTrack(previous, mask=context, **features)
    if points is None or len(points) < 6:
        return None
    settings = dict(winSize=(21, 21), maxLevel=3,
                    criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 30, 0.01))
    moved, status, _ = cv2.calcOpticalFlowPyrLK(previous, following, points, None, **settings)
    if moved is None:
        return None
    returned, reverse_status, _ = cv2.calcOpticalFlowPyrLK(following, previous, moved, None, **settings)
    if returned is None:
        return None
    good = (status.ravel() == 1) & (reverse_status.ravel() == 1)
    good &= np.linalg.norm(points[:, 0] - returned[:, 0], axis=1) < 1.5
    if good.sum() < 6 or good.mean() < 0.45:
        return None
    transform, inliers = cv2.estimateAffinePartial2D(points[good, 0], moved[good, 0],
                                                     method=cv2.RANSAC, ransacReprojThreshold=2)
    if transform is None or inliers is None or inliers.sum() < 6 or inliers.mean() < 0.6:
        return None
    scale = math.hypot(transform[0, 0], transform[1, 0])
    angle = abs(math.atan2(transform[1, 0], transform[0, 0]))
    displacement = np.linalg.norm(moved[good, 0] - points[good, 0], axis=1)
    if not 0.85 <= scale <= 1.18 or angle > math.radians(20) or np.median(displacement) > max(24, min(width, height) * 0.15):
        return None
    def point(x, y):
        result = transform @ np.array([x, y, 1.0])
        return [float(result[0]), float(result[1])]
    layer["polygon"] = [point(*p) for p in layer.get("polygon", [])]
    for edit in layer.get("brushEdits", []):
        edit["x"], edit["y"] = point(edit["x"], edit["y"])
        edit["radius"] *= scale
    warped = cv2.warpAffine(mask, transform, (width, height))
    if np.count_nonzero(warped) < np.count_nonzero(mask) * scale * scale * 0.7:
        return None
    return layer


def background(textured=True):
    rng = np.random.default_rng(4)
    if textured:
        noise = rng.integers(0, 255, (HEIGHT // 8, WIDTH // 8), dtype=np.uint8)
        base = cv2.resize(noise, (WIDTH, HEIGHT), interpolation=cv2.INTER_CUBIC)
        base = cv2.GaussianBlur(base, (9, 9), 0)
        base = (base * 0.45 + 90).astype(np.uint8)
        for x in range(0, WIDTH, 64):
            cv2.line(base, (x, 0), (x, HEIGHT), 200, 2)
        for y in range(0, HEIGHT, 64):
            cv2.line(base, (0, y), (WIDTH, y), 200, 2)
        return base
    gradient = np.tile(np.linspace(120, 150, WIDTH, dtype=np.float32), (HEIGHT, 1))
    return gradient.astype(np.uint8)


def limb(canvas, start, angle, length, radius, value):
    end = (int(start[0] + math.cos(angle) * length), int(start[1] + math.sin(angle) * length))
    cv2.line(canvas, (int(start[0]), int(start[1])), end, value, int(radius * 2), cv2.LINE_AA)
    cv2.circle(canvas, (int(start[0]), int(start[1])), int(radius), value, -1, cv2.LINE_AA)
    cv2.circle(canvas, end, int(radius), value, -1, cv2.LINE_AA)


def render(frame_index, total, flat=True):
    """Return (gray frame, ground-truth mask) for one animation frame."""
    texture = background(textured=not flat)
    canvas = cv2.cvtColor(texture, cv2.COLOR_GRAY2BGR)
    truth = np.zeros((HEIGHT, WIDTH), np.uint8)

    phase = 2 * math.pi * frame_index / total
    # Global camera motion: large pan, zoom and rotation.
    angle = math.radians(7.0) * math.sin(phase)
    scale = 1.0 + 0.05 * math.sin(phase * 0.7)
    offset = np.array([38.0 * math.sin(phase * 1.3), 22.0 * math.cos(phase * 0.9)])

    def place(point):
        x, y = point[0] - WIDTH / 2, point[1] - HEIGHT / 2
        xr = x * math.cos(angle) - y * math.sin(angle)
        yr = x * math.sin(angle) + y * math.cos(angle)
        return (int(round(WIDTH / 2 + xr * scale + offset[0])), int(round(HEIGHT / 2 + yr * scale + offset[1])))

    breathing = 1.0 + 0.11 * math.sin(phase * 1.9)
    sway = 13.0 * math.sin(phase * 2.1)
    hip = place((256, 350))
    shoulder = place((256, 210))
    # Local bend: the upper body leans while the hips stay put.
    shoulder = (shoulder[0] + int(round(sway)), shoulder[1])
    head = place((256, 150))
    axes_torso = (int(78 * scale * breathing), int(105 * scale * breathing))
    axes_hip = (int(74 * scale * breathing), int(64 * scale))

    body_colour = (150, 170, 200) if not flat else (190, 200, 215)
    # The censored region is the torso/hip block; head and arms are context.
    for target, colour in ((canvas, body_colour), (truth, 255)):
        cv2.ellipse(target, hip, axes_hip, math.degrees(angle), 0, 360, colour, -1, cv2.LINE_AA)
        cv2.ellipse(target, shoulder, axes_torso, math.degrees(angle), 0, 360, colour, -1, cv2.LINE_AA)
    cv2.circle(canvas, head, int(38 * scale), body_colour, -1, cv2.LINE_AA)
    arm_angle = math.radians(-70 + 28 * math.sin(phase * 2.3))
    limb(canvas, shoulder, arm_angle, 108 * scale, 22 * scale, body_colour)
    limb(canvas, shoulder, arm_angle + math.radians(180), 92 * scale, 20 * scale, body_colour)

    if not flat:
        rng = np.random.default_rng(11 + frame_index)
        speckle = rng.integers(0, 40, truth.shape, dtype=np.uint8)
        canvas = cv2.add(canvas, cv2.merge([speckle, speckle, speckle]))

    gray = cv2.cvtColor(canvas, cv2.COLOR_BGR2GRAY)
    return gray, truth


def seed_layer(truth):
    """Polygon traced from the exact censored region of frame zero."""
    contours, _ = cv2.findContours(truth, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contour = max(contours, key=cv2.contourArea)
    polygon = cv2.approxPolyDP(contour, 1.5, True).reshape(-1, 2)
    return {"polygon": [[float(x), float(y)] for x, y in polygon],
            "brushEdits": [], "manualBlank": False, "visible": True}


def mask_iou(mask, truth):
    observed = mask > 127
    expected = truth > 127
    union = np.logical_or(observed, expected).sum()
    if not union:
        return 1.0
    return float(np.logical_and(observed, expected).sum() / union)


def run_hybrid(paths, layer, anchors=True):
    current = copy.deepcopy(layer)
    confidences = []
    ious = []
    modes = []
    stopped = None
    for index in range(1, len(paths)):
        result = hybrid_track({
            "previousPath": str(paths[index - 1]),
            "followingPath": str(paths[index]),
            "layer": current,
            "method": "motion",
            "confidence": current.get("trackingConfidence", 1.0),
            "anchorPath": str(paths[0]) if anchors else None,
            "anchorLayer": layer if anchors else None,
        })
        if not result.get("tracked"):
            stopped = index
            break
        current = result["layer"]
        current["trackingConfidence"] = result["confidence"]
        modes.append(result.get("mode"))
        mask = rasterize(current, WIDTH, HEIGHT)
        ious.append(mask_iou(mask, TRUTH[index]))
        confidences.append(result["confidence"])
    return ious, confidences, stopped, modes


def run_identity(layer):
    """Baseline: never move the seed layer."""
    ious = [mask_iou(rasterize(layer, WIDTH, HEIGHT), TRUTH[index]) for index in range(1, len(TRUTH))]
    return ious, None


def run_legacy(paths, layer):
    current = copy.deepcopy(layer)
    ious = []
    stopped = None
    for index in range(1, len(paths)):
        previous = cv2.imread(str(paths[index - 1]), cv2.IMREAD_GRAYSCALE)
        following = cv2.imread(str(paths[index]), cv2.IMREAD_GRAYSCALE)
        result = legacy_track(previous, following, current)
        if result is None:
            stopped = index
            break
        current = result
        mask = rasterize(current, WIDTH, HEIGHT)
        ious.append(mask_iou(mask, TRUTH[index]))
    return ious, stopped


TRUTH = []


def summarize(ious, stopped, total):
    reached = len(ious)
    return {
        "frames_tracked": reached,
        "stopped_at": stopped,
        "mean_iou": round(float(np.mean(ious)), 4) if ious else 0.0,
        "min_iou": round(float(np.min(ious)), 4) if ious else 0.0,
        "frames_below_0_7": int(sum(value < 0.7 for value in ious)),
        "coverage": round(reached / max(1, total - 1), 3),
    }


def main():
    global TRUTH
    parser = argparse.ArgumentParser()
    parser.add_argument("--frames", type=int, default=40)
    parser.add_argument("--flat", action="store_true", help="flat shading, less texture")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    total = max(4, args.frames)
    frames = []
    TRUTH = []
    for index in range(total):
        gray, truth = render(index, total, flat=args.flat)
        frames.append(gray)
        TRUTH.append(truth)

    with tempfile.TemporaryDirectory(prefix="censor-bench-") as directory:
        paths = []
        for index, frame in enumerate(frames):
            path = Path(directory) / f"f{index:03d}.png"
            cv2.imwrite(str(path), frame)
            paths.append(path)
        layer = seed_layer(TRUTH[0])
        hybrid_ious, confidences, hybrid_stopped, modes = run_hybrid(paths, layer)
        legacy_ious, legacy_stopped = run_legacy(paths, layer)
        identity_ious, identity_stopped = run_identity(layer)

    hybrid = summarize(hybrid_ious, hybrid_stopped, total)
    legacy = summarize(legacy_ious, legacy_stopped, total)
    identity = summarize(identity_ious, identity_stopped, total)
    hybrid["mean_confidence"] = round(float(np.mean(confidences)), 3) if confidences else 0.0
    report = {"hybrid": hybrid, "legacy": legacy, "identity": identity,
              "frames": total - 1, "flat": args.flat, "iou_series": [round(v, 3) for v in hybrid_ious],
              "modes": {name: modes.count(name) for name in set(modes)}}

    if args.json:
        print(json.dumps(report, indent=2))
    else:
        print(f"frames propagated: {total - 1}  (flat shading: {args.flat})")
        print(f"{'tracker':10} {'reached':>8} {'stopped':>8} {'mean IoU':>9} {'min IoU':>8} {'<0.70':>6}")
        for name, data in (("hybrid", hybrid), ("legacy", legacy), ("identity", identity)):
            print(f"{name:10} {data['frames_tracked']:>8} {str(data['stopped_at']):>8} "
                  f"{data['mean_iou']:>9.3f} {data['min_iou']:>8.3f} {data['frames_below_0_7']:>6}")
        print(f"hybrid mean confidence: {hybrid['mean_confidence']:.3f}")
        print("hybrid modes: " + ", ".join(f"{name}={count}" for name, count in sorted(report["modes"].items())))
        print("hybrid IoU: " + " ".join(f"{value:.2f}" for value in hybrid_ious))

    improved = (hybrid["mean_iou"] > legacy["mean_iou"] and
                hybrid["mean_iou"] > identity["mean_iou"] and
                hybrid["frames_tracked"] >= legacy["frames_tracked"])
    raise SystemExit(0 if improved else 1)


if __name__ == "__main__":
    main()