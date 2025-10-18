import fs from "fs";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import Image from "../models/Image.js";

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const uploadResults = [];

    for (const file of req.files) {
      const result = await uploadOnCloudinary(file.path);

      fs.unlinkSync(file.path);

      if (result) {
        const newImage = await Image.create({
          url: result.secure_url,
          thumbnail: result.secure_url.replace(
            "/upload/",
            "/upload/w_300,q_auto/"
          ),
          public_id: result.public_id,
        });
        uploadResults.push(newImage);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: uploadResults,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const fetchImageThumbnail = async (req, res) => {
  try {
    // Only select _id, thumbnail, isVisible for gallery grid
    const image = await Image.find(
      {},
      { _id: 1, thumbnail: 1, isVisible: 1 }
    ).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch image" });
  }
};

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

export const fetchAllImages = async (req, res) => {
  try {
    const images = await Image.find({}).sort("ascending");

    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.log("Errr in fetching all images conrtoller.", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch all images" });
  }
};

export const deleteImages = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    await deleteFromCloudinary(image.public_id);
    await Image.deleteOne({ _id: id });

    res
      .status(200)
      .json({ success: "true", message: "Image successfully deleted!" });
  } catch (error) {
    console.log("Error in deletion of image controller", error);
    res.status(404).json({
      success: "false",
      message: "Error in deleting image",
    });
  }
};
