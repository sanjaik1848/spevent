@echo off
REM Elite Events Website Deployment Script for Windows
REM This script builds and prepares the website for deployment

echo 🚀 Starting Elite Events Website Deployment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo [INFO] Node.js version:
node --version
echo [INFO] npm version:
npm --version

REM Clean previous builds
echo [INFO] Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist dist rmdir /s /q dist

REM Install dependencies
echo [INFO] Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

REM Run build
echo [INFO] Running build...
npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed. Please fix the errors and try again.
    pause
    exit /b 1
)

echo [SUCCESS] Build completed successfully!

REM Create deployment package
echo [INFO] Creating deployment package...
if exist deploy-package rmdir /s /q deploy-package
mkdir deploy-package

REM Copy necessary files
xcopy .next deploy-package\.next\ /e /i /h
xcopy public deploy-package\public\ /e /i /h
copy package.json deploy-package\
copy package-lock.json deploy-package\
copy next.config.ts deploy-package\

REM Create deployment info
echo Elite Events Website Deployment Package > deploy-package\DEPLOYMENT_INFO.txt
echo Generated on: %date% %time% >> deploy-package\DEPLOYMENT_INFO.txt
echo Node.js version: >> deploy-package\DEPLOYMENT_INFO.txt
node --version >> deploy-package\DEPLOYMENT_INFO.txt
echo npm version: >> deploy-package\DEPLOYMENT_INFO.txt
npm --version >> deploy-package\DEPLOYMENT_INFO.txt
echo Build completed successfully! >> deploy-package\DEPLOYMENT_INFO.txt
echo. >> deploy-package\DEPLOYMENT_INFO.txt
echo Deployment Instructions: >> deploy-package\DEPLOYMENT_INFO.txt
echo 1. Upload the contents of deploy-package/ to your hosting provider >> deploy-package\DEPLOYMENT_INFO.txt
echo 2. Run 'npm install --production' on the server >> deploy-package\DEPLOYMENT_INFO.txt
echo 3. Run 'npm start' to start the application >> deploy-package\DEPLOYMENT_INFO.txt
echo 4. Configure your domain to point to the application >> deploy-package\DEPLOYMENT_INFO.txt
echo. >> deploy-package\DEPLOYMENT_INFO.txt
echo For static hosting (Vercel, Netlify, etc.): >> deploy-package\DEPLOYMENT_INFO.txt
echo 1. Upload the contents of deploy-package/ to your hosting provider >> deploy-package\DEPLOYMENT_INFO.txt
echo 2. Configure build command: npm run build >> deploy-package\DEPLOYMENT_INFO.txt
echo 3. Configure output directory: .next >> deploy-package\DEPLOYMENT_INFO.txt
echo 4. Deploy! >> deploy-package\DEPLOYMENT_INFO.txt
echo. >> deploy-package\DEPLOYMENT_INFO.txt
echo Admin Access: >> deploy-package\DEPLOYMENT_INFO.txt
echo - URL: /admin/login >> deploy-package\DEPLOYMENT_INFO.txt
echo - Email: your-admin@admin.com >> deploy-package\DEPLOYMENT_INFO.txt
echo - Password: your-SP@1234 >> deploy-package\DEPLOYMENT_INFO.txt

echo [SUCCESS] Deployment package created in deploy-package/ directory

echo.
echo [INFO] Deployment Options:
echo 1. Vercel (Recommended for Next.js)
echo    - Visit https://vercel.com
echo    - Connect your GitHub repository
echo    - Deploy automatically
echo.
echo 2. Netlify
echo    - Visit https://netlify.com
echo    - Drag and drop the deploy-package folder
echo    - Configure build settings
echo.
echo 3. Traditional Hosting
echo    - Upload deploy-package contents to your server
echo    - Run 'npm install --production'
echo    - Run 'npm start'
echo.
echo 4. Static Export (for static hosting)
echo    - Run 'npm run export' to create static files
echo    - Upload the 'out' folder to any static hosting

echo [SUCCESS] Deployment preparation completed!
echo [INFO] Next steps: Choose your deployment method and follow the instructions above.

pause