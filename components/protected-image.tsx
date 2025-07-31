'use client'

interface ProtectedImageProps {
  src: string
  alt: string
  className?: string
  children?: React.ReactNode
}

export function ProtectedImage({ src, alt, className = '', children }: ProtectedImageProps) {
  return (
    <div className="relative inline-block">
      {/* Base image */}
      <img 
        src={src} 
        alt={alt} 
        className={`${className} select-none`}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        style={{
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserDrag: 'none'
        }}
      />
      
      {/* Invisible protection overlay */}
      <div 
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background: 'transparent',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none'
        }}
      />
      
      {/* Subtle watermark (barely visible) */}
      <div 
        className="absolute bottom-1 right-1 text-white text-xs opacity-5 pointer-events-none select-none font-mono"
        style={{
          textShadow: '0 0 1px rgba(0,0,0,0.8)',
          WebkitUserSelect: 'none'
        }}
      >
        © 7frames_aryan
      </div>
      
      {children}
    </div>
  )
}
