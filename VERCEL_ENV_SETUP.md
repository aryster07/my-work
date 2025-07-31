# Vercel Environment Variables

When deploying to Vercel, make sure to set these environment variables in your Vercel dashboard:

## Required Environment Variables:

### Cloudinary Configuration:
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name (dmko2zav7)
- `CLOUDINARY_API_KEY`: Your Cloudinary API key (195252934725612)
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret (2k2jRQyebgpcKsClcImkS8F9K0Y)

## How to Set Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with its value
5. Make sure to select "Production", "Preview", and "Development" for each variable

## Important Notes:

- Never commit `.env.local` to your repository
- These environment variables are already configured in `vercel.json` to use Vercel's secret management
- The secrets should be created in Vercel with these names:
  - `@cloudinary_cloud_name`
  - `@cloudinary_api_key`
  - `@cloudinary_api_secret`

## Vercel Secrets Setup:

You can also set them as secrets using Vercel CLI:

```bash
vercel secrets add cloudinary_cloud_name dmko2zav7
vercel secrets add cloudinary_api_key 195252934725612
vercel secrets add cloudinary_api_secret 2k2jRQyebgpcKsClcImkS8F9K0Y
```

After setting these up, your deployment should work perfectly!
