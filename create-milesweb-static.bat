@echo off
REM SP Events - MilesWeb Static Hosting Package Creator
REM This script creates a deployment package for MilesWeb static hosting

echo 🚀 Creating MilesWeb Static Hosting Package...

REM Create deployment directory
if exist "milesweb-static" rmdir /s /q "milesweb-static"
mkdir "milesweb-static"

REM Copy static files
echo 📁 Copying static website files...
xcopy "out\*" "milesweb-static\" /E /I /H /Y

REM Copy contact form
echo 📧 Adding contact form...
copy "contact-form.html" "milesweb-static\contact-form.html"

REM Create .htaccess for MilesWeb
echo 🌐 Creating .htaccess file...
echo # SP Events - MilesWeb Static Hosting Configuration > "milesweb-static\.htaccess"
echo RewriteEngine On >> "milesweb-static\.htaccess"
echo RewriteCond %%{REQUEST_FILENAME} !-f >> "milesweb-static\.htaccess"
echo RewriteCond %%{REQUEST_FILENAME} !-d >> "milesweb-static\.htaccess"
echo RewriteRule ^(.*)$ /index.html [QSA,L] >> "milesweb-static\.htaccess"
echo. >> "milesweb-static\.htaccess"
echo # Enable compression >> "milesweb-static\.htaccess"
echo <IfModule mod_deflate.c> >> "milesweb-static\.htaccess"
echo   AddOutputFilterByType DEFLATE text/plain >> "milesweb-static\.htaccess"
echo   AddOutputFilterByType DEFLATE text/html >> "milesweb-static\.htaccess"
echo   AddOutputFilterByType DEFLATE text/xml >> "milesweb-static\.htaccess"
echo   AddOutputFilterByType DEFLATE text/css >> "milesweb-static\.htaccess"
echo   AddOutputFilterByType DEFLATE application/xml >> "milesweb-static\.htaccess"
echo   AddOutputFilterByType DEFLATE application/xhtml+xml >> "milesweb-static\.htaccess"
echo   AddOutputFilterByType DEFLATE application/rss+xml >> "milesweb-static\.htaccess"
echo   AddOutputFilterByType DEFLATE application/javascript >> "milesweb-static\.htaccess"
echo   AddOutputFilterByType DEFLATE application/x-javascript >> "milesweb-static\.htaccess"
echo </IfModule> >> "milesweb-static\.htaccess"

REM Create deployment info
echo 📋 Creating deployment info...
echo SP Events Website - MilesWeb Static Hosting Package > "milesweb-static\DEPLOYMENT_INFO.txt"
echo. >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo Created: %date% %time% >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo. >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo Hosting Type: Static Files Only (No Node.js/Python) >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo. >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo Files included: >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo - Complete static website (out/) >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo - Contact form (contact-form.html) >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo - .htaccess configuration >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo. >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo Features: >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo ✅ Purple theme main website >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo ✅ Green organic food page >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo ✅ Mobile responsive design >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo ✅ WhatsApp integration >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo ✅ Contact form (redirects to WhatsApp) >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo ✅ Admin panel interface (static) >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo. >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo Deployment Steps: >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo 1. Upload all files to MilesWeb public_html >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo 2. Set up your domain >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo 3. Update WhatsApp number in contact-form.html >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo 4. Test your website >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo. >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo Contact Form: >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo - Uses WhatsApp integration >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo - No server-side processing needed >> "milesweb-static\DEPLOYMENT_INFO.txt"
echo - Update WhatsApp number in contact-form.html >> "milesweb-static\DEPLOYMENT_INFO.txt"

echo ✅ MilesWeb static hosting package created successfully!
echo.
echo 📦 Package location: milesweb-static\
echo 📁 Upload the contents of this folder to your MilesWeb public_html
echo 📧 Contact form uses WhatsApp integration (no server needed)
echo 🌐 Perfect for static hosting plans
echo.
echo 🎉 Your SP Events website is ready for MilesWeb static hosting!
pause
