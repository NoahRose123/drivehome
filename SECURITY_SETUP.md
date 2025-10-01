# 🔐 Security Setup Guide

## ⚠️ CRITICAL: Your API Key Was Exposed!

Google detected your Firebase API key in your public GitHub repository. This is a serious security risk that needs immediate action.

## 🚨 Immediate Actions Required

### 1. Regenerate Your Firebase API Key (DO THIS NOW!)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Find your exposed API key: `AIzaSyB20OmcQemfIXm4712im9mqiBnpeVt8sJQ`
4. Click **Edit** → **Regenerate Key**
5. Copy the new API key

### 2. Add Domain Restrictions to Your New API Key

1. In the same credentials page, click **Edit** on your new API key
2. Under **Application restrictions**, select **HTTP referrers (web sites)**
3. Add these domains:
   ```
   https://flockview.ca/*
   https://www.flockview.ca/*
   https://noahrose123.github.io/drivehome/*
   ```
4. Save the changes

### 3. Update Your Local Configuration

1. Open `config.js` in your project
2. Replace `YOUR_FIREBASE_API_KEY_HERE` with your new API key
3. **DO NOT commit this file to GitHub!**

## 📁 Files Modified for Security

✅ **Updated Files:**
- `login.html` - Now uses external config
- `flockview-app-cursor-notoffical.html` - Now uses external config
- `.gitignore` - Added `config.js` to prevent commits
- `config.js` - Created secure config file (DO NOT COMMIT)

## 🔒 How the New Security System Works

1. **External Config**: API keys are now in `config.js` (not committed to GitHub)
2. **Domain Restrictions**: Your API key only works from your domains
3. **Fallback Protection**: If config is missing, shows placeholder instead of real key

## 📋 Deployment Checklist

### For Local Development:
- [ ] Update `config.js` with your new API key
- [ ] Test login functionality
- [ ] Verify Firebase connection works

### For GitHub Pages:
- [ ] Commit all changes EXCEPT `config.js`
- [ ] Push to GitHub
- [ ] Your site will work because the API key has domain restrictions

## 🛡️ Additional Security Measures

### Option A: Server-Side Proxy (Most Secure)
If you want maximum security, consider:
- Using Firebase Cloud Functions
- Storing API keys server-side
- Proxying requests through your backend

### Option B: Current Setup (Good for Static Sites)
- API key restricted to your domains only
- Key visible in browser but can't be abused elsewhere
- Perfect for GitHub Pages static hosting

## 🚨 Files Still Containing Old API Key

These files still have the old exposed key and should be updated or removed:
- `test-page-1.html`
- `test-page-2.html`
- `src/services/firebase.js`
- `checkproject-2-main/barn-propertys/test.html`
- `barnsoftwares/vistorlog.html`
- `barnsoftwares/startnewcrop.html`
- `barnsoftwares/shippingform.html`
- `barnsoftwares/flexample.html`
- `barnsoftwares/dailymortality.html`

## ✅ Next Steps

1. **IMMEDIATE**: Regenerate your Firebase API key
2. **IMMEDIATE**: Add domain restrictions
3. **IMMEDIATE**: Update `config.js` with new key
4. **SOON**: Clean up remaining files with old keys
5. **ONGOING**: Never commit API keys to public repos

## 📞 Need Help?

If you need assistance with any of these steps, the key points are:
- Regenerate the API key in Google Cloud Console
- Add domain restrictions
- Update your local `config.js` file
- Never commit `config.js` to GitHub
