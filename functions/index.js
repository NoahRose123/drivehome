const {onRequest} = require("firebase-functions/v2/https");
const {defineString} = require("firebase-functions/params");
const sgMail = require("@sendgrid/mail");
const admin = require("firebase-admin");

// Initialize Firebase Admin
admin.initializeApp();

// Define SendGrid API Key as a parameter (loaded from .env file)
const sendgridApiKey = defineString("SENDGRID_API_KEY", {
  description: "SendGrid API Key for sending emails",
});

/**
 * Cloud Function: Send Email Verification Code
 * 
 * POST https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/sendVerificationEmail
 * Body: { email: "user@example.com", code: "123456", firstName: "John" }
 */
exports.sendVerificationEmail = onRequest(
  {cors: true}, // Enable CORS for web requests
  async (req, res) => {
    // Initialize SendGrid with API key
    const apiKey = sendgridApiKey.value();
    sgMail.setApiKey(apiKey);

    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({success: false, error: "Method not allowed"});
    }

    try {
      const {email, code, firstName} = req.body;

      // Validate input
      if (!email || !code) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: email and code",
        });
      }

      // Email template
      const msg = {
        to: email,
        from: "rosewebc@gmail.com", // MUST be verified in SendGrid
        subject: "FlockView - Email Verification Code",
        text: `Your verification code is: ${code}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2c5f2d; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .code { background: #2c5f2d; color: white; font-size: 32px; font-weight: bold; padding: 20px; text-align: center; border-radius: 10px; letter-spacing: 8px; margin: 20px 0; }
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🐔 FlockView</h1>
                <p>Farm Management System</p>
              </div>
              <div class="content">
                <h2>Welcome${firstName ? `, ${firstName}` : ""}!</h2>
                <p>Thank you for signing up with FlockView. To complete your registration, please enter the verification code below:</p>
                <div class="code">${code}</div>
                <p><strong>This code will expire in 10 minutes.</strong></p>
                <p>If you didn't request this code, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} FlockView. All rights reserved.</p>
                <p>Helping farms grow, one flock at a time.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      // Send email via SendGrid
      await sgMail.send(msg);

      console.log(`✅ Verification email sent to ${email}`);

      return res.status(200).json({
        success: true,
        message: "Verification email sent successfully",
      });
    } catch (error) {
      console.error("❌ Error sending email:", error);

      // SendGrid specific error handling
      if (error.response) {
        console.error("SendGrid error body:", error.response.body);
        return res.status(500).json({
          success: false,
          error: "Failed to send email",
          details: error.response.body,
        });
      }

      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
);
