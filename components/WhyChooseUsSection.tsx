"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const WHY_CHOOSE_US = [
  {
    id: "team",
    number: "01",
    title: "Experienced Team",
    description: "Engineers, craftsmen, and supervisors with decades of collective industry experience.",
  },
  {
    id: "delivery",
    number: "02",
    title: "On-Time Delivery",
    description: "Strict timeline management and optimized scheduling to deliver projects precisely as promised.",
  },
  {
    id: "materials",
    number: "03",
    title: "Premium Materials",
    description: "Sourcing only premium-grade materials to guarantee structural longevity and aesthetic excellence.",
  },
  {
    id: "pricing",
    number: "04",
    title: "Transparent Pricing",
    description: "Clear, honest, and detailed budgeting with zero hidden costs or surprise additions.",
  },
  {
    id: "safety",
    number: "05",
    title: "Safety-First Approach",
    description: "Adhering to rigorous safety protocols and global regulatory standards on every work site.",
  },
  {
    id: "service",
    number: "06",
    title: "Customer-Centric Service",
    description: "Dedicated account management and regular milestones updates to ensure alignment at every stage.",
  }
];

export default function WhyChooseUsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".amenity-card", container);
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="why-choose-us" 
      className="w-full relative overflow-hidden"
      style={{ backgroundColor: "var(--surface)" }}
    >
      {/* Subtle radial ambient light */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: "radial-gradient(circle 600px at 80% 20%, rgba(200, 169, 106, 0.05) 0%, transparent 60%)" }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-36 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <p className="text-section-label tracking-widest text-muted-ink uppercase flex items-center gap-4 mb-4">
            <span className="w-12 h-[1px] bg-stone"></span>
            Why Choose Us
          </p>
          <h2 className="font-display font-bold uppercase text-[clamp(2.2rem,4vw,3.5rem)] leading-[0.95] tracking-tighter text-[var(--ink)]">
            Our Pillars of Excellence
          </h2>
          <p className="mt-6 text-[var(--muted-ink)] font-sans font-light text-base md:text-lg leading-relaxed max-w-xl">
            We hold ourselves to the highest standards, combining robust building technology, safety assurance, and transparency to deliver exceptional results.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {WHY_CHOOSE_US.map((item) => (
            <div 
              key={item.id}
              className="amenity-card opacity-100 md:opacity-0 p-8 md:p-10 rounded-2xl border border-[var(--stone)]/30 bg-[var(--background)] hover:bg-[var(--ink)] hover:border-[var(--champagne)]/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between min-h-[220px] group cursor-default"
            >
              <div>
                <div className="flex justify-between items-baseline mb-6">
                  <h3 className="font-display font-bold uppercase text-lg text-[var(--ink)] group-hover:text-[var(--surface)] transition-colors duration-500 tracking-tight">
                    {item.title}
                  </h3>
                  <span className="font-editorial italic text-2xl text-[var(--champagne)]/60 group-hover:text-[var(--champagne)] transition-colors duration-500 font-semibold">
                     {item.number}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-ink)] group-hover:text-[var(--background)] group-hover:opacity-90 transition-all duration-500 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
