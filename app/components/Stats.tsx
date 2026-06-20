"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 98, suffix: "%", label: "Speaking Success Rate" },
  { value: 450, suffix: "+", label: "Mock Interviews Done" },
  { value: 40, suffix: "+", label: "Countries Represented" },
  { value: 4.9, suffix: "", label: "Average Rating", decimals: 1 },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statCards = sectionRef.current?.querySelectorAll(".stat-card");
      if (!statCards) return;
      gsap.from(statCards, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      stats.forEach((stat, i) => {
        const el = numsRef.current[i];
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(el, {
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                const current = gsap.getProperty(el, "--num") as number || 0;
                const target = stat.value / (stat.decimals ? 10 : 1);
                const val = current + (target - current) * 0.05;
                if (Math.abs(val - target) < 0.01) {
                  el.textContent = target.toFixed(stat.decimals || 0);
                } else {
                  el.textContent = val.toFixed(stat.decimals || 0);
                }
                el.style.setProperty("--num", String(val));
              },
            });
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card rounded-2xl border border-theme-border bg-theme-surface-alt p-8 text-center"
            >
              <div className="text-4xl font-bold text-theme-accent md:text-5xl">
                <span
                  ref={(el) => { numsRef.current[i] = el; }}
                  style={{ "--num": 0 } as React.CSSProperties}
                >
                  0
                </span>
                {stat.suffix}
              </div>
              <div className="mt-2 text-sm font-medium text-theme-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
