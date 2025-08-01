import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

import { ConditionalNavbar } from "@/components/conditional-navbar"
import { Footer } from "@/components/footer"
import { ImageProtection } from "@/components/image-protection"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "7Frames_aryan | Photography Portfolio",
  description: "Photography portfolio showcasing the work of 7Frames_aryan",
  generator: 'v0.dev',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/images/Dp.jpg', sizes: '16x16', type: 'image/jpeg' },
      { url: '/images/Dp.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/images/Dp.jpg', sizes: '48x48', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/images/Dp.jpg', sizes: '57x57', type: 'image/jpeg' },
      { url: '/images/Dp.jpg', sizes: '60x60', type: 'image/jpeg' },
      { url: '/images/Dp.jpg', sizes: '72x72', type: 'image/jpeg' },
      { url: '/images/Dp.jpg', sizes: '76x76', type: 'image/jpeg' },
      { url: '/images/Dp.jpg', sizes: '114x114', type: 'image/jpeg' },
      { url: '/images/Dp.jpg', sizes: '120x120', type: 'image/jpeg' },
      { url: '/images/Dp.jpg', sizes: '144x144', type: 'image/jpeg' },
      { url: '/images/Dp.jpg', sizes: '152x152', type: 'image/jpeg' },
      { url: '/images/Dp.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: '/images/Dp.jpg',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': '7Frames_aryan',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white min-h-screen overflow-x-hidden max-w-full`}>
        <ImageProtection />
        <ConditionalNavbar />
        <div className="w-full max-w-full overflow-x-hidden">
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
