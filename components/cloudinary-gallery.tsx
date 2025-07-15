'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface CloudinaryImage {
  id: number
  title: string
  description: string
  imageUrl: string
  originalUrl: string
  publicId: string
  width: number
  height: number
  aspectRatio: number
}

interface CloudinaryGalleryProps {
  folderName: string
}

export function CloudinaryGallery({ folderName }: CloudinaryGalleryProps) {
  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(null)

  const getAspectRatioClass = (ratio: number) => {
    if (ratio < 0.8) return 'aspect-portrait'
    if (ratio < 1.2) return 'aspect-square'
    if (ratio < 1.6) return 'aspect-landscape'
    if (ratio < 2.0) return 'aspect-wide'
    return 'aspect-ultrawide'
  }

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(`/api/images?folder=${encodeURIComponent(folderName)}`)
        const data = await response.json()
        setImages(data.images || [])
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [folderName])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }, (_, i) => (
          <Card key={i} className="overflow-hidden bg-gray-900 border-gray-800">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-800 animate-pulse">
                <div className="flex items-center justify-center h-full">
                  <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📸</div>
        <h3 className="text-2xl font-semibold text-white mb-2">No Images Found</h3>
        <p className="text-gray-400">
          No images were found in the "{folderName}" folder on Cloudinary.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="masonry-grid">
        {images.map((image) => (
          <div key={image.id} className="masonry-item">
            <Card
              className="group overflow-hidden cursor-pointer bg-gray-900 border-gray-800 hover:border-gold/50 transition-all duration-300"
              onClick={() => setSelectedImage(image)}
            >
              <CardContent className="p-0">
                <div 
                  className={`relative overflow-hidden ${getAspectRatioClass(image.aspectRatio)}`}
                  data-aspect-ratio={image.aspectRatio.toFixed(3)}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/90 cursor-pointer"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          />
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <div className="relative max-w-7xl max-h-full">
              <button
                className="absolute top-4 right-4 text-white hover:text-gold text-2xl z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
                onClick={() => setSelectedImage(null)}
                aria-label="Close image"
              >
                ×
              </button>
              <Image
                src={selectedImage.originalUrl}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-lg p-4 text-white">
                <h3 id="lightbox-title" className="font-semibold text-lg">{selectedImage.title}</h3>
                <p className="text-gray-300 text-sm">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
