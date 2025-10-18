import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

export const usePhotoStore = create((set, get) => ({
  photos: [],
  loading: false,

  // ✅ Fetch all photos (optional if you save URLs in DB)
  fetchPhotos: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/photos");
      set({ photos: res.data.data || [], loading: false });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load photos");
      set({ loading: false });
    }
  },

  // ✅ Upload images to backend -> Cloudinary
  uploadPhotos: async (files) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      set({ loading: true });
      const res = await axiosInstance.post("/upload-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploaded = res.data.data || [];
      set((state) => ({
        photos: [...uploaded, ...state.photos],
        loading: false,
      }));

      toast.success(
        `Uploaded ${uploaded.length} image${uploaded.length > 1 ? "s" : ""}`
      );
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
      set({ loading: false });
    }
  },

  // ✅ Delete photo (optional: add API delete call later)
  deletePhoto: async (public_id) => {
    try {
      set((state) => ({
        photos: state.photos.filter((p) => p.public_id !== public_id),
      }));
      toast.success("Photo deleted");
    } catch (err) {
      toast.error("Failed to delete photo");
    }
  },

  // ✅ Toggle visibility for admin usage
  toggleVisibility: (id) => {
    set((state) => ({
      photos: state.photos.map((p) =>
        p.public_id === id ? { ...p, isVisible: !p.isVisible } : p
      ),
    }));
  },
}));
