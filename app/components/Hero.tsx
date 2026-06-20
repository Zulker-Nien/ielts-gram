"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, {
        scale: 0,
        duration: 0.6,
        immediateRender: false,
      })
        .from(
          titleRef.current?.querySelectorAll(".word") ?? [],
          { y: 80, duration: 0.8, stagger: 0.08, immediateRender: false },
          "-=0.3"
        )
        .from(subtitleRef.current, { y: 30, duration: 0.6, immediateRender: false }, "-=0.4")
        .from(ctaRef.current?.querySelectorAll("a, button") ?? [], {
          y: 20,
          stagger: 0.12,
          duration: 0.5,
          immediateRender: false,
        }, "-=0.2");

      gsap.to(shapeRef.current, {
        y: -20,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24"
    >
      <div
        ref={shapeRef}
        className="pointer-events-none absolute -right-40 -top-40 size-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--theme-glow)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 size-[400px] rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--theme-glow)" }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div
          ref={badgeRef}
          className="mb-8 inline-block rounded-full border border-theme-border bg-theme-surface-alt px-4 py-1.5 text-xs font-medium text-theme-accent"
        >
          IELTS Speaking — Band 7+ Specialist
        </div>

        <h1
          ref={titleRef}
          className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl"
        >
          {"Speak with".split(" ").map((word, i) => (
            <span key={i} className="word mr-4 inline-block text-theme-text">
              {word}
            </span>
          ))}
          <br />
          <span className="word inline-block text-theme-accent">Confidence</span>
        </h1>

        <p
          ref={subtitleRef}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-theme-text-muted"
        >
          Targeted Speaking coaching, real mock interviews, and exam-day strategies —
          designed to help you ace the IELTS Speaking test on your first attempt.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-xl bg-theme-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            style={{ boxShadow: "0 8px 32px var(--theme-glow)" }}
          >
            Book a Free Mock Test
          </a>
          <a
            href="#services"
            className="rounded-xl border border-theme-border bg-theme-surface px-8 py-3.5 text-sm font-semibold text-theme-text transition-all hover:bg-theme-surface-alt"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
