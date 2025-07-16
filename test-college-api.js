const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: 'dmko2zav7',
  api_key: '195252934725612',
  api_secret: '2k2jRQyebgpcKsClcImkS8F9K0Y'
});

async function testCollegeEventsAPI() {
  try {
    console.log('Testing exact folder name used in API...');
    
    // Test different variations
    const variations = [
      'portfolio_uploads/College Events',
      'portfolio_uploads/College\\ Events',
      'portfolio_uploads/"College Events"'
    ];
    
    for (const folderPath of variations) {
      console.log(`\nTesting: ${folderPath}`);
      try {
        const result = await cloudinary.search
          .expression(`folder:${folderPath}`)
          .max_results(1)
          .execute();
        
        console.log(`  Found ${result.resources.length} images`);
        if (result.resources.length > 0) {
          console.log(`  First image: ${result.resources[0].public_id}`);
        }
      } catch (err) {
        console.log(`  Error: ${err.message}`);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testCollegeEventsAPI();
