import express from "express";
import SiteSettings from "../models/SiteSetting.js";

const router = express.Router();

// GET settings
router.get("/", async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    res.json(settings || { phoneNumbers: [], emails: [], socialLinks: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST settings
router.post("/", async (req, res) => {
  try {
    const { phoneNumbers, emails, socialLinks } = req.body;

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings({ phoneNumbers, emails, socialLinks });
    } else {
      settings.phoneNumbers = phoneNumbers;
      settings.emails = emails;
      settings.socialLinks = socialLinks; // <-- Add this
    }

    await settings.save();
    res.json({ success: true, message: "Settings updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
