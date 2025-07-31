# Vercel Environment Variables Setup

## 🚀 Quick Setup Instructions

After deploying to Vercel, you need to set these environment variables in your Vercel dashboard:

### Step 1: Go to Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Select your deployed project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add These Variables

Add these **exact** variable names and values:

| Variable Name | Value |
|---------------|--------|
| `CLOUDINARY_CLOUD_NAME` | `dmko2zav7` |
| `CLOUDINARY_API_KEY` | `195252934725612` |
| `CLOUDINARY_API_SECRET` | `2k2jRQyebgpcKsClcImkS8F9K0Y` |

### Step 3: Select Environments
For each variable, make sure to select:
- ✅ **Production**
- ✅ **Preview** 
- ✅ **Development**

### Step 4: Redeploy
After adding the variables, trigger a new deployment by:
- Going to **Deployments** tab
- Click **Redeploy** on the latest deployment

## ⚠️ Important Notes:

- Environment variables are case-sensitive
- Make sure there are no extra spaces in the values
- After setting variables, you must redeploy for changes to take effect

## ✅ Verification

After deployment, your portfolio should:
- Load the carousel with images
- Display category pages with images
- Have full image protection features working

---

**Your portfolio will be live and fully functional once these environment variables are set!** 🎉
