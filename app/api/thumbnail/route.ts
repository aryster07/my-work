import { NextRequest, NextResponse } from 'next/server';
import { getFolderThumbnail } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');

  if (!folder) {
    return NextResponse.json({ error: 'Folder parameter is required' }, { status: 400 });
  }

  try {
    const thumbnailUrl = await getFolderThumbnail(folder);
    return NextResponse.json({ thumbnailUrl });
  } catch (error) {
    console.error('Error fetching folder thumbnail:', error);
    return NextResponse.json({ error: 'Failed to fetch thumbnail' }, { status: 500 });
  }
}
