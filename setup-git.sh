#!/bin/bash

# Portfolio Git Setup Script
echo "🚀 Setting up Photography Portfolio for Git..."

# Initialize git repository if not already done
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Add all files
echo "📁 Adding files to Git..."
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "ℹ️ No changes to commit"
else
    # Commit the changes
    echo "💾 Committing changes..."
    git commit -m "feat: Complete photography portfolio with Cloudinary integration

- ✨ Dynamic image loading from Cloudinary
- 🎨 Responsive masonry gallery layout  
- 🖼️ 13 photography categories with real images
- 📱 Mobile-optimized with touch-friendly navigation
- ⚡ Optimized images with proper aspect ratios
- 🔒 Environment-based configuration
- 🚀 Production-ready for deployment

Features:
- Real-time image fetching from 13 Cloudinary folders
- Original aspect ratio preservation
- Lightbox modal for full-size viewing
- Loading states and error handling
- SEO and performance optimized
- Ready for Vercel deployment"

    echo "✅ Changes committed successfully"
fi

# Check if remote origin exists
if git remote | grep -q "origin"; then
    echo "✅ Remote origin already configured"
    echo "🔄 Pushing to existing remote..."
    git push origin main || git push origin master
else
    echo "⚠️ No remote origin configured"
    echo "📋 To add your GitHub repository, run:"
    echo "   git remote add origin https://github.com/aryster07/portfolio.git"
    echo "   git push -u origin main"
fi

echo ""
echo "🎉 Portfolio is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. 🔗 Push to GitHub (if not done automatically)"
echo "2. 🚀 Deploy to Vercel: https://vercel.com"
echo "3. 🔧 Add environment variables in Vercel dashboard"
echo "4. 🌍 Your portfolio will be live!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
