import supabase from "@/services/supabase";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthLoading: false,
      authError: null,

      //SignUP
      signup: async ({ email, password, username }) => {
        set({ isAuthLoading: true, authError: null });

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
          },
        });

        if (error) {
          toast.error("Signup failed. Please check your email or password.");
          set({ authError: error.message, isAuthLoading: false });
        } else {
          toast.success("Signup successful! Welcome 👋", {
            id: "signup-success",
          });
          set({ user: data.user, isAuthLoading: false });
        }
      },

      // LogIn
      login: async ({ email, password }) => {
        set({ isAuthLoading: true, authError: null });

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast.error("Email or password is incorrect");
          set({ authError: error.message, isAuthLoading: false });
        } else {
          toast.success("Login successful", { id: "login-success" });
          set({ user: data.user, isAuthLoading: false });
        }
      },

      // Logout
      logout: async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
          toast.error("Something went wrong during logout", {
            id: "logout-error",
          });
          return;
        }

        set({ user: null });
        toast.success("Logged out successfully", { id: "logout-success" });
      },

      getCurrentUser: async () => {
        const { data } = await supabase.auth.getUser();
        if (data.user) set({ user: data.user });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;
