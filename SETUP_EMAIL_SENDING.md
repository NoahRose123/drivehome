# 📧 Complete Guide: Set Up Email Sending with Firebase Cloud Functions

## 🎯 Overview

This guide will help you set up **real email sending** for your signup verification codes using:
- Firebase Cloud Functions (serverless backend)
- SendGrid (free email service - 100 emails/day)
- Professional email templates

**Time:** 30-45 minutes  
**Cost:** FREE (up to 100 emails/day)

---

## STEP 1: Install Node.js & Firebase CLI (10 minutes)

### 1.1 Install Node.js

**On macOS:**
1. Go to: https://nodejs.org/
2. Download the "LTS" version (recommended)
3. Run the installer
4. Follow the installation wizard
5. Restart your terminal

**Verify installation:**
```bash
node --version
npm --version
```

You should see version numbers like `v18.x.x` and `9.x.x`

### 1.2 Install Firebase CLI

Open your terminal and run:
```bash
npm install -g firebase-tools
```

Wait for installation to complete (2-3 minutes).

**Verify installation:**
```bash
firebase --version
```

You should see a version number like `12.x.x`

### 1.3 Login to Firebase

```bash
firebase login
```

This will open your browser. Login with the same Google account you use for Firebase Console.

---

## STEP 2: Initialize Cloud Functions (5 minutes)

### 2.1 Navigate to your project

```bash
cd /Users/noahrose/Documents/GitHub/drivehome
```

### 2.2 Initialize Firebase Functions

```bash
firebase init functions
```

You'll be asked several questions:

**Question 1:** "Are you ready to proceed?"
- Answer: **Y** (yes)

**Question 2:** "Please select an option"
- Answer: **Use an existing project**

**Question 3:** "Select a default Firebase project"
- Answer: **chicken-project-2**

**Question 4:** "What language would you like to use?"
- Answer: **JavaScript**

**Question 5:** "Do you want to use ESLint?"
- Answer: **N** (no, optional)

**Question 6:** "Do you want to install dependencies with npm now?"
- Answer: **Y** (yes)

Wait for dependencies to install (2-3 minutes).

### 2.3 Verify Setup

You should now have a `functions/` folder in your project with:
```
functions/
  ├── index.js          # Your Cloud Functions code
  ├── package.json      # Dependencies
  └── node_modules/     # Installed packages
```

---

## STEP 3: Create SendGrid Account (5 minutes)

### 3.1 Sign Up for SendGrid

1. Go to: https://sendgrid.com/free/
2. Click "Start For Free"
3. Fill out the form:
   - Email: `rosewebc@gmail.com` (or your email)
   - Password: (create a strong password)
   - Company Name: "FlockView" or your company name
4. Verify your email (check inbox)

### 3.2 Create API Key

1. After logging in, go to: https://app.sendgrid.com/settings/api_keys
2. Click "Create API Key"
3. Name: "FlockView Verification Emails"
4. Permissions: **Full Access**
5. Click "Create & View"
6. **COPY THE API KEY!** You'll never see it again!
   - It looks like: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Save it somewhere safe (Notepad, Notes app)

### 3.3 Verify Sender Identity

SendGrid requires you to verify a sender email:

1. Go to: https://app.sendgrid.com/settings/sender_auth/senders
2. Click "Create New Sender"
3. Fill out the form:
   - **From Name:** FlockView
   - **From Email:** noreply@flockview.ca (or your email)
   - **Reply To:** support@flockview.ca (or your email)
   - **Company Address:** (your address)
   - **Nickname:** FlockView Verification
4. Click "Create"
5. Check your email and click the verification link
6. Your sender is now verified! ✅

---

## STEP 4: Write the Cloud Function (10 minutes)

### 4.1 Install SendGrid Package

```bash
cd functions
npm install @sendgrid/mail
cd ..
```

### 4.2 Create the Cloud Function

Open `functions/index.js` and replace ALL contents with:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();

// Set SendGrid API Key from environment variable
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

// Email verification function
exports.sendVerificationEmail = functions.https.onCall(async (data, context) => {
    // Verify required data
    if (!data.email || !data.code) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing email or code');
    }

    const { email, code } = data;

    // Email template
    const msg = {
        to: email,
        from: 'noreply@flockview.ca', // MUST match your verified sender
        subject: 'Verify Your FlockView Account',
        text: `Your verification code is: ${code}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #3b82f6, #10b981); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">FlockView</h1>
                    <p style="color: white; margin: 10px 0 0 0;">Farm Management Platform</p>
                </div>
                
                <div style="background: white; padding: 40px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #1f2937; margin-top: 0;">Verify Your Email</h2>
                    <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
                        Thank you for signing up for FlockView! To complete your registration, please use the verification code below:
                    </p>
                    
                    <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 30px 0;">
                        <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #3b82f6; font-family: 'Courier New', monospace;">
                            ${code}
                        </div>
                    </div>
                    
                    <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                        This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                    
                    <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
                        © 2025 FlockView. All rights reserved.
                    </p>
                </div>
            </div>
        `
    };

    try {
        await sgMail.send(msg);
        console.log(`✅ Verification email sent to ${email}`);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw new functions.https.HttpsError('internal', 'Failed to send email');
    }
});
```

**IMPORTANT:** Change `from: 'noreply@flockview.ca'` to match YOUR verified sender email!

Save the file!

---

## STEP 5: Configure SendGrid API Key (5 minutes)

### 5.1 Set Environment Variable

Run this command (replace `YOUR_SENDGRID_API_KEY` with your actual key):

```bash
firebase functions:config:set sendgrid.key="YOUR_SENDGRID_API_KEY"
```

Example:
```bash
firebase functions:config:set sendgrid.key="SG.abc123xyz..."
```

### 5.2 Verify Configuration

```bash
firebase functions:config:get
```

You should see:
```json
{
  "sendgrid": {
    "key": "SG.abc123..."
  }
}
```

---

## STEP 6: Deploy Cloud Function (5 minutes)

### 6.1 Deploy to Firebase

```bash
firebase deploy --only functions
```

This will:
1. Build your function
2. Upload it to Firebase
3. Make it available at a URL

Wait for deployment (2-3 minutes).

### 6.2 Get Function URL

After deployment completes, you'll see something like:
```
✔  functions[sendVerificationEmail(us-central1)] Successful create operation.
Function URL: https://us-central1-chicken-project-2.cloudfunctions.net/sendVerificationEmail
```

**Copy this URL!** You'll need it in the next step.

---

## STEP 7: Update signup.html (5 minutes)

### 7.1 Import Firebase Functions SDK

In `signup.html`, find this line:
```javascript
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
```

Add `getFunctions` and `httpsCallable`:
```javascript
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { 
    getFunctions, 
    httpsCallable 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js';
```

### 7.2 Initialize Functions

Find this line:
```javascript
let auth, db;
```

Add `functions`:
```javascript
let auth, db, functions;
```

In the `initializeFirebase()` function, add:
```javascript
functions = getFunctions(app);
```

### 7.3 Replace sendEmailCode Function

Find the `sendEmailCode()` function and replace this section:

**OLD CODE (remove this):**
```javascript
// TODO: In production, call your backend API to send email
console.log('📧 Email verification code:', emailVerificationCode);
console.log('📧 Send this to:', formData.email);
```

**NEW CODE (add this):**
```javascript
// Call Cloud Function to send email
const sendEmail = httpsCallable(functions, 'sendVerificationEmail');
await sendEmail({ 
    email: formData.email, 
    code: emailVerificationCode 
});
```

### 7.4 Save and Test

Save `signup.html` and you're done!

---

## STEP 8: Test! (5 minutes)

### 8.1 Commit and Push

```bash
git add .
git commit -m "Add Firebase Cloud Functions for email verification"
git push origin main
```

### 8.2 Test the Signup Flow

1. Go to: https://flockview.ca/signup.html
2. Fill out the form
3. Click "Continue to Email Verification"
4. Click "Send Verification Code"
5. **Check your email inbox!** 📧
6. You should receive a professional verification email with a 6-digit code
7. Enter the code and continue!

---

## 🎉 SUCCESS!

You now have:
✅ Real email sending working
✅ Professional email templates
✅ 100 free emails/day from SendGrid
✅ Serverless backend (no server to manage)
✅ Both email AND phone verification working!

---

## 💰 Costs

- **Firebase Cloud Functions:** FREE (125,000 invocations/month)
- **SendGrid:** FREE (100 emails/day)
- **After free tier:** ~$5-10/month

---

## 🆘 Troubleshooting

### Error: "Invalid sender email"
- Make sure the `from` email in `index.js` matches your verified sender in SendGrid

### Error: "Unauthorized"
- Check your SendGrid API key is set correctly: `firebase functions:config:get`

### Error: "Function not found"
- Make sure you deployed: `firebase deploy --only functions`
- Check the function name matches: `sendVerificationEmail`

### No email received
- Check spam/junk folder
- Verify SendGrid sender is verified
- Check Firebase Functions logs: https://console.firebase.google.com/project/chicken-project-2/functions/logs

---

## 📞 Need Help?

If you get stuck, let me know and I'll help you debug!

Ready to start? Begin with STEP 1! 🚀

