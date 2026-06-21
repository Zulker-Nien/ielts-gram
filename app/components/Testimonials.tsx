"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/app/store/useStore";
import { t } from "@/app/store/translations";

gsap.registerPlugin(ScrollTrigger);

const imageCount = 23;
const imagesPerPage = 3;
const totalPages = Math.ceil(imageCount / imagesPerPage);
const autoplayInterval = 4000;

export default function Testimonials() {
  const lang = useStore((s) => s.lang);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const currentPage = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slideTo = (target: number) => {
    currentPage.current = target;
    setPage(target);
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: -target * 100 + "%",
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  const goTo = (idx: number) => {
    resetAutoplay();
    slideTo(idx);
    startAutoplay();
  };

  const next = () => {
    slideTo((currentPage.current + 1) % totalPages);
  };

  const resetAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAutoplay = () => {
    resetAutoplay();
    timerRef.current = setInterval(next, autoplayInterval);
  };

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAutoplay();
          } else {
            resetAutoplay();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      ctx.revert();
      resetAutoplay();
      observer.disconnect();
    };
  }, []);

  const pages = Array.from({ length: totalPages }, (_, p) => (
    <div key={p} className="flex min-w-full shrink-0 gap-6">
      {Array.from({ length: imagesPerPage }, (_, i) => {
        const idx = p * imagesPerPage + i + 1;
        if (idx > imageCount) return null;
        return (
          <div key={idx} className="relative flex-1 overflow-hidden rounded-2xl border border-theme-border bg-theme-surface h-120">
            <Image
              src={`/Testimony/${idx}.webp`}
              alt={`Testimonial ${idx}`}
              width={400}
              height={500}
              className="h-full w-full object-contain"
            />
          </div>
        );
      })}
    </div>
  ));

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="anim-header mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-theme-accent">
            {t.testimonials.badge[lang]}
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-theme-text md:text-5xl">
            {t.testimonials.title[lang]} <span className="text-theme-accent">{t.testimonials.titleHighlight[lang]}</span>
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <div ref={trackRef} className="flex">
            {pages}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`size-2 rounded-full transition-all ${
                i === page ? "w-8 bg-theme-accent" : "bg-theme-border hover:bg-theme-text-muted"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
