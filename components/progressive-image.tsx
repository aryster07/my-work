'use client'

import React, { useState } from 'react'
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
  }
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
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loader] = useState(() => getSimpleLoader())

  const imageClassName = `transition-opacity duration-300 select-none ${className}`

  return (
    <div className="relative w-full h-full">
      {/* Loading Animation - shown until image loads */}
      {!isImageLoaded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-3">
              {loader.icon}
            </div>
            <div className="text-sm text-gray-300 font-medium">
              {loader.text}
            </div>
          </div>
        </div>
      )}

      {/* Main Image - completely hidden until loaded */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`${imageClassName} ${isImageLoaded ? 'opacity-100' : 'opacity-0 invisible'}`}
        sizes={sizes}
        draggable={draggable}
        onContextMenu={onContextMenu}
        onDragStart={onDragStart}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        placeholder="empty"
        onLoad={() => setIsImageLoaded(true)}
      />
    </div>
  )
}
