# Okayu blinking mascot

Both PNG frames were edited with the built-in image generator and transparent background enabled.
Source: user-provided `okayu_embarrased.png`.
Outputs: `queue-okayu-open.png`, `queue-okayu-blink.png`.
The app alternates them with a 150 ms blink every five seconds, respecting reduced-motion preferences.

## Background removal prompt

Use case: background-extraction. Edit the provided image only by removing its white background to genuine alpha transparency. Preserve the original illustration exactly: same 1024x1024 square canvas, same position and scale, identical open eyes and pupils, hair, blush, mouth, hand, clothes, lavender cat ears and tail, cyan/magenta outline, all floating pixel hearts and sparkles. White areas INSIDE the illustration (hair highlights, whites of eyes, inner ears) must remain opaque. Remove only the external white background including gaps between floating decorations and the character. Do not redraw, restyle, recolor, move, crop, zoom or add details. Actual transparent alpha, no checkerboard, no white matte or black matte. Keep original crisp illustration edges and colors. This is frame 1 of an animation, registration must be unchanged.

## Blink frame prompt

Use case: precise-object-edit. Make an eye-blink animation frame from this exact transparent illustration. Change ONLY the two open eyes to fully closed eyelids with cute clean dark lash lines, as during a brief blink. Preserve the embarrassed surprised expression, blush, open mouth, fingers, eyebrows, bangs, clothes, ears, tail, hearts and sparkles. Everything outside the interior eye areas must remain exactly unchanged. Keep identical canvas dimensions, subject size, position, crop, outlines, highlights and colors. No moving, scaling, restyling, extra gestures, or eye-area ornamentation. Genuine alpha transparency, preserve existing alpha edges. This is frame 2 for an animation with the input as frame 1, so exact registration is essential. The closed eyelids should sit naturally in the same original eye sockets, skin-colored inside the former eye shapes, matching nearby face shading.
