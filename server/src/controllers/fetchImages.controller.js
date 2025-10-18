import Image from "../models/Image.js";

export const fetchImages = async (req, res) => {
  try {
    // Only select _id, thumbnail, isVisible for gallery grid
    const images = await Image.find(
      {},
      { _id: 1, thumbnail: 1, isVisible: 1 }
    ).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch images" });
  }
};
