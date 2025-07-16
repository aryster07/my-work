'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
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
  const [currentPage, setCurrentPage] = useState(1)
  const [showDonationDialog, setShowDonationDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(null)
  const imagesPerPage = 36 // Increased for better UX with large galleries

  // Calculate pagination
  const totalPages = Math.ceil(images.length / imagesPerPage)
  const startIndex = (currentPage - 1) * imagesPerPage
  const endIndex = startIndex + imagesPerPage
  const currentImages = images.slice(startIndex, endIndex)

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
      <>
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-400">Loading images...</div>
        </div>
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
      </>
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
      {/* Gallery Header with Image Count */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-400">
          {images.length} {images.length === 1 ? 'image' : 'images'} 
          {totalPages > 1 && (
            <span className="ml-2">• Page {currentPage} of {totalPages}</span>
          )}
        </div>
        <div className="text-sm text-gray-500">
          {totalPages > 1 && (
            <span>Page {currentPage} of {totalPages}</span>
          )}
        </div>
      </div>

      {/* Image Grid */}
      {/* Masonry Layout with Instagram-style Aspect Ratios */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
        {currentImages.map((image) => {
          // Instagram-style aspect ratio logic
          const getAspectRatioClass = () => {
            if (image.isLandscape) {
              // Landscape: Use 16:9 or similar wide format
              return 'aspect-[16/9]'
            } else if (image.aspectRatio < 0.8) {
              // Portrait: Use Instagram's 4:5 ratio
              return 'aspect-[4/5]'
            } else {
              // Square or near-square: Use 1:1
              return 'aspect-square'
            }
          }

          return (
            <div 
              key={image.id} 
              className="break-inside-avoid mb-3 sm:mb-4"
            >
              <Card className="overflow-hidden bg-gray-900 border-gray-700 hover:border-gold/50 transition-all duration-300">
                {/* Image Section Only */}
                <CardContent className="p-0 relative">
                  <button 
                    className="relative overflow-hidden cursor-pointer w-full h-full bg-transparent border-none p-0"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      // Open image in modal popup
                      setSelectedImage(image)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelectedImage(image)
                      }
                    }}
                    aria-label={`View ${image.title} in full size`}
                  >
                    <div className={`relative ${getAspectRatioClass()}`}>
                      <Image
                        src={image.imageUrl}
                        alt={image.title}
                        fill
                        className="object-cover transition-all duration-500 hover:scale-105 hover:brightness-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                      />
                      
                      {/* Always visible glassy download icon on image */}
                      <div className="absolute bottom-2 right-2 bg-black/30 backdrop-blur-md border border-white/20 rounded-full p-2 shadow-lg">
                        <Download className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </button>
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

      {/* Image Modal Popup */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-[98vw] h-[98vh] md:w-[95vw] md:h-[95vh] p-0 bg-black/95 border-gray-800">
          {selectedImage && (
            <div className="relative w-full h-full flex flex-col">
              {/* Image container */}
              <div className="flex-1 flex flex-col items-center justify-center p-2 md:p-4">
                <div className="relative max-w-full max-h-full mb-4 md:mb-6">
                  <Image
                    src={`https://res.cloudinary.com/dmko2zav7/image/upload/q_80,f_auto,w_1200/${selectedImage.publicId}`}
                    alt={selectedImage.title}
                    width={selectedImage.width}
                    height={selectedImage.height}
                    className="max-w-full max-h-[70vh] md:max-h-[75vh] w-auto h-auto object-contain"
                    quality={85}
                    priority
                  />
                </div>

                {/* Download button under the image */}
                <Button
                  onClick={() => {
                    // Enhanced download logic
                    try {
                      const link = document.createElement('a')
                      link.href = selectedImage.originalUrl
                      link.download = `${selectedImage.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`
                      link.target = '_blank'
                      link.rel = 'noopener noreferrer'
                      
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
                      window.open(selectedImage.originalUrl, '_blank')
                    }
                  }}
                  className="bg-gold hover:bg-gold/90 text-black font-semibold px-6 py-3 md:px-8 md:py-3 rounded-lg transition-colors touch-manipulation"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Image
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Appreciation Dialog */}
      <AppreciationDialog
        isOpen={showDonationDialog}
        onClose={() => setShowDonationDialog(false)}
        photoTitle={undefined}
      />
    </>
  )
}
