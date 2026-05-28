"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, isMobile } from "@/lib/utils";

interface CraftItem {
  title: string;
  copy: string;
}

const CRAFT_ITEMS: CraftItem[] = [
  { title: "Foundation", copy: "Built for generations." },
  { title: "Steel", copy: "Uncompromising strength." },
  { title: "Concrete", copy: "Sleek, fluid, permanent." },
  { title: "Precision", copy: "Every millimeter accounted for." },
];

export default function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    const section = sectionRef.current;
    
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".craft-item") as HTMLElement[];
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%", // 4 full screens of scrolling for the sequence
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Slow zoom in on the background image throughout the entire scroll sequence
      tl.to(".craft-bg-image", {
        scale: 1.15,
        yPercent: 4,
        xPercent: -2,
        ease: "none",
        duration: items.length * 3.5,
      }, 0);
      
      items.forEach((item, i) => {
        tl.fromTo(
          item, 
          { opacity: 0, scale: 0.8, y: 100 }, 
          { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power2.out" }
        )
        .to(
          item, 
          { opacity: 0, scale: 1.1, y: -100, duration: 1.5, ease: "power2.in" }, 
          "+=0.5"
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="craft"
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
      aria-label="Craft — Obsession Made Physical"
    >
      {/* Soft luxury gradient to give depth without going full black */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none" 
        style={{ background: "radial-gradient(circle at center, transparent 40%, rgba(200, 190, 175, 0.2) 100%)" }}
      />

      {/* Parallax Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/craft/blueprint-detail.webp"
          alt="Calvary Constructions Craft Details Blueprint"
          fill
          sizes="100vw"
          priority
          className="craft-bg-image object-cover brightness-[0.92] contrast-[0.98] will-change-transform"
        />
      </div>

      {/* Foreground Typography */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        {CRAFT_ITEMS.map((item, i) => (
          <div
            key={item.title}
            className="craft-item absolute flex flex-col items-center justify-center text-center opacity-0"
            style={{ width: "100%", padding: "0 2rem" }}
          >
            <h3
              className="font-display animate-float"
              style={{
                fontSize: "clamp(5rem, 14vw, 18rem)",
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
                fontWeight: 700,
                color: "var(--ink)",
                textShadow: "0 10px 40px rgba(255,255,255,0.7)"
              }}
            >
              {item.title}
            </h3>
            <p
              className="mt-8 font-editorial"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                color: "var(--muted-ink)",
                fontStyle: "italic",
                textShadow: "0 4px 20px rgba(255,255,255,0.8)"
              }}
            >
              {item.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
