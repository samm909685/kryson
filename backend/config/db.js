import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log("HOST =", process.env.DB_HOST);
console.log("USER =", process.env.DB_USER);
console.log("DB =", process.env.DB_NAME);
console.log("PORT =", process.env.DB_PORT);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Connected successfully");

    const [rows] = await conn.query(
      "SELECT DATABASE() AS db, CURRENT_USER() AS user"
    );
    console.log(rows);

    conn.release();
  } catch (err) {
    console.error("❌ COMPLETE ERROR:");
    console.error(err);
  }
})();

export default pool;