import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

export const usePhotoStore = create((set) => ({
  photos: [], // Thumbnails and meta
  loading: false,
  needsRefresh: false,
  fullImage: null, // For modal full image
  fullLoading: false,

  // Fetch only thumbnails/meta for gallery grid
  fetchThumbnails: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/images/get-image-thumbnails");
      set({ photos: res.data.data || [], loading: false, needsRefresh: false });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load images");
      set({ loading: false });
    }
  },

  // Fetch full image data by id for modal
  fetchFullImage: async (id) => {
    if (!id) return;
    set({ fullLoading: true, fullImage: null });
    try {
      const res = await axiosInstance.get(`/images/get-image/${id}`);
      set({ fullImage: res.data.data, fullLoading: false });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load image");
      set({ fullImage: null, fullLoading: false });
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

      set({ needsRefresh: true });

      toast.success(
        `Uploaded ${uploaded.length} image${uploaded.length > 1 ? "s" : ""}`
      );
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
      set({ loading: false });
    }
  },

  deletePhotoById: async (id) => {
    try {
      if (!id) return null;

      set({ loading: true });

      await axiosInstance.delete(`/images/delete/${id}`);

      set((state) => ({
        photos: state.photos.filter((p) => p._id !== id),
        loading: false,
        needsRefresh: true,
      }));

      toast.success("Photo deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete photo");
      set({ loading: false });
    }
  },

  toggleVisibility: (id) => {
    set((state) => ({
      photos: state.photos.map((p) =>
        p.public_id === id ? { ...p, isVisible: !p.isVisible } : p
      ),
    }));
  },

  setNeedsRefresh: (value) => set({ needsRefresh: value }),
}));
