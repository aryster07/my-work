'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AboutSection } from "@/components/about-section"
import CircularGallery from "@/components/circular-gallery"
import { CloudinaryThumbnail } from "@/components/cloudinary-thumbnail"

interface CarouselImage {
  publicId: string
  url: string
  previewUrl: string
  originalUrl: string
  thumbnailUrl: string
  width: number
  height: number
  title: string
  alt: string
}

const categories = [
  { 
    id: "Astro", 
    title: "Astro", 
    folderName: "Astro",
    description: ""
  },
  { 
    id: "bikes", 
    title: "Bikes", 
    folderName: "bikes",
    description: ""
  },
  { 
    id: "Cars", 
    title: "Cars", 
    folderName: "Cars",
    description: ""
  },
  { 
    id: "college", 
    title: "College", 
    folderName: "College Events",
    description: ""
  },
  { 
    id: "Concerts", 
    title: "Concerts", 
    folderName: "Concerts",
    description: ""
  },
  { 
    id: "Danno", 
    title: "Danno", 
    folderName: "Danno",
    description: ""
  },
  { 
    id: "Flowers", 
    title: "Flowers", 
    folderName: "Flowers",
    description: ""
  },
  { 
    id: "Lambo", 
    title: "Lambo", 
    folderName: "Lambo",
    description: ""
  },
  { 
    id: "moon", 
    title: "Moon", 
    folderName: "moon",
    description: ""
  },
  { 
    id: "Mountains", 
    title: "Mountains", 
    folderName: "Mountains",
    description: ""
  },
  { 
    id: "Nature", 
    title: "Nature", 
    folderName: "Nature",
    description: ""
  },
  { 
    id: "skies", 
    title: "Skies", 
    folderName: "skies",
    description: ""
  },
  { 
    id: "Sunsets", 
    title: "Sunsets", 
    folderName: "Sunsets",
    description: ""
  },
]

export default function HomePage() {
  const [carouselItems, setCarouselItems] = useState<{ image: string; text: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch carousel images
    const fetchCarouselImages = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/carousel')
        const data = await response.json()
        
        if (data.images && data.images.length > 0) {
          // Use optimized URLs instead of shuffling for consistent performance
          const items = data.images.map((img: CarouselImage) => ({
            image: img.url, // Already optimized in cloudinary.ts
            text: "" // No text as requested
          }))
          
          setCarouselItems(items)
        }
      } catch (error) {
        console.error('Error fetching carousel images:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCarouselImages()
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-1 w-full max-w-full">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-8 pb-10 bg-gradient-to-b from-slate-950/80 via-black/60 to-slate-900/70 backdrop-blur-sm">
          <div className="absolute inset-0 z-0 w-full max-w-full">
            {/* Artistic Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              {/* Subtle geometric pattern */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-gold/20 rounded-full transform rotate-45"></div>
              <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-gold/15 rounded-full transform -rotate-12"></div>
              <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-gold/10 rounded-full transform rotate-90"></div>
              
              {/* Artistic dots pattern */}
              <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-gold/20 rounded-full"></div>
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-gold/15 rounded-full"></div>
              <div className="absolute top-3/4 right-1/2 w-1.5 h-1.5 bg-gold/10 rounded-full"></div>
            </div>
            
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-5 artistic-grid"></div>
          </div>

          {/* Main Content Container - Centered */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full space-y-12">
            
            {/* Free-flowing Curved Gallery - Above Text */}
            <div className="w-full max-w-full h-64 md:h-80 lg:h-96 overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
                </div>
              ) : (
                <CircularGallery
                  items={carouselItems.length > 0 ? carouselItems : undefined}
                  bend={3}
                  textColor="#FFFFFF"
                  borderRadius={0.08}
                  scrollEase={0.15}
                  autoScrollSpeed={0.12}
                />
              )}
            </div>

            {/* Hero Text Content - Below Carousel */}
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
                7Frames_aryan
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                I shoot everything, just not with a gun (Yet) 💀
              </p>
              
              <Button asChild size="lg" className="rounded-xl bg-gold hover:bg-gold/90 text-black font-semibold border-0 px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Link href="#gallery">
                  Explore My Work
                  <Camera className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Categories Section */}
        <section id="gallery" className="py-24 md:py-32 px-4 w-full max-w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full max-w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">My Gallery</h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Explore my photography collections across different categories, each telling a unique story through the lens
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 w-full max-w-full">
              {categories.map((category) => (
                <CloudinaryThumbnail
                  key={category.id}
                  id={category.id}
                  title={category.title}
                  folderName={category.folderName}
                  description={category.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <div className="py-16 md:py-20">
          <AboutSection />
        </div>

        {/* Support Call-to-Action Section */}
        <section className="py-20 md:py-24 px-4 bg-gradient-to-r from-slate-950 via-gray-900 to-slate-950 w-full max-w-full overflow-x-hidden">
          <div className="max-w-4xl mx-auto text-center w-full max-w-full">
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Love My Work? Help Me Keep Shooting! 📸
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Your support helps me afford better gear, explore new locations, and create even more stunning photography for you to enjoy.
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" className="rounded-lg bg-gold hover:bg-gold/80 text-black font-semibold border-0 px-6 py-4 text-base md:text-lg">
                  <Link href="/support" className="flex items-center whitespace-nowrap">
                    Support My Photography Journey
                    <Camera className="ml-2 h-4 w-4 flex-shrink-0" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

