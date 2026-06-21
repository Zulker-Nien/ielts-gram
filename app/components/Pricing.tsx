"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/app/store/useStore";
import { t } from "@/app/store/translations";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const lang = useStore((s) => s.lang);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll(".anim-in");
      if (els) {
        gsap.from(els, {
          y: 40,
          opacity: 0,
          duration: 0.2,
          stagger: 0.15,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const courses = t.pricing.courses;

  return (
    <section ref={sectionRef} id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="anim-in mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-theme-accent">
            {t.pricing.badge[lang]}
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-theme-text md:text-5xl">
            {t.pricing.title[lang]} <span className="text-theme-accent">{t.pricing.titleHighlight[lang]}</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.title.en}
              className={`anim-in group relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                course.popular
                  ? "border-theme-accent bg-theme-accent/5 shadow-lg col-span-2"
                  : "border-theme-border bg-theme-surface"
              }`}
            >
              {course.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-theme-accent px-4 py-1 text-xs font-semibold text-white">
                  {t.pricing.popular[lang]}
                </span>
              )}

              <div className="mb-4 text-3xl">{course.icon}</div>
              <h3 className="text-xl font-bold text-theme-text">{course.title[lang]}</h3>
              <p className="mt-2 text-sm text-theme-text-muted">{course.desc[lang]}</p>

              <div className="mt-6 space-y-1">
                {course.details.map((d) => (
                  <p
                    key={d.en}
                    className={`text-sm ${d.en.startsWith("Course Fee:") || d.en.startsWith("Fee:") ? "font-semibold text-theme-accent" : "text-theme-text-muted"}`}
                  >
                    {d[lang]}
                  </p>
                ))}
              </div>

              <ul className="mt-6 space-y-3 border-t border-theme-border pt-6">
                {course.features.map((f) => (
                  <li key={f.en} className="flex items-start gap-2 text-sm text-theme-text">
                    <svg className="mt-0.5 size-4 shrink-0 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f[lang]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
