import { track } from '@vercel/analytics/server'

// Custom analytics tracking for photography portfolio
export const trackEvent = {
  // Gallery interactions
  viewCategory: (categoryName: string) => {
    if (typeof window !== 'undefined') {
      // Client-side tracking
      import('@vercel/analytics').then(({ track }) => {
        track('category_viewed', { category: categoryName })
      })
    }
  },

  // Image interactions
  viewImage: (imageId: string, categoryName: string) => {
    if (typeof window !== 'undefined') {
      import('@vercel/analytics').then(({ track }) => {
        track('image_viewed', { 
          image_id: imageId, 
          category: categoryName 
        })
      })
    }
  },

  // Download tracking
  downloadImage: (imageId: string, categoryName: string) => {
    if (typeof window !== 'undefined') {
      import('@vercel/analytics').then(({ track }) => {
        track('image_downloaded', { 
          image_id: imageId, 
          category: categoryName 
        })
      })
    }
  },

  // Navigation tracking
  viewPage: (pageName: string) => {
    if (typeof window !== 'undefined') {
      import('@vercel/analytics').then(({ track }) => {
        track('page_viewed', { page: pageName })
      })
    }
  },

  // Contact form tracking
  contactFormSubmit: (method: string) => {
    if (typeof window !== 'undefined') {
      import('@vercel/analytics').then(({ track }) => {
        track('contact_form_submitted', { method })
      })
    }
  },

  // AdSense interaction tracking
  adViewed: (adSlot: string) => {
    if (typeof window !== 'undefined') {
      import('@vercel/analytics').then(({ track }) => {
        track('ad_viewed', { ad_slot: adSlot })
      })
    }
  },

  // Donation tracking
  donationDialogOpened: () => {
    if (typeof window !== 'undefined') {
      import('@vercel/analytics').then(({ track }) => {
        track('donation_dialog_opened')
      })
    }
  }
}

// Server-side tracking for API routes
export const trackServerEvent = {
  imageDownloaded: async (imageId: string, categoryName: string) => {
    try {
      await track('server_image_downloaded', { 
        image_id: imageId, 
        category: categoryName 
      })
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  },

  apiCalled: async (endpoint: string, method: string) => {
    try {
      await track('api_called', { 
        endpoint, 
        method 
      })
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  }
}
