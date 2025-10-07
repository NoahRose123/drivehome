# 🔥 URGENT: Fix Firebase API Key Restrictions

## ❌ Current Error

```json
{
  "error": {
    "code": 403,
    "message": "Requests from referer https://chicken-project-2.firebaseapp.com/ are blocked."
  }
}
```

This error occurs when you click a password reset link from your email. The link goes to `chicken-project-2.firebaseapp.com`, but your Firebase API key is blocking that domain.

---

## ✅ How to Fix (5 Minutes)

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/apis/credentials
2. Select project: **chicken-project-2**
3. You should see a list of API keys

### Step 2: Find Your API Key
Look for the API key: `AIzaSyAyRSlxMXzJDxOoQNC7tSEaymmslMvdnco`

Click on it to edit.

### Step 3: Add Authorized Domains
Under **Application restrictions** → **HTTP referrers (web sites)**, you should have:

```
✅ flockview.ca/*
✅ https://flockview.ca/*
✅ http://flockview.ca/*
✅ *.flockview.ca/*

🔥 ADD THESE NOW:
✅ chicken-project-2.firebaseapp.com/*
✅ https://chicken-project-2.firebaseapp.com/*
✅ *.chicken-project-2.firebaseapp.com/*

🔥 ADD THESE FOR FIREBASE AUTH ACTIONS:
✅ chicken-project-2.web.app/*
✅ https://chicken-project-2.web.app/*
✅ *.chicken-project-2.web.app/*
```

### Step 4: Save
Click **Save** at the bottom of the page.

**⚠️ Important:** It may take 5-10 minutes for changes to propagate.

---

## 🧪 Test the Fix

### Test Password Reset:
1. Go to: https://flockview.ca/login.html
2. Click "Forgot password?"
3. Enter your email: `rosewebc@gmail.com`
4. Check your email
5. Click the reset link
6. **Should work now!** ✅

---

## 📋 Complete List of Required Domains

For your Firebase API key to work properly, you need:

```
Production Domain:
✅ flockview.ca/*
✅ https://flockview.ca/*
✅ *.flockview.ca/*

Firebase Hosting (for auth actions like password reset):
✅ chicken-project-2.firebaseapp.com/*
✅ https://chicken-project-2.firebaseapp.com/*
✅ *.chicken-project-2.firebaseapp.com/*
✅ chicken-project-2.web.app/*
✅ https://chicken-project-2.web.app/*
✅ *.chicken-project-2.web.app/*

Optional - Localhost (only for testing, REMOVE after):
⚠️ http://localhost:5500/*
⚠️ http://127.0.0.1:5500/*
```

---

## ❓ Why This Happens

Firebase sends password reset emails with links that go to:
- `https://chicken-project-2.firebaseapp.com/__/auth/action?mode=resetPassword&...`

This is Firebase's default authentication handler page. When you click that link, it needs to call your Firebase API, but the API key is currently blocking requests from that domain.

---

## 🔒 Security Note

These domains are **safe to add** because:
1. They're **YOUR** Firebase project domains
2. Firebase controls them (not third parties)
3. They're required for Firebase Auth to work properly

---

## ✅ After Fixing

Once you add these domains, the following will work:
- ✅ Password reset emails
- ✅ Email verification links
- ✅ Sign-in with email link
- ✅ All Firebase Authentication actions

---

**🚨 DO THIS NOW before testing password reset!**

