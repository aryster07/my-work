'use client'

import React, { useState } from 'react'

interface DonationDialogProps {
  isOpen: boolean
  onClose: () => void
  photoTitle?: string
}

export function DonationDialog({ isOpen, onClose, photoTitle }: Readonly<DonationDialogProps>) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')

  const predefinedAmounts = [5, 10, 25, 50, 100]

  if (!isOpen) return null

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount)
    if (amount && amount > 0) {
      // Replace with your actual payment gateway
      const paymentUrl = `https://your-payment-gateway.com?amount=${amount}&description=${encodeURIComponent(
        `Donation for ${photoTitle || 'photography work'}`
      )}`
      window.open(paymentUrl, '_blank')
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">💖</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Love My Work?</h2>
          <p className="text-gray-600">
            Thank you for downloading! Your support helps me continue creating beautiful photography
          </p>
        </div>

        {/* Support Options */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Support me by:
          </h3>
          
          {/* Social Media Actions */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            <button
              onClick={() => window.open('https://www.instagram.com/your_instagram', '_blank')}
              className="flex items-center justify-center gap-3 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow me on Instagram
            </button>
            
            <button
              onClick={() => window.open('https://in.pinterest.com/drunken_monk/', '_blank')}
              className="flex items-center justify-center gap-3 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12c6.626 0 12-5.374 12-12S18.626 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.87-1.835l.437-1.664c.229.436.895.803 1.604.803 2.111 0 3.633-1.941 3.633-4.354 0-2.312-1.888-4.042-4.316-4.042-3.021 0-4.625 2.003-4.625 4.137 0 .695.31 1.557.793 1.834.079.045.12.025.139-.07.015-.076.079-.296.104-.383.033-.11.021-.149-.076-.246-.209-.256-.383-.725-.383-1.155 0-1.443 1.085-2.863 2.963-2.863 1.611 0 2.771 1.115 2.771 2.749 0 1.691-.75 2.865-1.68 2.865-.537 0-.994-.383-.857-.852.164-.559.48-1.162.48-1.565 0-.361-.193-.663-.594-.663-.471 0-.849.487-.849 1.14 0-.415.141-.695.141-1.140l-.574 2.42C8.753 15.96 8.39 17.14 8.55 18.42 5.831 16.92 4 14.665 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
              </svg>
              Follow me on Pinterest
            </button>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Amazing Photography',
                    text: 'Check out this incredible photography work!',
                    url: window.location.href
                  })
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  alert('Link copied to clipboard!')
                }
              }}
              className="flex items-center justify-center gap-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share my work
            </button>
          </div>
          
          <div className="text-center mb-4">
            <div className="text-sm text-gray-500 mb-3">Or if you'd like to donate:</div>
          </div>
        </div>

        {/* Amount Selection */}
        <div className="mb-6">
          <div className="block text-sm font-semibold text-gray-700 mb-3">
            Choose an amount:
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {predefinedAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount)
                  setCustomAmount('')
                }}
                className={`p-3 rounded-lg border-2 transition-all font-semibold ${
                  selectedAmount === amount
                    ? 'border-gold bg-gold text-black'
                    : 'border-gray-200 text-gray-700 hover:border-gold'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
              $
            </span>
            <input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setSelectedAmount(null)
              }}
              className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Not Now
          </button>
          <button
            onClick={handleDonate}
            disabled={!selectedAmount && !customAmount}
            className="flex-1 py-3 px-4 bg-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Donate Now
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Following and sharing helps more than you know! 💕
        </p>
      </div>
    </div>
  )
}
