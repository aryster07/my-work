const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: 'dmko2zav7',
  api_key: '195252934725612',
  api_secret: '2k2jRQyebgpcKsClcImkS8F9K0Y'
});

async function fetchLatestImages() {
  try {
    const result = await cloudinary.search
      .expression('resource_type:image')
      .max_results(50)
      .sort_by([['created_at', 'desc']])
      .execute();
    
    console.log('Total images found:', result.total_count);
    console.log('\nRecent images (latest first):');
    
    result.resources.forEach((img, i) => {
      console.log(`${i+1}. ${img.public_id} (uploaded: ${img.created_at})`);
    });
    
    console.log('\n--- All Public IDs for carousel update ---');
    const publicIds = result.resources.map(img => `'${img.public_id}'`);
    console.log(publicIds.join(',\n'));
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchLatestImages();
