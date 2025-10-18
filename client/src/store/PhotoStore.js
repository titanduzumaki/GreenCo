import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

export const usePhotoStore = create((set, get) => ({
  photos: [],
  loading: false,

  fetchPhotos: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/images/get-images");
      set({ photos: res.data.data || [], loading: false });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load photos");
      set({ loading: false });
    }
  },

  uploadPhotos: async (files) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      set({ loading: true });
      const res = await axiosInstance.post("/images/upload-images", formData, {
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

  toggleVisibility: (id) => {
    set((state) => ({
      photos: state.photos.map((p) =>
        p.public_id === id ? { ...p, isVisible: !p.isVisible } : p
      ),
    }));
  },
}));
