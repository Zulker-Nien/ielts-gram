"use client";

import { create } from "zustand";

export type Theme = "emerald" | "sapphire" | "ruby" | "amethyst";
export type Lang = "en" | "bn";

interface AppState {
  theme: Theme;
  darkMode: boolean;
  mobileMenuOpen: boolean;
  lang: Lang;
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleLang: () => void;
}

export const useStore = create<AppState>((set) => ({
  theme: "emerald",
  darkMode: false,
  mobileMenuOpen: false,
  lang: "en",
  setTheme: (theme) => set({ theme }),
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleLang: () => set((s) => ({ lang: s.lang === "en" ? "bn" : "en" })),
}));
