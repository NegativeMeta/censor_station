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

## Run

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

## Privacy

Processing runs locally. Original images are never overwritten.
