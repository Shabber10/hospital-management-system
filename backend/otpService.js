// otpService.js
const nodemailer = require("nodemailer");

// === In-Memory OTP Store with Expiry ===
let otpStore = {}; 
// structure: { email: { otp: "123456", expiresAt: 1699999999999 } }

// Setup transporter (Gmail)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "shabber12396@gmail.com",   // full Gmail
    pass: "eifkvjojsukiajzx",         // 16-char App Password
  },
});

// Verify transporter connection
transporter.verify(function(error, success) {
  if (error) {
    console.log("Transporter error:", error);
  } else {
    console.log("✅ Mail server is ready to take messages");
  }
});

// === SEND OTP ===
async function sendOTP(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const expiresAt = Date.now() + 5 * 60 * 1000; // expires in 5 minutes

  try {
    await transporter.sendMail({
      from: '"HealthCare App" <shabber12396@gmail.com>',
      to: email,
      subject: "Your OTP for Verification",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    });

    // store OTP with expiry
    otpStore[email] = { otp, expiresAt };

    return { success: true, message: "✅ OTP sent to email" };
  } catch (err) {
    console.error("❌ OTP sending failed:", err);
    return { success: false, message: "❌ Failed to send OTP. Check console for details." };
  }
}

// === VERIFY OTP ===
function verifyOTP(email, otp) {
  const record = otpStore[email];

  if (!record) return { success: false, message: "❌ OTP not found" };

  if (Date.now() > record.expiresAt) {
    delete otpStore[email]; // expired
    return { success: false, message: "❌ OTP expired" };
  }

  if (record.otp !== otp) return { success: false, message: "❌ Invalid OTP" };

  delete otpStore[email]; // valid & used
  return { success: true, message: "✅ OTP verified" };
}

// Optional: Clean expired OTPs every minute
setInterval(() => {
  const now = Date.now();
  for (const email in otpStore) {
    if (otpStore[email].expiresAt < now) delete otpStore[email];
  }
}, 60 * 1000); // every 1 minute

module.exports = { sendOTP, verifyOTP };
