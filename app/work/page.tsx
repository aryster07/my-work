import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DonationDialog } from "@/components/donation-dialog"
import { SpeedLines } from "@/components/speed-lines"

const albums = [
  { id: 1, title: "NIGHT MEETS", count: 12, color: "#FF0040" },
  { id: 2, title: "TRACK DAYS", count: 15, color: "#00CCFF" },
  { id: 3, title: "SUPERBIKES", count: 8, color: "#FFD600" },
  { id: 4, title: "EXOTIC CARS", count: 10, color: "#FF6B00" },
  { id: 5, title: "DRIFT EVENTS", count: 14, color: "#9900FF" },
  { id: 6, title: "DETAIL SHOTS", count: 9, color: "#00FF66" },
]

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 pt-24">
        <section className="py-12 px-4 relative">
          <SpeedLines />
          <div className="max-w-6xl mx-auto relative z-10">
            <Button variant="ghost" asChild className="mb-6 p-2 h-10 w-10 rounded-full bg-black/80 backdrop-blur-sm border border-gray-700 hover:border-gold/50 hover:bg-black/90 transition-all duration-200 group">
              <Link href="/#gallery" aria-label="Back to Home">
                <ArrowLeft className="h-5 w-5 text-white group-hover:text-gold transition-colors" />
              </Link>
            </Button>
            
            <div className="inline-block bg-gold text-black px-4 py-1 rounded-sm text-sm font-bold mb-6">
              PORTFOLIO
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">THE COLLECTION</h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-12">
              Browse through my automotive and superbike photography collections. Each album captures the essence of
              speed, design, and mechanical beauty.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album, index) => (
                <Link key={album.id} href={`/work/album/${album.id}`} className="group">
                  <div
                    className="relative aspect-square overflow-hidden transition-all duration-500 group-hover:scale-95 border border-gray-800"
                    style={{
                      transformOrigin: index % 2 === 0 ? "bottom left" : "bottom right",
                    }}
                  >
                    <div
                      className="absolute inset-0 z-10 opacity-40 mix-blend-color transition-opacity duration-500 group-hover:opacity-60"
                      style={{ backgroundColor: album.color }}
                    ></div>
                    <Image
                      src={`/placeholder.svg?height=800&width=800&text=Album+${album.id}`}
                      alt={album.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                      <div className="bg-black/70 backdrop-blur-sm p-4">
                        <h3 className="text-xl font-bold">{album.title}</h3>
                        <p className="text-sm text-gray-400">{album.count} photos</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <DonationDialog />
    </div>
  )
}
