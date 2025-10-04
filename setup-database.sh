#!/bin/bash

# SP Events Database Setup Script
# This script sets up the MySQL database for SP Events

echo "🚀 Setting up SP Events MySQL Database..."

# Database configuration
DB_HOST=${DB_HOST:-localhost}
DB_USER=${DB_USER:-root}
DB_PASSWORD=${DB_PASSWORD:-}
DB_NAME=${DB_NAME:-sp_events}
DB_PORT=${DB_PORT:-3306}

echo "📋 Database Configuration:"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"

# Check if MySQL is running
echo "🔍 Checking MySQL connection..."
mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" -e "SELECT 1;" 2>/dev/null

if [ $? -ne 0 ]; then
    echo "❌ Error: Cannot connect to MySQL server"
    echo "Please ensure MySQL is running and credentials are correct"
    exit 1
fi

echo "✅ MySQL connection successful"

# Create database and run schema
echo "📊 Creating database and tables..."
mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" < database/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Database setup completed successfully!"
    echo ""
    echo "🎉 Your SP Events database is ready!"
    echo ""
    echo "📝 Default Admin Credentials:"
    echo "  Email: admin@spevents.com"
    echo "  Password: SP@Events1234"
    echo ""
    echo "🔧 Next steps:"
    echo "  1. Update your .env.local file with database credentials"
    echo "  2. Restart your development server: npm run dev"
    echo "  3. Test the admin login at /login"
else
    echo "❌ Error: Database setup failed"
    exit 1
fi

