import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/database.js";
import authRequired from "../middleware/auth.js";

const router = express.Router();

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const connection = await pool.getConnection();
    const [users] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    connection.release();

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: process.env.JWT_EXPIRY || "7d" }
    );

    // Set HTTP-only cookie with explicit domain for cross-origin
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // In production (HTTPS + cross-site), require SameSite=None and secure
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/", // Ensure cookie is sent for all paths
    };

    // On production, set domain to allow subdomains if needed
    if (process.env.NODE_ENV === "production" && process.env.COOKIE_DOMAIN) {
      cookieOptions.domain = process.env.COOKIE_DOMAIN;
    }

    res.cookie("token", token, cookieOptions);
    console.log("[AUTH] Login successful, token cookie set", {
      user: user.id,
      sameSite: cookieOptions.sameSite,
      secure: cookieOptions.secure,
      domain: cookieOptions.domain || "not set",
    });

    res.json({
      token,
      user: { id: user.id, email: user.email, full_name: user.full_name },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
router.post("/logout", (req, res) => {
  // Clear the token cookie with same options as set in login
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ message: "Logged out successfully" });
});

// Get current user
router.get("/me", authRequired, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [users] = await connection.query(
      "SELECT id, email, full_name, handle, tagline, bio, avatar_url, created_at FROM users WHERE id = ?",
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

// Register
router.post("/register", async (req, res) => {
  let connection;
  try {
    const { email, password, full_name, handle } = req.body;

    if (!email || !password || !full_name || !handle) {
      return res.status(400).json({ error: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    connection = await pool.getConnection();

    const [result] = await connection.query(
      "INSERT INTO users (email, password, full_name, handle) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, full_name, handle]
    );

    // Fetch the created user
    const [users] = await connection.query(
      "SELECT id, email, full_name, handle FROM users WHERE id = ?",
      [result.insertId]
    );

    const user = users[0];

    // Auto-login: create token and set cookie
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: process.env.JWT_EXPIRY || "7d" }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    };

    if (process.env.NODE_ENV === "production" && process.env.COOKIE_DOMAIN) {
      cookieOptions.domain = process.env.COOKIE_DOMAIN;
    }

    res.cookie("token", token, cookieOptions);
    console.log("[AUTH] Registration successful, token cookie set", {
      user: user.id,
      sameSite: cookieOptions.sameSite,
      secure: cookieOptions.secure,
    });

    res.status(201).json({ token, user });
  } catch (error) {
    if (error?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Email or handle already in use" });
    }
    console.error("Register error", error);
    res.status(500).json({ error: "Registration failed" });
  } finally {
    if (connection) connection.release();
  }
});

export default router;
