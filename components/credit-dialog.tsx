'use client'

import { X, Camera, Instagram, AlertTriangle, Smile } from 'lucide-react'

interface CreditDialogProps {
  isOpen: boolean
  onClose: () => void
  photoTitle?: string
}

export default function CreditDialog({ isOpen, onClose, photoTitle }: CreditDialogProps) {
  if (!isOpen) return null

  const handleInstagramTag = () => {
    window.open('https://www.instagram.com/7Frames_aryan/', '_blank')
  }

  const funnyMessages = [
    "I've got a very particular set of skills... I will find you, and I will ask for credits! 📸",
    "Using my wallpaper without credit? I have GPS, a car, and nothing to lose! 😄",
    "Credits missing = Me showing up at your door with a camera and confused look! 📷",
    "No credits? I'll track you down faster than you can say 'screenshot'! 🕵️",
    "Tag me or I'll haunt your Instagram stories forever! 👻📸"
  ]

  const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border border-gold/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-gold/20 to-yellow-500/20 p-6 text-center border-b border-gold/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex justify-center mb-3">
            <div className="bg-gold/20 p-3 rounded-full">
              <AlertTriangle className="w-8 h-8 text-gold" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-white mb-2">
            Hold Up! 📸
          </h2>
          <p className="text-gold text-sm">
            Important Credit Notice
          </p>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="mb-6">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
              <p className="text-white text-sm leading-relaxed">
                {randomMessage}
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-gold font-semibold mb-2 flex items-center justify-center">
                <Camera className="w-4 h-4 mr-2" />
                The Rules (Non-negotiable!)
              </h3>
              <ul className="text-white/80 text-sm space-y-2 text-left">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Tag me @7Frames_aryan in your story/post
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Give proper credits in caption
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Don't crop out watermarks (seriously!)
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Spread the love, not stolen content ❤️
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleInstagramTag}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Instagram className="w-5 h-5" />
              <span>Tag @7Frames_aryan</span>
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gold hover:bg-gold/90 text-black font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Smile className="w-5 h-5" />
              <span>Got it, I'll give credits!</span>
            </button>
          </div>

          <p className="text-white/60 text-xs mt-4">
            Thanks for being awesome and respecting artists! 🙏
          </p>
        </div>
      </div>
    </div>
  )
}
