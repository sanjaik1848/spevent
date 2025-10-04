@echo off
REM SP Events - MilesWeb Deployment Package Creator
REM This script creates a deployment package for MilesWeb hosting

echo 🚀 Creating MilesWeb Deployment Package...

REM Create deployment directory
if exist "milesweb-deploy" rmdir /s /q "milesweb-deploy"
mkdir "milesweb-deploy"

REM Copy static files
echo 📁 Copying static files...
xcopy "out\*" "milesweb-deploy\" /E /I /H /Y

REM Copy database files
echo 🗄️ Copying database files...
mkdir "milesweb-deploy\database"
copy "database\schema.sql" "milesweb-deploy\database\"

REM Copy configuration files
echo ⚙️ Copying configuration files...
copy "package.json" "milesweb-deploy\"
copy "next.config.ts" "milesweb-deploy\"
copy "tailwind.config.ts" "milesweb-deploy\"
copy "tsconfig.json" "milesweb-deploy\"

REM Copy documentation
echo 📚 Copying documentation...
copy "README.md" "milesweb-deploy\"
copy "MILESWEB_DEPLOYMENT.md" "milesweb-deploy\"

REM Create .htaccess for MilesWeb
echo 🌐 Creating .htaccess file...
echo # SP Events - MilesWeb Configuration > "milesweb-deploy\.htaccess"
echo RewriteEngine On >> "milesweb-deploy\.htaccess"
echo RewriteCond %%{REQUEST_FILENAME} !-f >> "milesweb-deploy\.htaccess"
echo RewriteCond %%{REQUEST_FILENAME} !-d >> "milesweb-deploy\.htaccess"
echo RewriteRule ^(.*)$ /index.html [QSA,L] >> "milesweb-deploy\.htaccess"

REM Create deployment info
echo 📋 Creating deployment info...
echo SP Events Website - MilesWeb Deployment Package > "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo. >> "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo Created: %date% %time% >> "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo. >> "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo Files included: >> "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo - Static website files (out/) >> "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo - Database schema (database/) >> "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo - Configuration files >> "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo - Documentation >> "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo. >> "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo Next steps: >> "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo 1. Upload all files to MilesWeb public_html >> "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo 2. Set up MySQL database using schema.sql >> "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo 3. Configure environment variables >> "milesweb-deploy\DEPLOYMENT_INFO.txt"
echo 4. Test your website >> "milesweb-deploy\DEPLOYMENT_INFO.txt"

echo ✅ MilesWeb deployment package created successfully!
echo.
echo 📦 Package location: milesweb-deploy\
echo 📁 Upload the contents of this folder to your MilesWeb hosting
echo 🗄️ Don't forget to set up the MySQL database
echo.
echo 🎉 Your SP Events website is ready for MilesWeb!
pause


