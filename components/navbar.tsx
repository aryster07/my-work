"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentHash, setCurrentHash] = useState("")
  const [activeSection, setActiveSection] = useState("home")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      setCurrentHash(hash)
      console.log('Hash changed to:', hash) // Debug log
    }
    
    // Set initial hash
    const initialHash = window.location.hash
    setCurrentHash(initialHash)
    console.log('Initial hash:', initialHash) // Debug log
    
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Scroll-based section detection
  useEffect(() => {
    if (pathname !== "/") return // Only apply on home page

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in center of viewport
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          console.log('Section in view:', sectionId) // Debug log
          setActiveSection(sectionId || "home")
          
          // Update URL hash without triggering scroll
          const newHash = sectionId ? `#${sectionId}` : ""
          if (window.location.hash !== newHash) {
            window.history.replaceState(null, "", newHash || window.location.pathname)
            setCurrentHash(newHash)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe sections (these IDs should match your page sections)
    const sections = document.querySelectorAll('#home, #gallery, #about')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [pathname])

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

  // Check if a link is active (scroll-based detection for home page)
  const isActive = (path: string) => {
    // For non-home pages (contact, support, etc.)
    if (path.startsWith("/") && path !== "/" && !path.includes("#")) {
      return pathname.startsWith(path)
    }
    
    // For home page sections - use scroll-based detection
    if (pathname === "/") {
      if (path === "/") {
        // Home section - active when activeSection is "home" or empty
        return activeSection === "home" || activeSection === ""
      }
      if (path === "/#gallery") {
        // Gallery section - active when activeSection is "gallery"
        return activeSection === "gallery"
      }
      if (path === "/#about") {
        // About section - active when activeSection is "about"
        return activeSection === "about"
      }
    }
    
    // For gallery category pages
    if (path === "/#gallery" && pathname.startsWith("/category/")) {
      return true
    }
    
    return false
  }

  // Get navbar background class based on state
  const getNavbarClass = () => {
    if (isMenuOpen) return "bg-black border-b border-gray-800"
    if (isScrolled) return "bg-black/80 backdrop-blur-md border-b border-gray-800"
    return "bg-transparent"
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full ${getNavbarClass()}`}
      >
      <div className="container mx-auto px-4 w-full max-w-full">
        <div className="flex h-16 items-center justify-between w-full max-w-full">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between w-full">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-white">7Frames_aryan</span>
            </Link>

            <nav className="flex items-center space-x-8">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors relative group ${
                  isActive("/") 
                    ? "text-gold" 
                    : "text-white hover:text-gold"
                }`}
              >
                Home{" "}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                  isActive("/") ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
              <Link
                href="/#gallery"
                className={`text-sm font-medium transition-colors relative group ${
                  isActive("/#gallery") 
                    ? "text-gold" 
                    : "text-white hover:text-gold"
                }`}
              >
                Gallery{" "}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                  isActive("/#gallery") ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
              <Link
                href="/#about"
                className={`text-sm font-medium transition-colors relative group ${
                  isActive("/#about") 
                    ? "text-gold" 
                    : "text-white hover:text-gold"
                }`}
              >
                About{" "}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                  isActive("/#about") ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium transition-colors relative group ${
                  isActive("/contact") 
                    ? "text-gold" 
                    : "text-white hover:text-gold"
                }`}
              >
                Contact Me{" "}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                  isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
              <Link
                href="/support"
                className={`text-sm font-medium transition-colors relative group ${
                  isActive("/support") 
                    ? "text-gold" 
                    : "text-white hover:text-gold"
                }`}
              >
                Support{" "}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                  isActive("/support") ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            </nav>
          </div>

          {/* Mobile Layout - brand on left, menu on right */}
          <div className="md:hidden flex items-center justify-between w-full">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-white">7Frames_aryan</span>
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
                className={`text-lg font-medium transition-colors py-3 px-4 rounded-lg block ${
                  isActive("/")
                    ? "text-gold bg-gold/10 border border-gold/20"
                    : "text-white hover:text-gold hover:bg-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#gallery" 
                className={`text-lg font-medium transition-colors py-3 px-4 rounded-lg block ${
                  isActive("/#gallery")
                    ? "text-gold bg-gold/10 border border-gold/20"
                    : "text-white hover:text-gold hover:bg-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                href="/#about" 
                className={`text-lg font-medium transition-colors py-3 px-4 rounded-lg block ${
                  isActive("/#about")
                    ? "text-gold bg-gold/10 border border-gold/20"
                    : "text-white hover:text-gold hover:bg-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`text-lg font-medium transition-colors py-3 px-4 rounded-lg block ${
                  isActive("/contact")
                    ? "text-gold bg-gold/10 border border-gold/20"
                    : "text-white hover:text-gold hover:bg-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Me
              </Link>
              <Link 
                href="/support" 
                className={`text-lg font-medium transition-colors py-3 px-4 rounded-lg block ${
                  isActive("/support")
                    ? "text-gold bg-gold/10 border border-gold/20"
                    : "text-white hover:text-gold hover:bg-gray-800"
                }`}
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
