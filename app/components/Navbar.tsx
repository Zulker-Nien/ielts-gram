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

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-theme-surface/80 border-b border-theme-border"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Image
          alt="logo"
          src={"/logo.png"}
          width={0}
          height={0}
          className="h-16 w-auto"
          unoptimized
        />
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
      </div>
    </nav>
  );
}
