# Deployment Guide

## 🚀 Quick Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free)
- Cloudinary account

### Step 1: Push to GitHub
```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit the changes
git commit -m "Initial portfolio deployment"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/aryster07/portfolio.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your portfolio repository

2. **Configure Environment Variables**
   In Vercel dashboard, add these environment variables:
   ```
   CLOUDINARY_CLOUD_NAME=dmko2zav7
   CLOUDINARY_API_KEY=195252934725612
   CLOUDINARY_API_SECRET=2k2jRQyebgpcKsClcImkS8F9K0Y
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your portfolio will be live at `https://your-portfolio.vercel.app`

### Step 3: Custom Domain (Optional)

1. **Add Custom Domain**
   - In Vercel dashboard, go to "Domains"
   - Add your custom domain (e.g., `yourname.com`)
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Automatic SSL certificate provisioning
   - HTTPS redirect enabled by default

## 🔧 Alternative Deployment Options

### Netlify
1. Connect GitHub repository to Netlify
2. Set build command: `pnpm build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Railway
1. Connect GitHub repository to Railway
2. Railway auto-detects Next.js configuration
3. Add environment variables in Railway dashboard

### Self-Hosted with Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   RUN npm run build
   
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t portfolio .
   docker run -p 3000:3000 -e CLOUDINARY_CLOUD_NAME=dmko2zav7 portfolio
   ```

## 📊 Performance Optimization

### For Production
- Images automatically optimized by Cloudinary
- Next.js Image component with lazy loading
- Bundle splitting and tree shaking enabled
- Modern image formats (WebP/AVIF) served automatically

### Monitoring
- Vercel Analytics (built-in)
- Core Web Vitals tracking
- Real User Monitoring available

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env.local` to git
- Use different Cloudinary credentials for production
- Enable Cloudinary access restrictions if needed

### Content Security
- Cloudinary URLs are secure by default
- Consider enabling signed URLs for additional security
- Rate limiting enabled on API routes

## 🚀 Post-Deployment

### Testing
1. Test all category pages
2. Verify image loading performance
3. Check mobile responsiveness
4. Test lightbox functionality

### SEO Optimization
1. Add meta tags for social sharing
2. Configure sitemap.xml
3. Set up Google Analytics (optional)
4. Optimize loading performance

### Maintenance
- Monitor Cloudinary usage limits
- Update dependencies regularly
- Check Vercel function limits
- Monitor Core Web Vitals

---

🎉 **Congratulations!** Your photography portfolio is now live and ready to showcase your amazing work!
