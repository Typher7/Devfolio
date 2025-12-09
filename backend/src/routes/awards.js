import express from "express";
import pool from "../config/database.js";
import authRequired from "../middleware/auth.js";

const router = express.Router();

// Get all awards
router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [awards] = await connection.query(
      "SELECT * FROM awards WHERE is_published = true ORDER BY created_at DESC"
    );
    connection.release();
    res.json(awards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create award
router.post("/", authRequired, async (req, res) => {
  try {
    const { title, description, badge_url, is_published } = req.body;
    const user_id = req.user.id;
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      "INSERT INTO awards (user_id, title, description, badge_url, is_published) VALUES (?, ?, ?, ?, ?)",
      [user_id, title, description, badge_url, is_published || false]
    );
    connection.release();

    res.status(201).json({ id: result.insertId, message: "Award created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user's awards (protected)
router.get("/mine", authRequired, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [awards] = await connection.query(
      "SELECT * FROM awards WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );
    connection.release();
    res.json(awards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update award
router.put("/:id", authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, badge_url, is_published } = req.body;
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      "UPDATE awards SET title = ?, description = ?, badge_url = ?, is_published = ?, updated_at = NOW() WHERE id = ? AND user_id = ?",
      [title, description, badge_url, is_published, id, req.user.id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Award not found or not owned by you" });
    }

    res.json({ message: "Award updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete award
router.delete("/:id", authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "DELETE FROM awards WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Award not found or not owned by you" });
    }

    res.json({ message: "Award deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
