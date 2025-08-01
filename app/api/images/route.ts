import { NextRequest, NextResponse } from 'next/server';
import { getFolderImages } from '@/lib/cloudinary';
import { persistentStorage } from '@/lib/persistent-storage';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');

  if (!folder) {
    return NextResponse.json({ error: 'Folder parameter is required' }, { status: 400 });
  }

  try {
    const images = await getFolderImages(folder);
    
    // Add download counts to each image
    const imagesWithCounts = images.map(image => {
      const imageKey = persistentStorage.createImageKey(folder, image.publicId, image.id)
      const downloadCount = persistentStorage.getCount(imageKey) // Real persistent count
      
      return {
        ...image,
        downloadCount
      }
    })
    
    return NextResponse.json({ images: imagesWithCounts });
  } catch (error) {
    console.error('Error fetching folder images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
