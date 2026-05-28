"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";

const USP_STATEMENTS = [
  {
    number: "01",
    subtitle: "UNCOMPROMISING QUALITY",
    title: "Building Trust with Quality Work",
    description: "Every brick laid and beam raised reflects our dedication to durable construction, creating enduring partnerships built on integrity.",
  },
  {
    number: "02",
    subtitle: "CUSTOM ARCHITECTURE",
    title: "Constructing Dreams into Reality",
    description: "We translate complex blueprints and unique client visions into spectacular physical structures, showing dedication in every detail.",
  },
  {
    number: "03",
    subtitle: "STRUCTURAL INTEGRITY",
    title: "Strong Foundations, Strong Future",
    description: "Our engineered solutions prioritize longevity and safety, ensuring that every project stands resilient for future generations.",
  },
  {
    number: "04",
    subtitle: "TIMELY DELIVERY",
    title: "Quality Construction, Delivered On Time",
    description: "With meticulous project scheduling and streamlined operations, we deliver projects strictly on schedule without ever cutting corners.",
  },
  {
    number: "05",
    subtitle: "TECHNICAL EXCELLENCE",
    title: "Engineering Excellence in Every Project",
    description: "From custom private villas to enterprise complexes, we bring state-of-the-art engineering methodology and rigorous safety controls.",
  }
];

export default function UniquenessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).uniquenessTimeline = gsap.timeline({ paused: true, repeat: -1 });
    }
    
    const handleScroll = () => {
      hasScrolledRef.current = true;
      window.removeEventListener("scroll", handleScroll);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    setIsMounted(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (prefersReducedMotion()) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop animations
      mm.add("(min-width: 768px)", () => {
        const tl = (window as any).uniquenessTimeline || gsap.timeline({ paused: true, repeat: -1 });
        
        let isLocked = false;

        tl.paused(true);
        tl.repeat(-1); // Infinite loop

        // Use standard GSAP event callback for repeat to unlock scroll reliably
        tl.eventCallback("onRepeat", () => {
          const lenis = getLenis();
          if (lenis) {
            lenis.start();
          }
          isLocked = false;
        });

        // Explicitly set initial states at time 0 to reset slides correctly on repeat
        tl.set(".uniqueness-slide-1", { opacity: 1, y: 0 }, 0)
          .set([".uniqueness-slide-2", ".uniqueness-slide-3", ".uniqueness-slide-4", ".uniqueness-slide-5"], { opacity: 0, y: 40 }, 0)
          .set(".uniqueness-image-wrapper img", { scale: 1.0, xPercent: 0, yPercent: 0 }, 0);

        // Absolute positioned slide animations to guarantee synchronization regardless of mount order
        // Slide 1 to 2 transition
        tl.to(".uniqueness-slide-1", { opacity: 0, y: -40, duration: 0.4, ease: "power2.inOut" }, 1.0)
          .fromTo(".uniqueness-slide-2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.inOut" }, 1.2)
          .to(".uniqueness-image-wrapper img", { scale: 1.08, xPercent: 3, yPercent: -2, duration: 0.8, ease: "power2.inOut" }, 1.0)
          
        // Slide 2 to 3 transition
        tl.to(".uniqueness-slide-2", { opacity: 0, y: -40, duration: 0.4, ease: "power2.inOut" }, 3.2)
          .fromTo(".uniqueness-slide-3", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.inOut" }, 3.4)
          .to(".uniqueness-image-wrapper img", { scale: 1.15, xPercent: -3, yPercent: 1, duration: 0.8, ease: "power2.inOut" }, 3.2)
          
        // Slide 3 to 4 transition
        tl.to(".uniqueness-slide-3", { opacity: 0, y: -40, duration: 0.4, ease: "power2.inOut" }, 5.4)
          .fromTo(".uniqueness-slide-4", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.inOut" }, 5.6)
          .to(".uniqueness-image-wrapper img", { scale: 1.1, xPercent: 2, yPercent: -3, duration: 0.8, ease: "power2.inOut" }, 5.4)
          
        // Slide 4 to 5 transition
        tl.to(".uniqueness-slide-4", { opacity: 0, y: -40, duration: 0.4, ease: "power2.inOut" }, 7.6)
          .fromTo(".uniqueness-slide-5", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.inOut" }, 7.8)
          .to(".uniqueness-image-wrapper img", { scale: 1.18, xPercent: -2, yPercent: -1, duration: 0.8, ease: "power2.inOut" }, 7.6)

        // Slide 5 back to 1 transition (Loop Transition)
        tl.to(".uniqueness-slide-5", { opacity: 0, y: -40, duration: 0.4, ease: "power2.inOut" }, 9.8)
          .fromTo(".uniqueness-slide-1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.inOut" }, 10.0)
          .to(".uniqueness-image-wrapper img", { scale: 1.0, xPercent: 0, yPercent: 0, duration: 0.8, ease: "power2.inOut" }, 9.8)

        // Hold Slide 1 at the end of loop until 11.0s repeat point
        tl.to({}, { duration: 0.6 }, 10.4);

        // ScrollTrigger to manage pinning, scroll locking, and automated playback
        ScrollTrigger.create({
          trigger: "#uniqueness",
          start: "top top",
          end: "+=200",
          pin: false,
          invalidateOnRefresh: true,
          onEnter: () => {
            // Guard: Only snap/lock if the section's actual DOM element is aligned near the top of the viewport
            const rect = container.getBoundingClientRect();
            if (Math.abs(rect.top) > 50) return;

            if (!isLocked) {
              isLocked = true;
              const lenis = getLenis();
              if (lenis) {
                lenis.scrollTo("#uniqueness", {
                  immediate: true,
                  onComplete: () => {
                    lenis.stop();
                    tl.play(0);
                  }
                });
              } else {
                tl.play(0);
              }
            }
          },
          onLeaveBack: () => {
            // Reset to beginning when scrolling back up
            tl.pause(0);
            isLocked = false;
            // Reset styles to default
            gsap.set(".uniqueness-slide-1", { opacity: 1, y: 0 });
            gsap.set([".uniqueness-slide-2", ".uniqueness-slide-3", ".uniqueness-slide-4", ".uniqueness-slide-5"], { opacity: 0, y: 40 });
          }
        });
      });

      // Mobile animations
      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".mobile-usp-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              }
            }
          );
        });
      });
    }, container);

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <section
      ref={containerRef}
      id="uniqueness"
      className="relative w-full overflow-hidden bg-[var(--background)] h-auto md:h-screen"
    >
      {/* Desktop Layout (Pinned Split-Screen, full viewport height) - Hidden on Mobile */}
      <div className="hidden md:flex w-full h-full relative z-10 items-center justify-between">
        
        {/* Left Column: Fixed Luxury Image with Parallax & Ken Burns Effect */}
        <div className="w-1/2 h-full relative overflow-hidden bg-transparent uniqueness-image-wrapper">
          <Image
            src="/images/projects/villa-01.webp"
            alt="Calvary Constructions Uniqueness Architecture"
            fill
            sizes="50vw"
            priority
            className="object-cover brightness-[0.85] contrast-[1.05] will-change-transform"
          />
          {/* Subtle light vignette/gradient overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-multiply" 
            style={{
              background: "radial-gradient(circle at center, transparent 20%, var(--background) 80%)"
            }}
          />
        </div>

        {/* Right Column: Stacked USP text slides */}
        <div className="w-1/2 h-full flex flex-col justify-center relative pl-12 pr-24 xl:pr-36">
          
          {/* Persistent Section Header */}
          <div className="mb-10 select-none">
            <p className="text-section-label tracking-widest text-muted-ink uppercase flex items-center gap-4 mb-3">
              <span className="w-12 h-[1px] bg-stone"></span>
              Our Uniqueness
            </p>
            <h2 className="font-display font-bold uppercase text-[clamp(2.2rem,3vw,3rem)] leading-[0.95] tracking-tighter text-[var(--ink)]">
              Our Pillars of Action
            </h2>
          </div>

          {/* Slides container (exactly aligned, absolute stacking) */}
          <div className="relative w-full h-[320px]">
            {USP_STATEMENTS.map((item, idx) => (
              <div
                key={idx}
                className={`uniqueness-slide uniqueness-slide-${idx + 1} absolute inset-0 flex flex-col justify-start ${
                  idx === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-editorial italic text-3xl font-semibold text-[var(--champagne)]">
                    {item.number}
                  </span>
                  <span className="text-[10px] tracking-[0.25em] font-semibold text-[var(--muted-ink)] uppercase">
                    {item.subtitle}
                  </span>
                </div>
                <h3 className="font-display font-bold uppercase text-2xl lg:text-3xl text-[var(--ink)] tracking-tight mb-4 leading-snug">
                  {item.title}
                </h3>
                <p className="text-base text-[var(--muted-ink)] font-light leading-relaxed max-w-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Mobile Layout (Standard Scrollable Cards list) - Hidden on Desktop */}
      <div className="block md:hidden max-w-6xl mx-auto px-6 py-20 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-section-label tracking-widest text-muted-ink uppercase flex items-center gap-4 mb-4">
            <span className="w-12 h-[1px] bg-stone"></span>
            Our Uniqueness
          </p>
          <h2 className="font-display font-bold uppercase text-[2.2rem] leading-[0.95] tracking-tighter text-[var(--ink)]">
            Our Pillars of Action
          </h2>
        </div>

        {/* Stacked cards list */}
        <div className="space-y-12">
          {USP_STATEMENTS.map((item, idx) => (
            <div 
              key={idx}
              className="mobile-usp-card border-b border-[var(--stone)]/20 pb-10"
            >
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-editorial italic text-2xl font-semibold text-[var(--champagne)]">
                  {item.number}
                </span>
                <span className="text-[9px] tracking-[0.2em] font-semibold text-[var(--muted-ink)] uppercase">
                  {item.subtitle}
                </span>
              </div>
              <h3 className="font-display font-bold uppercase text-xl text-[var(--ink)] tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--muted-ink)] font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
