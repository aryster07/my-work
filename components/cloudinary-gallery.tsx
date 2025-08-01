'use client'

import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, ArrowLeft } from 'lucide-react'
import AppreciationDialog from './appreciation-dialog'
import CreditDialog from './credit-dialog'
import { ProgressiveImage } from './progressive-image'
import { ProgressBar } from './progress-bar'
import { trackEvent } from '@/lib/analytics'

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
  downloadCount?: number
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
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null)
  const [showAdModal, setShowAdModal] = useState(false)
  const [isDownloadReady, setIsDownloadReady] = useState(false)
  const [pendingDownload, setPendingDownload] = useState<{filename: string, blob: Blob} | null>(null)
  const [adBlockerDetected, setAdBlockerDetected] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const downloadButtonRef = React.useRef<HTMLButtonElement>(null)
  const imagesPerPage = 80 // Increased for smaller compact grid

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
        
        // Track category view
        trackEvent.viewCategory(folderName)
      } catch (error) {
        console.error('❌ Error fetching images:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [folderName])

  // Ad blocker detection
  useEffect(() => {
    const detectAdBlocker = () => {
      // Create a test ad element
      const testAd = document.createElement('div')
      testAd.innerHTML = '&nbsp;'
      testAd.className = 'adsbox'
      testAd.style.position = 'absolute'
      testAd.style.left = '-9999px'
      document.body.appendChild(testAd)
      
      setTimeout(() => {
        if (testAd.offsetHeight === 0) {
          setAdBlockerDetected(true)
        }
        document.body.removeChild(testAd)
      }, 100)
    }
    
    detectAdBlocker()
  }, [])

  // Focus Download Now button when download is ready
  useEffect(() => {
    if (isDownloadReady && downloadButtonRef.current) {
      downloadButtonRef.current.focus()
    }
  }, [isDownloadReady])

  const startDownloadWithAd = async (image: CloudinaryImage) => {
    try {
      // Track download start
      trackEvent.downloadImage(image.publicId, folderName)
      trackEvent.adViewed('8743509731')
      
      // Show ad modal immediately
      setShowAdModal(true)
      setDownloadProgress(0)
      setIsDownloadReady(false)
      
      const filename = `${image.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`
      const downloadUrl = `/api/download?url=${encodeURIComponent(image.originalUrl)}&filename=${encodeURIComponent(filename)}`
      
      // Start progress simulation while download happens
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 95) {
            return prev // Don't go above 95% until download actually completes
          }
          // Smoother increments that slow down as we approach 95%
          const increment = Math.max(1, (95 - prev) * 0.1 + Math.random() * 3)
          return Math.min(95, prev + increment)
        })
      }, 300)
      
      // Start preparing download in background while ad is showing
      const response = await fetch(downloadUrl)
      if (!response.ok) throw new Error('Download failed')
      
      const blob = await response.blob()
      
      // Clear progress interval and complete the progress
      clearInterval(progressInterval)
      setDownloadProgress(100)
      
      // Store the download data and mark as ready
      setPendingDownload({ filename, blob })
      setIsDownloadReady(true)
      
    } catch (error) {
      console.error('Download preparation failed:', error)
      setDownloadStatus('Download failed. Please try again.')
      setTimeout(() => setDownloadStatus(null), 3000)
      setShowAdModal(false)
    }
  }

  const executeDownload = () => {
    // Only allow download if ready
    if (!isDownloadReady || !pendingDownload || !selectedImage) {
      return
    }
    
    const { filename, blob } = pendingDownload
    const url = window.URL.createObjectURL(blob)
    
    // Create link with forced download
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up
    window.URL.revokeObjectURL(url)
    setPendingDownload(null)
    setIsDownloadReady(false)
    setShowAdModal(false)
    setDownloadProgress(0)
    
    // Update download count
    updateDownloadCount(selectedImage.id)
    
    setSelectedImage(null)
      
    // Show appreciation dialog
    setTimeout(() => {
      const showCreditDialog = Math.random() < 0.5
      if (showCreditDialog) {
        setShowCreditDialog(true)
      } else {
        setShowDonationDialog(true)
      }
    }, 1000)
  }

  const updateDownloadCount = async (imageId: number) => {
    try {
      // Update local state immediately for better UX
      setImages(prevImages => 
        prevImages.map(img => 
          img.id === imageId 
            ? { ...img, downloadCount: (img.downloadCount || 0) + 1 }
            : img
        )
      )
      
      // Send to API to persist the count
      await fetch('/api/download-count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          imageId, 
          folderName,
          publicId: selectedImage?.publicId 
        }),
      })
    } catch (error) {
      console.error('Failed to update download count:', error)
    }
  }

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
    <div className="h-full w-full overflow-y-auto px-1 sm:px-3 md:px-4 lg:px-5 py-2 sm:pl-16">
      {/* Gallery Header with Image Count - Compact */}
      <div className="flex justify-between items-center mb-4 py-1">
        <div className="text-gray-400 text-sm font-medium">
          {images.length} {images.length === 1 ? 'image' : 'images'}
        </div>
      </div>

      {/* Masonry-Style Grid Layout - Compact for All Devices */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-1 sm:gap-2 md:gap-2 lg:gap-3 space-y-1 sm:space-y-2 md:space-y-2 lg:space-y-3">
        {currentImages.map((image) => {
          return (
            <div 
              key={image.id} 
              className="break-inside-avoid mb-1 sm:mb-1 md:mb-2 lg:mb-2"
            >
              <Card className="overflow-hidden bg-gray-900/90 border-gray-700/50 hover:border-gold/40 hover:bg-gray-800/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                {/* Image Section with Natural Aspect Ratio */}
                <CardContent className="p-0 relative group">
                  <button 
                    className="relative overflow-hidden cursor-pointer w-full h-full bg-transparent border-none p-0"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('Image clicked:', image.title)
                      console.log('Setting selected image:', image)
                      // Track image view
                      trackEvent.viewImage(image.publicId, folderName)
                      // Open image in modal popup
                      setSelectedImage(image)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        // Track image view
                        trackEvent.viewImage(image.publicId, folderName)
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
                        className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-[1.02] group-hover:brightness-110 select-none rounded-sm"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1536px) 16.66vw, 14.28vw"
                        draggable={false}
                        onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                        onDragStart={(e: React.DragEvent) => e.preventDefault()}
                        priority={false}
                      />
                      
                      {/* Invisible protection overlay */}
                      <div className="absolute inset-0 z-10 pointer-events-none select-none" />
                      
                      {/* Enhanced download icon with better visibility */}
                      <button
                        className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md border border-white/40 rounded-full w-9 h-9 shadow-lg hover:bg-black/80 hover:border-gold/60 transition-all duration-200 z-20 flex items-center justify-center opacity-80 hover:opacity-100"
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
                        <Download className="w-4 h-4 text-white hover:text-gold transition-colors" />
                      </button>
                    </div>
                  </button>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8 mb-4">
          <button
            disabled={currentPage === 1}
            className="px-5 py-2.5 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700/80 transition-all duration-200 border border-gray-700 hover:border-gray-600 font-medium"
            onClick={() => {
              const newPage = Math.max(1, currentPage - 1)
              setCurrentPage(newPage)
              // Scroll to top when changing pages
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1
              const isActive = pageNum === currentPage
              return (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum)
                    // Scroll to top when changing pages
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className={`px-4 py-2.5 rounded-lg transition-all duration-200 font-semibold border ${
                    isActive 
                      ? 'bg-gradient-to-r from-gold to-yellow-500 text-black border-gold shadow-lg shadow-gold/25' 
                      : 'bg-gray-800/80 backdrop-blur-sm text-white hover:bg-gray-700/80 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>
          
          <button
            disabled={currentPage === totalPages}
            className="px-5 py-2.5 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700/80 transition-all duration-200 border border-gray-700 hover:border-gray-600 font-medium"
            onClick={() => {
              const newPage = Math.min(totalPages, currentPage + 1)
              setCurrentPage(newPage)
              // Scroll to top when changing pages
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Next
          </button>
        </div>
      )}

      {/* Enhanced Image Modal Popup */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 w-screen h-screen bg-black/96 backdrop-blur-md flex items-center justify-center overflow-hidden">
          {/* Enhanced Back Button - Top Left */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 p-2.5 h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-black/90 backdrop-blur-md border border-gray-600/50 hover:border-gold/60 hover:bg-black/95 transition-all duration-200 group shadow-lg"
            aria-label="Back to gallery"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-gold transition-colors" />
          </button>

          {/* Enhanced Modal Content */}
          <div className="flex flex-col items-center justify-center w-full h-full max-w-full max-h-full px-4 py-16 sm:py-20 space-y-6">
            <div className="relative flex-shrink-0 max-w-full max-h-full flex items-center justify-center">
              <ProgressiveImage
                src={`https://res.cloudinary.com/dmko2zav7/image/upload/q_90,f_auto,w_1400/${selectedImage.publicId}`}
                alt={selectedImage.title}
                width={selectedImage.width}
                height={selectedImage.height}
                className="max-w-[92vw] max-h-[55vh] w-auto h-auto object-contain select-none rounded-lg shadow-2xl"
                priority
                draggable={false}
                onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
              />
            </div>

            {/* Download Button */}
            <div className="flex-shrink-0 w-full flex justify-center">
              <Button
                onClick={() => startDownloadWithAd(selectedImage)}
                className="bg-gradient-to-r from-gold to-yellow-500 hover:from-gold/90 hover:to-yellow-500/90 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/40 border border-gold/30 transform hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
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

      {/* Download Status Popup */}
      {downloadStatus && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
          <div className="bg-black/90 backdrop-blur-sm text-white px-6 py-4 rounded-lg shadow-2xl border border-gold/30 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
              <span className="font-medium">{downloadStatus}</span>
            </div>
          </div>
        </div>
      )}

      {/* Ad Modal */}
      {showAdModal && (
        <div className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-sm flex items-center justify-center">
          <Script
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6821462473342756"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
          <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700 max-w-lg w-full mx-4 overflow-hidden">
            {/* Ad Header */}
            <div className="bg-gradient-to-r from-gold/20 to-yellow-500/20 p-4 border-b border-gray-700">
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Download className="w-4 h-4" />
                  <span>We're getting your image ready to download, please wait...</span>
                </div>
              </div>
            </div>

            {/* Google AdSense Integration */}
            <div className="p-4 bg-gray-800 min-h-[300px] flex flex-col items-center justify-center">
              {adBlockerDetected ? (
                /* Ad Blocker Detected - Humorous Message */
                <div className="text-center space-y-4 p-6">
                  <div className="text-6xl mb-4">😢</div>
                  <h3 className="text-xl font-bold text-gold mb-2">Oh no! Ad blocker detected!</h3>
                  <p className="text-gray-300 mb-4">
                    We know you hate ads, but please consider helping us poor photographers! 🥺
                  </p>
                  <p className="text-sm text-gray-400 mb-6">
                    These ads help keep our lights on and our cameras clicking! 📸✨
                  </p>
                  <div className="text-center space-y-3">
                    <p className="text-gold font-semibold">
                      {isDownloadReady ? 'Download Ready!' : 'Preparing download...'}
                    </p>
                    <ProgressBar 
                      progress={downloadProgress}
                      isReady={isDownloadReady}
                      className="w-64"
                    />
                    <p className="text-sm text-gray-400">
                      {Math.round(Math.min(100, Math.max(0, downloadProgress)))}% complete
                    </p>
                  </div>
                </div>
              ) : (
                /* Ad Section */
                <>
                  {/* Visible placeholder for ads */}
                  <div className="w-full max-w-md mb-4 bg-gray-700 rounded-lg p-8 border-2 border-dashed border-gray-600">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📺</div>
                      <p className="text-gray-300 mb-2">Advertisement</p>
                      <p className="text-sm text-gray-400">Supporting our photography work</p>
                    </div>
                    
                    {/* AdSense Ad Unit with proper implementation */}
                    <div className="w-full min-h-[200px] flex items-center justify-center">
                      <ins 
                        className="adsbygoogle block w-full h-[200px]"
                        data-ad-client="ca-pub-6821462473342756"
                        data-ad-slot="8743509731"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                      ></ins>
                    </div>
                  </div>
                  
                  {/* Download Progress */}
                  <div className="text-center space-y-3">
                    <p className="text-gold font-semibold">
                      {isDownloadReady ? 'Download Ready!' : 'Preparing download...'}
                    </p>
                    <ProgressBar 
                      progress={downloadProgress}
                      isReady={isDownloadReady}
                      className="w-64"
                    />
                    <p className="text-sm text-gray-400">
                      {Math.round(Math.min(100, Math.max(0, downloadProgress)))}% complete
                    </p>
                  </div>

                  {/* AdSense Initialization Script */}
                  <Script id="adsbygoogle-init" strategy="afterInteractive">
                    {`
                      (function() {
                        if (typeof window !== 'undefined' && window.adsbygoogle) {
                          try {
                            (adsbygoogle = window.adsbygoogle || []).push({});
                          } catch (e) {
                            console.log('AdSense initialization skipped');
                          }
                        }
                      })();
                    `}
                  </Script>
                </>
              )}
            </div>

            {/* Ad Footer with Controls */}
            <div className="p-4 bg-gray-900 border-t border-gray-700">
              <div className="flex items-center justify-center">
                <div className="flex gap-3">
                  {/* Download Now Button - Always visible, enabled when download is ready */}
                  <Button
                    ref={downloadButtonRef}
                    onClick={executeDownload}
                    disabled={!isDownloadReady}
                    className={`px-8 py-3 text-sm font-bold transition-all duration-500 transform ${
                      isDownloadReady
                        ? 'bg-gradient-to-r from-gold to-yellow-500 hover:from-gold/90 hover:to-yellow-500/90 text-white shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/40 border border-gold/30 hover:scale-105 cursor-pointer focus:ring-2 focus:ring-gold/50 focus:outline-none' 
                        : 'bg-gray-700 text-gray-400 border border-gray-600 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isDownloadReady ? 'Download Now' : 'Preparing...'}
                  </Button>
                  
                  {/* Cancel Button - Always visible */}
                  <Button
                    onClick={() => {
                      setShowAdModal(false)
                      setSelectedImage(null)
                      setPendingDownload(null)
                      setIsDownloadReady(false)
                      setDownloadProgress(0)
                    }}
                    variant="outline"
                    className="border-red-500/60 text-red-400 hover:bg-red-500/10 hover:border-red-500 px-6 py-3 text-sm font-medium transition-all duration-300 hover:text-red-300 cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
