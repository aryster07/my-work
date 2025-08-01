import { NextRequest, NextResponse } from 'next/server'
import { persistentStorage } from '@/lib/persistent-storage'

// Admin endpoint to manage download counts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    if (action === 'view') {
      // View all download counts
      const allCounts = persistentStorage.getAllCounts()
      return NextResponse.json({ 
        success: true, 
        counts: allCounts,
        total: Object.keys(allCounts).length
      })
    }
    
    return NextResponse.json({ 
      error: 'Invalid action. Use ?action=view to see all counts' 
    }, { status: 400 })
    
  } catch (error) {
    console.error('❌ Error in download counts admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, imageKey, count } = await request.json()
    
    if (action === 'set' && imageKey && typeof count === 'number') {
      // Set specific count for an image
      persistentStorage.setCount(imageKey, count)
      return NextResponse.json({ 
        success: true, 
        message: `Set count for ${imageKey} to ${count}` 
      })
    }
    
    return NextResponse.json({ 
      error: 'Invalid request. Use action=set with imageKey and count' 
    }, { status: 400 })
    
  } catch (error) {
    console.error('❌ Error in download counts admin POST:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
