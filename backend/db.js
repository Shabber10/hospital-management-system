port: 5432

// backend/db.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "hospitaldb",
  password: "honey@12396",
  port: 5432
});

export default pool;
