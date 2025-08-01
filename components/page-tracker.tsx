'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

interface PageTrackerProps {
  pageName: string
  categoryName?: string
}

export function PageTracker({ pageName, categoryName }: PageTrackerProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    trackEvent.viewPage(pageName)
    
    // Track category view if applicable
    if (categoryName) {
      trackEvent.viewCategory(categoryName)
    }
  }, [pageName, categoryName, pathname])

  return null // This component doesn't render anything
}
