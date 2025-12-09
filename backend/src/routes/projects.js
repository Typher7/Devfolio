import express from "express";
import pool from "../config/database.js";
import authRequired from "../middleware/auth.js";

const router = express.Router();

// Get all projects (public)
router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [projects] = await connection.query(
      "SELECT * FROM projects WHERE is_published = true ORDER BY created_at DESC"
    );
    connection.release();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single project

// Get current user's projects (protected)
router.get("/mine", authRequired, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [projects] = await connection.query(
      "SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );
    connection.release();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single project
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [projects] = await connection.query(
      "SELECT * FROM projects WHERE id = ?",
      [id]
    );
    connection.release();

    if (projects.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(projects[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create project (protected)
router.post("/", authRequired, async (req, res) => {
  try {
    const {
      title,
      description,
      tags,
      repo_url,
      live_url,
      image_url,
      is_published,
    } = req.body;
    const user_id = req.user.id;
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      "INSERT INTO projects (user_id, title, description, tags, repo_url, live_url, image_url, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        title,
        description,
        tags,
        repo_url,
        live_url,
        image_url,
        is_published || false,
      ]
    );
    connection.release();

    res.status(201).json({ id: result.insertId, message: "Project created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project
router.put("/:id", authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      tags,
      repo_url,
      live_url,
      image_url,
      is_published,
    } = req.body;
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      "UPDATE projects SET title = ?, description = ?, tags = ?, repo_url = ?, live_url = ?, image_url = ?, is_published = ?, updated_at = NOW() WHERE id = ? AND user_id = ?",
      [
        title,
        description,
        tags,
        repo_url,
        live_url,
        image_url,
        is_published,
        id,
        req.user.id,
      ]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Project not found or not owned by you" });
    }

    res.json({ message: "Project updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete project
router.delete("/:id", authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "DELETE FROM projects WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Project not found or not owned by you" });
    }

    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
