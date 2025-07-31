'use client'

import React, { useState, useEffect } from 'react'

interface DownloadDialogProps {
  isOpen: boolean
  onClose: () => void
  imageName: string
  onDownloadComplete?: () => void
}

// Simple download animation
const getSimpleDownloadAnimation = () => {
  return {
    icon: "⬇️",
    messages: [
      "Preparing download...",
      "Processing file...", 
      "Almost ready...",
      "Download complete!"
    ],
    duration: 800
  }
}

export function DownloadDialog({ isOpen, onClose, imageName, onDownloadComplete }: Readonly<DownloadDialogProps>) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [animation] = useState(() => getSimpleDownloadAnimation())

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0)
      setIsComplete(false)
      return
    }

    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < animation.messages.length - 1) {
          return prev + 1
        } else {
          handleStepComplete()
          return prev
        }
      })
    }, animation.duration)

    return () => clearInterval(timer)
  }, [isOpen, animation.duration, animation.messages.length])

    const handleStepComplete = () => {
      setIsComplete(true)
      // Trigger the actual download
      if (onDownloadComplete) {
        onDownloadComplete()
      }
      // Auto close after showing completion
      const autoCloseTimer = setTimeout(() => {
        onClose()
      }, 1500)
      return autoCloseTimer
    }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 text-center">
        {/* Icon */}
        <div className="text-6xl mb-4">
          {animation.icon}
        </div>

        {/* Image Name */}
        <h3 className="text-xl font-semibold text-white mb-4">
          {imageName}
        </h3>

        {/* Current Step Message */}
        <div className="text-lg text-gray-300 mb-6 min-h-[2rem]">
          {animation.messages[currentStep] || animation.messages[0]}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className={`bg-gradient-to-r from-gold via-yellow-400 to-gold h-full rounded-full download-progress-bar animate-shimmer`}
              data-progress={Math.round(((currentStep + 1) / animation.messages.length) * 100)}
            />
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Step {currentStep + 1} of {animation.messages.length}
          </div>
        </div>

        {/* Status */}
        <div className="text-sm font-medium text-gray-400">
          {isComplete ? '🎉 Download Ready!' : 'Preparing Download...'}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}
