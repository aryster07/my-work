"use client"

import { useState, useEffect } from "react"
import { Heart, CreditCard, Smartphone, QrCode, Copy, Check } from "lucide-react"
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

  // UPI Payment IDs (replace with your actual IDs)
  const upiIds = {
    paytm: "7frames.aryan@paytm",
    googlepay: "7frames.aryan@oksbi",
    phonepe: "7frames.aryan@paytm",
    bhim: "7frames.aryan@oksbi"
  }

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

  const handleRazorpayPayment = () => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => {
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your actual key
        amount: parseInt(customAmount) * 100, // Amount in paise
        currency: 'INR',
        name: '7Frames Photography',
        description: 'Support My Photography Journey',
        image: '/placeholder-logo.png',
        handler: function (response: any) {
          alert('Payment successful! Thank you for your support.')
          setDialogOpen(false)
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#FFD700'
        }
      }
      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()
    }
    document.head.appendChild(script)
  }

  return (
    <>
      {/* Floating donation button that appears after interaction */}
      <div 
        data-donation-trigger
        className="fixed bottom-6 right-6 z-50 group cursor-pointer"
        onClick={() => setDialogOpen(true)}
      >
        <div className="bg-gold hover:bg-yellow-600 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group-hover:shadow-xl">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Support My Work 📸
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-black border-gray-800 text-white max-w-md mx-auto p-0 overflow-hidden">
          <div className="relative p-6">
            {/* Header with sarcastic touch */}
            <DialogHeader className="text-center mb-6">
              <DialogTitle className="text-2xl font-bold text-gold mb-2">
                Help Me Afford Ramen 🍜
              </DialogTitle>
              <DialogDescription className="text-gray-300 text-sm">
                Because even photographers need to eat between shoots
              </DialogDescription>
            </DialogHeader>

            {/* Payment Options */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900 mb-6">
                <TabsTrigger value="upi" className="text-xs data-[state=active]:bg-gold data-[state=active]:text-black">
                  UPI
                </TabsTrigger>
                <TabsTrigger value="qr" className="text-xs data-[state=active]:bg-gold data-[state=active]:text-black">
                  QR Code
                </TabsTrigger>
                <TabsTrigger value="razorpay" className="text-xs data-[state=active]:bg-gold data-[state=active]:text-black">
                  Card/Net Banking
                </TabsTrigger>
              </TabsList>

              {/* UPI Payment Tab */}
              <TabsContent value="upi" className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-300">Choose your UPI app:</Label>
                  {Object.entries(upiIds).map(([app, id]) => (
                    <div key={app} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-4 h-4 text-gold" />
                        <span className="capitalize text-sm">{app.replace('googlepay', 'Google Pay')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400 font-mono">{id}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-gray-700 hover:bg-gold hover:text-black"
                          onClick={() => copyToClipboard(id, app)}
                        >
                          {copiedText === app ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* QR Code Tab */}
              <TabsContent value="qr" className="space-y-4">
                <div className="text-center space-y-4">
                  <Label className="text-sm font-medium text-gray-300">Scan with any UPI app:</Label>
                  <div className="flex justify-center bg-white p-4 rounded-lg">
                    <QRCode
                      value={`upi://pay?pa=${upiIds.paytm}&pn=7Frames Photography&am=${customAmount}&cu=INR&tn=Support Photography`}
                      size={180}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    Amount: ₹{customAmount} • Scan with any UPI app
                  </p>
                </div>
              </TabsContent>

              {/* Razorpay Tab */}
              <TabsContent value="razorpay" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount" className="text-sm font-medium text-gray-300">
                      Choose amount (₹):
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2 mb-3">
                      {['50', '100', '200', '500'].map((amount) => (
                        <Button
                          key={amount}
                          size="sm"
                          variant={customAmount === amount ? "default" : "outline"}
                          className={customAmount === amount 
                            ? "bg-gold text-black hover:bg-yellow-600" 
                            : "border-gray-700 text-white hover:bg-gray-800"
                          }
                          onClick={() => setCustomAmount(amount)}
                        >
                          ₹{amount}
                        </Button>
                      ))}
                    </div>
                    <Input
                      id="amount"
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="Custom amount"
                    />
                  </div>
                  <Button 
                    onClick={handleRazorpayPayment}
                    className="w-full bg-gold hover:bg-yellow-600 text-black font-semibold h-12"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay ₹{customAmount} via Razorpay
                  </Button>
                  <p className="text-xs text-gray-400 text-center">
                    Secure payment powered by Razorpay
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Motivational Message */}
            <div className="mt-6 p-4 bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-300 text-center leading-relaxed">
                Your support helps me buy better gear, travel to new locations, and occasionally eat something fancier than instant noodles. Every rupee counts! 📸✨
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setDialogOpen(false)} 
                className="border-gray-700 text-white hover:bg-gray-800 flex-1 h-10 md:h-12 text-sm md:text-base"
              >
                I'm Broke Too 💸
              </Button>
              <Button 
                onClick={() => setDialogOpen(false)} 
                className="bg-gold hover:bg-yellow-600 text-black font-semibold flex-1 h-10 md:h-12 text-sm md:text-base"
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
