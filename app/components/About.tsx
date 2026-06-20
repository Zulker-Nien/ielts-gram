"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { number: "12+", label: "Years Experience" },
  { number: "2000+", label: "Students Taught" },
  { number: "8.5", label: "Avg. Speaking Band" },
];

export default function About() {
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
            About Me
          </p>
          <h2 className="animate-in text-4xl font-bold leading-tight tracking-tight text-theme-text md:text-5xl">
            Dedicated to helping you <span className="text-theme-accent">succeed</span>
          </h2>
          <p className="animate-in mt-6 text-lg leading-relaxed text-theme-text-muted">
            For over a decade, I have helped students master the IELTS Speaking test.
            My approach targets the four assessment criteria — Fluency, Lexical Resource,
            Grammar, and Pronunciation — through real-conversation practice and
            targeted feedback. Every session is designed to build your confidence
            and refine your delivery.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {highlights.map((h, i) => (
            <div
              key={h.label}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group rounded-2xl border border-theme-border bg-theme-surface p-8 text-center transition-all hover:border-theme-accent/30 hover:shadow-lg"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
            >
              <div className="text-4xl font-bold text-theme-accent">{h.number}</div>
              <div className="mt-2 text-sm font-medium text-theme-text-muted">{h.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
