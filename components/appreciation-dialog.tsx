'use client'

import { X, Heart, Share2 } from 'lucide-react'
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg shadow-lg max-w-[260px] w-[90vw] mx-2 overflow-hidden">
        {/* Header */}
        <div className="relative p-2 text-center bg-gradient-to-r from-pink-50 to-purple-50">
          <button
            onClick={onClose}
            className="absolute top-1 right-1 w-8 h-8 p-1 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <X size={16} className="text-gray-600" />
          </button>
          
          <div className="flex justify-center mb-1">
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </div>
          <h2 className="text-sm font-bold text-gray-900 mb-1">Love my work?</h2>
          <p className="text-gray-600 text-xs">
            {photoTitle ? `Thanks for downloading "${photoTitle}"!` : 'Thanks for downloading!'}
          </p>
        </div>

        <div className="p-2 space-y-2">
          {/* Support Message */}
          <div className="text-center">
            <p className="text-gray-700 text-xs">
              Broke but still want to help? I get it. Money's tight, but love is free! 💔
            </p>
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-1">
            <button
              onClick={() => handleSocialFollow('instagram')}
              className="w-full flex items-center justify-center gap-1 py-1.5 px-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded text-xs font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.017 0C8.396 0 7.928.01 7.628.052 7.328.095 7.083.184 6.851.369c-.233.185-.397.442-.491.696-.095.254-.145.532-.145.82v.001c0 .264.037.52.109.776.072.256.177.497.313.719.136.222.302.426.495.609.193.183.413.34.653.464.24.124.498.217.768.274.27.057.548.084.828.084h4.462c.28 0 .558-.027.828-.084.27-.057.528-.15.768-.274.24-.124.46-.281.653-.464.193-.183.359-.387.495-.609.136-.222.241-.463.313-.719.072-.256.109-.512.109-.776v-.001c0-.288-.05-.566-.145-.82-.094-.254-.258-.511-.491-.696C16.917.184 16.672.095 16.372.052 16.072.01 15.604 0 12.017 0zm0 1.802c3.403 0 3.793.012 5.135.072.777.035 1.199.166 1.481.276.372.145.638.318.917.597.28.28.452.546.597.917.11.282.24.704.276 1.481.06 1.342.073 1.732.073 5.135s-.013 3.793-.073 5.135c-.036.777-.166 1.199-.276 1.481-.145.372-.318.638-.597.917-.28.28-.546.452-.917.597-.282.11-.704.24-1.481.276-1.342.06-1.732.073-5.135.073s-3.793-.013-5.135-.073c-.777-.036-1.199-.166-1.481-.276a2.478 2.478 0 01-.917-.597 2.478 2.478 0 01-.597-.917c-.11-.282-.24-.704-.276-1.481-.06-1.342-.073-1.732-.073-5.135s.013-3.793.073-5.135c.036-.777.166-1.199.276-1.481.145-.372.318-.638.597-.917.28-.28.546-.452.917-.597.282-.11.704-.24 1.481-.276 1.342-.06 1.732-.073 5.135-.073z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M12.017 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12.017 16a4 4 0 110-8 4 4 0 010 8z" clipRule="evenodd" />
                <circle cx="18.406" cy="5.594" r="1.44" />
              </svg>
              Follow on Instagram
            </button>
            
            <button
              onClick={() => handleSocialFollow('pinterest')}
              className="w-full flex items-center justify-center gap-1 py-1.5 px-2 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700 transition-colors"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12c.317 0 .63-.016.939-.047-.068-.678-.103-1.728.039-2.573l1.013-4.298s-.259-.518-.259-1.283c0-1.202.697-2.099 1.565-2.099.738 0 1.094.554 1.094 1.218 0 .743-.473 1.852-.717 2.88-.204.861.432 1.563 1.282 1.563 1.539 0 2.724-1.622 2.724-3.965 0-2.073-1.49-3.523-3.619-3.523-2.465 0-3.911 1.849-3.911 3.76 0 .744.287 1.543.645 1.976.071.086.081.161.06.248-.066.275-.212.859-.241.979-.037.154-.123.186-.284.112-1.075-.5-1.748-2.066-1.748-3.327 0-2.732 1.984-5.244 5.718-5.244 3.001 0 5.336 2.139 5.336 4.996 0 2.981-1.88 5.379-4.488 5.379-.876 0-1.701-.456-1.983-1.001l-.54 2.058c-.195.754-.722 1.699-1.075 2.275A11.988 11.988 0 0 0 12 24c6.626 0 12-5.374 12-12S18.626 0 12 0z"/>
              </svg>
              Pin Me
            </button>
            
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-1 py-1.5 px-2 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              <Share2 size={12} />
              Share
            </button>
          </div>

          {/* Optional Donation Section */}
          <div className="border-t pt-2 space-y-2">
            <p className="text-center text-gray-600 text-xs">
              Support my work 💝
            </p>
            
            {/* Custom Amount */}
            <input
              type="number"
              placeholder="₹ Amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setSelectedAmount(null)
              }}
              className="w-full p-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={!customAmount}
              className="w-full py-1.5 px-2 bg-yellow-400 text-black rounded text-xs font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Donate Now
            </button>
          </div>

          {/* Skip Option */}
          <button
            onClick={onClose}
            className="w-full py-1 text-gray-500 text-xs hover:text-gray-700 transition-colors"
          >
            Maybe next time
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center">
            Follows don't pay rent, but they do feed my ego! 💕✨
          </p>
        </div>
      </div>
    </div>
  )
}
