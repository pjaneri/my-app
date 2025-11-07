@echo off
REM change to project root (assumes script is in scripts/) 
cd /d "%~dp0.."
echo Working dir: %cd%

echo Killing processes listening on port 3000 (if any)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
  echo killing PID %%a
  taskkill /PID %%a /F
)

echo Starting Next in background (logs -> .next.log)...
start "" /b npx.cmd next dev -p 3000 > .next.log 2>&1

echo Waiting up to 30s for /api/auth/health...
set HEALTH_OK=0
for /L %%i in (1,1,30) do (
  powershell -NoProfile -Command "try{ $r=(Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:3000/api/auth/health' -Method GET -TimeoutSec 2); if($r.StatusCode -eq 200){ Write-Output 'HEALTH_OK'; exit 0 } } catch{}; exit 1"
  if %%ERRORLEVEL%% EQU 0 (
    set HEALTH_OK=1
    goto :after_poll
  )
  timeout /t 1 >nul
)
:after_poll
echo HEALTH_OK=%HEALTH_OK%

echo Running signup test (output -> scripts\test-signup.out)...
node scripts\test-signup.js > scripts\test-signup.out 2>&1

echo ----- signup output -----
type scripts\test-signup.out
echo ----- next server log tail -----
type .next.log | more
pause
