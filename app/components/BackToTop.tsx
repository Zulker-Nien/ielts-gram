"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 600;
      if (shouldShow !== visible) {
        setVisible(shouldShow);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  useEffect(() => {
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        scale: visible ? 1 : 0,
        opacity: visible ? 1 : 0,
        duration: 0.35,
        ease: "back.out(2)",
      });
    }
  }, [visible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 flex size-12 scale-0 items-center justify-center rounded-full bg-theme-accent text-white shadow-lg opacity-0 transition-shadow hover:shadow-xl"
      style={{ boxShadow: "0 4px 24px var(--theme-glow)" }}
      aria-label="Back to top"
    >
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
