'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface ProgressiveImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  draggable?: boolean
  onContextMenu?: (e: React.MouseEvent) => void
  onDragStart?: (e: React.DragEvent) => void
  width?: number
  height?: number
  priority?: boolean
}

// Simple loading animation - Windows 7 style
const getSimpleLoader = () => {
  return {
    icon: (
      <div className="w-8 h-8 border-2 border-gray-300 border-t-gold rounded-full animate-spin"></div>
    ),
    text: "Loading...",
    spinner: false
  }
}

// Helper function to get low-quality placeholder from Cloudinary URL
const getLowQualityUrl = (src: string): string => {
  // Extract the Cloudinary URL parts
  const cloudinaryBaseUrl = 'https://res.cloudinary.com/'
  
  if (!src.includes(cloudinaryBaseUrl)) {
    return src // Return original if not a Cloudinary URL
  }
  
  // Parse Cloudinary URL to inject low quality parameters
  const urlParts = src.split('/')
  const uploadIndex = urlParts.findIndex(part => part === 'upload')
  
  if (uploadIndex === -1) {
    return src // Return original if not a standard Cloudinary upload URL
  }
  
  // Insert aggressive low quality transformations after 'upload'
  // w_40: very small width, q_10: very low quality, e_blur:200: blur effect, f_auto: auto format
  const lowQualityTransforms = 'w_40,q_10,e_blur:200,f_auto'
  const newUrlParts = [...urlParts]
  
  // Check if there are existing transformations
  if (uploadIndex + 1 < urlParts.length && !urlParts[uploadIndex + 1].includes('.')) {
    // There are existing transformations, replace them with our low quality ones
    newUrlParts[uploadIndex + 1] = lowQualityTransforms
  } else {
    // No existing transformations, insert our low quality ones
    newUrlParts.splice(uploadIndex + 1, 0, lowQualityTransforms)
  }
  
  return newUrlParts.join('/')
}

export function ProgressiveImage({
  src,
  alt,
  fill = false,
  className = '',
  sizes,
  draggable = false,
  onContextMenu,
  onDragStart,
  width,
  height,
  priority = false,
}: Readonly<ProgressiveImageProps>) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHighResLoaded, setIsHighResLoaded] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const [lowQualitySrc] = useState(() => src ? getLowQualityUrl(src) : '')
  const [loader] = useState(() => getSimpleLoader()) // Simple loader

  // Preload the high-resolution image
  useEffect(() => {
    const img = new window.Image()
    img.onload = () => {
      setIsHighResLoaded(true)
      // Hide loader after a brief delay to ensure smooth transition
      setTimeout(() => setShowLoader(false), 200)
    }
    img.src = src
  }, [src])

  const baseClassName = `transition-all duration-500 select-none ${className}`
  const lowQualityClassName = `${baseClassName} ${isHighResLoaded ? 'opacity-0' : 'opacity-100'}`
  const highQualityClassName = `${baseClassName} ${isHighResLoaded ? 'opacity-100' : 'opacity-0'}`

  return (
    <div className="relative w-full h-full">
      {/* Simple Loading Animation */}
      {showLoader && !isHighResLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm rounded-lg">
          <div className="text-center">
            {/* Simple spinning icon */}
            <div className="relative mb-3">
              {loader.icon}
            </div>
            {/* Simple loading text */}
            <div className="text-sm text-gray-300 font-medium">
              {loader.text}
            </div>
          </div>
        </div>
      )}

      {/* Low quality placeholder - loads immediately */}
      {lowQualitySrc && (
        <Image
          src={lowQualitySrc}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={lowQualityClassName}
          sizes={sizes}
          draggable={draggable}
          onContextMenu={onContextMenu}
          onDragStart={onDragStart}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            console.warn('Failed to load low quality image:', lowQualitySrc)
            setIsLoaded(true) // Still continue to high quality
          }}
        />
      )}
      
      {/* High quality image - loads in background */}
      {isLoaded && src && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={highQualityClassName}
          sizes={sizes}
          draggable={draggable}
          onContextMenu={onContextMenu}
          onDragStart={onDragStart}
          onLoad={() => setIsHighResLoaded(true)}
          onError={() => {
            console.warn('Failed to load high quality image:', src)
            // Keep low quality image visible
          }}
        />
      )}
    </div>
  )
}
