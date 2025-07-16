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
        <div className="relative aspect-[4/5] bg-gray-800 border border-gray-700 rounded-xl animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent rounded-b-xl">
            <div className="text-center">
              <span className="text-sm text-white bg-black px-3 py-1 rounded-full border border-gray-600">
                {title}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/category/${slugify(id)}`} className="block">
      <div className="group overflow-hidden hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative aspect-[4/5] bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-gold/50">
          
          {/* Image Content */}
          {thumbnailData ? (
            <Image
              src={thumbnailData.url}
              alt={title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="text-3xl mb-2">📸</div>
                <div className="text-sm font-medium">No images found</div>
              </div>
            </div>
          )}
          
          {/* Simple overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Simple tag overlay - centered */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <span className="text-sm sm:text-base font-medium text-white bg-black/80 px-3 py-1.5 rounded-full border border-gray-600 group-hover:border-gold/60 group-hover:bg-black/90 transition-all duration-300">
              {title}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
