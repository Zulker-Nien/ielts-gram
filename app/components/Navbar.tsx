"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import LanguageToggle from "./LanguageToggle";
import { useStore } from "@/app/store/useStore";
import { t } from "@/app/store/translations";
import Image from "next/image";

const links = [
  { key: "About", href: "#about" },
  { key: "Services", href: "#services" },
  { key: "Pricing", href: "#pricing" },
  { key: "Journey", href: "#journey" },
  { key: "Calculator", href: "#calculator" },
  { key: "FAQ", href: "#faq" },
  { key: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const lang = useStore((s) => s.lang);
  const mobileMenuOpen = useStore((s) => s.mobileMenuOpen);
  const setMobileMenuOpen = useStore((s) => s.setMobileMenuOpen);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  const handleNav = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-theme-surface/80 border-b border-theme-border"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#">
          <Image
            alt="logo"
            src={"/logo.png"}
            width={0}
            height={0}
            className="h-16 w-auto"
            unoptimized
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const label = t.nav.links.find((l) => l.en === link.key);
            return (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-theme-text-muted transition-colors hover:text-theme-accent"
              >
                {label ? label[lang] : link.key}
              </a>
            );
          })}
          <LanguageToggle />
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 rounded bg-theme-text transition-all duration-300 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 rounded bg-theme-text transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 rounded bg-theme-text transition-all duration-300 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-theme-border bg-theme-surface md:hidden">
          <div className="flex flex-col gap-2 px-6 py-4">
            {links.map((link) => {
              const label = t.nav.links.find((l) => l.en === link.key);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-theme-text-muted transition-colors hover:bg-theme-surface-alt hover:text-theme-accent"
                >
                  {label ? label[lang] : link.key}
                </a>
              );
            })}
            <div className="px-3 pt-2">
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
