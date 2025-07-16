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

export function PhotoGallery({ photos }: Readonly<PhotoGalleryProps>) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <button
            key={photo.id}
            className="group cursor-pointer relative text-left w-full border-0 bg-transparent p-0"
            onClick={() => setSelectedPhoto(photo)}
            aria-label={`View ${photo.title}`}
          >
            <div className="relative overflow-hidden rounded-lg aspect-thumbnail">
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
                      title={`Download ${photo.title}`}
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal - Google Drive Style */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8">
          <button
            className="absolute inset-0 w-full h-full cursor-pointer"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close image preview"
          />
          <div className="relative max-w-4xl max-h-[80vh] bg-white rounded-lg shadow-2xl overflow-hidden z-10">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
              <h3 id="modal-title" className="font-semibold text-gray-900 truncate">{selectedPhoto.title}</h3>
              <button
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close image preview"
                title="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Image container */}
            <div className="relative bg-gray-100 flex items-center justify-center preview-container">
              <Image
                src={selectedPhoto.imageUrl || "/placeholder.svg"}
                alt={selectedPhoto.title}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t">
              <p className="text-sm text-gray-600">{selectedPhoto.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <Link
                  href={`/photo/${selectedPhoto.id}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
                >
                  View Details
                </Link>
                <div className="flex gap-2">
                  <button 
                    className="bg-gold text-black px-4 py-2 hover:bg-yellow-600 transition-colors font-semibold rounded text-sm"
                    title="Download image"
                  >
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
