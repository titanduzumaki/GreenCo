import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

// ✅ Check if user has a valid token
export const protect = async (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies);
    console.log("Auth header received:", req.headers.authorization);

    const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("❌ No token found");
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user)
      return res.status(401).json({ message: "User not found or invalid token" });

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ message: "Token failed or expired" });
  }
};


// ✅ Only allow admins
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else res.status(403).json({ message: "Access denied: Admins only" });
};