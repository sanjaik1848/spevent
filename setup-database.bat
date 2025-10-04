@echo off
REM SP Events Database Setup Script for Windows
REM This script sets up the MySQL database for SP Events

echo 🚀 Setting up SP Events MySQL Database...

REM Database configuration
set DB_HOST=%DB_HOST%
if "%DB_HOST%"=="" set DB_HOST=localhost

set DB_USER=%DB_USER%
if "%DB_USER%"=="" set DB_USER=root

set DB_PASSWORD=%DB_PASSWORD%
if "%DB_PASSWORD%"=="" set DB_PASSWORD=

set DB_NAME=%DB_NAME%
if "%DB_NAME%"=="" set DB_NAME=sp_events

set DB_PORT=%DB_PORT%
if "%DB_PORT%"=="" set DB_PORT=3306

echo 📋 Database Configuration:
echo   Host: %DB_HOST%
echo   Port: %DB_PORT%
echo   Database: %DB_NAME%
echo   User: %DB_USER%

REM Check if MySQL is running
echo 🔍 Checking MySQL connection...
mysql -h"%DB_HOST%" -P"%DB_PORT%" -u"%DB_USER%" -p"%DB_PASSWORD%" -e "SELECT 1;" >nul 2>&1

if %errorlevel% neq 0 (
    echo ❌ Error: Cannot connect to MySQL server
    echo Please ensure MySQL is running and credentials are correct
    pause
    exit /b 1
)

echo ✅ MySQL connection successful

REM Create database and run schema
echo 📊 Creating database and tables...
mysql -h"%DB_HOST%" -P"%DB_PORT%" -u"%DB_USER%" -p"%DB_PASSWORD%" < database\schema.sql

if %errorlevel% equ 0 (
    echo ✅ Database setup completed successfully!
    echo.
    echo 🎉 Your SP Events database is ready!
    echo.
    echo 📝 Default Admin Credentials:
    echo   Email: admin@spevents.com
    echo   Password: SP@Events1234
    echo.
    echo 🔧 Next steps:
    echo   1. Update your .env.local file with database credentials
    echo   2. Restart your development server: npm run dev
    echo   3. Test the admin login at /login
) else (
    echo ❌ Error: Database setup failed
    pause
    exit /b 1
)

pause

