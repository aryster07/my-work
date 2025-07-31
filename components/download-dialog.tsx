'use client'

import React, { useEffect } from 'react'

interface DownloadDialogProps {
  isOpen: boolean
  onClose: () => void
  imageName: string
  onDownloadComplete?: () => void
}

export function DownloadDialog({ isOpen, onClose, imageName, onDownloadComplete }: Readonly<DownloadDialogProps>) {
  useEffect(() => {
    if (!isOpen) return

    // Start download immediately when dialog opens
    if (onDownloadComplete) {
      onDownloadComplete()
    }
    
    // Close dialog after a brief moment
    const timer = setTimeout(() => {
      onClose()
    }, 500)

    return () => clearTimeout(timer)
  }, [isOpen, onDownloadComplete, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 text-center">
        {/* Icon */}
        <div className="text-4xl mb-3">
          ⬇️
        </div>

        {/* Image Name */}
        <h3 className="text-lg font-semibold text-white mb-3">
          {imageName}
        </h3>

        {/* Simple message */}
        <div className="text-sm text-gray-300 mb-4">
          Starting download...
        </div>
      </div>
    </div>
  )
}
