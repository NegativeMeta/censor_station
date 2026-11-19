"""Track a censorship layer between two animation frames.

Hybrid CPU tracker. Candidate motion fields:

- ``affine``: sparse Lucas-Kanade with RANSAC partial affine, ECC fallback.
- ``dense``: DIS optical flow (Farneback fallback), heavily smoothed.
- ``hybrid``: affine plus the dense residual on the aligned pair, which keeps
  the global camera motion exact while still following non-rigid movement.
- ``anchor-*``: the same pipeline measured from an optional anchor frame, used
  to recover drift accumulated over long chains. ``anchor-guided`` fits a
  similarity from the anchor outline to the chained hint before refining, and
  ``anchor-snap`` fits the anchor outline to strong edges in the target frame.

Every candidate is scored by warping its source frame (and the source mask)
into the target frame, then measuring masked normalized cross correlation.
The score is compared against the identity baseline, so a candidate that
explains real motion beats a mask that merely sits on static background.

Everything runs on CPU: no OpenCL, CUDA or detector inference is used here.
"""

from __future__ import annotations

import copy
import math

import cv2
import numpy as np

from .protocol import serve

WORK_WIDTH = 720           # sparse/ECC matching resolution
DENSE_WIDTH = 320          # DIS resolution before upsampling
POLYGON_SAMPLES = 96       # outline points rebuilt after deformation
CONFIDENCE_GATE = 0.45     # accumulated confidence required to keep tracking
NCC_GATE = 0.5             # minimum masked correlation for a usable frame
MASK_RATIO_MIN = 0.35      # reject candidates that collapse the mask
IDENTITY_PRIOR = 0.02      # small preference for not moving when tied


class Frame:
    """A grayscale frame at full and working resolution."""

    def __init__(self, path):
        image = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
        if image is None:
            raise ValueError("No se pudo leer un frame para el tracking.")
        self.full = image
        self.height, self.width = image.shape
        self.scale = min(1.0, WORK_WIDTH / max(self.width, self.height))
        if self.scale < 1.0:
            self.small = cv2.resize(
                image,
                (max(8, round(self.width * self.scale)), max(8, round(self.height * self.scale))),
                interpolation=cv2.INTER_AREA,
            )
        else:
            self.small = image.copy()


def rasterize(layer, width, height):
    """Rasterize a layer's polygon and brush dabs into a uint8 mask."""
    mask = np.zeros((height, width), np.uint8)
    polygon = np.asarray(layer.get("polygon") or [], dtype=np.float32)
    if not layer.get("manualBlank") and len(polygon) >= 3:
        cv2.fillPoly(mask, [np.round(polygon).astype(np.int32)], 255)
    for edit in layer.get("brushEdits") or []:
        cv2.circle(mask, (int(round(edit["x"])), int(round(edit["y"]))),
                   max(1, int(round(edit.get("radius", 1)))),
                   0 if edit.get("mode") == "erase" else 255, -1)
    return mask


def resample_ring(points, count):
    """Distribute points uniformly along a closed polygon by arc length."""
    ring = np.asarray(points, dtype=np.float32)
    if len(ring) < 2:
        return ring.reshape(-1, 2)
    closed = np.vstack([ring, ring[:1]])
    lengths = np.linalg.norm(np.diff(closed, axis=0), axis=1)
    total = float(lengths.sum())
    if total <= 1e-6:
        return np.repeat(ring[:1], count, axis=0)
    cumulative = np.concatenate([[0.0], np.cumsum(lengths)])
    targets = np.linspace(0.0, total, count, endpoint=False)
    result = np.empty((count, 2), np.float32)
    for index, distance in enumerate(targets):
        segment = int(np.searchsorted(cumulative, distance, side="right") - 1)
        segment = min(max(segment, 0), len(lengths) - 1)
        span = lengths[segment] or 1.0
        ratio = (distance - cumulative[segment]) / span
        result[index] = closed[segment] + (closed[segment + 1] - closed[segment]) * ratio
    return result


def sample_flow(flow, points):
    """Bilinearly sample a dense displacement field at fractional points."""
    height, width = flow.shape[:2]
    points = np.asarray(points, dtype=np.float32).reshape(-1, 2)
    xs = np.clip(points[:, 0], 0, width - 1.001)
    ys = np.clip(points[:, 1], 0, height - 1.001)
    x0 = np.floor(xs).astype(np.int32)
    y0 = np.floor(ys).astype(np.int32)
    x1 = np.minimum(x0 + 1, width - 1)
    y1 = np.minimum(y0 + 1, height - 1)
    fx = (xs - x0)[:, None]
    fy = (ys - y0)[:, None]
    top = flow[y0, x0] * (1 - fx) + flow[y0, x1] * fx
    bottom = flow[y1, x0] * (1 - fx) + flow[y1, x1] * fx
    return top * (1 - fy) + bottom * fy


def warp(image, field, border=cv2.BORDER_REPLICATE, border_value=0):
    """Warp an image or mask into the target frame of a forward flow field."""
    height, width = image.shape[:2]
    grid_x, grid_y = np.meshgrid(np.arange(width, dtype=np.float32),
                                 np.arange(height, dtype=np.float32))
    return cv2.remap(image, grid_x - field[..., 0], grid_y - field[..., 1],
                     cv2.INTER_LINEAR, borderMode=border, borderValue=border_value)


def compose_fields(base, residual):
    """Compose base motion with a residual measured in base-aligned coords."""
    height, width = base.shape[:2]
    grid_x, grid_y = np.meshgrid(np.arange(width, dtype=np.float32),
                                 np.arange(height, dtype=np.float32))
    shifted = np.stack([grid_x + base[..., 0], grid_y + base[..., 1]], axis=-1)
    sampled = sample_flow(residual, shifted).reshape(height, width, 2)
    return (base + sampled).astype(np.float32)


def normalized_correlation(a, b, region):
    """Masked, zero-mean normalized cross correlation."""
    values = region.astype(bool)
    if int(values.sum()) < 64:
        return -1.0
    left = a[values].astype(np.float32)
    right = b[values].astype(np.float32)
    left -= left.mean()
    right -= right.mean()
    denominator = float(np.sqrt((left * left).sum() * (right * right).sum()))
    if denominator <= 1e-6:
        flat_left = float(np.abs(left).max()) < 1e-3
        flat_right = float(np.abs(right).max()) < 1e-3
        return 1.0 if flat_left and flat_right else 0.0
    return float((left * right).sum() / denominator)


def dense_flow(source, target):
    """DIS optical flow at reduced resolution, upsampled with scaled vectors."""
    ratio = min(1.0, DENSE_WIDTH / max(source.shape[1], source.shape[0]))
    size = (max(8, round(source.shape[1] * ratio)), max(8, round(source.shape[0] * ratio)))
    left = cv2.resize(source, size, interpolation=cv2.INTER_AREA)
    right = cv2.resize(target, size, interpolation=cv2.INTER_AREA)
    try:
        flow = cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM).calc(left, right, None)
    except Exception:  # noqa: BLE001 - DIS can be absent in some builds
        flow = cv2.calcOpticalFlowFarneback(left, right, None, 0.5, 3, 15, 3, 5, 1.1, 0)
    flow = cv2.GaussianBlur(flow, (7, 7), 0)
    flow = cv2.resize(flow, (source.shape[1], source.shape[0]), interpolation=cv2.INTER_LINEAR)
    return (flow / ratio).astype(np.float32)


def sample_scalar(image, points):
    """Bilinearly sample a single-channel image at fractional positions."""
    height, width = image.shape[:2]
    points = np.asarray(points, dtype=np.float32).reshape(-1, 2)
    xs = np.clip(points[:, 0], 0, width - 1.001)
    ys = np.clip(points[:, 1], 0, height - 1.001)
    x0 = np.floor(xs).astype(np.int32)
    y0 = np.floor(ys).astype(np.int32)
    x1 = np.minimum(x0 + 1, width - 1)
    y1 = np.minimum(y0 + 1, height - 1)
    fx, fy = xs - x0, ys - y0
    top = image[y0, x0] * (1 - fx) + image[y0, x1] * fx
    bottom = image[y1, x0] * (1 - fx) + image[y1, x1] * fx
    return top * (1 - fy) + bottom * fy


def edge_similarity(image, ring, radius=8, min_edge=45.0):
    """Fit a similarity that moves an outline onto strong image edges.

    Each outline point searches along its normal for the strongest gradient.
    RANSAC then keeps the dominant transform, so background lines caught by a
    minority of points cannot drag the whole mask.
    """
    smooth = cv2.GaussianBlur(image, (3, 3), 0)
    gx = cv2.Sobel(smooth, cv2.CV_32F, 1, 0, ksize=3)
    gy = cv2.Sobel(smooth, cv2.CV_32F, 0, 1, ksize=3)
    edges = cv2.magnitude(gx, gy)
    count = len(ring)
    if count < 8:
        return None, 0.0
    tangent = np.roll(ring, -1, axis=0) - np.roll(ring, 1, axis=0)
    length = np.linalg.norm(tangent, axis=1, keepdims=True)
    tangent = tangent / np.maximum(length, 1e-6)
    normal = np.stack([-tangent[:, 1], tangent[:, 0]], axis=1)
    offsets = np.arange(-radius, radius + 1, dtype=np.float32)
    probes = ring[:, None, :] + normal[:, None, :] * offsets[None, :, None]
    values = sample_scalar(edges, probes.reshape(-1, 2)).reshape(count, len(offsets))
    best_index = np.argmax(values, axis=1)
    best = offsets[best_index]
    strength = values[np.arange(count), best_index]
    valid = strength > min_edge
    if int(valid.sum()) < 16:
        return None, float(valid.mean())
    targets = ring + normal * best[:, None]
    matrix, _ = cv2.estimateAffinePartial2D(ring[valid], targets[valid], method=cv2.RANSAC,
                                            ransacReprojThreshold=3.0, maxIters=3000, confidence=0.999)
    return matrix, float(valid.mean())


def field_from_matrix(frame: Frame, matrix):
    """Convert a work-resolution 2x3 affine into a full-resolution field."""
    work = np.eye(3, dtype=np.float64)
    work[:2] = np.asarray(matrix, dtype=np.float64)[:2]
    scale = frame.scale
    full = np.diag([1.0 / scale, 1.0 / scale, 1.0]) @ work @ np.diag([scale, scale, 1.0])
    height, width = frame.height, frame.width
    grid_x, grid_y = np.meshgrid(np.arange(width, dtype=np.float32),
                                 np.arange(height, dtype=np.float32))
    mapped_x = full[0, 0] * grid_x + full[0, 1] * grid_y + full[0, 2]
    mapped_y = full[1, 0] * grid_x + full[1, 1] * grid_y + full[1, 2]
    return np.stack([mapped_x - grid_x, mapped_y - grid_y], axis=-1).astype(np.float32)


def affine_matrix(source: Frame, target: Frame, mask):
    """Estimate a partial affine with LK+RANSAC, falling back to ECC."""
    options = dict(maxCorners=400, qualityLevel=0.01, minDistance=4, blockSize=5)
    points = cv2.goodFeaturesToTrack(source.small, mask=mask, **options)
    if points is None or len(points) < 8:
        spread = cv2.dilate(mask, np.ones((25, 25), np.uint8))
        points = cv2.goodFeaturesToTrack(source.small, mask=spread, **options)
    if points is None or len(points) < 8:
        points = cv2.goodFeaturesToTrack(source.small, **options)
    if points is not None and len(points) >= 8:
        settings = dict(winSize=(21, 21), maxLevel=3,
                        criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 30, 0.01))
        moved, status, _ = cv2.calcOpticalFlowPyrLK(source.small, target.small, points, None, **settings)
        if moved is not None:
            returned, reverse, _ = cv2.calcOpticalFlowPyrLK(target.small, source.small, moved, None, **settings)
            if returned is not None:
                good = (status.ravel() == 1) & (reverse.ravel() == 1)
                good &= np.linalg.norm(points[:, 0] - returned[:, 0], axis=1) < 1.5
                if good.sum() >= 8:
                    matrix, inliers = cv2.estimateAffinePartial2D(
                        points[good, 0], moved[good, 0], method=cv2.RANSAC, ransacReprojThreshold=2)
                    if matrix is not None and inliers is not None and inliers.sum() >= 8:
                        scale = math.hypot(matrix[0, 0], matrix[1, 0])
                        angle = abs(math.atan2(matrix[1, 0], matrix[0, 0]))
                        if 0.4 <= scale <= 2.5 and angle <= math.radians(45):
                            return matrix
    # Texture-poor area: align the whole frame with ECC instead.
    start = np.eye(2, 3, dtype=np.float32)
    try:
        _, warp_matrix = cv2.findTransformECC(
            source.small, target.small, start, cv2.MOTION_EUCLIDEAN,
            (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 80, 1e-5), None, 5)
    except cv2.error:
        return None
    scale = math.hypot(warp_matrix[0, 0], warp_matrix[1, 0])
    determinant = warp_matrix[0, 0] * warp_matrix[1, 1] - warp_matrix[0, 1] * warp_matrix[1, 0]
    if not 0.4 <= scale <= 2.5 or abs(determinant) < 1e-6:
        return None
    return warp_matrix


def identity_correlation(source: Frame, target: Frame, mask_small):
    """Baseline NCC of the untouched source region against the target."""
    region = cv2.dilate(mask_small, np.ones((25, 25), np.uint8)) > 0
    return normalized_correlation(source.small, target.small, region)


def evaluate(source: Frame, target: Frame, field_work, mask_small, baseline, prior):
    """Score a candidate field by masked correlation after warping."""
    warped = warp(source.small, field_work, cv2.BORDER_REPLICATE)
    warped_mask = warp(mask_small, field_work, cv2.BORDER_CONSTANT, 0)
    region = warped_mask > 127
    area = int(region.sum())
    original = int((mask_small > 127).sum())
    if area < 64 or area < original * MASK_RATIO_MIN:
        return None
    region = cv2.dilate(region.astype(np.uint8), np.ones((25, 25), np.uint8)) > 0
    correlation = normalized_correlation(warped, target.small, region)
    if correlation <= -1.0:
        return None
    improvement = max(0.0, correlation - baseline)
    score = 0.6 * max(0.0, correlation) + 0.4 * improvement + prior
    return float(min(1.0, max(0.0, score))), float(correlation)


def local_radius_scale(field, centers, radii):
    """Estimate how much a brush dab grew or shrank at its own position."""
    zeros = np.zeros_like(radii)
    offsets = np.stack([
        centers + np.stack([radii, zeros], axis=1),
        centers - np.stack([radii, zeros], axis=1),
        centers + np.stack([zeros, radii], axis=1),
        centers - np.stack([zeros, radii], axis=1),
    ])
    moved = offsets + sample_flow(field, offsets.reshape(-1, 2)).reshape(offsets.shape)
    span = np.maximum(radii, 1e-3) * 2
    horizontal = np.linalg.norm(moved[0] - moved[1], axis=1) / span
    vertical = np.linalg.norm(moved[2] - moved[3], axis=1) / span
    return np.clip((horizontal + vertical) / 2, 0.6, 1.6)


def ring_similarity(source_layer, hint_layer, count=64):
    """Best partial affine between two outlines, invariant to point order.

    The hint outline may be shifted relative to the source, so every cyclic
    correspondence is scored with RANSAC and the lowest reprojection error wins.
    """
    source = source_layer.get("polygon") or []
    hint = hint_layer.get("polygon") or []
    if len(source) < 3 or len(hint) < 3:
        return None
    a = resample_ring(np.asarray(source, np.float32), count)
    b = resample_ring(np.asarray(hint, np.float32), count)
    best = None
    for shift in range(count):
        rolled = np.roll(b, shift, axis=0)
        matrix, _ = cv2.estimateAffinePartial2D(a, rolled, method=cv2.RANSAC, ransacReprojThreshold=3)
        if matrix is None:
            continue
        predicted = (matrix[:, :2] @ a.T).T + matrix[:, 2]
        error = float(np.mean(np.linalg.norm(predicted - rolled, axis=1)))
        if best is None or error < best[0]:
            best = (error, matrix)
    return best[1] if best else None


def apply_field(layer, field):
    """Deform polygon and brush dabs with a dense displacement field."""
    updated = copy.deepcopy(layer)
    polygon = updated.get("polygon") or []
    if len(polygon) >= 3 and not updated.get("manualBlank"):
        ring = resample_ring(np.asarray(polygon, np.float32), POLYGON_SAMPLES)
        moved = ring + sample_flow(field, ring)
        kept = [moved[0]]
        for point in moved[1:]:
            if float(np.linalg.norm(point - kept[-1])) > 0.75:
                kept.append(point)
        updated["polygon"] = [[float(x), float(y)] for x, y in kept]
    edits = updated.get("brushEdits") or []
    if edits:
        centers = np.asarray([[edit["x"], edit["y"]] for edit in edits], np.float32)
        radii = np.asarray([max(1.0, float(edit.get("radius", 1))) for edit in edits], np.float32)
        moved = centers + sample_flow(field, centers)
        scale = local_radius_scale(field, centers, radii)
        updated["brushEdits"] = [
            {**edit, "x": float(point[0]), "y": float(point[1]), "radius": float(max(1.0, radius * factor))}
            for edit, point, radius, factor in zip(edits, moved, radii, scale)
        ]
    return updated


def track(request):
    previous = Frame(request["previousPath"])
    following = Frame(request["followingPath"])
    if (previous.height, previous.width) != (following.height, following.width):
        raise ValueError("Tracking requires readable frames of equal size.")

    layer = request["layer"]
    mask_full = rasterize(layer, previous.width, previous.height)
    if not np.any(mask_full):
        raise ValueError("Paint a nonempty censorship area before propagating.")
    if request.get("method") == "fixed":
        return {"tracked": True, "layer": copy.deepcopy(layer), "hintLayer": copy.deepcopy(layer),
                "confidence": 1.0, "mode": "fixed"}

    mask_small = cv2.resize(mask_full, (previous.small.shape[1], previous.small.shape[0]),
                            interpolation=cv2.INTER_NEAREST)
    baseline = identity_correlation(previous, following, mask_small)

    candidates = []
    affine = affine_matrix(previous, following, mask_small)
    if affine is not None:
        base = field_from_matrix(previous, affine)
        candidates.append(("affine", previous, base, mask_small, baseline, 0.05))
        aligned = warp(previous.full, base)
        residual = dense_flow(aligned, following.full)
        candidates.append(("hybrid", previous, compose_fields(base, residual), mask_small, baseline, 0.10))
    candidates.append(("dense", previous, dense_flow(previous.full, following.full),
                       mask_small, baseline, 0.0))

    anchor_layer = request.get("anchorLayer")
    anchor_path = request.get("anchorPath")
    if anchor_path and anchor_layer:
        anchor = Frame(anchor_path)
        if (anchor.height, anchor.width) == (previous.height, previous.width):
            anchor_mask_full = rasterize(anchor_layer, anchor.width, anchor.height)
            if np.any(anchor_mask_full):
                anchor_mask_small = cv2.resize(
                    anchor_mask_full, (anchor.small.shape[1], anchor.small.shape[0]),
                    interpolation=cv2.INTER_NEAREST)
                anchor_baseline = identity_correlation(anchor, following, anchor_mask_small)
                anchor_affine = affine_matrix(anchor, following, anchor_mask_small)
                if anchor_affine is not None:
                    anchor_base = field_from_matrix(anchor, anchor_affine)
                    aligned = warp(anchor.full, anchor_base)
                    residual = dense_flow(aligned, following.full)
                    candidates.append(("anchor-hybrid", anchor, compose_fields(anchor_base, residual),
                                       anchor_mask_small, anchor_baseline, 0.08))
                    candidates.append(("anchor-affine", anchor, anchor_base,
                                       anchor_mask_small, anchor_baseline, 0.03))
                candidates.append(("anchor-dense", anchor, dense_flow(anchor.full, following.full),
                                   anchor_mask_small, anchor_baseline, 0.0))

                # Geometric hint: the chained outline tells us where the anchor
                # region should be, then the dense residual refines it. This
                # recovers scale/rotation drift without trusting cross-frame
                # photometry.
                hint_layer = request.get("hintLayer") or layer
                similarity = ring_similarity(anchor_layer, hint_layer)
                if similarity is not None:
                    guided_base = field_from_matrix(anchor, similarity)
                    guided_residual = dense_flow(warp(anchor.full, guided_base), following.full)
                    candidates.append(("anchor-guided", anchor,
                                       compose_fields(guided_base, guided_residual),
                                       anchor_mask_small, anchor_baseline, 0.07))
                    candidates.append(("anchor-similarity", anchor, guided_base,
                                       anchor_mask_small, anchor_baseline, 0.04))

                # Absolute snap: fit the anchor outline to strong edges in the
                # target frame. It never accumulates drift because it starts
                # from the anchor on every call.
                seed_ring = resample_ring(np.asarray(anchor_layer.get("polygon") or [], np.float32),
                                          POLYGON_SAMPLES)
                if len(seed_ring) >= 8:
                    snap_matrix, snap_support = edge_similarity(following.full, seed_ring)
                    if snap_matrix is not None and snap_support >= 0.5:
                        snap_base = field_from_matrix(anchor, snap_matrix)
                        snap_residual = dense_flow(warp(anchor.full, snap_base), following.full)
                        candidates.append(("anchor-snap", anchor,
                                           compose_fields(snap_base, snap_residual),
                                           anchor_mask_small, anchor_baseline, 0.05))

    # Identity is always a candidate: if nothing moved, keeping the layer is right.
    candidates.append(("identity", previous, np.zeros((previous.height, previous.width, 2), np.float32),
                       mask_small, baseline, IDENTITY_PRIOR))

    best = None
    for name, source, field_full, source_mask, source_baseline, prior in candidates:
        field_work = cv2.resize(field_full, (source.small.shape[1], source.small.shape[0]),
                                interpolation=cv2.INTER_AREA) * source.scale
        scored = evaluate(source, following, field_work, source_mask, source_baseline, prior)
        if scored is None:
            continue
        score, correlation = scored
        if best is None or score > best[0]:
            best = (score, correlation, name, source, field_full)

    if best is None:
        return {"tracked": False, "reason": "photometric", "score": 0.0}

    score, correlation, name, source, field = best
    prior_confidence = float(request.get("confidence", 1.0) or 1.0)
    confidence = 0.7 * max(0.0, min(1.0, prior_confidence)) + 0.3 * max(0.0, correlation)
    if correlation < NCC_GATE or confidence < CONFIDENCE_GATE:
        return {"tracked": False, "reason": "photometric", "score": round(score, 3),
                "correlation": round(correlation, 3), "mode": name}

    # Always deform the layer the winning candidate was measured from, so an
    # anchor win resets accumulated drift instead of compounding it.
    source_layer = anchor_layer if name.startswith("anchor-") else layer
    updated = apply_field(source_layer, field)

    # The hint chain stays independent from the reported layer: feeding an
    # anchor-corrected outline back as the hint makes the similarity collapse.
    chain_field = None
    for candidate_name, _, candidate_field, *_ in candidates:
        if candidate_name == "hybrid":
            chain_field = candidate_field
            break
    if chain_field is None:
        for candidate_name, _, candidate_field, *_ in candidates:
            if candidate_name in ("affine", "dense"):
                chain_field = candidate_field
                break
    hint_layer = apply_field(layer, chain_field) if chain_field is not None else copy.deepcopy(updated)

    return {
        "tracked": True,
        "layer": updated,
        "hintLayer": hint_layer,
        "confidence": round(float(confidence), 4),
        "score": round(score, 4),
        "correlation": round(correlation, 4),
        "mode": name,
    }


if __name__ == "__main__":
    serve(track)