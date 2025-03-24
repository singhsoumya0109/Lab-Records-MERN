import { create } from "zustand";
import { toast } from "react-hot-toast";

const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem("token"),
  login: (token) => {
    localStorage.setItem("token", token);
    set({ isLoggedIn: true });
    toast.success("Logged in successfully!");
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("student");
    set({ isLoggedIn: false });
    toast.success("Logged out successfully!");
  },
}));

export default useAuthStore;
