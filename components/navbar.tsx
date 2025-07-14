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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md border-b border-gray-800" : "bg-transparent"
        }`}
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
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/#gallery"
                className="text-sm font-medium text-white hover:text-gold transition-colors relative group"
              >
                Gallery
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/#about"
                className="text-sm font-medium text-white hover:text-gold transition-colors relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-white hover:text-gold transition-colors relative group"
              >
                Contact Me
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/support"
                className="text-sm font-medium text-white hover:text-gold transition-colors relative group"
              >
                Support
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
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

      {/* Mobile Side Drawer with Glassmorphism */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 md:hidden">
          {/* Sidebar with Glassmorphism */}
          <div className="fixed left-0 top-0 h-full w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <span className="font-bold text-lg text-white">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6 text-white" />
              </Button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
              <Link 
                href="/" 
                className="text-lg font-medium text-white hover:text-gold transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#gallery" 
                className="text-lg font-medium text-white hover:text-gold transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                href="/#about" 
                className="text-lg font-medium text-white hover:text-gold transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-lg font-medium text-white hover:text-gold transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Me
              </Link>
              <Link 
                href="/support" 
                className="text-lg font-medium text-white hover:text-gold transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
            </nav>
          </div>
          {/* Overlay */}
          <button 
            className="absolute inset-0 -z-10 bg-transparent border-0 cursor-default"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          />
        </div>
      )}
    </header>
  )
}
