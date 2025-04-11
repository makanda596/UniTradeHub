export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - Uni Trade Hub</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 0;
      background-color: #f5f7fa;
    }
    .header {
      background: linear-gradient(to right, #3A6EFF, #2E5BFF);
      padding: 25px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      background-color: white;
      padding: 30px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .verification-code {
      background-color: #E6F0FA;
      padding: 20px;
      border-radius: 6px;
      text-align: center;
      margin: 30px 0;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 4px;
      color: #2E5BFF;
      border: 1px dashed #2E5BFF;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background: linear-gradient(to right, #3A6EFF, #2E5BFF);
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #777;
      font-size: 12px;
    }
    .highlight {
      color: #2E5BFF;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Welcome to Uni  Trade Hub</h1>
  </div>
  <div class="content">
    <p>Hello ,</p>
    
    <p>Thank you for joining <span class="highlight">Moi Trade Hub</span> - the premier marketplace connecting sellers with the Moi University community!</p>
    
    <p>Your verification code is:</p>
    
    <div class="verification-code">
      {verificationCode}
    </div>
    
    <p>Enter this code in our app or website to complete your registration and start trading.</p>
    
    <p style="font-style: italic; color: #777;">This code will expire in 15 minutes for security reasons.</p>
    
    <p>As a verified member, you'll be able to:</p>
    <ul style="padding-left: 20px;">
      <li>List your products for sale to thousands of students</li>
      <li>Connect with trusted buyers in our community</li>
      <li>Access secure payment options</li>
      <li>Receive special member-only offers</li>
    </ul>
    
    <p>If you didn't create this account, please ignore this email or contact our support team immediately.</p>
    <p>or you can contact our unitrade support team</p>
    
    <p>Happy trading!<br>
    <strong>The Moi Trade Hub Team</strong></p>
  </div>
  <div class="footer">
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>&copy; {new Date().getFullYear()} Moi Trade Hub. Connecting the Moi University community.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset - Uni Trade Hub</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #777;
      max-width: 600px;
      margin: 0 auto;
      padding: 0;
      background-color: #f5f7fa;
    }
    .header {
      background: linear-gradient(to right, #3A6EFF, #2E5BFF);
      padding: 25px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      background-color: white;
      padding: 30px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background-color: #3A6EFF;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #777;
      font-size: 12px;
    }
    .highlight {
      color: #2E5BFF;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset Request</h1>
  </div>
  <div class="content">
    <p>Hello ,</p>
    
    <p>We received a request to reset your password for your <span class="highlight">Uni Trade Hub</span> account.</p>
    
    <p>To reset your password, please click the button below:</p>
    
    <div style="text-align: center;">
      <a href="{resetURL}" class="button">Reset Password</a>
    </div>
    
    <p style="font-style: italic; color: #777;">This link will expire in 20 mins for security reasons.</p>
    
    <p>If you didn't request this password reset, please secure your account by:</p>
    <ol style="padding-left: 20px;">
      <li>Changing your password immediately</li>
      <li>Enabling two-factor authentication</li>
      <li>Contacting our support team</li>
    </ol>
     
    <p>For your security, never share your password or this link with anyone.</p>
    
    <p>Best regards,<br>
    <strong>The Uni Trade Hub Security Team</strong></p>
  </div>
  <div class="footer">
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>&copy; {new Date().getFullYear()} Moi Trade Hub. Your trusted campus marketplace.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Updated - Moi Trade Hub</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 0;
      background-color: #3A6EFF;
    }
    .header {
      background: linear-gradient(to right, #3A6EFF, #2E5BFF);
      padding: 25px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      background-color: white;
      padding: 30px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .success-icon {
      text-align: center;
      margin: 25px 0;
    }
    .checkmark {
      background-color: #2E5BFF;
      color: white;
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 50%;
      display: inline-block;
      font-size: 30px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #777;
      font-size: 12px;
    }
    .highlight {
      color: #2E5BFF;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Successfully Updated</h1>
  </div>
  <div class="content">
    <p>Hello {username},</p>
    
    <div class="success-icon">
      <div class="checkmark">✓</div>
    </div>
    
    <p>We're confirming that your <span class="highlight">Moi Trade Hub</span> password has been successfully updated.</p>
    
    <p>If you made this change, you can safely disregard this email.</p>
    
    <p>If you <strong>did not</strong> change your password:</p>
    <ol style="padding-left: 20px;">
      <li>Immediately reset your password using the "Forgot Password" option</li>
      <li>Review your account security settings</li>
      <li>Contact our support team at security@moitradehub.com</li>
    </ol>
    
    <p>For your protection, we recommend:</p>
    <ul style="padding-left: 20px;">
      <li>Using a unique password just for Moi Trade Hub</li>
      <li>Enabling two-factor authentication</li>
      <li>Regularly updating your password</li>
    </ul>
    
    <p>Thank you for helping keep our trading community secure!</p>
    
    <p>Happy trading,<br>
    <strong>The Moi Trade Hub Team</strong></p>
  </div>
  <div class="footer">
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>&copy; {new Date().getFullYear()} Moi Trade Hub. Connecting buyers and sellers at Moi University.</p>
  </div>
</body>
</html>
`;

export const SIGNUP_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Moi Trade Hub</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 0;
      background-color: #f5f7fa;
    }
    .header {
      background: linear-gradient(to right, #3A6EFF, #2E5BFF);
      padding: 25px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      background-color: white;
      padding: 30px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .verification-code {
      background-color: #E6F0FA;
      padding: 20px;
      border-radius: 6px;
      text-align: center;
      margin: 25px 0;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 4px;
      color: #2E5BFF;
      border: 1px dashed #2E5BFF;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background: linear-gradient(to right, #3A6EFF, #2E5BFF);
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #777;
      font-size: 12px;
    }
    .highlight {
      color: #2E5BFF;
      font-weight: 600;
    }
    .benefits {
      background-color: #F5F5F5;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Welcome to Moi Trade Hub!</h1>
  </div>
  <div class="content">
    <p>Hello {email},</p>
    
    <p>Thank you for joining <span class="highlight">Moi Trade Hub</span> - the premier marketplace connecting the Moi University Buyers and Sellers community!</p>
    
    
    <div class="benefits">
      <p>As a verified member, you'll enjoy:</p>
      <ul style="padding-left: 20px;">
        <li>Secure buying and selling within our trusted community</li>
        <li>Direct access to thousands of Moi University students</li>
        <li>Special discounts for verified sellers</li>
        <li>Priority customer support</li>
      </ul>
    </div>
    
    <p>Start exploring now to discover great deals or list your first item!</p>
    
    <p>If you didn't create this account, please contact our support team immediately.</p>
    
    <p>Happy trading!<br>
    <strong>The Moi Trade Hub Team</strong></p>
  </div>
  <div class="footer">
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>&copy; {new Date().getFullYear()} Moi Trade Hub. Your campus marketplace.</p>
  </div>
</body>
</html>
`;

export const EMAIL_REVIEW_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your Seller Reviews Update</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 700px;
      margin: 0 auto;
      padding: 0;
      background-color: #f5f7fa;
    }

    .header {
      background: linear-gradient(to right, #3A6EFF, #2E5BFF);
      padding: 25px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }

    .header h1 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }

    .content {
      background-color: white;
      padding: 30px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .encouragement-section {
      text-align: center;
      padding: 25px 0;
      margin-bottom: 25px;
    }

    .encouragement-section h2 {
      color: #2E5BFF;
      margin-bottom: 15px;
    }

    .stats-highlight {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
      padding: 15px;
      background: #E6F0FA;
      border-radius: 8px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 24px;
      font-weight: bold;
      color: #2E5BFF;
    }

    .review-card {
      border: 1px solid #dce3f0;
      border-radius: 6px;
      padding: 20px;
      margin-bottom: 20px;
      background-color: #fff;
    }

    .review-header {
      margin-bottom: 15px;
    }

    .buyer-info {
      color: #7f8c8d;
      font-size: 14px;
    }

    .review-date {
      color: #7f8c8d;
      font-size: 12px;
      margin-top: 5px;
    }

    .review-title {
      font-size: 18px;
      margin: 10px 0 5px;
      color: #2c3e50;
      font-weight: 600;
    }

    .review-content {
      color: #34495e;
      line-height: 1.6;
      font-size: 15px;
    }

    .cta-button {
      display: block;
      width: 200px;
      margin: 30px auto;
      padding: 12px 25px;
      background-color: #2E5BFF;
      color: white;
      text-decoration: none;
      border-radius: 25px;
      text-align: center;
      font-weight: bold;
      transition: background-color 0.3s;
    }

    .cta-button:hover {
      background-color: #1A4AE6;
    }

    .footer {
      text-align: center;
      margin-top: 30px;
      color: #777;
      font-size: 12px;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>New Customer Feedback Received! </h1>
  </div>
  
  <div class="content">
    <div class="encouragement-section">
    <h1>hey{email}</h1>
      <h2>Your Customers Appreciate Your Service! </h2>
      <p>Here's what your recent customers had to say about their experience:</p>
      
     </div>
    </div>

  
   
<p> click on this link to view your reviews</p>
    <a href="{ReviewUrl}" >View All Reviews →</a>

    <div class="footer">
      <p>You're receiving this because you're a Top Rated Seller on Our Platform</p>
      <p>Keep up the great work! Your dedication to customer satisfaction is what makes our community thrive.</p>
      <p>&copy; ${new Date().getFullYear()} Uni Trade Hub. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;