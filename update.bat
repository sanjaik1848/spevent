@echo off
REM 🚀 SP Events Website Update Script for Windows
REM This script helps you update and deploy your website

echo 🚀 SP Events Website Update Script
echo ==================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed. Please install Git first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

if "%1"=="dev" goto start_dev
if "%1"=="build" goto test_build
if "%1"=="deploy" goto deploy
if "%1"=="update" goto update_content
if "%1"=="help" goto show_help
if "%1"=="--help" goto show_help
if "%1"=="-h" goto show_help

REM Main menu
echo.
echo Choose an option:
echo 1. Start Development Server
echo 2. Test Build
echo 3. Deploy to Production
echo 4. Update Content
echo 5. Show Help
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto start_dev
if "%choice%"=="2" goto test_build
if "%choice%"=="3" goto deploy
if "%choice%"=="4" goto update_content
if "%choice%"=="5" goto show_help
echo ❌ Invalid choice
pause
exit /b 1

:start_dev
echo 🚀 Starting development server...
echo 📱 Your website will be available at: http://localhost:9002
echo 🔧 Admin panel: http://localhost:9002/admin
echo 💬 WhatsApp settings: http://localhost:9002/admin/whatsapp
echo.
echo Press Ctrl+C to stop the server
npm run dev
goto end

:test_build
echo 🔨 Testing build...
npm run build
if %errorlevel% equ 0 (
    echo ✅ Build successful!
) else (
    echo ❌ Build failed! Please fix errors before deploying.
    pause
    exit /b 1
)
goto end

:deploy
echo 🚀 Preparing for deployment...

REM Test build first
call :test_build
if %errorlevel% neq 0 exit /b 1

echo 📝 Committing changes...
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" (
    for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
    set "commit_msg=Update website content - %dt:~0,4%-%dt:~4,2%-%dt:~6,2% %dt:~8,2%:%dt:~10,2%"
)

git add .
git commit -m "%commit_msg%"

echo 📤 Pushing to GitHub...
git push origin main

echo ✅ Changes pushed to GitHub!
echo 🌐 If you're using Vercel/Netlify, deployment should start automatically.
echo 📱 Check your hosting dashboard for deployment status.
goto end

:update_content
echo 📝 Content Update Options:
echo 1. Website Content (Hero, About, Services, etc.)
echo 2. Welcome Page Content
echo 3. Gallery Images
echo 4. WhatsApp Settings
echo 5. Logo Settings
echo 6. Hero Images
echo.
set /p choice="Choose option (1-6): "

if "%choice%"=="1" (
    echo 📝 Opening website content file...
    echo File: src/lib/website-content.ts
    echo Edit this file to update main website content
    notepad src/lib/website-content.ts
)
if "%choice%"=="2" (
    echo 📝 Opening welcome page content file...
    echo File: src/lib/welcome-data.ts
    echo Edit this file to update welcome page content
    notepad src/lib/welcome-data.ts
)
if "%choice%"=="3" (
    echo 📝 Opening gallery images file...
    echo File: src/lib/media.ts
    echo Edit this file to update gallery images
    notepad src/lib/media.ts
)
if "%choice%"=="4" (
    echo 💬 WhatsApp settings can be updated via admin panel:
    echo URL: http://localhost:9002/admin/whatsapp
    echo Or edit: src/hooks/useWhatsAppSettings.ts
    notepad src/hooks/useWhatsAppSettings.ts
)
if "%choice%"=="5" (
    echo 🖼️ Logo settings can be updated via admin panel:
    echo URL: http://localhost:9002/admin/logos
    echo Or edit: src/hooks/useLogoData.ts
    notepad src/hooks/useLogoData.ts
)
if "%choice%"=="6" (
    echo 🖼️ Opening hero images file...
    echo File: src/lib/hero-images.json
    echo Edit this file to update hero images
    notepad src/lib/hero-images.json
)
goto end

:show_help
echo 📚 Available Commands:
echo.
echo   update.bat dev          - Start development server
echo   update.bat build       - Test build
echo   update.bat deploy      - Deploy to production
echo   update.bat update      - Update content
echo   update.bat help        - Show this help
echo.
echo 📝 Quick Update Process:
echo 1. Make your changes to the code
echo 2. Run: update.bat dev (to test locally)
echo 3. Run: update.bat deploy (to deploy)
echo.
echo 🔧 Admin Panel URLs:
echo   Main Admin: http://localhost:9002/admin
echo   WhatsApp: http://localhost:9002/admin/whatsapp
echo   Logos: http://localhost:9002/admin/logos
echo   Content: http://localhost:9002/admin/content
goto end

:end
pause



