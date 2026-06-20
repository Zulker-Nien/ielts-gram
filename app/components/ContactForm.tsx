"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll(".anim-in");
      if (els) {
        gsap.from(els, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="anim-in mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-theme-accent">
            Contact
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-theme-text md:text-5xl">
            Let&apos;s <span className="text-theme-accent">talk</span>
          </h2>
        </div>

        <div className="anim-in mt-12 grid gap-6 text-center sm:grid-cols-2">
          {[
            { icon: "✉️", label: "Email", val: "hello@ieltsgram.com", href: "mailto:hello@ieltsgram.com" },
            { icon: "💬", label: "WhatsApp", val: "‪+880 1767‑301423‬", href: "https://wa.me/1767301423" },
            { icon: "👍", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61559938447857" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-theme-border bg-theme-surface-alt p-5 transition-colors hover:border-theme-accent/30"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="mt-1 text-sm font-medium text-theme-text">{item.val}</p>
              <p className="text-xs text-theme-text-muted">{item.label}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
