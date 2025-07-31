import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const imageUrl = searchParams.get('url')
    const filename = searchParams.get('filename')

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
    }

    // Validate that the URL is from our Cloudinary account for security
    if (!imageUrl.includes('res.cloudinary.com/dmko2zav7/')) {
      return NextResponse.json({ error: 'Invalid image source' }, { status: 403 })
    }

    // Fetch the image from Cloudinary
    const imageResponse = await fetch(imageUrl)
    
    if (!imageResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 })
    }

    // Get the image data as buffer
    const imageBuffer = await imageResponse.arrayBuffer()
    
    // Process image with Sharp: strip ALL metadata completely
    const image = sharp(Buffer.from(imageBuffer))
    
    // Process the image: remove ALL metadata including EXIF, IPTC, XMP, ICC profiles
    const processedImage = await image
      .jpeg({ 
        quality: 95,
        progressive: true,
        mozjpeg: true
      })
      .toBuffer({ resolveWithObject: false })
    
    // Set headers to force immediate download and prevent save dialogs
    const headers = new Headers()
    headers.set('Content-Type', 'application/octet-stream')
    headers.set('Content-Disposition', `attachment; filename="${filename || 'image.jpg'}"`)
    headers.set('Content-Transfer-Encoding', 'binary')
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    headers.set('Pragma', 'no-cache')
    headers.set('Expires', '0')
    headers.set('X-Content-Type-Options', 'nosniff')

    return new NextResponse(processedImage, {
      status: 200,
      headers
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })
  }
}
