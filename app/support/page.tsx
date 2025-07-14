"use client"

import { Heart, Coffee, Camera, Car, Pizza, Zap } from "lucide-react"
import { DonationButton } from "@/components/donation-button"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Beggar Meme */}
      <section className="pt-20 pb-8 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
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
      </section>

      {/* Ready to Be My Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gold">
            Ready to Be My Hero? 🦸‍♂️
          </h2>
          <p className="text-base text-gold mb-6">
            Even ₹50 can buy me decent coffee that might inspire the next viral wallpaper ☕
          </p>
          
          <p className="text-sm text-gray-300">
            No judgment if you can't. We're all just trying to survive out here 🤷‍♂️
          </p>
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
