import { Router } from "express";
import { login, logout, changePassword } from "../controllers/auth.controller.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js"; // Import protect and isAdmin

const router = Router();

// ----------------- Auth routes -----------------
router.post("/login", login);
router.post("/logout", logout);

// Protected route to change password
router.put("/change-password", protect, isAdmin, changePassword);

// Protected endpoint to get current user data
router.get("/me", protect, isAdmin, (req, res) => {
  res.json({ userId: req.user._id, email: req.user.email, role: req.user.role });
});

export default router;
