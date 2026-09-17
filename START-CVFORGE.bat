@echo off
title CVForge Launcher
cd /d "%~dp0"
echo.
echo ==========================================
echo            CVForge Local
echo ==========================================
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or not in PATH.
  echo Install Node.js LTS, then run this file again.
  pause
  exit /b 1
)
if not exist "frontend\node_modules" (
  echo First run detected. Installing frontend packages...
  cd frontend
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
  cd ..
)
start "CVForge Backend" cmd /k "cd /d \"%~dp0backend\" && npm start"
start "CVForge Frontend" cmd /k "cd /d \"%~dp0frontend\" && npm run dev"
echo.
echo Backend and Frontend terminals opened.
echo Open http://localhost:5173 in your browser.
echo.
echo Demo login:
echo demo@cvforge.app
echo demo123
echo.
pause
