const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dmko2zav7',
  api_key: '195252934725612',
  api_secret: '2k2jRQyebgpcKsClcImkS8F9K0Y',
  secure: true
});

async function exploreCloudinaryStructure() {
  try {
    console.log('🔍 Exploring your Cloudinary structure...\n');
    
    // First, let's see all root folders
    console.log('📁 Root folders:');
    try {
      const rootFolders = await cloudinary.api.sub_folders('');
      rootFolders.folders.forEach(folder => {
        console.log(`  - ${folder.name} (${folder.path})`);
      });
    } catch (error) {
      console.log('No root folders or error accessing them');
    }
    
    // Let's also get some sample resources to see their folder structure
    console.log('\n📷 Sample resources (first 10):');
    const resources = await cloudinary.api.resources({
      type: 'upload',
      max_results: 10
    });
    
    resources.resources.forEach((resource, i) => {
      const folder = resource.public_id.includes('/') ? 
        resource.public_id.substring(0, resource.public_id.lastIndexOf('/')) : 
        'root';
      console.log(`  ${i + 1}. ${resource.public_id} → folder: "${folder}"`);
    });
    
    // Try searching for images that contain "Cars" or similar
    console.log('\n🔍 Searching for car-related images...');
    try {
      const carSearch = await cloudinary.search
        .expression('*car* OR *Car* OR *DSC*')
        .max_results(5)
        .execute();
      
      console.log(`Found ${carSearch.resources.length} car-related images:`);
      carSearch.resources.forEach((img, i) => {
        const folder = img.public_id.includes('/') ? 
          img.public_id.substring(0, img.public_id.lastIndexOf('/')) : 
          'root';
        console.log(`  ${i + 1}. ${img.public_id} → folder: "${folder}"`);
      });
    } catch (searchError) {
      console.log('Search failed:', searchError.message);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

exploreCloudinaryStructure();
