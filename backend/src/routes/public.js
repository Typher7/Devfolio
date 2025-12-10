import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// Get public portfolio by handle (vanity URL)
router.get("/:handle", async (req, res) => {
  let connection;
  try {
    const { handle } = req.params;
    console.log(`[PUBLIC] Fetching portfolio for handle: ${handle}`);
    
    connection = await pool.getConnection();

    // Get user profile
    const [users] = await connection.query(
      "SELECT id, full_name, handle, tagline, bio, avatar_url, created_at FROM users WHERE handle = ?",
      [handle]
    );

    if (users.length === 0) {
      console.log(`[PUBLIC] User not found with handle: ${handle}`);
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];
    console.log(`[PUBLIC] Found user: ${user.full_name} (ID: ${user.id})`);

    // Get published projects (is_published = 1)
    const [projects] = await connection.query(
      "SELECT id, title, description, tags, repo_url, live_url, image_url, created_at FROM projects WHERE user_id = ? AND is_published = 1 ORDER BY created_at DESC",
      [user.id]
    );

    // Get published posts (is_published = 1)
    const [posts] = await connection.query(
      "SELECT id, title, excerpt, content, image_url, created_at FROM posts WHERE user_id = ? AND is_published = 1 ORDER BY created_at DESC",
      [user.id]
    );

    // Get published awards (is_published = 1)
    const [awards] = await connection.query(
      "SELECT id, title, description, image_url, created_at FROM awards WHERE user_id = ? AND is_published = 1 ORDER BY created_at DESC",
      [user.id]
    );

    console.log(`[PUBLIC] Portfolio loaded: ${projects.length} projects, ${posts.length} posts, ${awards.length} awards`);

    res.json({
      profile: user,
      projects,
      posts,
      awards,
    });
  } catch (error) {
    console.error("[PUBLIC] Error:", error);
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

export default router;
