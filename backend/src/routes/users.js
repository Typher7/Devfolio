import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// Get user profile by handle
router.get("/:handle", async (req, res) => {
  try {
    const { handle } = req.params;
    const connection = await pool.getConnection();
    const [users] = await connection.query(
      "SELECT * FROM users WHERE handle = ?",
      [handle]
    );
    connection.release();

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];
    delete user.password; // Don't send password
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, tagline, bio, avatar_url } = req.body;
    const connection = await pool.getConnection();

    await connection.query(
      "UPDATE users SET full_name = ?, tagline = ?, bio = ?, avatar_url = ?, updated_at = NOW() WHERE id = ?",
      [full_name, tagline, bio, avatar_url, id]
    );
    connection.release();

    res.json({ message: "User profile updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
