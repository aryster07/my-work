import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CloudinaryGallery } from "@/components/cloudinary-gallery"
import { PageTracker } from "@/components/page-tracker"

// Mapping of URL-friendly IDs to actual Cloudinary folder names
const folderMapping: { [key: string]: string } = {
  'astro': 'Astro',
  'bikes': 'bikes',
  'cars': 'Cars',
  'college': 'College Events',
  'concerts': 'Concerts',
  'danno': 'Danno',
  'flowers': 'Flowers',
  'lambo': 'Lambo',
  'moon': 'moon',
  'mountains': 'Mountains',
  'nature': 'Nature',
  'skies': 'skies',
  'sunsets': 'Sunsets',
}

const categoryDescriptions: { [key: string]: { title: string; description: string } } = {
  'astro': {
    title: 'Astro Photography',
    description: 'Celestial photography capturing the wonders of space and night sky'
  },
  'bikes': {
    title: 'Bikes',
    description: 'Dynamic motorcycle and cycling photography showcasing speed and style'
  },
  'cars': {
    title: 'Cars',
    description: 'Automotive photography showcasing beautiful car designs and events'
  },
  'college': {
    title: 'College',
    description: 'Vibrant campus life and memorable university moments'
  },
  'concerts': {
    title: 'Concerts',
    description: 'Live music photography capturing the energy and emotion of performances'
  },
  'danno': {
    title: 'Danno',
    description: 'Specialized portrait and character photography with unique perspectives'
  },
  'flowers': {
    title: 'Flowers',
    description: 'Delicate botanical photography showcasing nature colorful beauty'
  },
  'lambo': {
    title: 'Lambo',
    description: 'Luxury automotive photography featuring the iconic Lamborghini collection'
  },
  'moon': {
    title: 'Moon',
    description: 'Lunar photography capturing Earth celestial companion in detail'
  },
  'mountains': {
    title: 'Mountains',
    description: 'Majestic mountain landscapes and scenic vista photography'
  },
  'nature': {
    title: 'Nature',
    description: 'Wildlife and natural environment photography in all its glory'
  },
  'skies': {
    title: 'Skies',
    description: 'Winter sports and skiing photography capturing snowy adventures'
  },
  'sunsets': {
    title: 'Sunsets',
    description: 'Golden hour magic and breathtaking sunset photography'
  },
}

export default async function CategoryPage({ params }: { readonly params: Promise<{ readonly id: string }> }) {
  const { id } = await params
  const folderName = folderMapping[id.toLowerCase()]
  const categoryInfo = categoryDescriptions[id.toLowerCase()]

  if (!folderName || !categoryInfo) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
          <Button asChild>
            <Link href="/#gallery">Back to Gallery</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <PageTracker pageName="category" categoryName={folderName} />
      
      {/* Clean Back Button - Fixed Position - Hidden on Mobile */}
      <div className="hidden sm:block fixed top-24 left-4 z-40">
        <Button 
          variant="ghost" 
          asChild 
          className="group p-2 h-9 w-9 rounded-full bg-black/80 backdrop-blur-sm border border-gray-700 hover:border-gold/50 hover:bg-black/90 transition-all duration-200"
        >
          <Link href="/#gallery" aria-label="Back to Gallery">
            <ArrowLeft className="h-4 w-4 text-white group-hover:text-gold transition-colors" />
          </Link>
        </Button>
      </div>

      {/* Category Header - Reduced spacing */}
      <div className="pt-16 pb-6 px-4 bg-gradient-to-b from-black via-black/95 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">{categoryInfo.title}</h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed">{categoryInfo.description}</p>
        </div>
      </div>

      {/* Gallery Container */}
      <div className="w-full">
        <div className="w-full">
          <CloudinaryGallery folderName={folderName} />
        </div>
      </div>
    </div>
  )
}
