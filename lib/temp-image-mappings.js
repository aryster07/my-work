// Temporary image mappings based on existing Cloudinary images
// This bypasses the rate limit by using pre-categorized image lists

const imageCategories = {
  // Cars category - DSC and car-related images
  'Cars': [
    '103-IMG_0106_addfsq',
    '4-DSC00397_edj9dn',
    '52-DSC08666_y9jhbs',
    '6-DSC08799_u2bie5',
    '8-DSC00993_gz2ius',
    '97-DSC00912_wh0t5f',
    'DSC00011_c7piko'
  ],
  
  // Nature category - landscape and nature images
  'Nature': [
    '11-DSC00926_ps9xyf',
    '11-DSC01061_bgyv56',
    '15-DSC01450_c6eywj',
    '17-DSC00499_vlwkc1',
    '6-DSC02733_h0ng7e',
    '9-DSC00572_bvghfo',
    '59-DSC09268_pnicy8'
  ],
  
  // Mountains category - mountain and landscape photos
  'Mountains': [
    '19-DSC01967_jzc7cs',
    '19-DSC02692_tkt3fu',
    '2-DSC03201_rwysnx',
    '9-DSC03393_snkunt',
    '113-_DSC0041_hmyzd7'
  ],
  
  // Sunsets category - sunset and golden hour photos
  'Sunsets': [
    '25-IMG_0114_rgsq9p',
    '26-IMG_0107_kahuhv',
    '15-IMG_3058_pdrthm',
    '76-IMG_0398_wtu3tn',
    '6-IMG_8037_jpg_er7hzt'
  ],
  
  // College Events category - event and people photos
  'College Events': [
    '30-PXL_20250429_082224631_m9jjww',
    '33-IMG_6520_hbfgae',
    '52-DSC09411_gaw6g1',
    '62-PXL_20240703_061754422_hfhfkp'
  ],
  
  // Bikes category - motorcycle and bike photos
  'bikes': [
    '103-IMG_0106_addfsq',
    '4-DSC00397_edj9dn',
    '52-DSC08666_y9jhbs'
  ],
  
  // Concerts category - concert and music photos
  'Concerts': [
    '33-IMG_6520_hbfgae',
    '30-PXL_20250429_082224631_m9jjww',
    '62-PXL_20240703_061754422_hfhfkp'
  ],
  
  // Flowers category - flower and botanical photos
  'Flowers': [
    '15-IMG_3058_pdrthm',
    '25-IMG_0114_rgsq9p',
    '26-IMG_0107_kahuhv'
  ],
  
  // Astro category - night and sky photos
  'Astro': [
    '76-IMG_0398_wtu3tn',
    '6-IMG_8037_jpg_er7hzt',
    'DSC00011_c7piko'
  ],
  
  // Danno category - portrait and artistic photos
  'Danno': [
    '33-IMG_6520_hbfgae',
    '113-_DSC0041_hmyzd7',
    '52-DSC09411_gaw6g1'
  ],
  
  // Lambo category - luxury car photos
  'Lambo': [
    '103-IMG_0106_addfsq',
    '4-DSC00397_edj9dn',
    '8-DSC00993_gz2ius'
  ],
  
  // Moon category - lunar and night photos
  'moon': [
    '76-IMG_0398_wtu3tn',
    'DSC00011_c7piko',
    '6-IMG_8037_jpg_er7hzt'
  ],
  
  // Skies category - sky and weather photos
  'skies': [
    '19-DSC01967_jzc7cs',
    '19-DSC02692_tkt3fu',
    '25-IMG_0114_rgsq9p',
    '26-IMG_0107_kahuhv'
  ]
};

const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dmko2zav7/image/upload';

// Helper function to get optimized image URL
function getOptimizedImageUrl(publicId, options = {}) {
  const { width = 800, height, quality = 'auto', format = 'auto', crop = 'fill' } = options;
  
  let transformations = [];
  transformations.push('g_auto'); // Auto gravity for smart cropping
  
  const heightParam = height ? `,h_${height}` : '';
  transformations.push(`w_${width}${heightParam},c_${crop}`);
  transformations.push(`q_${quality},f_${format}`);
  
  return `${CLOUDINARY_BASE_URL}/${transformations.join(',')}/${publicId}`;
}

// Main function to get folder images (rate-limit friendly)
function getFolderImages(folderName) {
  console.log(`🔍 Getting images for folder: ${folderName}`);
  
  const imageIds = imageCategories[folderName] || [];
  console.log(`📸 Found ${imageIds.length} images for ${folderName}`);
  
  return imageIds.map((publicId, index) => {
    // Mock aspect ratio - you can adjust these based on actual image proportions
    const aspectRatio = Math.random() > 0.5 ? 1.5 : 0.75; // Random landscape/portrait
    const isLandscape = aspectRatio >= 1;
    
    return {
      id: index + 1,
      title: `${folderName.charAt(0).toUpperCase() + folderName.slice(1)} Photo ${index + 1}`,
      description: `A beautiful photograph from the ${folderName} collection`,
      imageUrl: getOptimizedImageUrl(publicId, { 
        width: 400, 
        quality: '70'
      }),
      originalUrl: `${CLOUDINARY_BASE_URL}/q_auto,f_auto/${publicId}`,
      publicId: publicId,
      width: isLandscape ? 1600 : 1200,
      height: isLandscape ? 1067 : 1600,
      aspectRatio,
      isLandscape,
      displayAspectRatio: isLandscape ? 1.91 : 0.8,
    };
  });
}

module.exports = { getFolderImages };
