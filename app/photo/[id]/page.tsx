import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DonationButton } from "@/components/donation-button"

// This would normally come from a database or API
const getPhotoData = (id: string) => {
  return {
    id,
    title: `Photo ${id}`,
    description: "A beautiful photograph showcasing the art of photography",
    imageUrl: `/placeholder.svg?height=1200&width=1800&text=Photo+${id}`,
    category: "nature",
    date: "April 2023",
    camera: "Sony Alpha A7 III",
    lens: "24-70mm f/2.8",
    settings: "f/8, 1/250s, ISO 100",
  }
}

export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const photo = getPhotoData(id)

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" asChild className="group text-white hover:text-gold">
            <Link href={`/category/${photo.category}`} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Gallery
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-[3/2] overflow-hidden border border-gray-800">
            <Image src={photo.imageUrl || "/placeholder.svg"} alt={photo.title} fill className="object-cover" />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4 text-white">{photo.title}</h1>
            <p className="text-lg text-gray-400 mb-6">{photo.description}</p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-500">Category</span>
                <span className="text-white font-medium capitalize">{photo.category}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-500">Date</span>
                <span className="text-white font-medium">{photo.date}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-500">Camera</span>
                <span className="text-white font-medium">{photo.camera}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-500">Lens</span>
                <span className="text-white font-medium">{photo.lens}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-500">Settings</span>
                <span className="text-white font-medium">{photo.settings}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="flex items-center bg-gold hover:bg-yellow-600 text-black font-semibold">
                <Download className="mr-2 h-4 w-4" />
                Download Full Resolution
              </Button>
              <DonationButton />
              <Button variant="outline" className="flex items-center border-gold text-gold hover:bg-gold hover:text-black">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
