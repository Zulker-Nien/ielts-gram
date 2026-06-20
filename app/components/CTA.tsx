"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animEls = sectionRef.current?.querySelectorAll(".anim-in");
      if (!animEls) return;
      gsap.from(animEls, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.to(glowRef.current, {
        scale: 1.2,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-theme-border bg-theme-surface-alt p-12 text-center md:p-20">
          <div
            ref={glowRef}
            className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--theme-glow)" }}
          />

          <div className="relative z-10">
            <p className="anim-in mb-3 text-sm font-semibold uppercase tracking-widest text-theme-accent">
              Get Started Today
            </p>
            <h2 className="anim-in text-4xl font-bold leading-tight tracking-tight text-theme-text md:text-5xl">
              Ready to achieve your <span className="text-theme-accent">target band</span>?
            </h2>
            <p className="anim-in mx-auto mt-6 max-w-xl text-lg leading-relaxed text-theme-text-muted">
              Book a free 30-minute consultation. Well assess your current level,
              discuss your target score, and create a custom roadmap to get you there.
            </p>
            <div className="anim-in mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="rounded-xl bg-theme-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                style={{ boxShadow: "0 8px 32px var(--theme-glow)" }}
              >
                Book Free Consultation
              </a>
              <a
                href="#"
                className="rounded-xl border border-theme-border bg-theme-surface px-8 py-3.5 text-sm font-semibold text-theme-text transition-all hover:bg-theme-surface-alt"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
