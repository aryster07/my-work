# Cloudinary Integration Guide

## Your Gallery Structure

Based on your folder structure, you have the following photography categories:
- Astro
- bikes  
- Cars
- College Events
- Concerts
- Danno
- Flowers
- Lambo
- moon
- Mountains
- Nature
- skies
- Sunsets

## How to Set Up Cloudinary URLs

### Step 1: Find Your Cloudinary Cloud Name
1. Log into your Cloudinary dashboard
2. Your cloud name is displayed at the top of the dashboard
3. Replace `your-cloud-name` in the code with your actual cloud name

### Step 2: Cloudinary URL Structure
Your images follow this pattern:
```
https://res.cloudinary.com/{your-cloud-name}/image/upload/{folder-name}/{image-name}
```

### Step 3: Update the Code
In both `app/page.tsx` and `app/category/[id]/page.tsx`, replace:
```typescript
const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/your-cloud-name/image/upload";
```

With your actual cloud name:
```typescript
const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/YOUR_ACTUAL_CLOUD_NAME/image/upload";
```

### Step 4: Image Naming Convention

For **category thumbnails**, use images named `thumbnail.jpg` in each folder:
- `https://res.cloudinary.com/your-cloud-name/image/upload/Astro/thumbnail.jpg`
- `https://res.cloudinary.com/your-cloud-name/image/upload/Cars/thumbnail.jpg`
- etc.

For **gallery photos**, use sequential naming:
- `https://res.cloudinary.com/your-cloud-name/image/upload/Astro/photo-1.jpg`
- `https://res.cloudinary.com/your-cloud-name/image/upload/Astro/photo-2.jpg`
- etc.

### Step 5: Handling Spaces in Folder Names
For folders with spaces like "College Events", Cloudinary URLs use URL encoding:
- `College Events` becomes `College%20Events`
- This is already handled in the code

### Step 6: Alternative Naming Schemes

If you prefer different naming, you can modify the URLs in the code:

**For custom thumbnail names:**
```typescript
imageUrl: `${CLOUDINARY_BASE_URL}/Astro/cover.jpg`,
```

**For different photo naming:**
```typescript
imageUrl: `${CLOUDINARY_BASE_URL}/Astro/astro_${i + 1}.jpg`,
```

### Step 7: Image Optimization
Cloudinary automatically provides optimization. You can add transformations:
```typescript
imageUrl: `${CLOUDINARY_BASE_URL}/w_800,h_600,c_fill/Astro/photo-${i + 1}.jpg`,
```

This resizes images to 800x600 and crops to fill.

## What's Already Set Up

✅ **Gallery Layout**: Responsive grid (1-5 columns based on screen size)
✅ **All 13 Categories**: Match your folder structure exactly
✅ **Dynamic URLs**: Ready for your Cloudinary images
✅ **Fallback Handling**: CategoryCard component handles missing images gracefully
✅ **SEO-Friendly**: Clean URLs and proper image alt tags

## Next Steps

1. Replace `your-cloud-name` with your actual Cloudinary cloud name
2. Upload a `thumbnail.jpg` to each folder for category previews
3. Ensure your photos are named sequentially (`photo-1.jpg`, `photo-2.jpg`, etc.)
4. Test the gallery to ensure all images load correctly

## Example Final URLs

Once configured, your URLs will look like:
```
https://res.cloudinary.com/yourname/image/upload/Astro/thumbnail.jpg
https://res.cloudinary.com/yourname/image/upload/Cars/photo-1.jpg
https://res.cloudinary.com/yourname/image/upload/Sunsets/photo-15.jpg
```
