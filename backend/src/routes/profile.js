import express from "express";
import pool from "../config/database.js";
import authRequired from "../middleware/auth.js";

const router = express.Router();

// Get current user's profile
router.get("/", authRequired, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [users] = await connection.query(
      "SELECT id, email, full_name, handle, tagline, bio, avatar_url, created_at, updated_at FROM users WHERE id = ?",
      [req.user.id]
    );
    connection.release();

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update current user's profile
router.put("/", authRequired, async (req, res) => {
  try {
    const { full_name, tagline, bio, avatar_url } = req.body;
    const connection = await pool.getConnection();

    await connection.query(
      "UPDATE users SET full_name = ?, tagline = ?, bio = ?, avatar_url = ?, updated_at = NOW() WHERE id = ?",
      [full_name, tagline, bio, avatar_url, req.user.id]
    );
    connection.release();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
