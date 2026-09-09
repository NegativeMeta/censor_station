# Censor Station

Aplicación local para revisar una carpeta de imágenes, detectar zonas sensibles, ajustar la censura y guardar cada imagen únicamente después de aprobarla.

## Qué incluye

- Selección de una carpeta de entrada y, opcionalmente, una carpeta de salida.
- Cola visual con estado por imagen: pendiente, detectada, aprobada o saltada.
- Detección automática local mediante YOLO26-seg XL especializado en zonas NSFW de ilustraciones anime.
- Detecciones editables: arrastrar, redimensionar desde las esquinas, eliminar o añadir zonas manualmente.
- Cuatro estilos: píxeles, desenfoque, barra negra y barra blanca.
- Umbral, intensidad y margen de seguridad configurables.
- Guardado por imagen con el sufijo `_censored`; si no eliges una carpeta de salida, crea la subcarpeta `censored` dentro de la carpeta original.
- Pestaña **Optimizar** para cargar las imágenes censuradas, comparar el original con el resultado y reducir su peso sin modificar los originales.
- Salida en formato original, WebP, JPEG o PNG sin pérdida; las dimensiones se conservan.

## Uso

Requisitos: Node.js 20.19+ y Python 3.10+ para la detección automática y la optimización. Esta versión usa `nsfw-anime-xl-x1280.pt`, un modelo YOLO26-seg que devuelve máscaras de regiones NSFW anime. La revisión y edición manual funciona con Node.js solamente.

En Windows, puedes iniciar todo con doble clic en [iniciar_autocensor.bat](C:/Users/johin/Code_Library/AI/AutoCensor/iniciar_autocensor.bat). El servidor se ejecuta en esa misma ventana y abre el navegador cuando está listo. Mantén la ventana abierta mientras usas la app; pulsa Ctrl+C para detenerla. Si el servidor termina o falla, la ventana muestra el resultado y espera una tecla antes de cerrarse.

```powershell
npm start
```

`npm start` construye la interfaz Preact y después inicia el servidor local. Para desarrollar únicamente la interfaz puedes usar `npm run dev`; este modo redirige las llamadas API al servidor local de `127.0.0.1:4173`, que debe estar ejecutándose por separado.

Abre [http://127.0.0.1:4173](http://127.0.0.1:4173) en Chrome, Edge o Firefox. En Windows, Firefox utiliza el selector de carpetas del servidor local; Chrome y Edge mantienen su selector integrado. El servidor debe ejecutarse en el mismo equipo que las carpetas. Si cancelas el selector, se conserva la selección anterior.

También puedes elegir carpetas de salida en Firefox. Sin salida explícita, los resultados se guardan en `censored` o `optimized` dentro de la carpeta de entrada, con los sufijos `_censored` y `_optimized`. Después de reiniciar el servidor, vuelve a elegir las carpetas.

Para instalar el detector anime NSFW:

```powershell
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

Descarga `nsfw-anime-xl-x1280.pt` desde [01miku/anime-nsfw-segm-yolo26](https://huggingface.co/01miku/anime-nsfw-segm-yolo26) y colócalo en `models\nsfw-anime-xl-x1280.pt`. El servidor carga el modelo una sola vez y utiliza las clases seleccionadas en la interfaz.

En este proyecto `.venv` ya queda configurado como el entorno virtual local. El servidor lo detecta automáticamente, así que también puedes iniciar la app directamente con `npm start` sin activar el entorno en cada terminal.

La primera detección puede tardar más mientras se carga el modelo. La pestaña **Optimizar** usa Pillow en un worker Python local: PNG se comprime sin cambiar píxeles y el modo sin pérdida convierte a PNG cuando es necesario. WebP/JPEG usan calidad configurable. El servidor solo recibe las imágenes en memoria desde la interfaz local, las escribe temporalmente para ejecutar el detector u optimizador y las elimina al terminar; no hay un servicio remoto configurado.

## Arquitectura local

- [server.mjs](C:/Users/johin/Code_Library/AI/AutoCensor/server.mjs) expone la interfaz y las rutas locales; no abre un segundo servidor Python.
- [tools/server](C:/Users/johin/Code_Library/AI/AutoCensor/tools/server) contiene el protocolo de workers persistentes y el manejo seguro de imágenes temporales.
- [tools/python](C:/Users/johin/Code_Library/AI/AutoCensor/tools/python) es el motor Python dividido por responsabilidad: `detector`, `optimizer`, `images`, `config` y `protocol`.
- Los workers se ejecutan como módulos JSONL persistentes. Por ello el modelo YOLO se carga una vez y Pillow puede procesar varias imágenes sin lanzar Python por cada archivo.
- [tools/detect_anime_nsfw.py](C:/Users/johin/Code_Library/AI/AutoCensor/tools/detect_anime_nsfw.py) y [tools/optimize_image.py](C:/Users/johin/Code_Library/AI/AutoCensor/tools/optimize_image.py) permanecen como entradas compatibles para scripts existentes.

Si Python está instalado en una ruta específica, se puede indicar antes de arrancar:

```powershell
$env:PYTHON = "C:\ruta\a\python.exe"
npm start
```

## Flujo recomendado

1. Elige la carpeta de imágenes.
2. Opcionalmente selecciona una carpeta de salida.
3. Pulsa **Analizar carpeta**.
4. Revisa cada imagen: selecciona una capa para cambiar estilo, intensidad o margen; arrástrala o usa las esquinas para ajustarla.
5. Con una capa seleccionada, pinta con el botón izquierdo para ampliar la censura y usa el botón derecho para borrar partes de esa máscara. Ajusta el tamaño del pincel desde el panel.
6. Usa **Añadir capa** si el detector omitió algo; la capa empieza vacía y solo se censura donde pintes con el pincel.
7. Pulsa **APPROVE** para marcar cada imagen como aprobada. Al terminar la revisión, la aplicación preguntará si quieres guardar todas las aprobadas; también puedes usar **Guardar aprobadas** en cualquier momento.
8. En la pestaña **Optimizar**, selecciona la carpeta de imágenes censuradas, el formato y la calidad; pulsa **Optimizar imágenes** y después **Guardar optimizadas**. Si no eliges una salida, crea la subcarpeta `optimized` dentro de la carpeta seleccionada y usa el sufijo `_optimized`.

## Notas

- La aplicación no sobrescribe los originales.
- Los GIF animados se leen como una imagen estática del navegador.
- El detector automático es una ayuda y no sustituye la revisión humana; por eso ninguna imagen se guarda automáticamente.
- El modo **PNG sin pérdida** conserva exactamente los píxeles, aunque no siempre reduce el tamaño. WebP y JPEG permiten archivos mucho más pequeños con calidad visual alta; su compresión no es matemáticamente sin pérdida.
