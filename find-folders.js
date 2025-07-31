const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dmko2zav7',
  api_key: '195252934725612',
  api_secret: '2k2jRQyebgpcKsClcImkS8F9K0Y',
});

async function findActualFolders() {
  console.log('🔍 Finding actual Cloudinary folder structure...\n');
  
  // Categories from your website
  const categories = ['Cars', 'bikes', 'Nature', 'Sunsets', 'Mountains', 'College Events', 'Concerts', 'Flowers', 'Astro', 'Danno', 'Lambo', 'moon', 'skies'];
  
  for (const category of categories) {
    console.log(`\n📂 Testing category: ${category}`);
    
    // Try different folder patterns
    const patterns = [
      `portfolio/${category}`,                     // Under portfolio folder
      `portfolio/${category.toLowerCase()}`,       // Under portfolio folder (lowercase)
      `portfolio/${category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}`, // Under portfolio folder (title case)
      `portfolio/${category.replace(' ', '_')}`,   // Under portfolio folder with underscores
      `portfolio/${category.replace(' ', '-')}`,   // Under portfolio folder with hyphens
      category,                                    // Direct name (fallback)
      category.toLowerCase(),                      // lowercase (fallback)
    ];
    
    for (const pattern of patterns) {
      try {
        const result = await cloudinary.search
          .expression(`folder:${pattern}`)
          .max_results(3)
          .execute();
        
        if (result.resources.length > 0) {
          console.log(`  ✅ FOUND: "${pattern}" has ${result.resources.length} images`);
          result.resources.forEach((img, i) => {
            console.log(`    ${i + 1}. ${img.public_id}`);
          });
          break; // Found images, move to next category
        }
      } catch (error) {
        // Skip pattern if it fails
      }
    }
  }
}

// Run when rate limit resets
findActualFolders().catch(error => {
  if (error?.error?.http_code === 420) {
    console.log('⏳ Still rate limited. Try again after 10:00 UTC.');
  } else {
    console.error('❌ Error:', error.message);
  }
});
