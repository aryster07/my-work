import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DonationDialog } from "@/components/donation-dialog"
import { SpeedLines } from "@/components/speed-lines"

// This would normally come from a database or API
const getAlbumData = (id: string) => {
  const albumColors = {
    "1": "#FF0040",
    "2": "#00CCFF",
    "3": "#FFD600",
    "4": "#FF6B00",
    "5": "#9900FF",
    "6": "#00FF66",
  }

  const albums = {
    "1": {
      title: "NIGHT MEETS",
      description: "Capturing the underground car culture after dark. Neon lights, reflections, and automotive beauty.",
      color: albumColors[id as keyof typeof albumColors] || "#FF0040",
      photos: Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Night Meet ${i + 1}`,
        description: "Automotive photography in the urban nightscape.",
      })),
    },
    "2": {
      title: "TRACK DAYS",
      description: "High-speed action from professional race tracks and track day events.",
      color: albumColors[id as keyof typeof albumColors] || "#00CCFF",
      photos: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Track Day ${i + 1}`,
        description: "Performance cars pushing their limits on the track.",
      })),
    },
    "3": {
      title: "SUPERBIKES",
      description: "The raw power and sleek design of modern superbikes, captured in their element.",
      color: albumColors[id as keyof typeof albumColors] || "#FFD600",
      photos: Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Superbike ${i + 1}`,
        description: "High-performance motorcycles showcasing speed and engineering.",
      })),
    },
  }

  return (
    albums[id as keyof typeof albums] || {
      title: `ALBUM ${id}`,
      description: "A collection of automotive photography.",
      color: albumColors[id as keyof typeof albumColors] || "#FF0040",
      photos: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `Photo ${i + 1}`,
        description: "Automotive photography at its finest.",
      })),
    }
  )
}

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const album = getAlbumData(id)

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 pt-24">
        <section className="py-12 px-4 relative">
          <SpeedLines />
          <div className="max-w-6xl mx-auto relative z-10">
            <Button variant="ghost" asChild className="mb-6 hover:bg-transparent hover:text-gold text-white">
              <Link href="/work" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK TO ALBUMS
              </Link>
            </Button>

            <div
              className="inline-block px-4 py-1 rounded-sm text-sm font-bold mb-6 text-black"
              style={{ backgroundColor: album.color }}
            >
              ALBUM
            </div>
            <h1 className="text-5xl font-bold mb-4 text-white">{album.title}</h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-12">{album.description}</p>
          </div>
        </section>

        <section className="py-12 px-4 bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {album.photos.map((photo, index) => (
                <div key={photo.id} className="group">
                  <div
                    className="relative aspect-square overflow-hidden transition-all duration-500 group-hover:scale-95 border border-gray-800"
                    style={{
                      transformOrigin: index % 3 === 0 ? "bottom left" : index % 3 === 1 ? "center" : "bottom right",
                    }}
                  >
                    <Image
                      src={`/placeholder.svg?height=800&width=800&text=Photo+${photo.id}`}
                      alt={photo.title}
                      width={800}
                      height={800}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                      style={{
                        background: `linear-gradient(to top, ${album.color}99, transparent)`,
                      }}
                    >
                      <h3 className="text-white font-bold text-xl">{photo.title}</h3>
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          className="bg-gold text-black hover:bg-yellow-600 font-semibold border-0"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          DOWNLOAD
                        </Button>
                        <Button
                          size="sm"
                          className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-gold border border-gold/30"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          SHARE
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <DonationDialog />
    </div>
  )
}
