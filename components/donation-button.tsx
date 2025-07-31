"use client"

import { useState, useEffect } from "react"
import { Heart, Smartphone, QrCode, Copy, Check } from "lucide-react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DonationButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("upi")
  const [copiedText, setCopiedText] = useState("")
  const [customAmount, setCustomAmount] = useState("100")

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // UPI Payment IDs organized by app
  const upiIds = {
    "Google Pay (SBI)": "aryanrana762-1@oksbi",
    "Google Pay (ICICI)": "aryanrana762@okicici",
    "PhonePe (YBL)": "aryanrana762@ybl", 
    "PhonePe (IDBI)": "aryanrana762@ibl"
  }
  
  const mainUpiId = "aryanrana762-1@oksbi"
  
  const generateUPILink = (amount: string) => {
    return `upi://pay?pa=${mainUpiId}&pn=7Frames_aryan&am=${amount}&cu=INR&tn=Photography%20Support%20Donation`
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(type)
      setTimeout(() => setCopiedText(""), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-gold hover:bg-yellow-500 text-black font-bold px-6 py-3 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        size="default"
      >
        <Heart className="h-4 w-4 mr-2" fill="currentColor" /> 
       Donate
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="border-gray-800 bg-[#0A0A0A] text-white max-h-[95vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader className="space-y-1 sm:space-y-2">
            <DialogTitle className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#FF0040] to-[#00CCFF] bg-clip-text text-transparent leading-tight">
              SUPPORT MY PHOTOGRAPHY ❤️
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-xs sm:text-sm md:text-base">
              Your support helps me capture more stunning moments and upgrade equipment for better quality content.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-2 sm:space-y-3 md:space-y-4 pt-1 sm:pt-2">
            {/* Custom Amount Input */}
            <div className="space-y-1 sm:space-y-2">
              <Label className="text-xs sm:text-sm font-medium text-gray-300 block">Enter Amount</Label>
              <Input
                type="number"
                placeholder="Enter any amount (₹)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white text-sm md:text-base h-9 sm:h-10 md:h-11"
              />
            </div>

            {/* Payment Methods Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900 h-8 sm:h-9 md:h-10">
                <TabsTrigger value="upi" className="text-xs sm:text-sm px-1 sm:px-2 py-1">
                  <Smartphone className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  UPI
                </TabsTrigger>
                <TabsTrigger value="qr" className="text-xs sm:text-sm px-1 sm:px-2 py-1">
                  <QrCode className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  QR Code
                </TabsTrigger>
              </TabsList>

              {/* UPI Payment Tab */}
              <TabsContent value="upi" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                <div className="grid gap-3 sm:gap-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                      Pay instantly using your favorite UPI app
                    </p>
                    
                    {/* Quick UPI buttons for instant payment */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <a
                        href={generateUPILink("50")}
                        className="inline-block"
                      >
                        <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold text-xs sm:text-sm h-9 sm:h-10 rounded-xl">
                          Quick ₹50
                        </Button>
                      </a>
                      <a
                        href={generateUPILink("100")}
                        className="inline-block"
                      >
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-xs sm:text-sm h-9 sm:h-10 rounded-xl">
                          Quick ₹100
                        </Button>
                      </a>
                    </div>
                    
                    {/* Custom amount UPI payment */}
                    <a
                      href={generateUPILink(customAmount)}
                      className="inline-block w-full"
                    >
                      <Button className="w-full bg-[#00CCFF] hover:bg-[#0099CC] text-black font-semibold text-xs sm:text-sm md:text-base h-9 sm:h-10 md:h-12">
                        Pay ₹{customAmount} via UPI
                      </Button>
                    </a>
                    <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                      Opens your UPI app directly • No fees • Instant transfer
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {Object.entries(upiIds).map(([app, id]) => (
                      <div key={app} className="bg-gray-900 p-2 sm:p-3 rounded border border-gray-700">
                        <div className="flex justify-between items-center gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-400 uppercase font-semibold truncate">{app.toUpperCase()}</p>
                            <p className="text-xs sm:text-sm font-mono truncate text-[#00CCFF]">{id}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(id, app)}
                            className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0"
                          >
                            {copiedText === app ? (
                              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                            ) : (
                              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* QR Code Tab */}
              <TabsContent value="qr" className="space-y-3 mt-4">
                <div className="flex flex-col items-center text-center px-2">
                  <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg mb-3 shadow-lg max-w-fit">
                    <img 
                      src="/images/payment-qr.jpg" 
                      alt="UPI Payment QR Code"
                      className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] object-contain"
                    />
                  </div>
                  <div className="text-sm text-gray-400 mb-2 space-y-1">
                    <p className="font-semibold text-[#00CCFF] text-xs sm:text-sm">UPI ID: aryanrana762-1@oksbi</p>
                    <p className="text-xs sm:text-sm">Scan this QR code with any UPI app</p>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-[#00CCFF] mb-1">
                    Donate any amount you wish ✨
                  </p>
                  <p className="text-xs text-gray-500">
                    Works with PhonePe, GPay, Paytm, BHIM & all UPI apps
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1 sm:pt-2">
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)} 
                className="border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:border-gray-500 flex-1 h-9 sm:h-10 md:h-11 text-xs sm:text-sm md:text-base order-2 sm:order-1"
              >
                Maybe Later
              </Button>
              <Button 
                onClick={() => setIsOpen(false)} 
                className="bg-[#00FF66] hover:bg-[#00CC52] text-black font-semibold flex-1 h-9 sm:h-10 md:h-11 text-xs sm:text-sm md:text-base order-1 sm:order-2"
              >
                Thanks, I've Donated! 🙏
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
