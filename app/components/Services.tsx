"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "One-on-One Coaching",
    desc: "Personalised speaking sessions targeting your weak areas with real-time pronunciation, grammar, and fluency feedback.",
    icon: "🎯",
  },
  {
    title: "Mock Interview Practice",
    desc: "Full IELTS Speaking mock tests covering Parts 1, 2, and 3 with detailed band score analysis and actionable improvement tips.",
    icon: "🎤",
  },
  {
    title: "Pronunciation Lab",
    desc: "Focused drills on intonation, word stress, connected speech, and tricky sounds to make your speech clearer and more natural.",
    icon: "🔊",
  },
  {
    title: "Part 2 Cue Card Mastery",
    desc: "Structured frameworks to organise your 1-minute talk, expand ideas, and deliver confidently without memorising scripts.",
    icon: "🗂️",
  },
  {
    title: "Vocabulary Builder",
    desc: "Topic-specific word banks, collocations, and idiomatic expressions for common IELTS themes like education, environment, and technology.",
    icon: "📖",
  },
  {
    title: "Grammar for Speaking",
    desc: "Practical grammar drills focused on complex sentence structures, conditionals, and tense accuracy for the speaking test.",
    icon: "⚡",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      const headerEls = headerRef.current?.querySelectorAll(".animate-in");
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

      cards.forEach((card) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="mx-auto mb-16 max-w-2xl text-center">
          <p className="animate-in mb-3 text-sm font-semibold uppercase tracking-widest text-theme-accent">
            What I Offer
          </p>
          <h2 className="animate-in text-4xl font-bold leading-tight tracking-tight text-theme-text md:text-5xl">
            Speaking programs for <span className="text-theme-accent">every learner</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group rounded-2xl border border-theme-border bg-theme-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-theme-accent/30 hover:shadow-lg"
            >
              <span className="mb-4 block text-3xl">{s.icon}</span>
              <h3 className="mb-2 text-lg font-semibold text-theme-text">{s.title}</h3>
              <p className="text-sm leading-relaxed text-theme-text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
