#!/bin/bash

# Elite Events Website Deployment Script
# This script builds and prepares the website for deployment

echo "🚀 Starting Elite Events Website Deployment..."

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

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf dist

# Install dependencies
print_status "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

# Run type checking
print_status "Running type checking..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed. Please fix the errors and try again."
    exit 1
fi

print_success "Build completed successfully!"

# Create deployment package
print_status "Creating deployment package..."
mkdir -p deploy-package

# Copy necessary files
cp -r .next deploy-package/
cp -r public deploy-package/
cp package.json deploy-package/
cp package-lock.json deploy-package/
cp next.config.ts deploy-package/

# Create deployment info
cat > deploy-package/DEPLOYMENT_INFO.txt << EOF
Elite Events Website Deployment Package
Generated on: $(date)
Node.js version: $(node --version)
npm version: $(npm --version)
Build completed successfully!

Deployment Instructions:
1. Upload the contents of deploy-package/ to your hosting provider
2. Run 'npm install --production' on the server
3. Run 'npm start' to start the application
4. Configure your domain to point to the application

For static hosting (Vercel, Netlify, etc.):
1. Upload the contents of deploy-package/ to your hosting provider
2. Configure build command: npm run build
3. Configure output directory: .next
4. Deploy!

Admin Access:
- URL: /admin/login
- Email: your-admin@admin.com
- Password: your-SP@1234

Features Included:
- Event Management Website
- Admin Panel with Full CRUD Operations
- Image Upload Functionality
- WhatsApp Integration
- Responsive Design
- SEO Optimized
EOF

print_success "Deployment package created in deploy-package/ directory"

# Display deployment options
echo ""
print_status "Deployment Options:"
echo "1. Vercel (Recommended for Next.js)"
echo "   - Visit https://vercel.com"
echo "   - Connect your GitHub repository"
echo "   - Deploy automatically"
echo ""
echo "2. Netlify"
echo "   - Visit https://netlify.com"
echo "   - Drag and drop the deploy-package folder"
echo "   - Configure build settings"
echo ""
echo "3. Traditional Hosting"
echo "   - Upload deploy-package contents to your server"
echo "   - Run 'npm install --production'"
echo "   - Run 'npm start'"
echo ""
echo "4. Static Export (for static hosting)"
echo "   - Run 'npm run export' to create static files"
echo "   - Upload the 'out' folder to any static hosting"

print_success "Deployment preparation completed!"
print_status "Next steps: Choose your deployment method and follow the instructions above."