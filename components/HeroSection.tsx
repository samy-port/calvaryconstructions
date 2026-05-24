"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";
import Image from "next/image";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Notify preloader that assets are loaded
    window.dispatchEvent(
      new CustomEvent("hero-progress", { detail: { percent: 100 } })
    );

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Parallax scroll effect on the background image
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 2. Entrance animation on page load (starts after preloader exits around 2.0s)
      if (contentRef.current) {
        const elements = contentRef.current.children;
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            stagger: 0.2,
            ease: "power3.out",
            delay: 1.8, // delay to sync with preloader exit
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleQuoteClick = () => {
    window.dispatchEvent(new CustomEvent("open-consultation"));
  };

  const handleProjectsClick = () => {
    const target = document.getElementById("services");
    const lenis = getLenis();
    if (lenis && target) {
      lenis.scrollTo(target, { duration: 1.5 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-[#17130F] flex items-center justify-center"
      aria-label="Hero"
    >
      {/* Background Image Wrapper for Parallax */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 will-change-transform"
      >
        <Image
          src="/images/private-mansion.png"
          alt="Calvary Constructions Estate"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-50"
        />
        {/* Dark overlay gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(180deg, rgba(23,19,15,0.4) 0%, rgba(23,19,15,0.2) 40%, rgba(23,19,15,0.5) 100%),
              linear-gradient(90deg, rgba(23,19,15,0.3) 0%, transparent 30%, transparent 70%, rgba(23,19,15,0.3) 100%)
            `,
          }}
        />
      </div>

      {/* Golden radial bloom */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,169,106,0.18) 0%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 md:px-12 max-w-4xl flex flex-col items-center gap-6"
      >
        {/* Company Label */}
        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[var(--champagne)] font-semibold">
          Building Strong Foundations
        </span>

        {/* Headline */}
        <h1
          className="font-display font-bold uppercase leading-[0.9] text-white tracking-tighter"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)" }}
        >
          Calvary <br />
          <span className="font-editorial italic font-normal text-[var(--champagne)] normal-case tracking-normal">
            Constructions.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="font-sans font-light text-white/80 max-w-2xl leading-relaxed text-lg md:text-2xl">
          Your Dream is Our Reality
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <button
            onClick={handleQuoteClick}
            className="px-8 py-3.5 bg-[var(--champagne)] border border-[var(--champagne)] text-[#17130F] text-[11px] uppercase tracking-widest font-semibold rounded-full hover:bg-transparent hover:text-white transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97]"
          >
            Get a Free Quote
          </button>
          <button
            onClick={handleProjectsClick}
            className="px-8 py-3.5 border border-white/40 bg-transparent text-white text-[11px] uppercase tracking-widest font-semibold rounded-full hover:bg-white hover:text-[#17130F] hover:border-white transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97]"
          >
            View Our Services
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-60 pointer-events-none">
        <span
          className="uppercase font-medium text-white"
          style={{ fontSize: "0.5625rem", letterSpacing: "0.3em" }}
        >
          Scroll to explore
        </span>
        <div className="w-[1px] h-10 relative overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-0 left-0 w-full h-full bg-white/45"
            style={{ animation: "heroScrollPulse 2.4s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes heroScrollPulse {
          0%, 100% { transform: scaleY(0.2); opacity: 0.2; transform-origin: top; }
          50% { transform: scaleY(1); opacity: 0.6; transform-origin: top; }
        }
      `}</style>
    </section>
  );
}
