import jwt from "jsonwebtoken";

export function authRequired(req, res, next) {
  try {
    // Check for token in headers (Bearer) or cookies
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1] || req.cookies?.token;

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
