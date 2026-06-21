"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/app/store/useStore";

export default function LanguagePrompt() {
  const { setLang, langLoaded } = useStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ieltsgram-lang");
    if (stored === "en" || stored === "bn") {
      setLang(stored);
    } else {
      setShow(true);
    }
  }, []);

  const select = (l: "en" | "bn") => {
    localStorage.setItem("ieltsgram-lang", l);
    setLang(l);
    setShow(false);
  };

  if (!show || langLoaded) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-2xl border border-theme-border bg-theme-surface p-8 text-center shadow-2xl">
        <div className="mb-2 text-4xl">🌐</div>
        <h2 className="text-xl font-bold text-theme-text">Select Your Language</h2>
        <p className="mt-1 text-sm text-theme-text-muted">আপনার ভাষা নির্বাচন করুন</p>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => select("en")}
            className="flex-1 rounded-xl border border-theme-border bg-theme-surface-alt px-6 py-3 font-semibold text-theme-text transition-all hover:bg-theme-accent hover:text-white"
          >
            English
          </button>
          <button
            onClick={() => select("bn")}
            className="flex-1 rounded-xl border border-theme-border bg-theme-surface-alt px-6 py-3 font-semibold text-theme-text transition-all hover:bg-theme-accent hover:text-white"
          >
            বাংলা
          </button>
        </div>
      </div>
    </div>
  );
}
