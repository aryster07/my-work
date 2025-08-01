"use client"

import { useState, useEffect } from "react"
import { Heart, Copy, Check } from "lucide-react"
import QRCode from "react-qr-code"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DonationDialog({ 
  open, 
  onOpenChange 
}: { 
  open?: boolean; 
  onOpenChange?: (open: boolean) => void 
} = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [activeTab, setActiveTab] = useState("upi")
  const [copiedText, setCopiedText] = useState("")
  const [customAmount, setCustomAmount] = useState("100")

  // Use external open state if provided, otherwise use internal state
  const dialogOpen = open ?? isOpen
  const setDialogOpen = onOpenChange ?? setIsOpen

  // UPI Payment IDs organized by app
  const upiIds = {
    "Google Pay (SBI)": "aryanrana762-1@oksbi",
    "Google Pay (ICICI)": "aryanrana762@okicici",
    "PhonePe (YBL)": "aryanrana762@ybl", 
    "PhonePe (IDBI)": "aryanrana762@ibl"
  }
  
  const mainUpiId = "aryanrana762-1@oksbi"

  // Show donation reminder after 30 seconds if not shown before
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShown && !open) {
        setDialogOpen(true)
        setHasShown(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [hasShown, open, setDialogOpen])

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(type)
      setTimeout(() => setCopiedText(""), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <>
      {/* Floating donation button that appears after interaction */}
      <button 
        data-donation-trigger
        className="fixed bottom-6 right-6 z-50 group cursor-pointer bg-gold hover:bg-yellow-600 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group-hover:shadow-xl"
        onClick={() => setDialogOpen(true)}
        onKeyDown={(e) => e.key === 'Enter' && setDialogOpen(true)}
        aria-label="Support My Work"
      >
        <Heart className="w-6 h-6 fill-current" />
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 border border-gray-600 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Support My Work 📸
        </div>
      </button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-lg w-[calc(100vw-2rem)] mx-auto my-auto p-0 overflow-hidden max-h-[85vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 [&_*::selection]:bg-gold [&_*::selection]:text-black [&_*::-moz-selection]:bg-gold [&_*::-moz-selection]:text-black">
          {/* Custom close button with better visibility */}
          <button
            onClick={() => setDialogOpen(false)}
            className="absolute right-4 top-4 z-20 rounded-sm p-2 bg-gray-800 hover:bg-gray-700 text-white hover:text-gold transition-all duration-200 border border-gray-600"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 6-12 12"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
          
          <div className="relative p-6 overflow-y-auto">
            {/* Header with sarcastic touch */}
            <DialogHeader className="text-center mb-6">
              <DialogTitle className="text-2xl font-bold text-gold mb-3">
                Help Me Afford Ramen 🍜
              </DialogTitle>
              <DialogDescription className="text-gray-300 text-sm">
                Because even photographers need to eat between shoots
              </DialogDescription>
            </DialogHeader>

            {/* Payment Options */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800 mb-6 h-12">
                <TabsTrigger value="upi" className="text-sm font-medium data-[state=active]:bg-gold data-[state=active]:text-black text-gray-300 hover:text-white h-10">
                  UPI
                </TabsTrigger>
                <TabsTrigger value="qr" className="text-sm font-medium data-[state=active]:bg-gold data-[state=active]:text-black text-gray-300 hover:text-white h-10">
                  QR Code
                </TabsTrigger>
              </TabsList>

              {/* UPI Payment Tab */}
              <TabsContent value="upi" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-300">Choose your UPI app:</Label>
                  {Object.entries(upiIds).map(([app, id]) => (
                    <div key={app} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-5 h-5 text-gold" />
                        <span className="text-sm font-medium">{app}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-300 font-mono">{id}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 w-9 p-0 border-2 border-gold bg-transparent text-gold hover:bg-gold hover:text-black transition-all duration-200"
                          onClick={() => copyToClipboard(id, app)}
                        >
                          {copiedText === app ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* QR Code Tab */}
              <TabsContent value="qr" className="space-y-4 mt-4">
                <div className="text-center space-y-4">
                  <Label className="text-sm font-medium text-gray-300">Scan with any UPI app:</Label>
                  <div className="flex justify-center bg-white p-6 rounded-lg mx-auto max-w-xs">
                    <QRCode
                      value={`upi://pay?pa=${mainUpiId}&pn=7Frames Photography&am=${customAmount}&cu=INR&tn=Support Photography`}
                      size={220}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-3">
                    Amount: ₹{customAmount} • Scan with any UPI app
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Motivational Message */}
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-300 text-center leading-relaxed">
                Your support helps me buy better gear, travel to new locations, and occasionally eat something fancier than instant noodles. Every rupee counts! 📸✨
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setDialogOpen(false)} 
                className="border-2 border-gray-400 bg-gray-800 text-white hover:bg-gray-600 hover:text-white hover:border-gray-300 flex-1 h-11 text-sm font-medium transition-all duration-200"
              >
                I'm Broke Too 💸
              </Button>
              <Button 
                onClick={() => setDialogOpen(false)} 
                className="bg-gold hover:bg-yellow-600 text-black font-semibold flex-1 h-11 text-sm"
              >
                Done! You're Welcome 👑
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
