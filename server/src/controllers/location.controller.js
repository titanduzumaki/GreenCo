import Location from "../models/location.js";

// GET all locations
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};

// POST new location (admin only)
export const addLocation = async (req, res) => {
  try {
    const { name, latitude, longitude, description } = req.body;
    if (!name || !latitude || !longitude)
      return res.status(400).json({ error: "Name, latitude, and longitude are required" });

    const newLocation = await Location.create({ name, latitude, longitude, description });
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(500).json({ error: "Failed to add location" });
  }
};

// DELETE location
export const deleteLocation = async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.json({ message: "Location deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete location" });
  }
};
