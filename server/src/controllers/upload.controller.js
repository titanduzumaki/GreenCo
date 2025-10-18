import fs from "fs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
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
