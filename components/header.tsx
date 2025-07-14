"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Header() {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-gray-800" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-[#FF0040] text-white p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </div>
            <span className="font-bold text-xl text-white tracking-wider">
              SPEED<span className="text-[#FF0040]">SHOT</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white font-medium hover:text-[#FF0040] transition-colors relative group">
              HOME
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF0040] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/work" className="text-white font-medium hover:text-[#FF0040] transition-colors relative group">
              WORK
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF0040] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className="text-white font-medium hover:text-[#FF0040] transition-colors relative group"
            >
              CONTACT
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF0040] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex md:hidden items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-50 md:hidden">
          <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6 text-white" />
            </Button>
          </div>
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            <Link href="/" className="text-3xl font-bold text-white" onClick={() => setIsMenuOpen(false)}>
              HOME
            </Link>
            <Link href="/work" className="text-3xl font-bold text-white" onClick={() => setIsMenuOpen(false)}>
              WORK
            </Link>
            <Link href="/contact" className="text-3xl font-bold text-white" onClick={() => setIsMenuOpen(false)}>
              CONTACT
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
