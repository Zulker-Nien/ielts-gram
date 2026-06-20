"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { label: "Fluency & Coherence", pct: 88 },
  { label: "Lexical Resource (Vocabulary)", pct: 85 },
  { label: "Grammatical Range & Accuracy", pct: 82 },
  { label: "Pronunciation & Intonation", pct: 80 },
  { label: "Part 1 — Topic Handling", pct: 90 },
  { label: "Part 3 — Abstract Reasoning", pct: 78 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pctRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll(".animate-in");
      if (els) {
        gsap.from(els, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: "top 20%" },
        });
      }

      skills.forEach((_, i) => {
        const bar = barRefs.current[i];
        const pct = pctRefs.current[i];
        if (!bar) return;

        ScrollTrigger.create({
          trigger: bar,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(bar, {
              width: `${skills[i].pct}%`,
              duration: 1.2,
              ease: "power3.out",
            });
            if (pct) {
              gsap.to(pct, {
                opacity: 1,
                duration: 0.3,
                delay: 0.6,
              });
            }
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="anim-in mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-theme-accent">
            Speaking Skills Profile
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-theme-text md:text-5xl">
            Average <span className="text-theme-accent">proficiency</span> per criterion
          </h2>
        </div>

        <div className="space-y-6">
          {skills.map((s, i) => (
            <div key={s.label} className="anim-in">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-theme-text">{s.label}</span>
                <span
                  ref={(el) => { pctRefs.current[i] = el; }}
                  className="font-bold text-theme-accent opacity-0"
                >
                  {s.pct}%
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-theme-border">
                <div
                  ref={(el) => { barRefs.current[i] = el; }}
                  className="h-full rounded-full bg-gradient-to-r from-theme-accent-light to-theme-accent"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
