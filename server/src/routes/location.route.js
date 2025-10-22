import express from "express";
import { Location } from "../models/location.js";

const router = express.Router();

// ✅ Get all locations
router.get("/", async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(Array.isArray(locations) ? locations : []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add multiple or single locations
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    let saved;

    if (Array.isArray(data)) {
      // multiple locations
      saved = await Location.insertMany(data);
    } else {
      // single location
      const { name, latitude, longitude } = data;
      const location = new Location({ name, latitude, longitude });
      saved = await location.save();
    }

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete location by ID
router.delete("/:id", async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
