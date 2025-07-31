import Link from "next/link"
import { ProgressiveImage } from "./progressive-image"

interface CategoryCardProps {
  id: string
  title: string
  imageUrl: string
}

export function CategoryCard({ id, title, imageUrl }: CategoryCardProps) {
  return (
    <Link href={`/category/${id}`} className="group">
      <div className="relative overflow-hidden aspect-[4/3] transition-all duration-300 group-hover:shadow-lg border border-gray-800">
        <ProgressiveImage
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6">
          <div className="w-full">
            <h3 className="text-xl font-semibold text-white group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
              {title}
            </h3>
            <div className="w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500 mt-2"></div>
          </div>
        </div>
      </div>
    </Link>
  )
}
