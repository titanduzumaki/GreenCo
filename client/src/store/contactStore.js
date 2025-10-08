import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useContactStore = create((set) => ({
  loading: false,
  error: null,

  sendContactMessage: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post("/msg/contact", {
        fullName: data.name,
        email: data.email,
        company: data.company,
        subject: data.subject,
        message: data.message,
      });

      set({ loading: false });
      return res.data;
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to send message. Try again.";
      set({ loading: false, error: msg });
      throw new Error(msg);
    }
  },
}));
