import express from "express";
import pool from "../config/database.js";
import authRequired from "../middleware/auth.js";

const router = express.Router();

// Get all posts (public)
router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [posts] = await connection.query(
      "SELECT * FROM posts WHERE is_published = true ORDER BY created_at DESC"
    );
    connection.release();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user's posts (protected)
router.get("/mine", authRequired, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [posts] = await connection.query(
      "SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );
    connection.release();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single post
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [posts] = await connection.query("SELECT * FROM posts WHERE id = ?", [
      id,
    ]);
    connection.release();

    if (posts.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(posts[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create post
router.post("/", authRequired, async (req, res) => {
  try {
    const { title, content, excerpt, image_url, is_published } = req.body;
    const user_id = req.user.id;
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      "INSERT INTO posts (user_id, title, content, excerpt, image_url, is_published) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, title, content, excerpt, image_url, is_published || false]
    );
    connection.release();

    res.status(201).json({ id: result.insertId, message: "Post created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update post
router.put("/:id", authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, image_url, is_published } = req.body;
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      "UPDATE posts SET title = ?, content = ?, excerpt = ?, image_url = ?, is_published = ?, updated_at = NOW() WHERE id = ? AND user_id = ?",
      [title, content, excerpt, image_url, is_published, id, req.user.id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Post not found or not owned by you" });
    }

    res.json({ message: "Post updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete post
router.delete("/:id", authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "DELETE FROM posts WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Post not found or not owned by you" });
    }

    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
