"use client"

import Link from "next/link"
import { Heart, Coffee, Camera, Car, Pizza, Zap, ArrowLeft } from "lucide-react"
import { DonationButton } from "@/components/donation-button"
import { Button } from "@/components/ui/button"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Beggar Meme */}
      <section className="pt-20 pb-8 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          {/* Back to Home Button */}
          <Button variant="ghost" asChild className="mb-6 hover:bg-transparent hover:text-gold text-white">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              BACK TO HOME
            </Link>
          </Button>
          
          <div className="text-center">
            {/* Beggar Meme Image */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img 
                  src="/images/beggar-meme.png" 
                  alt="Broke photographer meme"
                  className="w-40 h-40 md:w-48 md:h-48 object-contain animate-bounce"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <p className="text-sm text-gold bg-black/70 px-3 py-2 rounded-full whitespace-nowrap">
                    This is me asking for support 🥺
                  </p>
                </div>
              </div>
            </div>
            
            {/* Donation Button */}
            <div className="flex justify-center">
              <DonationButton />
            </div>
          </div>
        </div>
      </section>

      {/* Broke But Still Want to Help Section - NOW FIRST! */}
      <section className="py-12 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Broke? Same. Here's How You Can Still Help 💔
          </h2>
          <p className="text-base text-gray-300 mb-8">
            Wallet's emptier than my dating life? No worries, these buttons are free to click! 😂
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-6 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Follow on Instagram</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Double-tap my existential crisis in photo form. It's free therapy for both of us! 📸
                </p>
                <Link
                  href="https://www.instagram.com/7frames_aryan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  Follow @7frames_aryan
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 p-6 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300">
              <div className="mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 384 512">
                    <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Pin Me on Pinterest</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Help me become someone's aesthetic mood board. It's basically digital hoarding, but make it art! 📌
                </p>
                <Link
                  href="https://in.pinterest.com/drunken_monk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all"
                >
                  Follow on Pinterest
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 p-6 rounded-xl border border-gray-600/30">
            <h3 className="text-lg font-bold text-white mb-3">The Brutal Truth 🎯</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Look, I'm not gonna lie and say "follows pay the bills" because they don't. But they do help me reach more people who might actually have money to spare! 
              Plus, it's a nice ego boost when I'm crying over my camera gear credit card bill. So hit those follow buttons, share my stuff, and maybe—just maybe—the algorithm gods will smile upon me.{' '}
              <span className="text-gold font-medium">It's the circle of broke artist life! 🦁</span>
            </p>
          </div>
        </div>
      </section>

      {/* What Your Money Goes To */}
      <section className="py-12 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-white">
            Why I'm Basically Broke 💸
          </h2>
          <p className="text-base text-gold text-center mb-8 max-w-2xl mx-auto">
            Here's where your money actually goes (spoiler: it's not crypto)
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gold/30 hover:border-gold/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20">
              <div className="bg-gold/10 p-3 rounded-full w-fit mb-3">
                <Car className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-base font-bold mb-2 text-white">Gas = Gone</h3>
              <p className="text-sm text-gray-100">
                Chasing sunsets at 5 AM because apparently that's when magic happens
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gold/30 hover:border-gold/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20">
              <div className="bg-gold/10 p-3 rounded-full w-fit mb-3">
                <Camera className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-base font-bold mb-2 text-white">Gear Costs = Soul</h3>
              <p className="text-sm text-gray-100">
                Lenses cost more than cars. My bank account is crying
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gold/30 hover:border-gold/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20">
              <div className="bg-gold/10 p-3 rounded-full w-fit mb-3">
                <Coffee className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-base font-bold mb-2 text-white">Coffee Addiction</h3>
              <p className="text-sm text-gray-100">
                3 AM editing sessions require caffeine IV drips
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gold/30 hover:border-gold/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20">
              <div className="bg-gold/10 p-3 rounded-full w-fit mb-3">
                <Pizza className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-base font-bold mb-2 text-white">Survival Mode</h3>
              <p className="text-sm text-gray-100">
                Forgot to eat again. Art doesn't feed me, apparently
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gold/30 hover:border-gold/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20">
              <div className="bg-gold/10 p-3 rounded-full w-fit mb-3">
                <Zap className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-base font-bold mb-2 text-white">Therapy Fund</h3>
              <p className="text-sm text-gray-100">
                "I NEED that lens" apparently isn't a valid argument
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gold/30 hover:border-gold/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20">
              <div className="bg-gold/10 p-3 rounded-full w-fit mb-3">
                <Heart className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-base font-bold mb-2 text-white">Your Wallpapers</h3>
              <p className="text-sm text-gray-100">
                Making your phone cooler than it actually is
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Support Matters */}
      <section className="py-12 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            The Deal We're Making 🤝
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 p-5 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
              <h3 className="text-lg font-semibold mb-3 text-green-400 flex items-center">
                <span className="mr-2">🎁</span> You Get
              </h3>
              <ul className="text-white space-y-2">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Sick wallpapers that make people ask "Where'd you get that?"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Early access to new drops</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Behind-the-scenes chaos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Bragging rights forever</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-5 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
              <h3 className="text-lg font-semibold mb-3 text-blue-400 flex items-center">
                <span className="mr-2">🙏</span> I Get
              </h3>
              <ul className="text-white space-y-2">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Rent money (revolutionary concept)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Better gear = better photos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>More time, less stress</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Proof I'm not completely insane</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final Thanks Section */}
      <section className="py-8 px-4 bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gold/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-gold">
            Thank You, Seriously 🙏
          </h2>
          <p className="text-base mb-2 text-gray-200">
            Whether you support financially or just by enjoying the photos, you're part of this journey
          </p>
          <p className="text-sm text-gray-400">
            Now get back to scrolling and pretending to be productive!
          </p>
        </div>
      </section>
    </div>
  )
}
