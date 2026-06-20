"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "149",
    period: "/month",
    desc: "Perfect for building foundational speaking confidence.",
    features: [
      "4 live speaking sessions",
      "2 mock interviews (Parts 1-3)",
      "Pronunciation feedback report",
      "Custom vocabulary list",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Accelerator",
    price: "349",
    period: "/month",
    desc: "For learners aiming for Band 7+ in 8 weeks.",
    features: [
      "8 live speaking sessions",
      "6 mock interviews (full band score)",
      "Pronunciation lab access",
      "Part 2 cue card library",
      "WhatsApp voice feedback",
      "Score guarantee",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Intensive",
    price: "699",
    period: "/month",
    desc: "Full immersion — daily speaking practice & feedback.",
    features: [
      "16 live speaking sessions",
      "Unlimited mock interviews",
      "Pronunciation lab unlimited",
      "Full topic vocabulary pack",
      "24/7 voice note feedback",
      "Score guarantee",
      "Weekly progress review",
    ],
    cta: "Go Intensive",
    popular: false,
  },
];

export default function Pricing() {
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

  return (
    <section ref={sectionRef} id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="anim-in mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-theme-accent">
            Pricing
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-theme-text md:text-5xl">
            Choose your <span className="text-theme-accent">path</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`anim-in group relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                plan.popular
                  ? "border-theme-accent bg-theme-accent/5 shadow-lg"
                  : "border-theme-border bg-theme-surface"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-theme-accent px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold text-theme-text">{plan.name}</h3>
              <p className="mt-2 text-sm text-theme-text-muted">{plan.desc}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-theme-accent">${plan.price}</span>
                <span className="text-sm text-theme-text-muted">{plan.period}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-theme-text">
                    <svg className="mt-0.5 size-4 shrink-0 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-theme-accent text-white shadow-lg hover:scale-[1.02] hover:shadow-xl"
                    : "border border-theme-border bg-theme-surface text-theme-text hover:bg-theme-surface-alt"
                }`}
                style={plan.popular ? { boxShadow: "0 8px 32px var(--theme-glow)" } : undefined}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
