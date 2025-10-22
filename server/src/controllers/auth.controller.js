import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ----------------- LOGIN -----------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required." });

  try {
    const user = await User.findOne({ email });
    if (!user || user.role !== "admin")
      return res.status(400).json({ message: "Invalid credentials." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// ----------------- LOGOUT -----------------
export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully." });
};

// ----------------- CHANGE PASSWORD -----------------
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "Both fields are required." });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect." });

    // Hash and save new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    // Logout user after password change
    res.cookie("jwt", "", { maxAge: 0 });

    res
      .status(200)
      .json({ message: "Password changed successfully. Please login again." });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};
