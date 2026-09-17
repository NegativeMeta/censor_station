# Censor Station

Local desktop-style web app for reviewing images, detecting sensitive areas, applying censorship, and optimizing files without modifying the originals.

![Censor Station preview](docs/censor-station-preview.png)

## Features

- Automatic and manual censorship.
- Pixelate, blur, black-line, and white-glow modes.
- Image-by-image review before saving.
- Local optimization with PNG, WebP, and JPEG.
- Spanish, English, Japanese, and Chinese interface.

## Requirements

- Node.js 20.19 or newer.
- Python 3.10 or newer for detection and optimization.
- `nsfw-anime-xl-x1280.pt` in `models/` for automatic detection.

## Detection model

Automatic detection uses the `nsfw-anime-xl-x1280.pt` checkpoint published by [01miku on Hugging Face](https://huggingface.co/01miku/anime-nsfw-segm-yolo26). Download the [checkpoint file](https://huggingface.co/01miku/anime-nsfw-segm-yolo26/resolve/main/nsfw-anime-xl-x1280.pt) and place it in the `models/` directory.

Credit: 01miku. The local checkpoint matches the published file by SHA-256. The model card lists an MIT license, while the embedded Ultralytics checkpoint metadata lists AGPL-3.0; review the upstream terms before redistributing the weights.

## Run the desktop version

On Windows:

```powershell
.\start_censor_station.bat
```

Or from a terminal:

```powershell
npm install
npm start
```

Open `http://127.0.0.1:4173` in your browser.

## Web version

The same interface can run as a static web app. The browser detector uses the
ONNX export of the model with WebGPU when available and falls back to WebAssembly.
Image optimization also runs in the browser; when folder writing is unavailable,
multiple optimized files are downloaded as a ZIP.
Folder selection uses the File System Access API when available and a browser
file-list fallback otherwise. Browsers without folder write permissions use ZIP
downloads instead of modifying the originals.

On Windows, you can also double-click `start_censor_station_web.bat`. It installs
dependencies when needed, builds the web version, and keeps the preview server
open at `http://127.0.0.1:4174`.
For local development, export the model into `public/models/`:

```powershell
python -m pip install -r requirements-web-export.txt
python -m tools.python.export_web_model --output public/models
npm run build
```

The ONNX file is intentionally ignored because it is large. The default web
build loads the versioned export from the public [Hugging Face model repository](https://huggingface.co/negativemeta/censor-station-web-model).
You can override it with `VITE_WEB_MODEL_URL` during the Vite build to use a
same-origin copy or another CDN. The desktop version remains available as the
full local fallback for folder-based processing and Python-powered optimization.

To compare the browser-oriented export with the Python checkpoint on the
included test asset:

```powershell
python -m tools.python.validate_web_model
```

## Privacy

Processing runs locally. Original images are never overwritten.
