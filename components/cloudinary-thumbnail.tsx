'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CloudinaryThumbnailProps {
  folderName: string
  title: string
  description: string
  id: string
}

// Predefined thumbnail URLs for each category with optimization
const categoryThumbnails: { [key: string]: string } = {
  'bikes': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598071/portfolio_uploads/bikes/ezo4z0oifbyiqfczfmta.jpg',
  'astro': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752597867/portfolio_uploads/Astro/mlfnsoh7mgkhfpnezvfx.jpg',
  'cars': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598096/portfolio_uploads/Cars/cd7e2kcfe2hcbssphnh7.jpg',
  'college': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598290/portfolio_uploads/College%20Events/px6sxzwwqofxoeuz6jpo.jpg',
  'college events': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598290/portfolio_uploads/College%20Events/px6sxzwwqofxoeuz6jpo.jpg',
  'college-events': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598290/portfolio_uploads/College%20Events/px6sxzwwqofxoeuz6jpo.jpg',
  'concerts': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598410/portfolio_uploads/Concerts/wfimxgqlpmiryliycr70.jpg',
  'danno': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598543/portfolio_uploads/Danno/sj6mhqhgjhdkhikrjgm0.jpg',
  'flowers': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598564/portfolio_uploads/Flowers/ilxhhzs7rxpdtlewidxe.jpg',
  'moon': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598625/portfolio_uploads/moon/si6otwfdyjzqnnx72jpd.jpg',
  'nature': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598790/portfolio_uploads/Nature/o9j9uzhnegsq1cspvhnt.jpg',
  'skies': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598822/portfolio_uploads/skies/yuoc6ofoxbtffrpgmnii.jpg',
  'lambo': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598607/portfolio_uploads/Lambo/u4turrvhheqvm4wycewp.jpg',
  'sunsets': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598835/portfolio_uploads/Sunsets/tiw0yfyat6nsgsmrjskg.jpg',
  'mountains': 'https://res.cloudinary.com/dmko2zav7/image/upload/q_70,f_auto,w_400,h_500,c_fill/v1752598735/portfolio_uploads/Mountains/nx2jyea93akwbzm0wqeu.jpg'
}

export function CloudinaryThumbnail({ folderName, title, description, id }: Readonly<CloudinaryThumbnailProps>) {
  const [loading, setLoading] = useState(true)

  // Get the predefined thumbnail URL for this category
  const thumbnailUrl = categoryThumbnails[id.toLowerCase()] || categoryThumbnails[folderName.toLowerCase()]

  useEffect(() => {
    // Since all thumbnails are now predefined, just set loading to false
    setLoading(false)
  }, [])

  const slugify = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-')
  }

  if (loading) {
    return (
      <div className="group overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[4/5] bg-gray-800 border border-gray-700 rounded-xl animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent rounded-b-xl">
            <div className="text-center">
              <span className="text-sm text-white bg-black px-3 py-1 rounded-full border border-gray-600">
                {title}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/category/${slugify(id)}`} className="block">
      <div className="group overflow-hidden hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative aspect-[4/5] bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-gold/50">
          
          {/* Image Content */}
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="text-3xl mb-2">📸</div>
                <div className="text-sm font-medium">No thumbnail available</div>
              </div>
            </div>
          )}
          
          {/* Simple overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Simple tag overlay - centered */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <span className="text-sm sm:text-base font-medium text-white bg-black/80 px-3 py-1.5 rounded-full border border-gray-600 group-hover:border-gold/60 group-hover:bg-black/90 transition-all duration-300">
              {title}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
