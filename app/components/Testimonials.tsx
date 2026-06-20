"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Priya S.",
    role: "Academic Module — Speaking Band 7.5",
    text: "I used to freeze during the speaking test. The mock interview practice changed everything — I learned how to structure my answers and stay calm under pressure.",
  },
  {
    name: "Ahmed K.",
    role: "General Training — Speaking Band 8.0",
    text: "The pronunciation lab was incredible. I finally learned how intonation and word stress affect my score. Three weeks of practice and my fluency transformed completely.",
  },
  {
    name: "Yuki T.",
    role: "Academic Module — Speaking Band 7.0",
    text: "The Part 2 cue card frameworks were a game-changer. Instead of rambling, I now have a clear structure for every topic. My confidence went through the roof.",
  },
  {
    name: "Maria G.",
    role: "Academic Module — Speaking Band 8.5",
    text: "The personalised feedback on my grammatical range was exactly what I needed. I learned to use complex structures naturally in conversation without sounding rehearsed.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerEls = sectionRef.current?.querySelectorAll(".anim-header");
      if (!headerEls) return;
      gsap.from(headerEls, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (idx: number) => {
    setActive(idx);
    const cards = trackRef.current?.children;
    if (cards?.[idx]) {
      gsap.to(trackRef.current, {
        x: -idx * (cards[idx] as HTMLElement).offsetWidth - idx * 24,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="anim-header mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-theme-accent">
            Testimonials
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-theme-text md:text-5xl">
            What students <span className="text-theme-accent">say</span>
          </h2>
        </div>

        <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
          <div ref={trackRef} className="flex gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex min-w-[320px] flex-shrink-0 flex-col justify-between rounded-2xl border border-theme-border bg-theme-surface p-8 transition-all hover:border-theme-accent/30"
              >
                <p className="text-base leading-relaxed text-theme-text">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6">
                  <div className="font-semibold text-theme-accent">{t.name}</div>
                  <div className="text-sm text-theme-text-muted">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`size-2 rounded-full transition-all ${
                i === active ? "w-6 bg-theme-accent" : "bg-theme-border"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
