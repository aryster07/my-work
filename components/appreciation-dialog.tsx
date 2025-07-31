'use client'

import { X, Heart, Instagram, Share2 } from 'lucide-react'
import { useState } from 'react'

interface AppreciationDialogProps {
  isOpen: boolean
  onClose: () => void
  photoTitle?: string
}

export default function AppreciationDialog({ isOpen, onClose, photoTitle }: AppreciationDialogProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')

  if (!isOpen) return null

  const handleSocialFollow = (platform: string) => {
    const urls = {
      instagram: 'https://www.instagram.com/7Frames_aryan/',
      pinterest: 'https://in.pinterest.com/drunken_monk/',
    }
    window.open(urls[platform as keyof typeof urls], '_blank')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Amazing Photography',
        text: 'Check out this beautiful photograph!',
        url: window.location.href,
      })
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleDonate = () => {
    // Implement your payment logic here
    const amount = selectedAmount || customAmount
    alert(`Thank you for your ₹${amount} donation!`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 text-center bg-gradient-to-r from-pink-50 to-purple-50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-600" />
          </button>
          
          <div className="flex justify-center mb-3">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Love my work?</h2>
          <p className="text-gray-600 text-sm">
            {photoTitle ? `Thanks for downloading "${photoTitle}"!` : 'Thanks for downloading!'}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Support Message */}
          <div className="text-center">
            <p className="text-gray-700">
              Broke but still want to help? I get it. Money's tight, but love is free! 💔
            </p>
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialFollow('instagram')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <Instagram size={20} />
              Follow on Instagram (It's Free!)
            </button>
            
            <button
              onClick={() => handleSocialFollow('pinterest')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12c.317 0 .63-.016.939-.047-.068-.678-.103-1.728.039-2.573l1.013-4.298s-.259-.518-.259-1.283c0-1.202.697-2.099 1.565-2.099.738 0 1.094.554 1.094 1.218 0 .743-.473 1.852-.717 2.88-.204.861.432 1.563 1.282 1.563 1.539 0 2.724-1.622 2.724-3.965 0-2.073-1.49-3.523-3.619-3.523-2.465 0-3.911 1.849-3.911 3.76 0 .744.287 1.543.645 1.976.071.086.081.161.06.248-.066.275-.212.859-.241.979-.037.154-.123.186-.284.112-1.075-.5-1.748-2.066-1.748-3.327 0-2.732 1.984-5.244 5.718-5.244 3.001 0 5.336 2.139 5.336 4.996 0 2.981-1.88 5.379-4.488 5.379-.876 0-1.701-.456-1.983-1.001l-.54 2.058c-.195.754-.722 1.699-1.075 2.275A11.988 11.988 0 0 0 12 24c6.626 0 12-5.374 12-12S18.626 0 12 0z"/>
              </svg>
              Pin Me on Pinterest (Also Free!)
            </button>
            
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Share2 size={20} />
              Share My Stuff (Costs Nothing!)
            </button>
          </div>

          {/* Optional Donation Section */}
          <div className="border-t pt-6 space-y-4">
            <p className="text-center text-gray-600 text-sm">
              Support my work 💝
            </p>
            
            {/* Custom Amount */}
            <input
              type="number"
              placeholder="Enter amount (₹)"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setSelectedAmount(null)
              }}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={!customAmount}
              className="w-full py-3 px-4 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Donate Now
            </button>
          </div>

          {/* Skip Option */}
          <button
            onClick={onClose}
            className="w-full py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            Maybe next time
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center mt-4">
            Follows don't pay rent, but they do feed my ego! 💕✨
          </p>
        </div>
      </div>
    </div>
  )
}
