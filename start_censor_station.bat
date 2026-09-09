@echo off
setlocal
title Censor Station - LET'S CENSOR

cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
    echo [Censor Station] Node.js was not found in PATH.
    echo Install Node.js 20.19 or newer, then try again.
    call :wait_for_key
    exit /b 1
)

if not exist "server.mjs" (
    echo [Censor Station] server.mjs was not found in the project folder.
    call :wait_for_key
    exit /b 1
)

if not defined PORT set "PORT=4173"
set "SERVER_PID="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:"127.0.0.1:%PORT% .*LISTENING"') do set "SERVER_PID=%%P"
if defined SERVER_PID (
    echo [Censor Station] Port %PORT% is already in use by process %SERVER_PID%.
    echo If this is Censor Station, open:
    echo http://127.0.0.1:%PORT%
    echo Waiting for that process to stop. No duplicate server will be started.
    powershell.exe -NoProfile -Command "Wait-Process -Id %SERVER_PID% -ErrorAction SilentlyContinue"
    echo [Censor Station] The existing process has stopped.
    call :wait_for_key
    exit /b 0
)

if not exist ".venv\Scripts\python.exe" (
    echo [Censor Station] Local Python environment not found. Automatic detection may be unavailable.
    echo Set it up with:
    echo   python -m venv .venv
    echo   .venv\Scripts\python.exe -m pip install -r requirements.txt
    echo.
)

if not exist "models\nsfw-anime-xl-x1280.pt" (
    echo [Censor Station] Detection model not found. Manual editing is available.
    echo Download nsfw-anime-xl-x1280.pt and place it in models.
    echo.
)

echo [Censor Station] Booting up... LET'S CENSOR!
echo Keep this window open while using Censor Station.
echo Press Ctrl+C to stop the server.
npm.cmd run start -- --open-browser
set "SERVER_EXIT=%ERRORLEVEL%"
echo.
echo [Censor Station] SERVER OFF - exit code %SERVER_EXIT%.
call :wait_for_key
exit /b %SERVER_EXIT%

:wait_for_key
echo Press any key to close this window . . .
pause >nul
exit /b
