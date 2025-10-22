import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // unique: true // Consider removing this unless intentional
    },
    role: {
      type: String,
      default: "user", // Default to "user", admin can be set manually
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;