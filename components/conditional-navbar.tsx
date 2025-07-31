"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./navbar"
import { GalleryNavbar } from "./gallery-navbar"
import { useIsMobile } from "@/hooks/use-mobile"

// Mapping of URL-friendly IDs to category titles
const categoryTitles: { [key: string]: string } = {
  'astro': 'Astro Photography',
  'bikes': 'Bikes',
  'cars': 'Cars',
  'college': 'College',
  'concerts': 'Concerts',
  'danno': 'Danno',
  'flowers': 'Flowers',
  'lambo': 'Lambo',
  'moon': 'Moon',
  'mountains': 'Mountains',
  'nature': 'Nature',
  'skies': 'Skies',
  'sunsets': 'Sunsets',
}

export function ConditionalNavbar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // Check if we're in a gallery-related page
  const isCategoryPage = pathname.startsWith('/category/')
  const isPhotoPage = pathname.startsWith('/photo/')
  const isWorkPage = pathname.startsWith('/work/')
  const isContactPage = pathname.startsWith('/contact')
  const isSupportPage = pathname.startsWith('/support')
  
  if (isCategoryPage) {
    // For category pages, show regular navbar on desktop, gallery navbar on mobile
    if (isMobile) {
      // Extract category ID from pathname (e.g., /category/astro -> astro)
      const categoryId = pathname.split('/')[2]
      const categoryTitle = categoryTitles[categoryId] || categoryId

      return (
        <GalleryNavbar 
          categoryTitle={categoryTitle}
          showBackButton={true}
          backLink="/#gallery"
          backText="Back to Gallery"
          showFullscreenButton={false}
        />
      )
    }
    return <Navbar />
  }

  if (isPhotoPage) {
    // For individual photo pages
    return (
      <GalleryNavbar 
        categoryTitle="Photo View"
        showBackButton={true}
        backLink="/#gallery"
        backText="Back to Gallery"
        showFullscreenButton={false}
      />
    )
  }

  if (isWorkPage) {
    // For work/portfolio pages
    return (
      <GalleryNavbar 
        categoryTitle="Portfolio"
        showBackButton={true}
        backLink="/#gallery"
        backText="Back to Gallery"
        showFullscreenButton={false}
      />
    )
  }

  if (isContactPage) {
    // For contact page - use GalleryNavbar only on mobile, regular Navbar on desktop
    if (isMobile) {
      return (
        <GalleryNavbar 
          categoryTitle="Contact"
          showBackButton={true}
          backLink="/"
          backText="Back to Home"
          showFullscreenButton={false}
        />
      )
    }
    return <Navbar />
  }

  if (isSupportPage) {
    // For support page - use GalleryNavbar only on mobile, regular Navbar on desktop
    if (isMobile) {
      return (
        <GalleryNavbar 
          categoryTitle="Support"
          showBackButton={true}
          backLink="/"
          backText="Back to Home"
          showFullscreenButton={false}
        />
      )
    }
    return <Navbar />
  }

  // For all other pages (home, about, etc.), show default navbar
  return <Navbar />
}
