import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

async function createTestUser() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "$Antifermion777",
      database: "devfolio_db",
    });

    console.log("✓ Connected to database");

    // Check if test user already exists
    const [existing] = await connection.query(
      "SELECT id FROM users WHERE email = ?",
      ["test@example.com"]
    );

    if (existing.length > 0) {
      console.log("Test user already exists, deleting...");
      await connection.query("DELETE FROM users WHERE email = ?", [
        "test@example.com",
      ]);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Insert test user
    const [result] = await connection.query(
      "INSERT INTO users (email, password, full_name, handle) VALUES (?, ?, ?, ?)",
      ["test@example.com", hashedPassword, "Test User", "testuser"]
    );

    console.log("✓ Test user created with ID:", result.insertId);

    // Verify password hash works
    const [user] = await connection.query(
      "SELECT password FROM users WHERE email = ?",
      ["test@example.com"]
    );

    const isValid = await bcrypt.compare("password123", user[0].password);
    console.log("✓ Password verification:", isValid ? "PASSED" : "FAILED");

    await connection.end();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

createTestUser();
