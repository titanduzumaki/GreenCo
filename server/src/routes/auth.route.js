import { Router } from "express";
import {
  changePassword,
  login,
  logout,
} from "../controllers/auth.controller.js";
import { isAdmin, protectRoute } from "../middlewares/authMiddleware.js"; // Import protect and isAdmin

const router = Router();

// ----------------- Auth routes -----------------
router.post("/login", login);
router.post("/logout", logout);

// Protected route to change password
router.put("/change-password", protectRoute, isAdmin, changePassword);

// Protected endpoint to get current user data
// router.get("/me", protect, isAdmin, (req, res) => {
//   res.json({ userId: req.user._id, email: req.user.email, role: req.user.role });
// });

router.get("/check", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
