#!/bin/bash

# 🚀 SP Events Website Update Script
# This script helps you update and deploy your website

echo "🚀 SP Events Website Update Script"
echo "=================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists git; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Function to test build
test_build() {
    echo "🔨 Testing build..."
    if npm run build; then
        echo "✅ Build successful!"
        return 0
    else
        echo "❌ Build failed! Please fix errors before deploying."
        return 1
    fi
}

# Function to start development server
start_dev() {
    echo "🚀 Starting development server..."
    echo "📱 Your website will be available at: http://localhost:9002"
    echo "🔧 Admin panel: http://localhost:9002/admin"
    echo "💬 WhatsApp settings: http://localhost:9002/admin/whatsapp"
    echo ""
    echo "Press Ctrl+C to stop the server"
    npm run dev
}

# Function to deploy
deploy() {
    echo "🚀 Preparing for deployment..."
    
    # Test build first
    if ! test_build; then
        exit 1
    fi
    
    echo "📝 Committing changes..."
    read -p "Enter commit message (or press Enter for default): " commit_msg
    
    if [ -z "$commit_msg" ]; then
        commit_msg="Update website content - $(date '+%Y-%m-%d %H:%M')"
    fi
    
    git add .
    git commit -m "$commit_msg"
    
    echo "📤 Pushing to GitHub..."
    git push origin main
    
    echo "✅ Changes pushed to GitHub!"
    echo "🌐 If you're using Vercel/Netlify, deployment should start automatically."
    echo "📱 Check your hosting dashboard for deployment status."
}

# Function to update specific content
update_content() {
    echo "📝 Content Update Options:"
    echo "1. Website Content (Hero, About, Services, etc.)"
    echo "2. Welcome Page Content"
    echo "3. Gallery Images"
    echo "4. WhatsApp Settings"
    echo "5. Logo Settings"
    echo "6. Hero Images"
    echo ""
    read -p "Choose option (1-6): " choice
    
    case $choice in
        1)
            echo "📝 Opening website content file..."
            echo "File: src/lib/website-content.ts"
            echo "Edit this file to update main website content"
            ;;
        2)
            echo "📝 Opening welcome page content file..."
            echo "File: src/lib/welcome-data.ts"
            echo "Edit this file to update welcome page content"
            ;;
        3)
            echo "📝 Opening gallery images file..."
            echo "File: src/lib/media.ts"
            echo "Edit this file to update gallery images"
            ;;
        4)
            echo "💬 WhatsApp settings can be updated via admin panel:"
            echo "URL: http://localhost:9002/admin/whatsapp"
            echo "Or edit: src/hooks/useWhatsAppSettings.ts"
            ;;
        5)
            echo "🖼️ Logo settings can be updated via admin panel:"
            echo "URL: http://localhost:9002/admin/logos"
            echo "Or edit: src/hooks/useLogoData.ts"
            ;;
        6)
            echo "🖼️ Opening hero images file..."
            echo "File: src/lib/hero-images.json"
            echo "Edit this file to update hero images"
            ;;
        *)
            echo "❌ Invalid option"
            ;;
    esac
}

# Function to show help
show_help() {
    echo "📚 Available Commands:"
    echo ""
    echo "  ./update.sh dev          - Start development server"
    echo "  ./update.sh build       - Test build"
    echo "  ./update.sh deploy      - Deploy to production"
    echo "  ./update.sh update      - Update content"
    echo "  ./update.sh help        - Show this help"
    echo ""
    echo "📝 Quick Update Process:"
    echo "1. Make your changes to the code"
    echo "2. Run: ./update.sh dev (to test locally)"
    echo "3. Run: ./update.sh deploy (to deploy)"
    echo ""
    echo "🔧 Admin Panel URLs:"
    echo "  Main Admin: http://localhost:9002/admin"
    echo "  WhatsApp: http://localhost:9002/admin/whatsapp"
    echo "  Logos: http://localhost:9002/admin/logos"
    echo "  Content: http://localhost:9002/admin/content"
}

# Main script logic
case "$1" in
    "dev")
        start_dev
        ;;
    "build")
        test_build
        ;;
    "deploy")
        deploy
        ;;
    "update")
        update_content
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    "")
        echo "🚀 SP Events Website Update Script"
        echo "=================================="
        echo ""
        echo "Choose an option:"
        echo "1. Start Development Server"
        echo "2. Test Build"
        echo "3. Deploy to Production"
        echo "4. Update Content"
        echo "5. Show Help"
        echo ""
        read -p "Enter your choice (1-5): " main_choice
        
        case $main_choice in
            1) start_dev ;;
            2) test_build ;;
            3) deploy ;;
            4) update_content ;;
            5) show_help ;;
            *) echo "❌ Invalid choice" ;;
        esac
        ;;
    *)
        echo "❌ Unknown command: $1"
        show_help
        ;;
esac



