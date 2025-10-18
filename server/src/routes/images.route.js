import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  deleteImages,
  fetchAllImages,
  fetchImageThumbnail,
  getSingleImage,
  uploadImages,
} from "../controllers/images.controller.js";

const router = Router();

router.post("/upload-images", upload.array("images", 50), uploadImages);
router.get("/get-image-thumbnails", fetchImageThumbnail);
router.get("/get-image/:id", getSingleImage);
router.get("/getAllImages", fetchAllImages);
router.delete("/delete/:id", deleteImages);

export default router;
