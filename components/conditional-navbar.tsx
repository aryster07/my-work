"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./navbar"
import { GalleryNavbar } from "./gallery-navbar"

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

  // Check if we're in a gallery-related page
  const isCategoryPage = pathname.startsWith('/category/')
  const isPhotoPage = pathname.startsWith('/photo/')
  const isWorkPage = pathname.startsWith('/work/')
  const isContactPage = pathname.startsWith('/contact')
  const isSupportPage = pathname.startsWith('/support')
  
  if (isCategoryPage) {
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
    // For contact page
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

  if (isSupportPage) {
    // For support page
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

  // For all other pages (home, about, etc.), show default navbar
  return <Navbar />
}
