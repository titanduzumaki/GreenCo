import { v2 as cloudinary } from "cloudinary";
import { ENV } from "../lib/env.js";
import fs from "fs";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localfilepPath) => {
  try {
    if (!localfilepPath) return null;

    const uploadResult = await cloudinary.uploader
      .upload(localfilepPath, {
        resource_type: "auto",
        folder: "greenco_uploads",
      })
      .catch((err) => console.log(err));

    // console.log(uploadResult);
    // console.log("File is uploaded successfully.", uploadResult.url);

    return uploadResult;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    fs.unlinkSync(localfilepPath);
    return null;
  }
};

export const deleteFromCloudinary = async (public_id) => {
  try {
    const del = await cloudinary.uploader.destroy(public_id);
    console.log("Deleted!", del);
  } catch (error) {
    console.log("Error in deleting image from cloudinary.", error);
  }
};
