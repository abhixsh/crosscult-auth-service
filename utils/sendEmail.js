const nodemailer = require('nodemailer');

const sendOTPEmail = async (toEmail, otp) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',  // Use your email provider's service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const message = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Your OTP for Admin Registration',
    text: `Your OTP code for registering as an admin is: ${otp}`,
  };

  try {
    await transporter.sendMail(message);
    console.log('OTP sent to:', toEmail);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendOTPEmail;
