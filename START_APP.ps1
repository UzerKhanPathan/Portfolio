# Portfolio Application Auto-Start Script (PowerShell version)
# This script starts both backend and frontend servers and opens the browser

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Portfolio Application Launcher" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "[1/3] Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$scriptPath\backend'; Write-Host 'Backend Server' -ForegroundColor Green; npm start" -WindowStyle Normal

# Wait for backend to initialize
Write-Host "    Waiting for backend to start..." -ForegroundColor Gray
Start-Sleep -Seconds 3

Write-Host "[2/3] Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$scriptPath'; Write-Host 'Frontend Server' -ForegroundColor Green; npm run dev" -WindowStyle Normal

# Wait for frontend to initialize
Write-Host "    Waiting for frontend to start..." -ForegroundColor Gray
Start-Sleep -Seconds 3

Write-Host "[3/3] Opening Browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   Application Started Successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "Admin:    http://localhost:3001/admin" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
