@echo off
REM 🚀 Elite Events Website - Production Deployment Script (Windows)
REM This script prepares and deploys the website for production

echo 🚀 Starting Elite Events Website Deployment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    exit /b 1
)

echo [INFO] Node.js version: 
node --version
echo [INFO] npm version: 
npm --version

REM Step 1: Clean previous builds
echo [INFO] Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist node_modules\.cache rmdir /s /q node_modules\.cache
echo [SUCCESS] Build cache cleaned

REM Step 2: Install dependencies
echo [INFO] Installing dependencies...
call npm ci --only=production
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    exit /b %errorlevel%
)
echo [SUCCESS] Dependencies installed

REM Step 3: Run type checking
echo [INFO] Running TypeScript type checking...
call npm run typecheck
if %errorlevel% neq 0 (
    echo [ERROR] Type checking failed
    exit /b %errorlevel%
)
echo [SUCCESS] Type checking passed

REM Step 4: Build the project
echo [INFO] Building the project for production...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed
    exit /b %errorlevel%
)
echo [SUCCESS] Build completed successfully

REM Step 5: Export static files (if needed)
echo [INFO] Exporting static files...
call npm run export
if %errorlevel% neq 0 (
    echo [WARNING] Static export failed (may not be needed for all deployments)
) else (
    echo [SUCCESS] Static export completed
)

REM Step 6: Verify build output
echo [INFO] Verifying build output...
if exist .next (
    echo [SUCCESS] Next.js build directory created
) else (
    echo [ERROR] Next.js build directory not found
    exit /b 1
)

if exist out (
    echo [SUCCESS] Static export directory created
) else (
    echo [WARNING] Static export directory not found (may not be needed for all deployments)
)

REM Step 7: Display deployment options
echo.
echo 🎉 Build completed successfully!
echo.
echo 📊 Build Statistics:
echo    - Build directory: .next
echo    - Static files: out
echo.
echo 🚀 Deployment Options:
echo.
echo 1. Vercel (Recommended for Next.js):
echo    npx vercel --prod
echo.
echo 2. Netlify:
echo    npx netlify deploy --prod
echo.
echo 3. Static Hosting (Apache/Nginx):
echo    Upload contents of 'out' directory to your web server
echo.
echo 4. Docker:
echo    docker build -t elite-events .
echo    docker run -p 3000:3000 elite-events
echo.
echo 5. Manual Server Deployment:
echo    Upload the entire project to your server
echo    Run: npm ci --only=production
echo    Run: npm run build
echo    Run: npm start
echo.
echo 🔧 Post-Deployment Checklist:
echo    - Test admin login (your-admin@admin.com / your-SP@1234)
echo    - Test image uploads in admin panel
echo    - Test all public pages
echo    - Test mobile responsiveness
echo    - Run Lighthouse performance audit
echo.
echo 📞 Support:
echo    - Check DEPLOYMENT_CHECKLIST.md for detailed instructions
echo    - Check DEPLOYMENT_OPTIONS.md for platform-specific guides
echo.
echo [SUCCESS] Deployment preparation completed! 🎉

