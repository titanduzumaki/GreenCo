import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    public_id: { type: String, required: true },
    tags: [String],
    isVisible: { type: Boolean, default: true },
    // Mark image for public showcase on user gallery
    isShowcased: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", ImageSchema);

export default Image;
