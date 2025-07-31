'use client'

import { X, Camera, AlertTriangle, Smile } from 'lucide-react'

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl max-w-[280px] w-[90vw] mx-2 overflow-hidden border border-gold/20 relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-gold/20 to-yellow-500/20 p-3 text-center border-b border-gold/20 relative">
          <button
            onClick={onClose}
            className="absolute top-1 right-1 w-8 h-8 text-white/70 hover:text-white transition-colors flex items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex justify-center mb-2">
            <div className="bg-gold/20 p-2 rounded-full">
              <AlertTriangle className="w-5 h-5 text-gold" />
            </div>
          </div>
          
          <h2 className="text-lg font-bold text-white mb-1">
            Hold Up! 📸
          </h2>
          <p className="text-gold text-xs">
            Important Credit Notice
          </p>
        </div>

        {/* Content */}
        <div className="p-3 text-center">
          <div className="mb-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2 mb-3">
              <p className="text-white text-xs leading-relaxed">
                {randomMessage}
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-2 border border-gray-700">
              <h3 className="text-gold font-semibold mb-2 flex items-center justify-center text-xs">
                <Camera className="w-3 h-3 mr-1" />
                The Rules
              </h3>
              <ul className="text-white/80 text-xs space-y-1 text-left">
                <li className="flex items-start">
                  <span className="text-gold mr-1 text-xs">•</span>
                  <span className="text-xs">Tag @7Frames_aryan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-1 text-xs">•</span>
                  <span className="text-xs">Give proper credits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-1 text-xs">•</span>
                  <span className="text-xs">Don't crop watermarks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-1 text-xs">•</span>
                  <span className="text-xs">Spread love, not stolen content ❤️</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleInstagramTag}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 text-xs"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.017 0C8.396 0 7.928.01 7.628.052 7.328.095 7.083.184 6.851.369c-.233.185-.397.442-.491.696-.095.254-.145.532-.145.82v.001c0 .264.037.52.109.776.072.256.177.497.313.719.136.222.302.426.495.609.193.183.413.34.653.464.24.124.498.217.768.274.27.057.548.084.828.084h4.462c.28 0 .558-.027.828-.084.27-.057.528-.15.768-.274.24-.124.46-.281.653-.464.193-.183.359-.387.495-.609.136-.222.241-.463.313-.719.072-.256.109-.512.109-.776v-.001c0-.288-.05-.566-.145-.82-.094-.254-.258-.511-.491-.696C16.917.184 16.672.095 16.372.052 16.072.01 15.604 0 12.017 0zm0 1.802c3.403 0 3.793.012 5.135.072.777.035 1.199.166 1.481.276.372.145.638.318.917.597.28.28.452.546.597.917.11.282.24.704.276 1.481.06 1.342.073 1.732.073 5.135s-.013 3.793-.073 5.135c-.036.777-.166 1.199-.276 1.481-.145.372-.318.638-.597.917-.28.28-.546.452-.917.597-.282.11-.704.24-1.481.276-1.342.06-1.732.073-5.135.073s-3.793-.013-5.135-.073c-.777-.036-1.199-.166-1.481-.276a2.478 2.478 0 01-.917-.597 2.478 2.478 0 01-.597-.917c-.11-.282-.24-.704-.276-1.481-.06-1.342-.073-1.732-.073-5.135s.013-3.793.073-5.135c.036-.777.166-1.199.276-1.481.145-.372.318-.638.597-.917.28-.28.546-.452.917-.597.282-.11.704-.24 1.481-.276 1.342-.06 1.732-.073 5.135-.073z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M12.017 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12.017 16a4 4 0 110-8 4 4 0 010 8z" clipRule="evenodd" />
                <circle cx="18.406" cy="5.594" r="1.44" />
              </svg>
              <span>Tag @7Frames_aryan</span>
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gold hover:bg-gold/90 text-black font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1 text-xs"
            >
              <Smile className="w-3 h-3" />
              <span>Got it, I'll give credits!</span>
            </button>
          </div>

          <p className="text-white/60 text-xs mt-2">
            Thanks for being awesome! 🙏
          </p>
        </div>
      </div>
    </div>
  )
}
