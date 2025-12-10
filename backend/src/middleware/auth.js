import jwt from "jsonwebtoken";

export function authRequired(req, res, next) {
  try {
    // Try cookie first (primary), then Authorization header (fallback for mobile)
    let token = req.cookies?.token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.slice(7); // Remove "Bearer " prefix
        console.log(
          "[AUTH] Using token from Authorization header (mobile fallback)"
        );
      }
    } else {
      console.log("[AUTH] Using token from cookie");
    }

    if (!token) {
      console.log("[AUTH] No token found in cookie or Authorization header");
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("[AUTH] Token verification failed:", error.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

export default authRequired;
