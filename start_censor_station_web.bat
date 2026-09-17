@echo off
setlocal
title Censor Station - Web Preview

cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
    echo [Censor Station] Node.js was not found in PATH.
    echo Install Node.js 20.19 or newer, then try again.
    call :wait_for_key
    exit /b 1
)

if not exist "package.json" (
    echo [Censor Station] package.json was not found in the project folder.
    call :wait_for_key
    exit /b 1
)

if not defined WEB_PORT set "WEB_PORT=4174"
set "WEB_PID="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:"127.0.0.1:%WEB_PORT% .*LISTENING"') do set "WEB_PID=%%P"
if defined WEB_PID (
    echo [Censor Station] Port %WEB_PORT% is already in use by process %WEB_PID%.
    echo Open the existing web preview:
    echo http://127.0.0.1:%WEB_PORT%
    start "" "http://127.0.0.1:%WEB_PORT%"
    call :wait_for_key
    exit /b 0
)

if not exist "node_modules" (
    echo [Censor Station] Installing JavaScript dependencies...
    call npm.cmd install
    if errorlevel 1 (
        echo [Censor Station] Dependency installation failed.
        call :wait_for_key
        exit /b 1
    )
)

echo [Censor Station] Building the web version...
call npm.cmd run build
if errorlevel 1 (
    echo [Censor Station] Web build failed.
    call :wait_for_key
    exit /b 1
)

echo.
echo [Censor Station] Web preview available at:
echo http://127.0.0.1:%WEB_PORT%
echo Keep this window open while using Censor Station.
echo Press Ctrl+C to stop the web server.
echo.

npm.cmd run preview -- --host 127.0.0.1 --port %WEB_PORT%
set "WEB_EXIT=%ERRORLEVEL%"
echo.
echo [Censor Station] WEB SERVER OFF - exit code %WEB_EXIT%.
call :wait_for_key
exit /b %WEB_EXIT%

:wait_for_key
echo Press any key to close this window . . .
pause >nul
exit /b
