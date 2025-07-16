'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import AppreciationDialog from './appreciation-dialog'

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
  isLandscape: boolean
  displayAspectRatio: number
}

interface CloudinaryGalleryProps {
  folderName: string
}

export function CloudinaryGallery({ folderName }: Readonly<CloudinaryGalleryProps>) {
  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [showDonationDialog, setShowDonationDialog] = useState(false)
  const imagesPerPage = 24 // Better UX for large galleries

  // Calculate pagination
  const totalPages = Math.ceil(images.length / imagesPerPage)
  const startIndex = (currentPage - 1) * imagesPerPage
  const endIndex = startIndex + imagesPerPage
  const currentImages = images.slice(startIndex, endIndex)

  const getOptimalHeight = (image: CloudinaryImage) => {
    if (image.isLandscape) {
      return 'h-32 sm:h-40 md:h-48'
    }
    if (image.aspectRatio < 0.7) {
      return 'h-48 sm:h-56 md:h-64 lg:h-72'
    }
    return 'h-40 sm:h-48 md:h-56'
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
        {Array.from({ length: 12 }, (_, i) => (
          <Card key={i} className="overflow-hidden bg-gray-900 border-gray-800">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-800 animate-pulse">
                <div className="flex items-center justify-center h-full">
                  <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
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
      {/* Masonry Layout - Optimized for Visual Appeal */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-1 sm:gap-2 space-y-1 sm:space-y-2">
        {currentImages.map((image) => {
          // Dynamic height based on aspect ratio for better masonry effect
          const heightClass = getOptimalHeight(image)
          
          return (
            <div 
              key={image.id} 
              className={`break-inside-avoid mb-1 sm:mb-2 ${heightClass}`}
            >
              <Card
                className="group overflow-hidden cursor-pointer bg-gray-900/50 border-gray-800/50 hover:border-gold/50 transition-all duration-300 h-full backdrop-blur-sm relative"
                onClick={() => setSelectedImage(image)}
              >
                <CardContent className="p-0 h-full relative">
                  <div className="relative overflow-hidden h-full rounded-lg">
                    <Image
                      src={image.imageUrl}
                      alt={image.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    />
                    
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300" />
                    
                    {/* Small download button in bottom-right corner */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation() // Prevent opening modal
                        e.preventDefault() // Prevent any default behavior
                        
                        // Enhanced download logic
                        try {
                          const link = document.createElement('a')
                          link.href = image.originalUrl
                          link.download = `${image.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`
                          link.target = '_blank'
                          link.rel = 'noopener noreferrer'
                          
                          // Force download
                          document.body.appendChild(link)
                          link.click()
                          document.body.removeChild(link)
                          
                          // Show appreciation dialog after download
                          setTimeout(() => {
                            setShowDonationDialog(true)
                          }, 1000)
                        } catch (error) {
                          console.error('Download failed:', error)
                          // Fallback: open in new tab
                          window.open(image.originalUrl, '_blank')
                        }
                      }}
                      className="absolute bottom-2 right-2 bg-black/80 hover:bg-black text-white p-2 rounded-full transition-all duration-200 shadow-lg z-10"
                      aria-label="Download image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                    
                    {/* Small indicator line at bottom */}
                    <div className="absolute bottom-1 left-1 w-0 h-0.5 bg-gold group-hover:w-6 transition-all duration-300"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
          >
            Previous
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1
              const isActive = pageNum === currentPage
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-gold text-black font-semibold' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Clean Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-20 text-white/80 hover:text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all"
            onClick={() => setSelectedImage(null)}
            aria-label="Close preview"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image */}
          <button 
            className="absolute inset-0 flex items-center justify-center p-4 bg-transparent border-0 cursor-pointer"
            onClick={() => setSelectedImage(null)}
            aria-label="Close preview by clicking background"
          >
            <Image
              src={selectedImage.originalUrl}
              alt={selectedImage.title}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain pointer-events-none"
            />
          </button>

          {/* Action Buttons - Bottom Center */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
            <button
              className="bg-white/90 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-all shadow-lg backdrop-blur-sm text-sm"
              onClick={(e) => {
                e.stopPropagation()
                // Download logic with post-download popup
                const link = document.createElement('a')
                link.href = selectedImage.originalUrl
                link.download = `${selectedImage.title}.jpg`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                
                // Show appreciation popup after download
                setTimeout(() => {
                  setShowDonationDialog(true)
                }, 1000)
              }}
            >
              Download
            </button>
          </div>
        </div>
      )}

      {/* Appreciation Dialog */}
      <AppreciationDialog
        isOpen={showDonationDialog}
        onClose={() => setShowDonationDialog(false)}
        photoTitle={selectedImage?.title}
      />
    </>
  )
}
