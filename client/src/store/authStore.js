import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          // send login request
          const res = await axiosInstance.post("/auth/login", {
            email,
            password,
          });

          set({ user: res.data.user, loading: false });
          return res.data.user;
        } catch (err) {
          const msg = err.response?.data?.message || "Invalid credentials";
          set({ error: msg, loading: false });
          throw new Error(msg);
        }
      },

      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // keeps user logged in after refresh
      getStorage: () => localStorage,
    }
  )
);
