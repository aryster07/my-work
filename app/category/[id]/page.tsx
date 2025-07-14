import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PhotoGallery } from "@/components/photo-gallery"
import { DonationButton } from "@/components/donation-button"

// This would normally come from a database or API
const getCategoryData = (id: string) => {
  const categories = {
    nature: {
      title: "Nature",
      description: "Exploring the beauty of natural landscapes and wildlife",
      photos: Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        title: `Nature Photo ${i + 1}`,
        description: "A beautiful capture of nature's wonders",
        imageUrl: `/placeholder.svg?height=800&width=1200&text=Nature+${i + 1}`,
      })),
    },
    sunsets: {
      title: "Sunsets",
      description: "Magical moments when the sun meets the horizon",
      photos: Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        title: `Sunset Photo ${i + 1}`,
        description: "A stunning sunset captured in all its glory",
        imageUrl: `/placeholder.svg?height=800&width=1200&text=Sunset+${i + 1}`,
      })),
    },
    moon: {
      title: "Moon",
      description: "Celestial beauty of our nearest neighbor",
      photos: Array.from({ length: 4 }, (_, i) => ({
        id: i + 1,
        title: `Moon Photo ${i + 1}`,
        description: "The moon in its different phases and settings",
        imageUrl: `/placeholder.svg?height=800&width=1200&text=Moon+${i + 1}`,
      })),
    },
    automobile: {
      title: "Automobile",
      description: "The art and engineering of vehicles",
      photos: Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Automobile Photo ${i + 1}`,
        description: "Showcasing the beauty of automotive design",
        imageUrl: `/placeholder.svg?height=800&width=1200&text=Automobile+${i + 1}`,
      })),
    },
    cars: {
      title: "Cars",
      description: "From classics to modern marvels on four wheels",
      photos: Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        title: `Car Photo ${i + 1}`,
        description: "Stunning car photography from various angles",
        imageUrl: `/placeholder.svg?height=800&width=1200&text=Car+${i + 1}`,
      })),
    },
    bikes: {
      title: "Bikes",
      description: "Two-wheeled machines that represent freedom and adventure",
      photos: Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        title: `Bike Photo ${i + 1}`,
        description: "Motorcycles captured in their natural habitat",
        imageUrl: `/placeholder.svg?height=800&width=1200&text=Bike+${i + 1}`,
      })),
    },
  }

  return (
    categories[id as keyof typeof categories] || {
      title: id.charAt(0).toUpperCase() + id.slice(1),
      description: "A collection of beautiful photographs",
      photos: Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        title: `Photo ${i + 1}`,
        description: "A beautiful photograph from this collection",
        imageUrl: `/placeholder.svg?height=800&width=1200&text=${id}+${i + 1}`,
      })),
    }
  )
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const category = getCategoryData(id)

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" asChild className="group text-white hover:text-gold">
            <Link href="/#gallery" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Gallery
            </Link>
          </Button>
          <DonationButton />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{category.title}</h1>
        <p className="text-lg text-gray-400 mb-12 max-w-3xl">{category.description}</p>

        <PhotoGallery photos={category.photos} />
      </div>
    </div>
  )
}
