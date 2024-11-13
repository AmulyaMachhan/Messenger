import { create } from "zustand";
import { api } from "../lib/axios";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogginIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await api.get("/check-auth");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error while checking user authentication " + error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
