'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CloudinaryThumbnailProps {
  folderName: string
  title: string
  description: string
  id: string
}

export function CloudinaryThumbnail({ folderName, title, description, id }: Readonly<CloudinaryThumbnailProps>) {
  const [thumbnailData, setThumbnailData] = useState<{ url: string; aspectRatio: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchThumbnail() {
      try {
        const response = await fetch(`/api/thumbnail?folder=${encodeURIComponent(folderName)}`)
        const data = await response.json()
        if (data.thumbnail) {
          setThumbnailData({
            url: data.thumbnail.url,
            aspectRatio: data.thumbnail.aspectRatio || 1.33
          })
        }
      } catch (error) {
        console.error('Error fetching thumbnail:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchThumbnail()
  }, [folderName])

  const slugify = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-')
  }

  if (loading) {
    return (
      <div className="group overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[4/5] bg-gray-800/30 backdrop-blur-sm border border-white/10 rounded-xl animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-b-xl">
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
            <p className="text-gray-300 text-sm opacity-80">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/category/${slugify(id)}`}>
      <div className="group overflow-hidden hover:shadow-2xl hover:shadow-gold/20 transition-all duration-500 transform hover:-translate-y-2">
        <div className="relative aspect-[4/5] bg-gray-900/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:border-gold/40">
          {/* Glassmorphism Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20"></div>
          
          {/* Image Content */}
          {thumbnailData ? (
            <Image
              src={thumbnailData.url}
              alt={title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/60 to-gray-900/80 flex items-center justify-center backdrop-blur-sm">
              <div className="text-gray-400 text-center">
                <div className="text-3xl mb-2">📸</div>
                <div className="text-sm font-medium">No images found</div>
              </div>
            </div>
          )}
          
          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />
          
          {/* Glassmorphism Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent backdrop-blur-sm">
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-0.5 sm:mb-1 group-hover:text-gold transition-colors duration-300 drop-shadow-lg leading-tight">
                {title}
              </h3>
              <p className="text-gray-200 text-xs sm:text-sm opacity-90 line-clamp-1 sm:line-clamp-2 group-hover:opacity-100 transition-opacity duration-300 leading-tight">
                {description}
              </p>
            </div>
            
            {/* Hover indicator */}
            <div className="absolute bottom-1 sm:bottom-2 left-2 sm:left-4 w-0 h-0.5 bg-gold group-hover:w-6 sm:group-hover:w-12 transition-all duration-500"></div>
          </div>
          
          {/* Additional glassmorphism shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>
    </Link>
  )
}
