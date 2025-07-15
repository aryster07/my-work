import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dmko2zav7',
  api_key: process.env.CLOUDINARY_API_KEY || '195252934725612',
  api_secret: process.env.CLOUDINARY_API_SECRET || '2k2jRQyebgpcKsClcImkS8F9K0Y',
});

export { cloudinary };

export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME || 'dmko2zav7'}/image/upload`;

// Helper function to get optimized image URL with original aspect ratio
export const getOptimizedImageUrl = (publicId: string, options: {
  width?: number;
  height?: number;
  quality?: string;
  format?: string;
  crop?: string;
} = {}) => {
  const { width = 800, height, quality = 'auto', format = 'auto', crop = 'limit' } = options;
  
  // If height is not specified, let Cloudinary maintain aspect ratio
  const heightParam = height ? `,h_${height}` : '';
  const cropParam = crop ? `,c_${crop}` : '';
  
  return `${CLOUDINARY_BASE_URL}/w_${width}${heightParam}${cropParam},q_${quality},f_${format}/${publicId}`;
};

// Function to get folder contents
export async function getFolderImages(folderName: string) {
  try {
    const result = await cloudinary.search
      .expression(`folder:portfolio_uploads/${folderName}`)
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();
    
    return result.resources.map((resource: any, index: number) => ({
      id: index + 1,
      title: `${folderName.charAt(0).toUpperCase() + folderName.slice(1)} Photo ${index + 1}`,
      description: `A beautiful photograph from the ${folderName} collection`,
      imageUrl: getOptimizedImageUrl(resource.public_id, { width: 600, crop: 'limit' }),
      originalUrl: resource.secure_url,
      publicId: resource.public_id,
      width: resource.width,
      height: resource.height,
      aspectRatio: resource.width / resource.height,
    }));
  } catch (error) {
    console.error(`Error fetching images from ${folderName}:`, error);
    return [];
  }
}

// Function to get the first image from a folder as thumbnail
export async function getFolderThumbnail(folderName: string) {
  try {
    const result = await cloudinary.search
      .expression(`folder:portfolio_uploads/${folderName}`)
      .sort_by('created_at', 'desc')
      .max_results(1)
      .execute();
    
    if (result.resources.length > 0) {
      const resource = result.resources[0];
      return {
        url: getOptimizedImageUrl(resource.public_id, { width: 500, crop: 'limit' }),
        width: resource.width,
        height: resource.height,
        aspectRatio: resource.width / resource.height,
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching thumbnail for ${folderName}:`, error);
    return null;
  }
}
