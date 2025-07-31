'use client'

import { useEffect } from 'react'
import { detectDevTools, detectScreenRecording } from '@/lib/security-utils'

export function ImageProtection() {
  useEffect(() => {
    // Initialize security systems
    detectDevTools()
    detectScreenRecording()
    
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Disable dangerous keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const blockedKeys = [
        'F12',
        'PrintScreen'
      ]
      
      const blockedCombos = [
        { ctrl: true, shift: true, key: 'I' }, // Dev Tools
        { ctrl: true, shift: true, key: 'C' }, // Inspect
        { ctrl: true, shift: true, key: 'J' }, // Console
        { ctrl: true, key: 'u' }, // View Source
        { ctrl: true, key: 's' }, // Save Page
        { ctrl: true, key: 'a' }, // Select All
        { ctrl: true, key: 'p' }  // Print
      ]
      
      if (blockedKeys.includes(e.key)) {
        e.preventDefault()
        return false
      }
      
      if (blockedCombos.some(combo => 
        (combo.ctrl === e.ctrlKey) && 
        (combo.shift === undefined || combo.shift === e.shiftKey) && 
        (combo.key === e.key)
      )) {
        e.preventDefault()
        return false
      }
    }

    // Disable print
    const handleBeforePrint = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('dragstart', handleDragStart)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('beforeprint', handleBeforePrint)

    // Disable clipboard operations
    document.addEventListener('copy', (e) => e.preventDefault())
    document.addEventListener('cut', (e) => e.preventDefault())
    document.addEventListener('paste', (e) => e.preventDefault())

    // Mobile-specific protections
    // Disable long press on mobile
    let touchTimer: NodeJS.Timeout
    const handleTouchStart = (e: TouchEvent) => {
      touchTimer = setTimeout(() => {
        e.preventDefault()
      }, 500) // 500ms long press
    }

    const handleTouchEnd = () => {
      clearTimeout(touchTimer)
    }

    const handleTouchMove = () => {
      clearTimeout(touchTimer)
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
    document.addEventListener('touchmove', handleTouchMove)

    // Disable image dragging specifically
    const images = document.querySelectorAll('img')
    images.forEach(img => {
      img.setAttribute('draggable', 'false')
      // Use proper CSS property setting for WebKit
      img.style.setProperty('-webkit-user-drag', 'none')
      img.style.setProperty('-webkit-touch-callout', 'none')
    })

    // Console warning
    console.clear()
    console.log('%c⚠️ WARNING', 'color: red; font-size: 30px; font-weight: bold;')
    console.log('%cThis is a browser feature intended for developers. Images on this site are protected by copyright.', 'color: red; font-size: 16px;')

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('beforeprint', handleBeforePrint)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return null // This component doesn't render anything
}
