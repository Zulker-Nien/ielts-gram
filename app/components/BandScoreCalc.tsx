"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/app/store/useStore";
import { t } from "@/app/store/translations";

gsap.registerPlugin(ScrollTrigger);

function calcOverall(scores: number[]) {
  const sum = scores.reduce((a, b) => a + b, 0);
  const avg = sum / scores.length;
  const rounded = Math.round(avg * 2) / 2;
  return Math.min(9, Math.max(0, rounded));
}

function estimateLevel(band: number, lang: "en" | "bn") {
  const levels = t.calc.levels;
  if (band >= 8) return levels.expert[lang];
  if (band >= 7) return levels.good[lang];
  if (band >= 6) return levels.competent[lang];
  if (band >= 5) return levels.modest[lang];
  if (band >= 4) return levels.limited[lang];
  return levels.beginner[lang];
}

export default function BandScoreCalc() {
  const lang = useStore((s) => s.lang);
  const sectionRef = useRef<HTMLElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [scores, setScores] = useState([6.0, 6.0, 6.0, 6.0]);
  const isFirstRender = useRef(true);

  const overall = calcOverall(scores);
  const level = estimateLevel(overall, lang);

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

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${(overall / 9) * 100}%`,
        duration: 0.6,
        ease: "power3.out",
      });
    }
    if (resultRef.current) {
      gsap.from(resultRef.current, {
        scale: 1.15,
        duration: 0.4,
        ease: "back.out(2)",
      });
    }
  }, [scores, overall]);

  const updateScore = (idx: number, val: number) => {
    setScores((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  const sections = t.calc.sections;

  return (
    <section ref={sectionRef} id="calculator" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="anim-in mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-theme-accent">
            {t.calc.badge[lang]}
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-theme-text md:text-5xl">
            {t.calc.title[lang]} <span className="text-theme-accent">{t.calc.titleHighlight[lang]}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-theme-text-muted">
            {t.calc.desc[lang]}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-3">
            {sections.map((section, i) => (
              <div key={section.en}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-theme-text">{section[lang]}</span>
                  <span className="font-bold text-theme-accent">{scores[i].toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={9}
                  step={0.5}
                  value={scores[i]}
                  onChange={(e) => updateScore(i, parseFloat(e.target.value))}
                  className="band-slider w-full"
                />
              </div>
            ))}
          </div>

          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-theme-border bg-theme-surface-alt p-6 lg:col-span-2">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-theme-text-muted">
              {t.calc.resultLabel[lang]}
            </p>
            <div
              ref={resultRef}
              className="text-6xl font-bold text-theme-accent"
              style={{ textShadow: "0 0 40px var(--theme-glow)" }}
            >
              {overall.toFixed(1)}
            </div>
            <p className="mt-1 text-sm font-medium text-theme-text-muted">
              {level}
            </p>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-theme-border">
              <div
                ref={barRef}
                className="h-full rounded-full bg-theme-accent"
                style={{ width: `${(overall / 9) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
