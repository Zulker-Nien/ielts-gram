"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/app/store/useStore";
import { t } from "@/app/store/translations";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { number: "6+", labelKey: 0 },
  { number: "5000+", labelKey: 1 },
  { number: "8.5", labelKey: 2 },
];

export default function About() {
  const lang = useStore((s) => s.lang);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      const animEls = contentRef.current?.querySelectorAll(".animate-in");
      if (!animEls) return;
      gsap.from(animEls, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(cards, {
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.12,
        ease: "back.out(1.7)",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={contentRef} className="mb-16 max-w-2xl">
          <p className="animate-in mb-3 text-sm font-semibold uppercase tracking-widest text-theme-accent">
            {t.about.badge[lang]}
          </p>
          <h2 className="animate-in text-4xl font-bold leading-tight tracking-tight text-theme-text md:text-5xl">
            {t.about.title[lang]} <span className="text-theme-accent">{t.about.titleHighlight[lang]}</span>
          </h2>
          <p className="animate-in mt-6 text-lg leading-relaxed text-theme-text-muted">
            {t.about.paragraph[lang]}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {highlights.map((item, i) => (
            <div
              key={item.labelKey}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group rounded-2xl border border-theme-border bg-theme-surface p-8 text-center transition-all hover:border-theme-accent/30 hover:shadow-lg"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
            >
              <div className="text-4xl font-bold text-theme-accent">{item.number}</div>
              <div className="mt-2 text-sm font-medium text-theme-text-muted">{t.about.highlights[item.labelKey][lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
