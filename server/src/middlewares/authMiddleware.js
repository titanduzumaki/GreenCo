import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies);
    console.log("Auth header received:", req.headers.authorization);

    const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("No token found");
      return res
        .status(401)
        .json({ message: "Unauthorized: Token not Provided" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid Token." });
    }

    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) return res.status(401).json({ message: "User not found" });

    next();
  } catch (err) {
    console.error("Error in protect Route:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else res.status(403).json({ message: "Access denied: Admins only" });
};
