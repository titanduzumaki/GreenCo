import { Router } from "express";
import {
  contactController,
  getAllContacts,
  deleteContact,
  markMessageAsRead
} from "../controllers/message.controller.js";

const router = Router();

// User-facing form submission
router.post("/contact", contactController);

// Admin endpoints
router.get("/contacts", getAllContacts);
router.delete("/contacts/:id", deleteContact);

router.patch("/contact/:id/read", markMessageAsRead); 

export default router;
