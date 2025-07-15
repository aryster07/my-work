import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dmko2zav7',
  api_key: '195252934725612',
  api_secret: '2k2jRQyebgpcKsClcImkS8F9K0Y',
});

export { cloudinary };

export const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dmko2zav7/image/upload";

// Helper function to get optimized image URL
export const getOptimizedImageUrl = (publicId: string, options: {
  width?: number;
  height?: number;
  quality?: string;
  format?: string;
} = {}) => {
  const { width = 800, height = 600, quality = 'auto', format = 'auto' } = options;
  return `${CLOUDINARY_BASE_URL}/w_${width},h_${height},c_fill,q_${quality},f_${format}/${publicId}`;
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
      imageUrl: getOptimizedImageUrl(resource.public_id),
      originalUrl: resource.secure_url,
      publicId: resource.public_id,
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
      return getOptimizedImageUrl(result.resources[0].public_id, {
        width: 400,
        height: 300,
      });
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching thumbnail for ${folderName}:`, error);
    return null;
  }
}
