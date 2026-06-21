"use client";

import { useStore } from "@/app/store/useStore";

export default function LanguageToggle() {
  const { lang, toggleLang } = useStore();

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1 rounded-md border border-theme-border px-2 py-1 text-xs font-semibold text-theme-text-muted transition-colors hover:text-theme-accent"
      aria-label="Toggle language"
    >
      <span className={lang === "en" ? "text-theme-accent" : ""}>EN</span>
      <span className="text-theme-border">|</span>
      <span className={lang === "bn" ? "text-theme-accent" : ""}>বাং</span>
    </button>
  );
}
