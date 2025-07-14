"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when menu is open to avoid visual glitches
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Get navbar background class based on state
  const getNavbarClass = () => {
    if (isMenuOpen) return "bg-black border-b border-gray-800"
    if (isScrolled) return "bg-black/80 backdrop-blur-md border-b border-gray-800"
    return "bg-transparent"
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarClass()}`}
      >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between w-full">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-white">7frames_aryan</span>
            </Link>

            <nav className="flex items-center space-x-8">
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
                href="/#about"
                className="text-sm font-medium text-white hover:text-gold transition-colors relative group"
              >
                About{" "}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-white hover:text-gold transition-colors relative group"
              >
                Contact Me{" "}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/support"
                className="text-sm font-medium text-white hover:text-gold transition-colors relative group"
              >
                Support{" "}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            </nav>
          </div>

          {/* Mobile Layout - brand on left, menu on right */}
          <div className="md:hidden flex items-center justify-between w-full">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-white">7frames_aryan</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>
      </header>

      {/* Mobile Side Drawer - Completely Independent */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9999] md:hidden">
          {/* Overlay - Click to close */}
          <button 
            className="absolute inset-0 bg-transparent cursor-pointer border-0 p-0"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            type="button"
          />
          {/* Independent Sidebar - Always above everything */}
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
