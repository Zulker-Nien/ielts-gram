"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: "01",
    title: "Free Consultation",
    desc: "We hop on a call to understand your current level, target score, and timeline. No commitment, just clarity.",
  },
  {
    step: "02",
    title: "Speaking Diagnostic",
    desc: "You complete a full Speaking mock test covering Parts 1, 2, and 3. I analyze your performance across all four criteria to identify your strengths and gaps.",
  },
  {
    step: "03",
    title: "Custom Study Plan",
    desc: "Based on your assessment, I design a personalized roadmap with weekly milestones, session topics, and practice targets.",
  },
  {
    step: "04",
    title: "Speak & Refine",
    desc: "We work through live speaking drills, pronunciation exercises, and timed Part 2 practices. Each session builds on the previous one with measurable progress.",
  },
  {
    step: "05",
    title: "Full Mock Interviews",
    desc: "Full-length mock Speaking tests under exam conditions followed by criterion-level feedback, band score predictions, and targeted refinement strategies.",
  },
  {
    step: "06",
    title: "Exam Day Ready",
    desc: "With your fluency sharpened, pronunciation refined, and strategies internalised, you walk into the test centre ready to speak with confidence.",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

      const items = sectionRef.current?.querySelectorAll(".timeline-item");
      if (items) {
        gsap.from(items, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }

      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
        gsap.to(lineRef.current, {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="journey" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="anim-in mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-theme-accent">
            Your Journey
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-theme-text md:text-5xl">
            From consultation to <span className="text-theme-accent">exam day</span>
          </h2>
        </div>

        <div className="relative">
          <div
            ref={lineRef}
            className="absolute left-[19px] top-0 h-full w-0.5 bg-theme-accent/30"
          />

          <div className="space-y-12">
            {steps.map((step) => (
              <div key={step.step} className="timeline-item relative flex gap-6">
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-theme-accent bg-theme-surface text-sm font-bold text-theme-accent">
                  {step.step}
                </div>
                <div className="flex-1 rounded-2xl border border-theme-border bg-theme-surface p-6 transition-all hover:border-theme-accent/30">
                  <h3 className="text-lg font-bold text-theme-text">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-theme-text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
