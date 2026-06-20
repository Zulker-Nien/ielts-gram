"use client";

import { create } from "zustand";

export type Theme = "emerald" | "sapphire" | "ruby" | "amethyst";

interface AppState {
  theme: Theme;
  darkMode: boolean;
  mobileMenuOpen: boolean;
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  theme: "emerald",
  darkMode: false,
  mobileMenuOpen: false,
  setTheme: (theme) => set({ theme }),
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
