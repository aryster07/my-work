'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

interface CloudinaryThumbnailProps {
  folderName: string
  title: string
  description: string
  id: string
}

export function CloudinaryThumbnail({ folderName, title, description, id }: CloudinaryThumbnailProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchThumbnail() {
      try {
        const response = await fetch(`/api/thumbnail?folder=${encodeURIComponent(folderName)}`)
        const data = await response.json()
        setThumbnailUrl(data.thumbnailUrl)
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
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-gray-900 border-gray-800">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] bg-gray-800 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Link href={`/category/${slugify(id)}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-gray-900 border-gray-800 hover:border-gold/50">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <div className="text-2xl mb-2">📸</div>
                  <div className="text-sm">No images found</div>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
