"use client";

import { useStore } from "@/app/store/useStore";
import { useEffect, useRef } from "react";

const themes = [
  { value: "emerald", label: "E", color: "bg-emerald-500" },
  { value: "sapphire", label: "S", color: "bg-blue-500" },
  { value: "ruby", label: "R", color: "bg-rose-500" },
  { value: "amethyst", label: "A", color: "bg-violet-500" },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme, darkMode, toggleDarkMode } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.mode = darkMode ? "dark" : "light";
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div ref={containerRef} className="flex items-center gap-2">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`size-7 rounded-full ${t.color} transition-transform duration-300 ${
            theme === t.value ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-transparent" : "opacity-50 hover:opacity-80"
          }`}
          aria-label={`Switch to ${t.value} theme`}
        />
      ))}
      <div className="ml-2 h-5 w-px bg-theme-border" />
      <button
        onClick={toggleDarkMode}
        className="ml-2 text-sm text-theme-text-muted hover:text-theme-accent transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
}
