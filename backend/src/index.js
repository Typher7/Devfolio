import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import pool from "./config/database.js";

// Routes
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import projectRoutes from "./routes/projects.js";
import postRoutes from "./routes/posts.js";
import awardRoutes from "./routes/awards.js";
import userRoutes from "./routes/users.js";
import publicRoutes from "./routes/public.js";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/awards", awardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/public", publicRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running", timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});

export default app;
