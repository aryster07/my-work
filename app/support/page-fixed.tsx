"use client"

import { Heart, Coffee, Camera, Car, Pizza, Zap } from "lucide-react"
import { DonationButton } from "@/components/donation-button"
import { Button } from "@/components/ui/button"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-gold text-black px-6 py-2 rounded-full text-sm font-bold mb-6">
            SUPPORT PAGE
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
            Thank You Rahega Ji! 🥹
          </h1>
          <p className="text-xl md:text-2xl text-gold mb-8 max-w-3xl mx-auto">
            Look, I know everyone's asking for money these days. But hey, if my photos made you smile 
            (or at least didn't make you cringe), maybe throw a few bucks my way?
          </p>
          <p className="text-lg text-yellow-400 mb-8">
            No pressure... but also kinda pressure 😅
          </p>
        </div>
      </section>

      {/* What Your Money Goes To */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Why I'm Basically Broke 💸
          </h2>
          <p className="text-lg text-gold text-center mb-12 max-w-2xl mx-auto">
            Here's where your money actually goes (spoiler: it's not crypto)
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gold/30 hover:border-gold/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20">
              <div className="bg-gold/10 p-3 rounded-full w-fit mb-4">
                <Car className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Gas = Gone</h3>
              <p className="text-sm text-gray-300">
                Chasing sunsets at 5 AM because apparently that's when magic happens
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gold/30 hover:border-gold/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20">
              <div className="bg-gold/10 p-3 rounded-full w-fit mb-4">
                <Camera className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Gear Costs = Soul</h3>
              <p className="text-sm text-gray-300">
                Lenses cost more than cars. My bank account is crying
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gold/30 hover:border-gold/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20">
              <div className="bg-gold/10 p-3 rounded-full w-fit mb-4">
                <Coffee className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Coffee Addiction</h3>
              <p className="text-sm text-gray-300">
                3 AM editing sessions require caffeine IV drips
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gold/30 hover:border-gold/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20">
              <div className="bg-gold/10 p-3 rounded-full w-fit mb-4">
                <Pizza className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Survival Mode</h3>
              <p className="text-sm text-gray-300">
                Forgot to eat again. Art doesn't feed me, apparently
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gold/30 hover:border-gold/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20">
              <div className="bg-gold/10 p-3 rounded-full w-fit mb-4">
                <Zap className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Therapy Fund</h3>
              <p className="text-sm text-gray-300">
                "I NEED that lens" apparently isn't a valid argument
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gold/30 hover:border-gold/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20">
              <div className="bg-gold/10 p-3 rounded-full w-fit mb-4">
                <Heart className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Your Wallpapers</h3>
              <p className="text-sm text-gray-300">
                Making your phone cooler than it actually is
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Support Matters */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            The Deal We're Making 🤝
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 p-6 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center">
                <span className="mr-2">🎁</span> You Get
              </h3>
              <ul className="text-gray-200 space-y-3">
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
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-6 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center">
                <span className="mr-2">🙏</span> I Get
              </h3>
              <ul className="text-gray-200 space-y-3">
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

      {/* Donation Section */}
      <section className="py-16 px-4 bg-gradient-to-t from-gray-900 to-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
            Ready to Be My Hero? 🦸‍♂️
          </h2>
          <p className="text-lg text-yellow-400 mb-8">
            Even ₹50 can buy me decent coffee that might inspire the next viral wallpaper ☕
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <DonationButton />
            <Button 
              variant="outline"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-black px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
              onClick={() => window.history.back()}
            >
              Maybe Later (Broke Gang) 💸
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            No judgment if you can't. We're all just trying to survive out here 🤷‍♂️
          </p>
        </div>
      </section>

      {/* Final Thanks Section */}
      <section className="py-12 px-4 bg-gold text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Thank You, Seriously 🙏
          </h2>
          <p className="text-lg mb-4">
            Whether you support financially or just by enjoying the photos, you're part of this journey
          </p>
          <p className="text-base opacity-80">
            Now get back to scrolling and pretending to be productive!
          </p>
        </div>
      </section>
    </div>
  )
}
