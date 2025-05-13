@echo off
echo Starting LocalCoder AI Frontend...
echo.

:: Install dependencies if needed
if not exist "node_modules" (
  echo Installing dependencies...
  npm install
)

:: Start development server
echo Starting development server...
npm run dev

echo.
echo LocalCoder AI Frontend is running at http://localhost:3000 