@echo off
setlocal

cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] No se encontro Node.js en el PATH.
    echo Instala Node.js 18 o superior y vuelve a ejecutar este archivo.
    pause
    exit /b 1
)

if not exist "server.mjs" (
    echo [ERROR] No se encontro server.mjs en la carpeta del proyecto.
    pause
    exit /b 1
)

set "SERVER_PID="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:"127.0.0.1:4173 .*LISTENING"') do set "SERVER_PID=%%P"
if defined SERVER_PID (
    echo [INFO] Censor Station ya esta ejecutandose con Node PID %SERVER_PID%.
    start "" "http://127.0.0.1:4173"
    echo Se reutilizo el servidor existente; no se inicio otro Node.
    endlocal
    exit /b 0
)

if not exist ".venv\Scripts\python.exe" (
    echo [AVISO] No se encontro .venv. La deteccion automatica anime NSFW no estara disponible.
    echo Puedes crearla con:
    echo   python -m venv .venv
    echo   .venv\Scripts\python.exe -m pip install -r requirements.txt
    echo.
)

if not exist "models\nsfw-anime-xl-x1280.pt" (
    echo [AVISO] No se encontro el modelo anime NSFW YOLO26. La deteccion automatica no estara disponible.
    echo Descarga nsfw-anime-xl-x1280.pt y guardalo en models.
    echo.
)

echo Iniciando Censor Station...
start "Censor Station - servidor" cmd /k "node server.mjs"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4173"

echo.
echo Censor Station esta disponible en http://127.0.0.1:4173
echo Puedes cerrar esta ventana; el servidor queda en su propia ventana.
endlocal
