const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dmko2zav7',
  api_key: '195252934725612',
  api_secret: '2k2jRQyebgpcKsClcImkS8F9K0Y',
  secure: true
});

async function testPortfolioFolders() {
  try {
    console.log('🔍 Testing portfolio folder structure...\n');
    
    // Test the portfolio folder specifically
    console.log('📂 Testing portfolio/Cars folder...');
    const carsResult = await cloudinary.search
      .expression('folder:portfolio/Cars')
      .max_results(5)
      .execute();
    
    console.log(`Found ${carsResult.resources.length} images in portfolio/Cars`);
    if (carsResult.resources.length > 0) {
      carsResult.resources.forEach((img, i) => {
        console.log(`  ${i + 1}. ${img.public_id}`);
      });
    }
    
    // Test portfolio/Nature folder
    console.log('\n📂 Testing portfolio/Nature folder...');
    const natureResult = await cloudinary.search
      .expression('folder:portfolio/Nature')
      .max_results(5)
      .execute();
    
    console.log(`Found ${natureResult.resources.length} images in portfolio/Nature`);
    if (natureResult.resources.length > 0) {
      natureResult.resources.forEach((img, i) => {
        console.log(`  ${i + 1}. ${img.public_id}`);
      });
    }
    
    // List all subfolders under portfolio
    console.log('\n📁 Checking portfolio subfolders...');
    const portfolioFolders = await cloudinary.api.sub_folders('portfolio');
    console.log('Subfolders found in portfolio:');
    portfolioFolders.folders.forEach(folder => {
      console.log(`  - ${folder.name}`);
    });
    
  } catch (error) {
    if (error?.error?.http_code === 420) {
      console.log('⏳ Still rate limited. Try again after 10:00 UTC.');
    } else {
      console.error('❌ Error:', error.error?.message || error.message);
    }
  }
}

testPortfolioFolders();
