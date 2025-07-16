const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: 'dmko2zav7',
  api_key: '195252934725612',
  api_secret: '2k2jRQyebgpcKsClcImkS8F9K0Y'
});

async function getCarouselImages() {
  try {
    console.log('Searching for carousel images...');
    const result = await cloudinary.search
      .expression('folder:portfolio_uploads/carousel')
      .sort_by('public_id', 'asc')
      .max_results(50)
      .execute();
    
    console.log('Found', result.resources.length, 'images');
    result.resources.forEach((resource, index) => {
      console.log(`${index + 1}. Public ID: ${resource.public_id}`);
      console.log(`   URL: https://res.cloudinary.com/dmko2zav7/image/upload/q_auto,f_auto/${resource.public_id}`);
      console.log(`   Dimensions: ${resource.width}x${resource.height}`);
      console.log('');
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getCarouselImages();
