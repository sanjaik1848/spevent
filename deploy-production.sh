#!/bin/bash

# 🚀 SP Events Website - Production Deployment Script
# This script prepares and deploys the website for production

set -e  # Exit on any error

echo "🚀 Starting SP Events Website Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"

# Step 1: Clean previous builds
print_status "Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache
print_success "Build cache cleaned"

# Step 2: Install dependencies
print_status "Installing dependencies..."
npm ci --only=production
print_success "Dependencies installed"

# Step 3: Run type checking
print_status "Running TypeScript type checking..."
npm run typecheck
print_success "Type checking passed"

# Step 4: Build the project
print_status "Building the project for production..."
npm run build
print_success "Build completed successfully"

# Step 5: Export static files (if needed)
print_status "Exporting static files..."
npm run export
print_success "Static export completed"

# Step 6: Verify build output
print_status "Verifying build output..."
if [ -d ".next" ]; then
    print_success "Next.js build directory created"
else
    print_error "Next.js build directory not found"
    exit 1
fi

if [ -d "out" ]; then
    print_success "Static export directory created"
else
    print_warning "Static export directory not found (may not be needed for all deployments)"
fi

# Step 7: Display deployment options
echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "📊 Build Statistics:"
echo "   - Total pages: $(find .next/server/app -name "*.js" | wc -l)"
echo "   - Build size: $(du -sh .next | cut -f1)"
echo "   - Static files: $(du -sh out 2>/dev/null | cut -f1 || echo "N/A")"
echo ""
echo "🚀 Deployment Options:"
echo ""
echo "1. Vercel (Recommended for Next.js):"
echo "   npx vercel --prod"
echo ""
echo "2. Netlify:"
echo "   npx netlify deploy --prod"
echo ""
echo "3. Static Hosting (Apache/Nginx):"
echo "   Upload contents of 'out' directory to your web server"
echo ""
echo "4. Docker:"
echo "   docker build -t elite-events ."
echo "   docker run -p 3000:3000 elite-events"
echo ""
echo "5. Manual Server Deployment:"
echo "   Upload the entire project to your server"
echo "   Run: npm ci --only=production"
echo "   Run: npm run build"
echo "   Run: npm start"
echo ""
echo "🔧 Post-Deployment Checklist:"
echo "   - Test admin login (your-admin@admin.com / your-SP@1234)"
echo "   - Test image uploads in admin panel"
echo "   - Test all public pages"
echo "   - Test mobile responsiveness"
echo "   - Run Lighthouse performance audit"
echo ""
echo "📞 Support:"
echo "   - Check DEPLOYMENT_CHECKLIST.md for detailed instructions"
echo "   - Check DEPLOYMENT_OPTIONS.md for platform-specific guides"
echo ""
print_success "Deployment preparation completed! 🎉"
