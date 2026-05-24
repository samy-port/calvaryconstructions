"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const MANIFESTO_STATEMENTS: { text: ReactNode; highlight: boolean }[] = [
  { text: "Who We Are", highlight: true },
  { text: "At Calvary Constructions, we specialize in delivering reliable and cost-effective construction services tailored to client needs.", highlight: false },
  {
    text: (
      <span>
        With <span className="font-bold text-[var(--ink)]">35+ years of industry expertise</span>, skilled craftsmanship, and innovative construction methods, we create lasting structures.
      </span>
    ),
    highlight: false,
  },
  { text: "Our commitment to quality, transparency, and customer satisfaction makes us a trusted partner in the industry.", highlight: true },
];

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".manifesto-line", section);

      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative py-24 md:py-36 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--surface)" }}
      aria-label="About Preview"
    >
      {/* Static ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle 800px at 50% 50%, rgba(200,169,106,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Section label */}
      <div className="mb-16 text-center">
        <span
          className="uppercase font-medium block text-center text-section-label"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.2em",
            color: "var(--muted-ink)",
            opacity: 0.6,
          }}
        >
          Company Slogan
        </span>
        <div className="w-8 h-[1px] mx-auto mt-3" style={{ backgroundColor: "var(--champagne)", opacity: 0.5 }} />
      </div>

      {/* Manifesto lines */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-16">
        <div className="flex flex-col gap-10 md:gap-14 items-center text-center">
          {MANIFESTO_STATEMENTS.map((item, itemIdx) => {
            // For the label "Who We Are", make it a smaller subtitle; for others make it body
            if (itemIdx === 0) {
              return (
                <div key={itemIdx} className="manifesto-line opacity-100 md:opacity-0">
                  <h2
                    className="font-display uppercase font-bold text-[clamp(2rem,3.5vw,3rem)] text-[var(--ink)] tracking-tighter"
                  >
                    {item.text}
                  </h2>
                </div>
              );
            }

            return (
              <div key={itemIdx} className="manifesto-line opacity-100 md:opacity-0 max-w-3xl">
                <p
                  className={item.highlight ? "font-editorial" : "font-sans"}
                  style={{
                    fontSize: item.highlight ? "clamp(1.5rem, 3vw, 2.3rem)" : "clamp(1.1rem, 2vw, 1.35rem)",
                    lineHeight: 1.5,
                    fontWeight: item.highlight ? 400 : 300,
                    fontStyle: item.highlight ? "italic" : "normal",
                    color: item.highlight ? "var(--bronze)" : "var(--muted-ink)",
                    margin: "0 auto",
                  }}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] z-20"
        style={{ backgroundColor: "var(--stone)", opacity: 0.15 }}
        aria-hidden="true"
      />
    </section>
  );
}
