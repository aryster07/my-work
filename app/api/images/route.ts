import { NextRequest, NextResponse } from 'next/server';
import { getFolderImages } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');

  if (!folder) {
    return NextResponse.json({ error: 'Folder parameter is required' }, { status: 400 });
  }

  try {
    const images = await getFolderImages(folder);
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching folder images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
