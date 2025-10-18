import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  deleteImages,
  fetchAllImages,
  fetchImageThumbnail,
  fetchShowcasedImages,
  getSingleImage,
  setBulkShowcase,
  toggleShowcase,
  uploadImages,
} from "../controllers/images.controller.js";

const router = Router();

router.post("/upload-images", upload.array("images", 100), uploadImages);
router.get("/get-image-thumbnails", fetchImageThumbnail);
router.get("/get-image/:id", getSingleImage);
router.get("/getAllImages", fetchAllImages);
router.delete("/delete/:id", deleteImages);

// Showcase endpoints
router.get("/showcase", fetchShowcasedImages); // public
router.patch("/:id/showcase", toggleShowcase); // admin (auth middleware can be added when available)
router.post("/showcase", setBulkShowcase); // admin bulk update

export default router;
