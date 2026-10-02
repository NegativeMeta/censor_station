"""Track a censorship layer between two original animation frames."""

from __future__ import annotations

import copy
import math

import cv2
import numpy as np

from .protocol import serve


def track(request):
    previous = cv2.imread(request["previousPath"], cv2.IMREAD_GRAYSCALE)
    following = cv2.imread(request["followingPath"], cv2.IMREAD_GRAYSCALE)
    if previous is None or following is None or previous.shape != following.shape:
        raise ValueError("Tracking requires readable frames of equal size.")
    layer = copy.deepcopy(request["layer"])
    height, width = previous.shape
    mask = np.zeros_like(previous)
    polygon = np.asarray(layer.get("polygon", []), dtype=np.float32)
    if not layer.get("manualBlank") and len(polygon) >= 3:
        cv2.fillPoly(mask, [np.round(polygon).astype(np.int32)], 255)
    for edit in layer.get("brushEdits", []):
        cv2.circle(mask, (round(edit["x"]), round(edit["y"])), max(1, round(edit["radius"])),
                   0 if edit.get("mode") == "erase" else 255, -1)
    if not np.any(mask):
        raise ValueError("Paint a nonempty censorship area before propagating.")
    if request.get("method") == "fixed":
        return {"tracked": True, "layer": layer, "confidence": 1.0}
    # Include nearby texture; points inside a flat painted area alone may be scarce.
    context = cv2.dilate(mask, np.ones((31, 31), np.uint8))
    features = dict(maxCorners=160, qualityLevel=0.01, minDistance=4, blockSize=5)
    points = cv2.goodFeaturesToTrack(previous, mask=mask, **features)
    if points is None or len(points) < 6:
        points = cv2.goodFeaturesToTrack(previous, mask=context, **features)
    if points is None or len(points) < 6:
        return {"tracked": False, "reason": "texture"}
    settings = dict(winSize=(21, 21), maxLevel=3,
                    criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 30, 0.01))
    moved, status, _ = cv2.calcOpticalFlowPyrLK(previous, following, points, None, **settings)
    if moved is None:
        return {"tracked": False, "reason": "lost"}
    returned, reverse_status, _ = cv2.calcOpticalFlowPyrLK(following, previous, moved, None, **settings)
    if returned is None:
        return {"tracked": False, "reason": "lost"}
    good = (status.ravel() == 1) & (reverse_status.ravel() == 1)
    good &= np.linalg.norm(points[:, 0] - returned[:, 0], axis=1) < 1.5
    if good.sum() < 6 or good.mean() < 0.45:
        return {"tracked": False, "reason": "inconsistent"}
    transform, inliers = cv2.estimateAffinePartial2D(points[good, 0], moved[good, 0],
                                                    method=cv2.RANSAC, ransacReprojThreshold=2)
    if transform is None or inliers is None or inliers.sum() < 6 or inliers.mean() < 0.6:
        return {"tracked": False, "reason": "inconsistent"}
    scale = math.hypot(transform[0, 0], transform[1, 0])
    angle = abs(math.atan2(transform[1, 0], transform[0, 0]))
    displacement = np.linalg.norm(moved[good, 0] - points[good, 0], axis=1)
    if not 0.85 <= scale <= 1.18 or angle > math.radians(20) or np.median(displacement) > max(24, min(width, height) * 0.15):
        return {"tracked": False, "reason": "jump"}
    def point(x, y):
        result = transform @ np.array([x, y, 1.0])
        return [float(result[0]), float(result[1])]
    layer["polygon"] = [point(*p) for p in layer.get("polygon", [])]
    for edit in layer.get("brushEdits", []):
        edit["x"], edit["y"] = point(edit["x"], edit["y"])
        edit["radius"] *= scale
    warped = cv2.warpAffine(mask, transform, (width, height))
    if np.count_nonzero(warped) < np.count_nonzero(mask) * scale * scale * 0.7:
        return {"tracked": False, "reason": "outside"}
    return {"tracked": True, "layer": layer, "confidence": float(good.mean() * inliers.mean())}


if __name__ == "__main__":
    serve(track)
