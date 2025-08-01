'use client'

import React from 'react'

interface ProgressBarProps {
  readonly progress: number
  readonly isReady?: boolean
  readonly className?: string
}

export function ProgressBar({ progress, isReady = false, className = '' }: Readonly<ProgressBarProps>) {
  const boundedProgress = Math.min(100, Math.max(0, progress))
  // Round to nearest 5 for CSS data attributes
  const roundedProgress = Math.round(boundedProgress / 5) * 5
  
  return (
    <div className={`bg-gray-700 rounded-full h-3 overflow-hidden ${className}`}>
      <div 
        className={`h-full rounded-full transition-all duration-500 ease-out transform ${
          isReady ? 'bg-gold' : 'bg-gold/70'
        } progress-bar-dynamic`}
        data-progress={Math.round(boundedProgress)}
        data-width={roundedProgress}
      ></div>
    </div>
  )
}
