import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema({
  phoneNumbers: { type: [String], required: true },
  emails: { type: [String], required: true },
  socialLinks: [
    {
      platform: { type: String, enum: ["Facebook", "Twitter", "Instagram", "LinkedIn"], required: true },
      url: { type: String, required: true },
    },
  ],
});

const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);

export default SiteSettings;
