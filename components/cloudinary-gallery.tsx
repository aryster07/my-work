'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import AppreciationDialog from './appreciation-dialog'
import CreditDialog from './credit-dialog'
import { ProgressiveImage } from './progressive-image'

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
  const imagesPerPage = 48 // Increased for full-screen view

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
    <div className="h-full w-full overflow-y-auto px-2 sm:px-4 py-4">
      {/* Gallery Header with Image Count - Non-sticky */}
      <div className="flex justify-between items-center mb-6 py-2">
        <div className="text-gray-400 text-sm">
          {images.length} {images.length === 1 ? 'image' : 'images'}
        </div>
      </div>

      {/* Masonry-Style Grid - Eliminates Blank Spaces */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-1 sm:gap-2 md:gap-3 space-y-1 sm:space-y-2 md:space-y-3">
        {currentImages.map((image) => {
          return (
            <div 
              key={image.id} 
              className="w-full break-inside-avoid mb-1 sm:mb-2 md:mb-3"
            >
              <Card className="overflow-hidden bg-gray-900 border-gray-700 hover:border-gold/50 transition-all duration-300">
                {/* Image Section with Natural Aspect Ratio */}
                <CardContent className="p-0 relative">
                  <button 
                    className="relative overflow-hidden cursor-pointer w-full h-full bg-transparent border-none p-0"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('Image clicked:', image.title)
                      console.log('Setting selected image:', image)
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
                    {/* Natural aspect ratio for masonry layout */}
                    <div className="relative w-full">
                      <ProgressiveImage
                        src={image.imageUrl}
                        alt={image.title}
                        width={image.width}
                        height={image.height}
                        className="w-full h-auto object-cover transition-all duration-300 hover:scale-[1.02] hover:brightness-110 select-none rounded-sm"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1536px) 16.66vw, 14.28vw"
                        draggable={false}
                        onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                        onDragStart={(e: React.DragEvent) => e.preventDefault()}
                        priority={false}
                      />
                      
                      {/* Invisible protection overlay */}
                      <div className="absolute inset-0 z-10 pointer-events-none select-none" />
                      
                      {/* Always visible glassy download icon on image - opens preview */}
                      <button
                        className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm border border-white/30 rounded-full w-9 h-9 shadow-lg hover:bg-black/60 transition-all duration-200 z-20 flex items-center justify-center"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          console.log('Download button clicked:', image.title)
                          console.log('Setting selected image:', image)
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
      {selectedImage && (
        <div className="fixed inset-0 z-50 w-screen h-screen bg-black/95 backdrop-blur-sm flex items-center justify-center overflow-hidden">
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/80 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors shadow-lg border border-white/20"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Content */}
          <div className="flex flex-col items-center justify-center w-full h-full max-w-full max-h-full px-4 py-20 space-y-6">
            <div className="relative flex-shrink-0 max-w-full max-h-full flex items-center justify-center">
              <ProgressiveImage
                src={`https://res.cloudinary.com/dmko2zav7/image/upload/q_80,f_auto,w_1200/${selectedImage.publicId}`}
                alt={selectedImage.title}
                width={selectedImage.width}
                height={selectedImage.height}
                className="max-w-[90vw] max-h-[50vh] w-auto h-auto object-contain select-none rounded-lg shadow-2xl"
                priority
                draggable={false}
                onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                onDragStart={(e: React.DragEvent) => e.preventDefault()}
              />
            </div>

            {/* Download Button - Always Visible */}
            <div className="flex-shrink-0 w-full flex justify-center">
              <Button
                onClick={async () => {
                  try {
                    const filename = `${selectedImage.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`
                    const downloadUrl = `/api/download?url=${encodeURIComponent(selectedImage.originalUrl)}&filename=${encodeURIComponent(filename)}`
                    
                    // Use fetch and blob to force download
                    const response = await fetch(downloadUrl)
                    if (!response.ok) throw new Error('Download failed')
                    
                    const blob = await response.blob()
                    const url = window.URL.createObjectURL(blob)
                    
                    // Create link with forced download
                    const link = document.createElement('a')
                    link.href = url
                    link.download = filename
                    link.style.display = 'none'
                    
                    // Force click without target blank
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    
                    // Clean up blob URL
                    window.URL.revokeObjectURL(url)
                    
                    // Close modal
                    setSelectedImage(null)
                    
                    // Show appreciation dialog after download
                    setTimeout(() => {
                      const showCreditDialog = Math.random() < 0.5
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
                className="bg-gold hover:bg-gold/90 text-black font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg text-sm flex-shrink-0"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
            </div>
          </div>
        </div>
      )}

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
    </div>
  )
}
