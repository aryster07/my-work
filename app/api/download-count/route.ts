import { NextRequest, NextResponse } from 'next/server'
import { persistentStorage } from '@/lib/persistent-storage'
import { trackServerEvent } from '@/lib/analytics'

export async function POST(request: NextRequest) {
  try {
    const { imageId, folderName, publicId } = await request.json()
    
    if (!imageId || !folderName || !publicId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create a unique key for the image
    const imageKey = persistentStorage.createImageKey(folderName, publicId, imageId)
    
    // Increment download count
    const newCount = persistentStorage.incrementCount(imageKey)
    
    // Track server-side download event
    await trackServerEvent.imageDownloaded(publicId, folderName)
    
    console.log(`📊 Download count updated for ${publicId}: ${newCount}`)
    
    return NextResponse.json({ 
      success: true, 
      downloadCount: newCount,
      imageId,
      publicId 
    })
    
  } catch (error) {
    console.error('❌ Error updating download count:', error)
    return NextResponse.json(
      { error: 'Failed to update download count' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const folderName = searchParams.get('folder')
    
    if (!folderName) {
      return NextResponse.json(
        { error: 'Folder name is required' },
        { status: 400 }
      )
    }

    // Return all download counts for a folder
    const folderCounts = downloadStorage.getFolderCounts(folderName)
    
    return NextResponse.json({ 
      success: true, 
      counts: folderCounts 
    })
    
  } catch (error) {
    console.error('❌ Error fetching download counts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch download counts' },
      { status: 500 }
    )
  }
}
