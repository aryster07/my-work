'use client'

// Developer Tools Detection
export function detectDevTools() {
  let devtools = { open: false }
  
  // Detection based on console behavior
  const threshold = 160
  
  setInterval(() => {
    const start = performance.now()
    debugger // This will pause if dev tools are open
    const end = performance.now()
    
    if (end - start > threshold) {
      devtools.open = true
      // Blur all images when dev tools are detected
      document.body.classList.add('dev-tools-open')
      console.clear()
      console.log('%c⚠️ UNAUTHORIZED ACCESS DETECTED', 'color: red; font-size: 20px; font-weight: bold;')
      console.log('%cImages are protected by copyright law. Unauthorized downloading is prohibited.', 'color: red; font-size: 14px;')
    } else {
      devtools.open = false
      document.body.classList.remove('dev-tools-open')
    }
  }, 500)
  
  return devtools
}

// Invisible Watermark Function
export function addInvisibleWatermark(imageUrl: string, text: string): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      
      if (ctx) {
        // Draw the original image
        ctx.drawImage(img, 0, 0)
        
        // Add invisible watermark (very low opacity)
        ctx.globalAlpha = 0.01
        ctx.font = '20px Arial'
        ctx.fillStyle = 'white'
        ctx.fillText(text, img.width - 200, img.height - 20)
        
        // Reset alpha
        ctx.globalAlpha = 1.0
      }
      
      resolve(canvas.toDataURL())
    }
    
    img.src = imageUrl
  })
}

// Screen Recording Detection
export function detectScreenRecording() {
  // Detect screen recording by checking for unusual behavior
  let isRecording = false
  
  // Monitor for screen recording indicators
  if ('mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices) {
    // Block screen sharing/recording
    const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia
    navigator.mediaDevices.getDisplayMedia = function() {
      console.warn('Screen recording blocked')
      return Promise.reject(new Error('Screen recording is not allowed'))
    }
  }
  
  return isRecording
}

// Console Protection
export function protectConsole() {
  // Clear console periodically
  setInterval(() => {
    console.clear()
  }, 1000)
  
  // Override console methods
  const noop = () => {}
  
  if (typeof window !== 'undefined') {
    window.console.log = noop
    window.console.warn = noop
    window.console.error = noop
    window.console.info = noop
    window.console.debug = noop
  }
}

// Image Source Protection (Changes src to data URL)
export function protectImageSrc(imageElement: HTMLImageElement) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (ctx && imageElement.complete) {
    canvas.width = imageElement.naturalWidth
    canvas.height = imageElement.naturalHeight
    
    ctx.drawImage(imageElement, 0, 0)
    
    // Add protection layer
    ctx.globalAlpha = 0.02
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Replace src with data URL
    imageElement.src = canvas.toDataURL('image/jpeg', 0.9)
  }
}
