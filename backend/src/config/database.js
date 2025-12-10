import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Allow either discrete env vars or a single DATABASE_URL (e.g., mysql://user:pass@host:port/dbname)
const url = process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL) : null;

const pool = mysql.createPool({
  host: url?.hostname || process.env.DB_HOST || "localhost",
  user: url?.username || process.env.DB_USER || "root",
  password: url?.password || process.env.DB_PASSWORD || "",
  database: (url?.pathname || "/devfolio_db").replace("/", ""),
  port: url?.port ? Number(url.port) : Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
