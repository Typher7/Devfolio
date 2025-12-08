import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// Get public portfolio by handle (vanity URL)
router.get("/:handle", async (req, res) => {
  try {
    const { handle } = req.params;
    const connection = await pool.getConnection();

    // Get user profile
    const [users] = await connection.query(
      "SELECT id, email, full_name, handle, tagline, bio, avatar_url, created_at FROM users WHERE handle = ?",
      [handle]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];
    delete user.email; // Don't expose email on public profile

    // Get published projects
    const [projects] = await connection.query(
      "SELECT id, title, description, tags, repo_url, live_url, image_url, created_at FROM projects WHERE user_id = ? AND is_published = true ORDER BY created_at DESC",
      [user.id]
    );

    // Get published posts
    const [posts] = await connection.query(
      "SELECT id, title, excerpt, content, image_url, created_at FROM posts WHERE user_id = ? AND is_published = true ORDER BY created_at DESC",
      [user.id]
    );

    // Get published awards
    const [awards] = await connection.query(
      "SELECT id, title, description, badge_url, created_at FROM awards WHERE user_id = ? AND is_published = true ORDER BY created_at DESC",
      [user.id]
    );

    connection.release();

    res.json({
      profile: user,
      projects,
      posts,
      awards,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
