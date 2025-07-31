import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dmko2zav7',
  api_key: process.env.CLOUDINARY_API_KEY || '195252934725612',
  api_secret: process.env.CLOUDINARY_API_SECRET || '2k2jRQyebgpcKsClcImkS8F9K0Y',
  secure: true,
});

export { cloudinary };

export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME || 'dmko2zav7'}/image/upload`;

// Helper function to get optimized image URL with smart aspect ratios and AI cropping
export const getOptimizedImageUrl = (publicId: string, options: {
  width?: number;
  height?: number;
  quality?: string;
  format?: string;
  crop?: string;
  aspectRatio?: number;
  useSmartCrop?: boolean;
} = {}) => {
  const { width = 800, height, quality = 'auto', format = 'auto', crop = 'fill', aspectRatio, useSmartCrop = true } = options;
  
  let transformations = [];
  
  // Add smart cropping for better composition
  if (useSmartCrop) {
    transformations.push('g_auto'); // Auto gravity for smart cropping
  }
  
  // Determine optimal aspect ratio based on image orientation
  if (aspectRatio && !height) {
    if (aspectRatio >= 1) {
      // Landscape: use 1.91:1 ratio (Instagram landscape)
      const calculatedHeight = Math.round(width / 1.91);
      transformations.push(`w_${width},h_${calculatedHeight},c_${crop}`);
    } else {
      // Portrait: use 4:5 ratio (Instagram portrait)
      const calculatedHeight = Math.round(width * 1.25);
      transformations.push(`w_${width},h_${calculatedHeight},c_${crop}`);
    }
  } else {
    // Standard sizing
    const heightParam = height ? `,h_${height}` : '';
    const cropParam = crop ? `,c_${crop}` : '';
    transformations.push(`w_${width}${heightParam}${cropParam}`);
  }
  
  transformations.push(`q_${quality},f_${format}`);
  
  return `${CLOUDINARY_BASE_URL}/${transformations.join(',')}/${publicId}`;
};

// Function to get folder contents with smart cropping
export async function getFolderImages(folderName: string) {
  try {
    console.log(`🔍 Searching for folder: ${folderName}`);
    
    // Try multiple folder search patterns
    const searchPatterns = [
      `folder:portfolio_uploads/${folderName}`,   // Under portfolio_uploads folder (primary)
      `folder:portfolio_uploads/${folderName.toLowerCase()}`, // Under portfolio_uploads folder (lowercase)
      `folder:portfolio_uploads/${folderName.charAt(0).toUpperCase() + folderName.slice(1).toLowerCase()}`, // Under portfolio_uploads folder (title case)
      `folder:"portfolio_uploads/${folderName}"`, // Quoted under portfolio_uploads folder
      `folder:portfolio/${folderName}`,           // Under portfolio folder (fallback)
      `folder:${folderName}`,                     // Direct folder name (fallback)
    ];
    
    let result = null;
    
    // Try each search pattern until we find images
    for (const pattern of searchPatterns) {
      try {
        console.log(`  Trying pattern: ${pattern}`);
        result = await cloudinary.search
          .expression(pattern)
          .max_results(500)
          .execute();
        
        if (result.resources.length > 0) {
          console.log(`  ✅ Found ${result.resources.length} images with pattern: ${pattern}`);
          break;
        }
      } catch (patternError) {
        console.log(`  ❌ Pattern failed: ${pattern}`);
        continue;
      }
    }
    
    if (!result || result.resources.length === 0) {
      console.log(`❌ No images found for folder: ${folderName}`);
      return [];
    }
    
    return result.resources.map((resource: any, index: number) => {
      const aspectRatio = resource.width / resource.height;
      const isLandscape = aspectRatio >= 1;
      
      return {
        id: index + 1,
        title: `${folderName.charAt(0).toUpperCase() + folderName.slice(1)} Photo ${index + 1}`,
        description: `A beautiful photograph from the ${folderName} collection`,
        imageUrl: getOptimizedImageUrl(resource.public_id, { 
          width: 400, 
          quality: '70',
          aspectRatio,
          useSmartCrop: true 
        }),
        originalUrl: resource.secure_url,
        publicId: resource.public_id,
        width: resource.width,
        height: resource.height,
        aspectRatio,
        isLandscape,
        // Generate Instagram-style aspect ratio for display
        displayAspectRatio: isLandscape ? 1.91 : 0.8, // 1.91:1 for landscape, 4:5 for portrait
      };
    });
  } catch (error: any) {
    console.error(`❌ Error fetching images from ${folderName}:`, error);
    
    // Log the specific error for debugging
    if (error?.error?.http_code === 420) {
      console.log('⏳ Rate limit reached. Please try again later.');
    }
    
    return [];
  }
}

// Function to get the first image from a folder as thumbnail with smart cropping
export async function getFolderThumbnail(folderName: string) {
  try {
    console.log(`🔍 Searching for thumbnail in folder: ${folderName}`);
    
    // Try multiple folder search patterns (same as getFolderImages)
    const searchPatterns = [
      `folder:portfolio_uploads/${folderName}`,   // Under portfolio_uploads folder (primary)
      `folder:portfolio_uploads/${folderName.toLowerCase()}`, // Under portfolio_uploads folder (lowercase)
      `folder:portfolio_uploads/${folderName.charAt(0).toUpperCase() + folderName.slice(1).toLowerCase()}`, // Under portfolio_uploads folder (title case)
      `folder:"portfolio_uploads/${folderName}"`, // Quoted under portfolio_uploads folder
      `folder:portfolio/${folderName}`,           // Under portfolio folder (fallback)
      `folder:${folderName}`,                     // Direct folder name (fallback)
    ];
    
    let result = null;
    
    // Try each search pattern until we find images
    for (const pattern of searchPatterns) {
      try {
        result = await cloudinary.search
          .expression(pattern)
          .max_results(1)
          .execute();
        
        if (result.resources.length > 0) {
          console.log(`  ✅ Found thumbnail with pattern: ${pattern}`);
          break;
        }
      } catch (patternError) {
        console.log(`  ❌ Thumbnail pattern failed: ${pattern}`);
        continue;
      }
    }
    
    if (result && result.resources.length > 0) {
      const resource = result.resources[0];
      const aspectRatio = resource.width / resource.height;
      
      return {
        url: getOptimizedImageUrl(resource.public_id, { 
          width: 400, 
          quality: '70',
          aspectRatio,
          useSmartCrop: true 
        }),
        width: resource.width,
        height: resource.height,
        aspectRatio,
      };
    }
    
    return null;
  } catch (error: any) {
    console.error(`❌ Error fetching thumbnail for ${folderName}:`, error);
    
    // Log the specific error for debugging
    if (error?.error?.http_code === 420) {
      console.log('⏳ Rate limit reached for thumbnail. Please try again later.');
    }
    
    return null;
  }
}

// Function to get carousel images
export const getCarouselImages = async () => {
  try {
    // Use the actual carousel image public IDs found in your Cloudinary account
    const carouselImageIds = [
      '103-IMG_0106_addfsq',
      '11-DSC00926_ps9xyf', 
      '11-DSC01061_bgyv56',
      '113-_DSC0041_hmyzd7',
      '15-DSC01450_c6eywj',
      '15-IMG_3058_pdrthm',
      '17-DSC00499_vlwkc1',
      '19-DSC01967_jzc7cs',
      '19-DSC02692_tkt3fu',
      '2-DSC03201_rwysnx',
      '25-IMG_0114_rgsq9p',
      '26-IMG_0107_kahuhv',
      '30-PXL_20250429_082224631_m9jjww',
      '33-IMG_6520_hbfgae',
      '4-DSC00397_edj9dn',
      '52-DSC08666_y9jhbs',
      '52-DSC09411_gaw6g1',
      '59-DSC09268_pnicy8',
      '6-DSC02733_h0ng7e',
      '6-DSC08799_u2bie5',
      '6-IMG_8037_jpg_er7hzt',
      '62-PXL_20240703_061754422_hfhfkp',
      '76-IMG_0398_wtu3tn',
      '8-DSC00993_gz2ius',
      '9-DSC00572_bvghfo',
      '9-DSC03393_snkunt',
      '97-DSC00912_wh0t5f',
      'DSC00011_c7piko'
    ];
    
    // Create the carousel images array with optimized URLs for performance
    const carouselImages = carouselImageIds.map((publicId, index) => ({
      publicId: publicId,
      // Optimized low-res for circular carousel (300px, quality 60, smart crop)
      url: `https://res.cloudinary.com/dmko2zav7/image/upload/w_300,h_300,c_fill,g_auto,q_60,f_auto/${publicId}`,
      // Medium resolution for preview/modal (800px, quality 80)
      previewUrl: `https://res.cloudinary.com/dmko2zav7/image/upload/w_800,q_80,f_auto,c_fill,g_auto/${publicId}`,
      // Original high quality URL for full view
      originalUrl: `https://res.cloudinary.com/dmko2zav7/image/upload/q_auto,f_auto/${publicId}`,
      // Thumbnail for fast loading (150px, quality 50)
      thumbnailUrl: `https://res.cloudinary.com/dmko2zav7/image/upload/w_150,h_150,c_fill,g_auto,q_50,f_auto/${publicId}`,
      width: 300,
      height: 300,
      title: `Portfolio Image ${index + 1}`,
      alt: `Portfolio carousel image ${index + 1}`,
    }));
    
    return carouselImages;
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    return [];
  }
}
