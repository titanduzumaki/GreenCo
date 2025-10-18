import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { uploadImages } from "../controllers/upload.controller.js"

const router = Router()

router.post('/upload-images',upload.array("images",50),uploadImages)

export default router