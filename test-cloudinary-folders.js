const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dmko2zav7',
  api_key: '195252934725612',
  api_secret: '2k2jRQyebgpcKsClcImkS8F9K0Y',
});

async function testCloudinaryFolders() {
  try {
    console.log('🔍 Checking Cloudinary folders...\n');
    
    // Test basic connection first
    console.log('Testing basic connection...');
    const result = await cloudinary.search
      .expression('*')
      .max_results(5)
      .execute();
    
    console.log(`✅ Connection successful! Found ${result.total_count} total images\n`);
    
    // Check what folders exist
    console.log('📁 Sample image locations:');
    result.resources.slice(0, 5).forEach((img, i) => {
      const folder = img.public_id.includes('/') ? img.public_id.split('/')[0] : 'root';
      console.log(`  ${i + 1}. ${img.public_id} (folder: ${folder})`);
    });
    
    // Now test specific folder searches
    console.log('\n🔍 Testing specific folder searches...');
    const folderNames = ['Cars', 'bikes', 'Nature', 'Sunsets', 'Mountains', 'portfolio_uploads/Cars'];
    
    for (const folderName of folderNames) {
      try {
        console.log(`\n� Searching folder: ${folderName}`);
        const folderResult = await cloudinary.search
          .expression(`folder:${folderName}`)
          .max_results(3)
          .execute();
        
        console.log(`  ✅ Found ${folderResult.resources.length} images`);
        if (folderResult.resources.length > 0) {
          folderResult.resources.forEach((img, i) => {
            console.log(`    ${i + 1}. ${img.public_id}`);
          });
        }
      } catch (err) {
        console.log(`  ❌ Error searching ${folderName}: ${err.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Connection Error:', error.message);
    console.error('Full error:', error);
  }
}

testCloudinaryFolders();
