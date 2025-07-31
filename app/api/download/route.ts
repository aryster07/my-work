import { NextRequest, NextResponse } from 'next/server'

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
    
    // Set appropriate headers for download
    const headers = new Headers()
    headers.set('Content-Type', imageResponse.headers.get('Content-Type') || 'image/jpeg')
    headers.set('Content-Disposition', `attachment; filename="${filename || 'image.jpg'}"`)
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    headers.set('Pragma', 'no-cache')
    headers.set('Expires', '0')

    return new NextResponse(imageBuffer, {
      status: 200,
      headers
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })
  }
}
