"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface Photo {
  id: number
  title: string
  description: string
  imageUrl: string
}

interface PhotoGalleryProps {
  photos: Photo[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="group cursor-pointer relative">
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <Image
                src={photo.imageUrl || "/placeholder.svg"}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-medium">{photo.title}</h3>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-gold text-black px-2 py-1 text-xs rounded-sm hover:bg-yellow-600 transition-colors font-semibold"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Download logic would go here
                        alert(`Downloading ${photo.title}`)
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 z-10 hover:bg-primary/80 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="relative flex-1 min-h-0">
              <Image
                src={selectedPhoto.imageUrl || "/placeholder.svg"}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="bg-black/70 p-4 text-white mt-2 border-l-2 border-primary">
              <h3 className="text-xl font-semibold">{selectedPhoto.title}</h3>
              <p className="text-gray-300 mt-1">{selectedPhoto.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <Link
                  href={`/photo/${selectedPhoto.id}`}
                  className="text-secondary hover:text-secondary/80 transition-colors"
                >
                  View Details
                </Link>
                <div className="flex gap-2">
                  <button className="bg-gold text-black px-4 py-2 hover:bg-yellow-600 transition-colors font-semibold rounded">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
