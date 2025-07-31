"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Maximize2, Minimize2, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

interface GalleryNavbarProps {
  categoryTitle?: string
  showBackButton?: boolean
  backLink?: string
  backText?: string
  showFullscreenButton?: boolean
}

export function GalleryNavbar({ 
  categoryTitle = "",
  showBackButton = true,
  backLink = "/#gallery",
  backText = "Back to Gallery",
  showFullscreenButton = true
}: Readonly<GalleryNavbarProps>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Handle fullscreen toggle
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Get navbar background class based on state
  const getNavbarClass = () => {
    if (isMenuOpen) return "bg-black border-b border-gray-800"
    if (isScrolled) return "bg-black/90 backdrop-blur-md border-b border-gray-800"
    return "bg-black/60 backdrop-blur-sm"
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${getNavbarClass()}`}
      >
        <div className="container mx-auto px-4 w-full">
          <div className="flex h-16 items-center justify-between w-full">
            
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between w-full">
              {/* Left - Back Navigation */}
              {showBackButton ? (
                <Button variant="ghost" asChild className="group text-white hover:text-gold">
                  <Link href={backLink} className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    <span className="font-medium">{backText}</span>
                  </Link>
                </Button>
              ) : (
                <Link href="/" className="flex items-center space-x-2">
                  <span className="font-bold text-xl text-white">7Frames_aryan</span>
                </Link>
              )}

              {/* Center - Category Title */}
              {categoryTitle && (
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <h1 className="text-lg font-semibold text-white">{categoryTitle}</h1>
                </div>
              )}

              {/* Right - Navigation & Fullscreen */}
              <div className="flex items-center space-x-4">
                <nav className="flex items-center space-x-6">
                  <Link
                    href="/"
                    className="text-sm font-medium text-white hover:text-gold transition-colors relative group"
                  >
                    Home{" "}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                  <Link
                    href="/#gallery"
                    className="text-sm font-medium text-white hover:text-gold transition-colors relative group"
                  >
                    Gallery{" "}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-medium text-white hover:text-gold transition-colors relative group"
                  >
                    Contact{" "}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                </nav>
                
                {/* Fullscreen Toggle */}
                {showFullscreenButton && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleFullscreen}
                    className="text-white hover:text-gold hover:bg-white/10"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-5 w-5" />
                    ) : (
                      <Maximize2 className="h-5 w-5" />
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex items-center justify-between w-full">
              {/* Left - Back Button or Logo */}
              {showBackButton ? (
                <Button variant="ghost" asChild className="p-2">
                  <Link href={backLink} className="flex items-center">
                    <ArrowLeft className="h-5 w-5 text-white" />
                  </Link>
                </Button>
              ) : (
                <Link href="/" className="flex items-center space-x-2">
                  <span className="font-bold text-lg text-white">7Frames_aryan</span>
                </Link>
              )}

              {/* Center - Category Title (Mobile) */}
              {categoryTitle && (
                <div className="flex-1 text-center">
                  <h1 className="text-base font-medium text-white truncate px-2">{categoryTitle}</h1>
                </div>
              )}

              {/* Right - Fullscreen & Menu */}
              <div className="flex items-center space-x-2">
                {showFullscreenButton && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleFullscreen}
                    className="text-white hover:text-gold"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-5 w-5" />
                    ) : (
                      <Maximize2 className="h-5 w-5" />
                    )}
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
                  <Menu className="h-5 w-5 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9999] md:hidden">
          <button 
            className="absolute inset-0 bg-transparent cursor-pointer border-0 p-0"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            type="button"
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-black border-r border-gray-700 shadow-2xl transform transition-transform duration-200 ease-out z-[9999] relative">
            <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-black">
              <span className="font-bold text-lg text-white">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="hover:bg-gray-800">
                <X className="h-6 w-6 text-white" />
              </Button>
            </div>
            <nav className="flex flex-col p-4 space-y-4 bg-black h-full overflow-y-auto">
              <Link 
                href="/" 
                className="text-lg font-medium text-white hover:text-gold transition-colors py-3 px-4 rounded-lg hover:bg-gray-800 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#gallery" 
                className="text-lg font-medium text-white hover:text-gold transition-colors py-3 px-4 rounded-lg hover:bg-gray-800 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                href="/#about" 
                className="text-lg font-medium text-white hover:text-gold transition-colors py-3 px-4 rounded-lg hover:bg-gray-800 block"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-lg font-medium text-white hover:text-gold transition-colors py-3 px-4 rounded-lg hover:bg-gray-800 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Me
              </Link>
              <Link 
                href="/support" 
                className="text-lg font-medium text-white hover:text-gold transition-colors py-3 px-4 rounded-lg hover:bg-gray-800 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
