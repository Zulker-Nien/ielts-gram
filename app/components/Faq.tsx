"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "How long does it take to improve my Speaking band by 0.5–1?",
    a: "Most students see a 0.5 band improvement within 4–6 weeks of consistent speaking practice, and a full band improvement within 8–12 weeks. Results depend on your starting level, practice frequency, and target score.",
  },
  {
    q: "Do you offer a free mock test?",
    a: "Yes. We offer a free 15-minute Speaking assessment where we evaluate your fluency, pronunciation, and response structure — no commitment required.",
  },
  {
    q: "Are the speaking sessions online?",
    a: "Yes, all sessions are conducted via video call so you can practice from anywhere. You will get real-time feedback on your pronunciation, grammar, and fluency during each session.",
  },
  {
    q: "What kind of topics do you cover?",
    a: "We cover all common IELTS themes — education, technology, environment, health, society, culture, and more. You will build topic-specific vocabulary and learn to handle any question confidently.",
  },
  {
    q: "Can you help with both Academic and General Training?",
    a: "Absolutely. The Speaking test is the same for both modules. My strategies apply universally and are tailored to your specific needs and target band.",
  },
  {
    q: "What if I am nervous about speaking?",
    a: "That is completely normal — and exactly what we work on first. Through gradual exposure, structured frameworks, and positive reinforcement, most students feel noticeably more confident after just 2–3 sessions.",
  },
];

export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerEls = sectionRef.current?.querySelectorAll(".anim-header");
      if (headerEls) {
        gsap.from(headerEls, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = (idx: number) => {
    const isOpen = openIndex === idx;
    const content = contentRefs.current[idx];
    const icon = iconRefs.current[idx];

    if (isOpen) {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power3.inOut",
        onComplete: () => setOpenIndex(null),
      });
      if (icon) {
        gsap.to(icon, { rotate: 0, duration: 0.3, ease: "power2.out" });
      }
    } else {
      if (openIndex !== null) {
        const prevContent = contentRefs.current[openIndex];
        const prevIcon = iconRefs.current[openIndex];
        if (prevContent) {
          gsap.to(prevContent, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power3.inOut",
          });
        }
        if (prevIcon) {
          gsap.to(prevIcon, { rotate: 0, duration: 0.25, ease: "power2.out" });
        }
      }

      setOpenIndex(idx);
      requestAnimationFrame(() => {
        const el = contentRefs.current[idx];
        if (el) {
          gsap.set(el, { height: "auto", opacity: 1 });
          const h = el.offsetHeight;
          gsap.set(el, { height: 0, opacity: 0 });
          gsap.to(el, {
            height: h,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        }
        if (icon) {
          gsap.to(icon, { rotate: 45, duration: 0.3, ease: "power2.out" });
        }
      });
    }
  };

  return (
    <section ref={sectionRef} id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="anim-header mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-theme-accent">
            FAQ
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-theme-text md:text-5xl">
            Got <span className="text-theme-accent">questions?</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl border border-theme-border bg-theme-surface transition-colors hover:border-theme-accent/30"
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="pr-4 text-base font-medium text-theme-text">
                  {faq.q}
                </span>
                <span
                  ref={(el) => { iconRefs.current[i] = el; }}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-theme-surface-alt text-lg text-theme-accent transition-colors"
                >
                  +
                </span>
              </button>
              <div
                ref={(el) => { contentRefs.current[i] = el; }}
                className="h-0 overflow-hidden opacity-0"
              >
                <div className="border-t border-theme-border px-6 py-5">
                  <p className="text-base leading-relaxed text-theme-text-muted">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
