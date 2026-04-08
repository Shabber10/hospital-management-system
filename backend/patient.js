const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// === PostgreSQL Connection ===
const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1", // ✅ Force IPv4 to avoid ::1 issue
  database: "hospitaldb",
  password: "honey@12396",
  port: 5432
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Database error:", err));

// === REGISTER ROUTE ===
app.post("/api/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

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

// === LOGIN ROUTE ===
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

// === Save/Update Patient Details ===
app.post("/api/patient-details", async (req, res) => {
  const { email, name, age, gender, address } = req.body;
  console.log("Incoming patient data:", req.body);

  if (!email || !name || !age || !gender || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await pool.query(
      `INSERT INTO patients (user_email, name, age, gender, address)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_email) DO UPDATE
       SET name=$2, age=$3, gender=$4, address=$5`,
      [email, name, parseInt(age), gender, address]
    );

    res.json({ message: "✅ Patient details saved" });
  } catch (err) {
    console.error("❌ Error saving patient details:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// === Get Patient Details ===
app.get("/api/patient-details/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM patients WHERE user_email=$1",
      [email]
    );
    if (result.rows.length === 0) return res.json(null);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Get patient details error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
);
