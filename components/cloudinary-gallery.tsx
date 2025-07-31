'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import AppreciationDialog from './appreciation-dialog'
import CreditDialog from './credit-dialog'

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
  const [showCreditDialog, setShowCreditDialog] = useState(false)
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
        console.log(`🔄 Fetching images for folder: ${folderName}`);
        const response = await fetch(`/api/images?folder=${encodeURIComponent(folderName)}`)
        const data = await response.json()
        console.log(`📊 Gallery API response for ${folderName}:`, data);
        console.log(`🖼️ Number of images found: ${data.images?.length || 0}`);
        
        if (data.error) {
          console.error(`❌ API Error for ${folderName}:`, data.error);
        }
        
        setImages(data.images || [])
      } catch (error) {
        console.error('❌ Error fetching images:', error)
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
        <p className="text-gray-400 mb-4">
          No images were found in the "{folderName}" folder on Cloudinary.
        </p>
        <div className="text-sm text-gray-500">
          <p>Possible reasons:</p>
          <ul className="mt-2 space-y-1">
            <li>• Folder name might be different in Cloudinary</li>
            <li>• Images might be in a subfolder</li>
            <li>• Cloudinary API rate limit reached</li>
          </ul>
          <p className="mt-4 text-xs">Check browser console for detailed error logs.</p>
        </div>
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
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    aria-label={`View ${image.title} in full size`}
                  >
                    <div className={`relative ${getAspectRatioClass()}`}>
                      <Image
                        src={image.imageUrl}
                        alt={image.title}
                        fill
                        className="object-cover transition-all duration-500 hover:scale-105 hover:brightness-110 select-none"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                      />
                      
                      {/* Invisible protection overlay */}
                      <div 
                        className="absolute inset-0 z-10 pointer-events-none select-none"
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                      />
                      
                      {/* Always visible glassy download icon on image - opens preview */}
                      <button
                        className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm border border-white/30 rounded-full w-9 h-9 shadow-lg hover:bg-black/60 transition-all duration-200 z-20 flex items-center justify-center"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          // Open image in modal popup (same as clicking the image)
                          setSelectedImage(image)
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                        aria-label={`Preview and download ${image.title}`}
                      >
                        <Download className="w-4 h-4 text-white" />
                      </button>
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
        <DialogContent className="max-w-6xl w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] md:w-[90vw] md:h-[90vh] p-0 bg-black/95 border-gray-800">
          {selectedImage && (
            <div className="relative w-full h-full flex flex-col">
              {/* Image container */}
              <div className="flex-1 flex items-center justify-center p-4 md:p-6">
                <div className="relative">
                  <Image
                    src={`https://res.cloudinary.com/dmko2zav7/image/upload/q_80,f_auto,w_1200/${selectedImage.publicId}`}
                    alt={selectedImage.title}
                    width={selectedImage.width}
                    height={selectedImage.height}
                    className="max-w-full max-h-[65vh] md:max-h-[70vh] w-auto h-auto object-contain select-none"
                    quality={85}
                    priority
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                  
                  {/* Invisible protection overlay for modal image */}
                  <div 
                    className="absolute inset-0 pointer-events-none select-none"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>

              {/* Download button centered below image */}
              <div className="flex justify-center pb-6">
                <Button
                  onClick={async () => {
                    try {
                      // Use our secure download API instead of direct Cloudinary URL
                      const filename = `${selectedImage.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`
                      const downloadUrl = `/api/download?url=${encodeURIComponent(selectedImage.originalUrl)}&filename=${encodeURIComponent(filename)}`
                      
                      // Create and trigger download link
                      const link = document.createElement('a')
                      link.href = downloadUrl
                      link.download = filename
                      link.rel = 'noopener noreferrer'
                      
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                      
                      // Show random dialog after download (either appreciation or credit dialog)
                      setTimeout(() => {
                        const showCreditDialog = Math.random() < 0.5 // 50% chance for each
                        if (showCreditDialog) {
                          setShowCreditDialog(true)
                        } else {
                          setShowDonationDialog(true)
                        }
                      }, 1000)
                    } catch (error) {
                      console.error('Download failed:', error)
                      alert('Download failed. Please try again.')
                    }
                  }}
                  className="bg-gold hover:bg-gold/90 text-black font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
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

      {/* Credit Dialog */}
      <CreditDialog
        isOpen={showCreditDialog}
        onClose={() => setShowCreditDialog(false)}
        photoTitle={undefined}
      />
    </>
  )
}
