const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: 'dmko2zav7',
  api_key: '195252934725612',
  api_secret: '2k2jRQyebgpcKsClcImkS8F9K0Y'
});

async function getAllFolderImages() {
  try {
    console.log('Getting all folders and their image counts...\n');
    
    // Get all folders first
    const allFolders = await cloudinary.api.sub_folders('portfolio_uploads');
    
    console.log('Available folders in portfolio_uploads:');
    for (const folder of allFolders.folders) {
      console.log(`- ${folder.name}`);
    }
    console.log('');
    
    // Check each category folder
    const categories = [
      'Astro', 'bikes', 'Cars', 'College Events', 'Concerts', 
      'Danno', 'Flowers', 'Lambo', 'moon', 'Mountains', 
      'Nature', 'skies', 'Sunsets'
    ];
    
    for (const category of categories) {
      try {
        console.log(`\n📁 Checking ${category}:`);
        
        // Escape folder names with spaces
        const escapedFolderName = category.replace(/\s/g, '\\ ');
        
        const result = await cloudinary.search
          .expression(`folder:portfolio_uploads/${escapedFolderName}`)
          .max_results(100) // Get more images
          .execute();
        
        console.log(`   Found ${result.resources.length} images`);
        
        if (result.resources.length > 0) {
          console.log('   Sample images:');
          result.resources.slice(0, 5).forEach((resource, index) => {
            console.log(`   ${index + 1}. ${resource.public_id}`);
          });
          if (result.resources.length > 5) {
            console.log(`   ... and ${result.resources.length - 5} more images`);
          }
        } else {
          console.log('   ❌ No images found - checking alternative names...');
          
          // Try alternative folder names
          const alternatives = [
            category.toLowerCase(),
            category.toUpperCase(),
            category.replace(/\s/g, '-'),
            category.replace(/\s/g, '_'),
            category.replace(/\s/g, '')
          ];
          
          for (const alt of alternatives) {
            try {
              const altResult = await cloudinary.search
                .expression(`folder:portfolio_uploads/${alt}`)
                .max_results(10)
                .execute();
              
              if (altResult.resources.length > 0) {
                console.log(`   ✅ Found ${altResult.resources.length} images in alternative folder: ${alt}`);
                break;
              }
            } catch (err) {
              // Continue to next alternative
            }
          }
        }
      } catch (error) {
        console.log(`   ❌ Error accessing ${category}: ${error.message}`);
      }
    }
    
    // Get total image count
    console.log('\n📊 Getting total image statistics...');
    const totalResult = await cloudinary.search
      .expression('folder:portfolio_uploads/*')
      .max_results(500)
      .execute();
    
    console.log(`\nTotal images in portfolio_uploads: ${totalResult.resources.length}`);
    
    // Group by folder
    const folderStats = {};
    totalResult.resources.forEach(resource => {
      const folderPath = resource.public_id.split('/').slice(0, -1).join('/');
      const folderName = folderPath.replace('portfolio_uploads/', '');
      
      if (!folderStats[folderName]) {
        folderStats[folderName] = 0;
      }
      folderStats[folderName]++;
    });
    
    console.log('\n📈 Images per folder:');
    Object.entries(folderStats).sort((a, b) => b[1] - a[1]).forEach(([folder, count]) => {
      console.log(`   ${folder}: ${count} images`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getAllFolderImages();
