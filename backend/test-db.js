import mysql from "mysql2/promise";

async function testDB() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "$Antifermion777",
      database: "devfolio_db",
    });

    console.log("✓ Connected to database");

    // Check if users table exists
    const [tables] = await connection.query(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'devfolio_db'"
    );

    console.log(
      "Tables in database:",
      tables.map((t) => t.TABLE_NAME)
    );

    // Try to query users table structure
    if (tables.some((t) => t.TABLE_NAME === "users")) {
      const [columns] = await connection.query("DESCRIBE users");
      console.log(
        "Users table columns:",
        columns.map((c) => c.Field)
      );
    } else {
      console.log("❌ Users table does not exist");
    }

    await connection.end();
  } catch (error) {
    console.error("Database error:", error.message);
  }
}

testDB();
