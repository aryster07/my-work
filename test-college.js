const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: 'dmko2zav7',
  api_key: '195252934725612',
  api_secret: '2k2jRQyebgpcKsClcImkS8F9K0Y'
});

async function getCollegeImages() {
  try {
    console.log('Searching for College Events folder images...');
    const result = await cloudinary.search
      .expression('folder:portfolio_uploads/College\\ Events')
      .sort_by('public_id', 'asc')
      .max_results(50)
      .execute();
    
    console.log('Found', result.resources.length, 'images in College Events folder');
    
    if (result.resources.length > 0) {
      result.resources.forEach((resource, index) => {
        console.log(`${index + 1}. Public ID: ${resource.public_id}`);
        console.log(`   URL: https://res.cloudinary.com/dmko2zav7/image/upload/q_auto,f_auto/${resource.public_id}`);
        console.log('');
      });
    } else {
      // Try different folder name variations
      console.log('Trying alternative folder names...');
      const alternatives = [
        'portfolio_uploads/College Events',
        'portfolio_uploads/CollegeEvents', 
        'portfolio_uploads/college-events',
        'portfolio_uploads/college_events'
      ];
      
      for (const folderName of alternatives) {
        try {
          const altResult = await cloudinary.search
            .expression(`folder:${folderName}`)
            .max_results(10)
            .execute();
          
          if (altResult.resources.length > 0) {
            console.log(`Found ${altResult.resources.length} images in ${folderName}:`);
            altResult.resources.forEach((resource, index) => {
              console.log(`  ${index + 1}. ${resource.public_id}`);
            });
          }
        } catch (err) {
          // Continue to next alternative
        }
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getCollegeEventsImages();
