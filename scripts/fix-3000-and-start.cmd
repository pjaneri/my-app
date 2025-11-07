@echo off
:: Script to free port 3000, apply Prisma schema, start Next on :3000 and run basic checks.
:: Run this from a CMD prompt (not PowerShell):
::   cd /d "C:\repositório thiago\ParteFrondEnd\my-app"
::   scripts\fix-3000-and-start.cmd

echo Working directory: %CD%
echo === NETSTAT :3000 ===
netstat -ano | findstr :3000

nsetlocal enabledelayedexpansion
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
  echo Attempting to kill PID %%a
  taskkill /PID %%a /F
)
endlocal

necho.
echo Applying Prisma schema (prisma db push)...
npx.cmd prisma db push --schema prisma/schema.prisma
if ERRORLEVEL 1 (
  echo Prisma db push failed (exit %ERRORLEVEL%). Continuing to attempt start.
) else (
  echo Prisma db push finished.
)

necho Starting Next.js dev on port 3000 in background (log -> .next.log)
start "" /b npx.cmd next dev -p 3000 > .next.log 2>&1
timeout /t 6 >nul

necho ---- .next.log tail ----
if exist .next.log (
  powershell -NoProfile -Command "Get-Content -Path .next.log -Tail 200"
) else (
  echo .next.log not found
)

necho Checking /api/auth/health
curl.exe -s -i http://localhost:3000/api/auth/health || echo curl failed

necho Running signup test (if present)
if exist scripts\test-signup.js (
  node scripts\test-signup.js || echo signup script failed
) else (
  echo scripts\test-signup.js not found
)
echo Script finished.
pause
