import { create } from "zustand";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogginIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await api.get("auth/check-auth");
      set({ authUser: res.data });
    } catch (error) {
      console.error(error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await api.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      console.log("Error while registering a user " + error);
      toast.error(error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLogginIn: true });
    try {
      const res = await api.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Successfully Logged In");
    } catch (error) {
      console.log("Error while registering a user " + error);
      toast.error(error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isLogginIn: false });
    }
  },

  logout: async () => {
    try {
      await api.get("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out Successfully");
    } catch (error) {
      console.error("Error while logging out");
      toast.error(error.response.data.message);
    }
  },
}));
