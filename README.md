# Photography Portfolio

A modern, responsive photography portfolio built with Next.js 15, featuring dynamic Cloudinary integration and beautiful masonry-style galleries.

## ✨ Features

- **Dynamic Image Loading**: Real-time image fetching from Cloudinary
- **Responsive Masonry Layout**: Images display in their original aspect ratios
- **Lightning-Fast Performance**: Optimized with Next.js 15 and modern compression
- **13 Photo Categories**: 
  - Astro Photography
  - Bikes
  - Cars  
  - College Events
  - Concerts
  - Danno (Portraits)
  - Flowers
  - Lambo (Luxury Cars)
  - Moon Photography
  - Mountains
  - Nature
  - Skies
  - Sunsets

- **Modern UI/UX**: 
  - Dark theme with golden accents
  - Smooth hover animations
  - Lightbox modal for full-size viewing
  - Loading states and error handling

## 🛠️ Technology Stack

- **Framework**: Next.js 15.2.4 with TypeScript
- **Styling**: Tailwind CSS with custom utility classes
- **Image Management**: Cloudinary SDK with optimized transformations
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aryster07/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── api/               # API routes for Cloudinary
│   ├── category/[id]/     # Dynamic category pages
│   ├── globals.css        # Global styles and custom CSS
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── cloudinary-thumbnail.tsx
│   ├── cloudinary-gallery.tsx
│   └── ...
├── lib/                  # Utility functions
│   ├── cloudinary.ts     # Cloudinary configuration
│   └── utils.ts          # General utilities
└── public/               # Static assets
```

## 🖼️ Image Management

This portfolio uses Cloudinary for dynamic image management with the following structure:

```
portfolio_uploads/
├── Astro/
├── bikes/
├── Cars/
├── College Events/
├── Concerts/
├── Danno/
├── Flowers/
├── Lambo/
├── moon/
├── Mountains/
├── Nature/
├── skies/
└── Sunsets/
```

### Image Optimization Features

- **Dynamic Aspect Ratios**: Images maintain their original proportions
- **Responsive Sizing**: Optimized for different screen sizes
- **Format Optimization**: Auto WebP/AVIF conversion for modern browsers
- **Lazy Loading**: Images load as they enter the viewport
- **Quality Optimization**: Automatic quality adjustment based on device

## 🎨 Customization

### Adding New Categories

1. Upload images to a new folder in Cloudinary under `portfolio_uploads/`
2. Update the `folderMapping` in `app/category/[id]/page.tsx`
3. Add category description in `categoryDescriptions`
4. Update the homepage categories array in `app/page.tsx`

### Styling

The project uses Tailwind CSS with custom utility classes:

- **Colors**: Gold accent (`--gold: #FFD700`) on dark background
- **Aspect Ratios**: Custom classes for different image proportions
- **Animations**: Smooth hover effects and loading states

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: 
  - Mobile: 1 column
  - Tablet: 2-3 columns  
  - Desktop: 4-5 columns
- **Touch-Friendly**: Large tap targets and smooth scrolling

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The portfolio can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: WebP/AVIF support with fallbacks
- **Bundle Size**: Optimized with tree-shaking and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Aryster**
- GitHub: [@aryster07](https://github.com/aryster07)
- Portfolio: [Live Demo](https://your-portfolio-url.vercel.app)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Cloudinary for powerful image management
- Shadcn for beautiful UI components
- Tailwind CSS for utility-first styling

---

Ghnte ki help . mushkil se ro ro ke bni h XD

