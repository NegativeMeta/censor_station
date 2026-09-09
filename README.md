# Censor Station

Aplicación local para revisar imágenes, detectar zonas sensibles, aplicar censura y optimizar archivos sin modificar los originales.

## Funciones

- Censura automática y manual.
- Modos pixelate, blur, líneas negras y white glow.
- Revisión imagen por imagen antes de guardar.
- Optimización local con PNG, WebP y JPEG.
- Interfaz en español, inglés, japonés y chino.

## Requisitos

- Node.js 20.19 o superior.
- Python 3.10 o superior para detección y optimización.
- Modelo `nsfw-anime-xl-x1280.pt` en `models/` para detección automática.

## Inicio

En Windows:

```powershell
.\iniciar_autocensor.bat
```

O desde una terminal:

```powershell
npm install
npm start
```

La aplicación se ejecuta localmente en `http://127.0.0.1:4173`.

## Privacidad

El procesamiento se realiza localmente. Los originales no se sobrescriben.
