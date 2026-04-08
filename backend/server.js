// server.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// === PostgreSQL Connection ===
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hospitaldb",
  password: "honey@12396", // ⚠️ move to .env later
  port: 5432,
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Database error:", err));

// === Nodemailer Transporter ===
// === Nodemailer Transporter ===
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shabber12396@gmail.com",   // full Gmail
    pass: "eifkvjojsukiajzx",         // 16-char App Password
  },
});

transporter.verify((error, success) => {
  if (error) console.error("❌ Transporter error:", error);
  else console.log("✅ Mail server is ready to send OTPs");
});


// === OTP Store with Expiry ===
let otpStore = {}; 
// structure: { email: { otp: "123456", expiresAt: 1699999999999 } }

// === SEND OTP ===
app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "❌ Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  try {
    let info = await transporter.sendMail({
      from: '"HealthCare App" <shabber12396@gmail.com>',
      to: email,
      subject: "Your OTP for Verification",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    });

    console.log("✅ Mail sent successfully:", info.response);

    otpStore[email] = { otp, expiresAt };
    res.json({ message: "✅ OTP sent to email" });

  } catch (err) {
    console.error("❌ Mail send error:", err);

    res.status(500).json({
      message: "❌ Failed to send OTP",
      error: err.message,            // show readable error
      code: err.code || null,        // nodemailer error code
      command: err.command || null,  // SMTP command that failed
      response: err.response || null // raw SMTP response
    });
  }
});


// === VERIFY OTP ===
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ message: "❌ OTP not found" });
  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "❌ OTP expired" });
  }
  if (record.otp !== otp) return res.status(400).json({ message: "❌ Invalid OTP" });

  delete otpStore[email];
  res.json({ message: "✅ OTP verified" });
});

// === REGISTER ===
app.post("/api/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (existingUser.rows.length > 0)
      return res.status(400).json({ message: "User already exists" });

    const password_hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3)",
      [email, password_hash, role]
    );

    res.json({ message: "✅ User registered" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// === LOGIN ===
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (match) res.json({ message: "Login successful", role: user.role, email: user.email });
    else res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// === FORGOT / RESET PASSWORD ===
app.post("/api/forgot", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword)
    return res.status(400).json({ message: "Email and new password required" });

  try {
    const password_hash = await bcrypt.hash(newPassword, 10);

    const result = await pool.query(
      "UPDATE users SET password_hash=$1 WHERE email=$2 RETURNING *",
      [password_hash, email]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "✅ Password reset successful" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

// === CLEAN EXPIRED OTPs every minute ===
setInterval(() => {
  const now = Date.now();
  for (const email in otpStore) {
    if (otpStore[email].expiresAt < now) delete otpStore[email];
  }
}, 60 * 1000);

// === START SERVER ===
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
