import Link from "next/link"
import { Mail, Send, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DonationDialog } from "@/components/donation-dialog"
import { SpeedLines } from "@/components/speed-lines"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 pt-24">
        <section className="py-12 px-4 relative overflow-hidden">
          <SpeedLines />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Back to Home Button */}
            <Button variant="ghost" asChild className="mb-6 hover:bg-transparent hover:text-gold text-white">
              <Link href="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK TO HOME
              </Link>
            </Button>
            
            <div className="inline-block bg-[#FF0040] text-white px-4 py-1 rounded-sm text-sm font-bold mb-6">
              CONTACT
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">GET IN TOUCH</h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-12">
              Ready to capture some amazing shots? Let's connect! You can message me on Instagram or send me an email directly.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="bg-[#0A0A0A] p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">SEND A MESSAGE</h2>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-400">YOUR NAME</label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="bg-black border-gray-800 focus-visible:ring-[#00CCFF] rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-400">YOUR EMAIL</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-black border-gray-800 focus-visible:ring-[#00CCFF] rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-400">SUBJECT</label>
                    <Input
                      id="subject"
                      placeholder="Photoshoot Inquiry"
                      className="bg-black border-gray-800 focus-visible:ring-[#00CCFF] rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-400">YOUR MESSAGE</label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      className="min-h-[150px] bg-black border-gray-800 focus-visible:ring-[#00CCFF] rounded-none"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#FF0040] hover:bg-[#CC0033] rounded-none">
                    <Send className="mr-2 h-4 w-4" />
                    SEND MESSAGE
                  </Button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="bg-[#0A0A0A] p-6 border border-gray-800 flex items-start">
                  <div className="bg-[#00CCFF] p-4 text-black mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">EMAIL ME</h3>
                    <a 
                      href="mailto:aryanrana762@gmail.com" 
                      className="text-gold hover:text-gold/80 transition-colors"
                    >
                      aryanrana762@gmail.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">For inquiries and bookings</p>
                  </div>
                </div>

                <div className="bg-[#0A0A0A] p-6 border border-gray-800 flex items-start">
                  <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-400 p-4 text-white mr-4 rounded-lg">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">MESSAGE ME ON INSTAGRAM</h3>
                    <a 
                      href="https://www.instagram.com/7Frames_aryan/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold/80 transition-colors"
                    >
                      @7Frames_aryan
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Quick responses and portfolio updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <DonationDialog />
    </div>
  )
}
