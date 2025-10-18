import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadImages } from "../controllers/upload.controller.js";
import { fetchImages } from "../controllers/fetchImages.controller.js";
import { getSingleImage } from "../controllers/getSingleImage.controller.js";

const router = Router();

router.post("/upload-images", upload.array("images", 50), uploadImages);
router.get("/get-images", fetchImages);
router.get("/get-image/:id", getSingleImage);

export default router;
