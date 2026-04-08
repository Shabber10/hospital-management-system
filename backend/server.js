// server.js
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { Pool } = require("@neondatabase/serverless");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// === PostgreSQL Connection ===
const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render/Neon provide this
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  // Fallback for local development
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "hospitaldb",
  password: process.env.DB_PASSWORD || "honey@12396",
  port: process.env.DB_PORT || 5432,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
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
    }).catch(e => {
      console.warn("Mail dispatch failed, continuing locally. E:", e.message);
    });

    console.log("✅ LOCAL OTP FOR ", email, " IS: ", otp);

    otpStore[email] = { otp, expiresAt };
    res.json({ message: "✅ OTP sent to email (or console fallback)" });

  } catch (err) {
    console.error("❌ Mail send error:", err);

    res.status(500).json({
      message: "❌ Failed to send OTP",
      error: err.message
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

// === PATIENT DETAILS ===
app.get("/api/patient-details/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const result = await pool.query(
      "SELECT p.* FROM patients p JOIN users u ON p.user_id = u.id WHERE u.email = $1",
      [email]
    );
    if (result.rows.length === 0) return res.json(null);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Get patient details error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/patient-details", async (req, res) => {
  const { email, name, age, gender, address } = req.body;
  if (!email || !name) return res.status(400).json({ message: "Email and Name are required" });

  try {
    // Get user_id from email first
    const userRes = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (userRes.rows.length === 0) return res.status(404).json({ message: "User not found" });
    
    const userId = userRes.rows[0].id;

    await pool.query(
      `INSERT INTO patients (user_id, full_name, dob, gender, address)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id) DO UPDATE
       SET full_name=$2, gender=$4, address=$5`,
      [userId, name, null, gender, address] // dob is null for now as UI only sent age or name
    );

    res.json({ message: "✅ Patient details saved" });
  } catch (err) {
    console.error("❌ Error saving patient details:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// === ADMIN MANAGEMENT ===
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, email, role, created_at FROM users ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Get users error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/delete/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE email = $1", [email]);
    if (result.rowCount === 0) return res.status(404).json({ message: "User not found" });
    res.json({ message: "✅ User deleted successfully" });
  } catch (err) {
    console.error("❌ Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// === CLEAN EXPIRED OTPs every minute ===
setInterval(() => {
  const now = Date.now();
  for (const email in otpStore) {
    if (otpStore[email].expiresAt < now) delete otpStore[email];
  }
}, 60 * 1000);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
