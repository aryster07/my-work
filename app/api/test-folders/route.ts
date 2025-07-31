import { NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    console.log('🔍 Searching for all folders in Cloudinary...');
    
    // Search for all resources to see folder structure
    const result = await cloudinary.search
      .expression('resource_type:image')
      .max_results(100)
      .execute();
    
    // Extract unique folder paths
    const folders = new Set<string>();
    result.resources.forEach((resource: any) => {
      if (resource.public_id.includes('/')) {
        const folderPath = resource.public_id.split('/').slice(0, -1).join('/');
        folders.add(folderPath);
      }
    });
    
    const folderList = Array.from(folders).sort((a, b) => a.localeCompare(b));
    
    console.log('📁 Found folders:', folderList);
    console.log('🖼️ Total images found:', result.resources.length);
    
    return NextResponse.json({ 
      folders: folderList,
      totalImages: result.resources.length,
      sampleImages: result.resources.slice(0, 5).map((r: any) => ({
        publicId: r.public_id,
        folder: r.public_id.includes('/') ? r.public_id.split('/').slice(0, -1).join('/') : 'root'
      }))
    });
  } catch (error) {
    console.error('❌ Error fetching folders:', error);
    return NextResponse.json({ error: 'Failed to fetch folders', details: error }, { status: 500 });
  }
}