import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dmko2zav7',
  api_key: process.env.CLOUDINARY_API_KEY || '195252934725612',
  api_secret: process.env.CLOUDINARY_API_SECRET || '2k2jRQyebgpcKsClcImkS8F9K0Y',
})

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('resource_type:image')
      .max_results(50)
      .sort_by('created_at', 'desc')
      .execute()
    
    const images = result.resources.map((img: any, index: number) => ({
      publicId: img.public_id,
      // Optimized low-res for circular carousel (300px, quality 60, smart crop)
      url: `https://res.cloudinary.com/dmko2zav7/image/upload/w_300,h_300,c_fill,g_auto,q_60,f_auto/${img.public_id}`,
      // Medium resolution for preview/modal (800px, quality 80)
      previewUrl: `https://res.cloudinary.com/dmko2zav7/image/upload/w_800,q_80,f_auto,c_fill,g_auto/${img.public_id}`,
      // Original high quality URL for full view
      originalUrl: `https://res.cloudinary.com/dmko2zav7/image/upload/q_auto,f_auto/${img.public_id}`,
      // Thumbnail for fast loading (150px, quality 50)
      thumbnailUrl: `https://res.cloudinary.com/dmko2zav7/image/upload/w_150,h_150,c_fill,g_auto,q_50,f_auto/${img.public_id}`,
      width: img.width || 300,
      height: img.height || 300,
      title: `Portfolio Image ${index + 1}`,
      alt: `Portfolio carousel image ${index + 1}`,
      created_at: img.created_at,
    }))
    
    return NextResponse.json({ 
      success: true, 
      total: result.total_count,
      images: images 
    })
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch images' 
    }, { status: 500 })
  }
}
