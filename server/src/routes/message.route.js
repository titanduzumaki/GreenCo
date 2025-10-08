import { Router } from "express";
import { contactController } from "../controllers/message.controller.js";

const router = Router();

router.post("/contact", contactController);

export default router;
