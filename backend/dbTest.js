require('dns').setDefaultResultOrder('ipv4first');
require('dotenv').config();
const { Pool } = require('@neondatabase/serverless');

const isProduction = process.env.NODE_ENV === "production";
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_fpdxzJw8VsH5@ep-gentle-block-am73fogj.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

pool.query('SELECT NOW()')
  .then(res => {
    console.log("DB connected successfully. Time:", res.rows[0].now);
  })
  .catch(err => {
    console.error("DB connection error:", err);
  })
  .finally(() => pool.end());
