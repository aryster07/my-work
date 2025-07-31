# Complete Gmail Setup for Contact Form

## 🚀 Quick Setup (5 minutes)

Your contact form is already configured to send emails to **aryanrana762@gmail.com**. You just need to generate an App Password.

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on **"2-Step Verification"**
3. Follow the prompts to set it up (use your phone number)
4. **Important**: You MUST have 2FA enabled to create App Passwords

### Step 2: Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Or search "App passwords" in your Google Account settings
2. Click **"Select app"** → Choose **"Mail"**
3. Click **"Select device"** → Choose **"Other"**
4. Type: **"Portfolio Contact Form"**
5. Click **"Generate"**
6. **Copy the 16-character password** (format: xxxx xxxx xxxx xxxx)

### Step 3: Update Your Environment File

1. Open `e:\Portfolio\.env.local` in your code editor
2. Find this line:
   ```
   GMAIL_APP_PASSWORD=your_gmail_app_password_here
   ```
3. Replace `your_gmail_app_password_here` with your App Password (remove spaces):
   ```
   GMAIL_APP_PASSWORD=abcdabcdabcdabcd
   ```

### Step 4: Test the Contact Form

1. Make sure your server is running: `npm run dev`
2. Go to `http://localhost:3000`
3. Navigate to the contact section
4. Fill out and submit the form
5. Check your Gmail inbox for the message

## 📧 What Happens When Someone Contacts You

When visitors submit the contact form, you'll receive an email like this:

**Subject**: Portfolio Contact: Message from [Visitor Name]

**Content**: Beautifully formatted email with:
- Visitor's name and email
- Their message
- Timestamp
- Professional styling

## 🔒 Security Notes

- ✅ App Password is secure (not your main Gmail password)
- ✅ Only works with your specific app
- ✅ Can be revoked anytime from Google Account settings
- ✅ Never share or commit the App Password to git

## 🐛 Troubleshooting

### Problem: "Failed to send email"
**Solution**: Check console logs, verify App Password is exactly 16 characters

### Problem: "Authentication failed"
**Solution**: Make sure 2FA is enabled and App Password is correct

### Problem: No emails received
**Solution**: Check spam folder, verify email address in code

## 📝 Current Configuration

Your contact form is set to:
- **Send TO**: aryanrana762@gmail.com
- **Send FROM**: aryanrana762@gmail.com
- **Email Format**: Professional HTML with visitor details
- **API Endpoint**: `/api/contact` (already created)

## ✅ Status Check

After setup, your contact form will be 100% functional and professional!
