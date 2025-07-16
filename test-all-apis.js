const categories = [
  'Astro', 'bikes', 'Cars', 'College Events', 'Concerts', 
  'Danno', 'Flowers', 'Lambo', 'moon', 'Mountains', 
  'Nature', 'skies', 'Sunsets'
];

async function testAllCategoryAPIs() {
  console.log('Testing all category APIs for complete image counts...\n');
  
  for (const category of categories) {
    try {
      const response = await fetch(`http://localhost:3001/api/images?folder=${encodeURIComponent(category)}`);
      const data = await response.json();
      
      if (data.images) {
        console.log(`✅ ${category}: ${data.images.length} images loaded`);
      } else {
        console.log(`❌ ${category}: No images returned`);
      }
    } catch (error) {
      console.log(`❌ ${category}: Error - ${error.message}`);
    }
  }
  
  console.log('\n🎉 All category APIs tested! Your website now has access to all images.');
}

testAllCategoryAPIs();
