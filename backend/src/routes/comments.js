import express from "express";
import pool from "../config/database.js";
import authRequired from "../middleware/auth.js";

const router = express.Router();

// Get comments for a post
router.get("/post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const connection = await pool.getConnection();
    const [comments] = await connection.query(
      `SELECT c.id, c.content, c.created_at, 
              u.id as user_id, u.full_name, u.avatar_url
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ? AND c.is_approved = true
       ORDER BY c.created_at DESC`,
      [postId]
    );
    connection.release();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comments for a project
router.get("/project/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const connection = await pool.getConnection();
    const [comments] = await connection.query(
      `SELECT c.id, c.content, c.created_at, 
              u.id as user_id, u.full_name, u.avatar_url
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.project_id = ? AND c.is_approved = true
       ORDER BY c.created_at DESC`,
      [projectId]
    );
    connection.release();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comment count for a post
router.get("/post/:postId/count", async (req, res) => {
  try {
    const { postId } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "SELECT COUNT(*) as count FROM comments WHERE post_id = ? AND is_approved = true",
      [postId]
    );
    connection.release();
    res.json({ count: result[0].count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comment count for a project
router.get("/project/:projectId/count", async (req, res) => {
  try {
    const { projectId } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "SELECT COUNT(*) as count FROM comments WHERE project_id = ? AND is_approved = true",
      [projectId]
    );
    connection.release();
    res.json({ count: result[0].count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create comment on a post (authenticated users only)
router.post("/post/:postId", authRequired, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: "Comment content is required" });
    }

    if (content.length > 500) {
      return res
        .status(400)
        .json({ error: "Comment must be 500 characters or less" });
    }

    const connection = await pool.getConnection();

    // Verify post exists
    const [post] = await connection.query("SELECT id FROM posts WHERE id = ?", [
      postId,
    ]);

    if (post.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Post not found" });
    }

    // Insert comment
    const [result] = await connection.query(
      "INSERT INTO comments (post_id, user_id, content, is_approved) VALUES (?, ?, ?, true)",
      [postId, userId, content]
    );

    // Get the created comment with user info
    const [comments] = await connection.query(
      `SELECT c.id, c.content, c.created_at, 
              u.id as user_id, u.full_name, u.avatar_url
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.id = ?`,
      [result.insertId]
    );

    connection.release();
    res.status(201).json(comments[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create comment on a project (authenticated users only)
router.post("/project/:projectId", authRequired, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: "Comment content is required" });
    }

    if (content.length > 500) {
      return res
        .status(400)
        .json({ error: "Comment must be 500 characters or less" });
    }

    const connection = await pool.getConnection();

    // Verify project exists
    const [project] = await connection.query(
      "SELECT id FROM projects WHERE id = ?",
      [projectId]
    );

    if (project.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Project not found" });
    }

    // Insert comment
    const [result] = await connection.query(
      "INSERT INTO comments (project_id, user_id, content, is_approved) VALUES (?, ?, ?, true)",
      [projectId, userId, content]
    );

    // Get the created comment with user info
    const [comments] = await connection.query(
      `SELECT c.id, c.content, c.created_at, 
              u.id as user_id, u.full_name, u.avatar_url
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.id = ?`,
      [result.insertId]
    );

    connection.release();
    res.status(201).json(comments[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a comment (only by comment author or post/project owner)
router.delete("/:commentId", authRequired, async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const connection = await pool.getConnection();

    // Get the comment
    const [comments] = await connection.query(
      `SELECT c.*, p.user_id as post_owner_id, pr.user_id as project_owner_id
       FROM comments c
       LEFT JOIN posts p ON c.post_id = p.id
       LEFT JOIN projects pr ON c.project_id = pr.id
       WHERE c.id = ?`,
      [commentId]
    );

    if (comments.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Comment not found" });
    }

    const comment = comments[0];

    // Check if user is comment author or content owner
    const isAuthor = comment.user_id === userId;
    const isOwner =
      comment.post_owner_id === userId || comment.project_owner_id === userId;

    if (!isAuthor && !isOwner) {
      connection.release();
      return res
        .status(403)
        .json({ error: "Not authorized to delete this comment" });
    }

    // Delete the comment
    await connection.query("DELETE FROM comments WHERE id = ?", [commentId]);

    connection.release();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
