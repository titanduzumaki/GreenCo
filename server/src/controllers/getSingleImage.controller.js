import Image from "../models/Image.js";

export const getSingleImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }
    res.status(200).json({ success: true, data: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch image" });
  }
};
