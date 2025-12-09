import jwt from "jsonwebtoken";

export function authRequired(req, res, next) {
  try {
    // Prefer cookie token (session) over Authorization header
    const authHeader = req.headers.authorization;
    const token = req.cookies?.token || authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

export default authRequired;
