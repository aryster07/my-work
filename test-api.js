const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary with your exact credentials
cloudinary.config({
  cloud_name: 'dmko2zav7',
  api_key: '195252934725612',
  api_secret: '2k2jRQyebgpcKsClcImkS8F9K0Y',
  secure: true
});

async function testAPI() {
  try {
    console.log('🔍 Testing Cloudinary API with correct credentials...');
    
    // Simple test first
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 5
    });
    
    console.log(`✅ API Working! Found ${result.resources.length} resources`);
    
    // Show sample resources
    result.resources.forEach((resource, i) => {
      console.log(`  ${i + 1}. ${resource.public_id} (folder: ${resource.folder || 'root'})`);
    });
    
    // Now test folder search
    console.log('\n📂 Testing folder search...');
    const searchResult = await cloudinary.search
      .expression('folder:Cars')
      .max_results(3)
      .execute();
    
    console.log(`Found ${searchResult.resources.length} images in Cars folder`);
    
  } catch (error) {
    console.error('❌ Error:', error.error?.message || error.message);
  }
}

testAPI();
