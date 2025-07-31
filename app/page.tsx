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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-8 pb-10 bg-gradient-to-b from-gray-900/50 via-transparent to-gray-800/30">
          <div className="absolute inset-0 z-0">
            {/* Photography-themed Background Elements */}
            
            {/* Small Camera Icons */}
            <div className="absolute top-32 left-20 w-6 h-6 border border-gold/20 rounded opacity-30">
              <div className="absolute top-1 left-1 w-4 h-3 border border-gold/30 rounded-sm"></div>
              <div className="absolute top-0 right-1 w-1 h-1 bg-gold/40 rounded-full"></div>
            </div>
            
            <div className="absolute bottom-32 right-16 w-8 h-8 border border-gold/20 rounded opacity-25">
              <div className="absolute top-1 left-1 w-6 h-5 border border-gold/30 rounded-sm"></div>
              <div className="absolute top-0 right-1 w-1 h-1 bg-gold/40 rounded-full"></div>
            </div>
            
            {/* Small Picture Frames */}
            <div className="absolute top-20 right-32 w-12 h-8 border-2 border-gold/15 bg-gold/5 opacity-30"></div>
            <div className="absolute bottom-40 left-32 w-10 h-10 border-2 border-gold/15 bg-gold/5 opacity-25"></div>
            <div className="absolute top-60 left-16 w-8 h-12 border-2 border-gold/15 bg-gold/5 opacity-30"></div>
            
            {/* Tiny Lens Elements */}
            <div className="absolute top-48 right-20 w-4 h-4 border border-gold/20 rounded-full opacity-25">
              <div className="absolute inset-1 border border-gold/30 rounded-full">
                <div className="absolute inset-1 bg-gold/20 rounded-full"></div>
              </div>
            </div>
            
            <div className="absolute bottom-20 left-40 w-3 h-3 border border-gold/20 rounded-full opacity-30">
              <div className="absolute inset-0.5 bg-gold/15 rounded-full"></div>
            </div>
            
            {/* Small Viewfinder Corners */}
            <div className="absolute top-40 left-32 w-6 h-6 opacity-20">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/40"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/40"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/40"></div>
            </div>
            
            {/* Subtle Film Perforations */}
            <div className="absolute left-2 top-1/4 w-2 h-16 opacity-15">
              <div className="space-y-1">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="w-2 h-2 border border-gold/30 bg-gold/10"></div>
                ))}
              </div>
            </div>
            
            <div className="absolute right-2 bottom-1/4 w-2 h-12 opacity-15">
              <div className="space-y-1">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="w-2 h-2 border border-gold/30 bg-gold/10"></div>
                ))}
              </div>
            </div>
            
            {/* Tiny Focus Points */}
            <div className="absolute top-28 right-40 w-1 h-1 bg-gold/30 rounded-full animate-pulse opacity-40"></div>
            <div className="absolute bottom-36 left-24 w-1 h-1 bg-gold/30 rounded-full animate-pulse opacity-35 delay-1000"></div>
            <div className="absolute top-52 left-48 w-1 h-1 bg-gold/30 rounded-full animate-pulse opacity-30 delay-2000"></div>

            {/* Speed Lines Effect - Optimized */}
            <div className="speed-lines">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={`speed-line-${i}`}
                  className="speed-line"
                />
              ))}
            </div>
          </div>

          {/* Main Content Container - Centered */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full space-y-12">
            
            {/* Free-flowing Curved Gallery - Above Text */}
            <div className="w-screen h-64 md:h-80 lg:h-96 -mx-4">
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
        <section id="gallery" className="py-24 md:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">My Gallery</h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Explore my photography collections across different categories, each telling a unique story through the lens
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
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

        {/* Support Call-to-Action Section */}
        <section className="py-20 md:py-24 px-4 bg-gradient-to-r from-black via-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Love My Work? Help Me Keep Shooting! 📸
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Your support helps me afford better gear, explore new locations, and create even more stunning photography for you to enjoy.
              </p>
              <Button asChild size="lg" className="rounded-lg bg-gold hover:bg-gold/80 text-black font-semibold border-0 px-8 py-4 text-lg">
                <Link href="/support">
                  Support My Photography Journey
                  <Camera className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <div className="py-16 md:py-20">
          <AboutSection />
        </div>
      </main>
    </div>
  )
}

