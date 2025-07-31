import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ImageProtection } from "@/components/image-protection"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "7frames_aryan | Photography Portfolio",
  description: "Photography portfolio showcasing the work of 7frames_aryan",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen`}>
        <ImageProtection />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
