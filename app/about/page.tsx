"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { initLenis, destroyLenis } from "@/lib/lenis";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import FloatingNav from "@/components/FloatingNav";
import ContactSection from "@/components/ContactSection";
import AtmosphereLayer from "@/components/AtmosphereLayer";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    /* Initialize Lenis smooth scroll */
    const lenis = initLenis();
    let lenisRaf: ((time: number) => void) | null = null;

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      lenisRaf = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);
    }

    /* GSAP Animations for Hero Scroll Parallax */
    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.fromTo(
          heroTextRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.6, ease: "power4.out" }
        );

        gsap.to(heroTextRef.current, {
          yPercent: 30,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* Reveal for Section Headers */
      const fadeUpElements = gsap.utils.toArray(".fade-up-in");
      fadeUpElements.forEach((el: any) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, mainRef);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad, { once: true });
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 800);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener("load", onLoad);
      if (lenisRaf) gsap.ticker.remove(lenisRaf);
      destroyLenis();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Preloader />
      <FloatingNav />

      <main ref={mainRef} id="main-content" role="main" className="overflow-hidden">
        {/* Hero Section (Dark & Dramatic Theme) */}
        <section
          ref={heroRef}
          id="hero"
          className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#17130F]"
        >
          {/* Subtle Atmosphere Layer */}
          <AtmosphereLayer type="dust" opacity={0.15} speed={0.3} />
          <AtmosphereLayer type="bloom" opacity={0.1} speed={0.15} blendMode="soft-light" />

          {/* Golden radial light */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(200,169,106,0.08) 0%, transparent 80%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[var(--champagne)] mb-8 block font-medium">
              Calvary Constructions
            </span>
            <h1
              ref={heroTextRef}
              className="font-display font-bold uppercase tracking-tight text-white leading-[0.9] text-[clamp(2.8rem,7vw,7.5rem)] max-w-4xl mx-auto"
            >
              Building Excellence <br />
              <span className="font-editorial italic font-normal text-[var(--champagne)] normal-case tracking-normal">
                Through Experience
              </span>
            </h1>
            <div className="w-16 h-[1px] bg-[var(--champagne)]/40 mx-auto mt-12 mb-8" />
            <p className="text-[13px] md:text-sm uppercase tracking-[0.25em] text-white/50 max-w-md mx-auto leading-relaxed">
              Crafting lasting structures with safety, precision, and design integrity.
            </p>
          </div>

          {/* Bottom frame decor */}
          <div className="absolute bottom-8 left-12 right-12 hidden md:flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-white/30">
            <span>Precision Engineering</span>
            <span>Est. 1991</span>
            <span>Exceptional Standards</span>
          </div>
        </section>

        {/* Narrative & Overview Section (Warm Cream) */}
        <section
          id="narrative"
          className="relative py-24 md:py-36 bg-[var(--background)] border-t border-[rgba(138,106,62,0.1)]"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left text column */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <span className="text-section-label tracking-widest text-muted-ink uppercase flex items-center gap-4 mb-8">
                  <span className="w-8 h-[1px] bg-stone"></span>
                  Who We Are
                </span>
                <h2 className="font-display font-bold uppercase text-[clamp(1.5rem,3vw,2.625rem)] leading-[0.95] tracking-tighter text-[var(--ink)] mb-8">
                  A TRUSTED PARTNER FOR MODERN INFRASTRUCTURE
                </h2>
                <p className="font-editorial italic text-xl md:text-2xl text-[var(--bronze)] leading-relaxed font-light">
                  We translate complex architectural visions into physical realities that stand the test of time.
                </p>
              </div>

              {/* Right text column */}
              <div className="lg:col-span-7 space-y-8 text-base md:text-lg text-[var(--muted-ink)] font-light leading-relaxed pt-2 lg:pt-16">
                <p>
                  At Calvary Constructions, we specialize in delivering reliable and cost-effective construction
                  services tailored to client needs. With years of industry experience, we combine engineering
                  expertise, skilled craftsmanship, and innovative construction methods to create lasting structures.
                </p>
                <p>
                  Our commitment to quality, transparency, and customer satisfaction has made us a trusted name in the
                  construction industry. From minor renovations to major commercial landmarks and industrial structures,
                  we oversee every project with a dedicated approach to safety and quality control.
                </p>
                <p>
                  We collaborate closely with developers, structural consultants, and project managers to streamline
                  timelines, optimize budgets, and guarantee that we exceed standard expectations. Our projects are
                  milestones of reliability and state-of-the-art building science.
                </p>

                {/* Stat block */}
                <div className="grid grid-cols-3 gap-6 pt-12 border-t border-[var(--stone)]/30">
                  <div>
                    <h4 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">140+</h4>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--muted-ink)] mt-1">
                      Projects Completed
                    </p>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">100%</h4>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--muted-ink)] mt-1">
                      Safety Record
                    </p>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">35+</h4>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--muted-ink)] mt-1">
                      Years of Service
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section (Cream Surface) */}
        <section
          id="mission-vision"
          className="relative py-20 md:py-32 bg-[var(--surface)] border-t border-b border-[rgba(138,106,62,0.1)]"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Mission Card */}
              <div className="fade-up-in p-8 md:p-14 rounded-2xl border border-[var(--stone)]/40 bg-[var(--background)] flex flex-col justify-between min-h-[350px] shadow-sm relative overflow-hidden group hover:border-[var(--champagne)]/60 transition-all duration-500">
                <div className="absolute top-0 right-0 p-6 opacity-5 font-display font-bold text-8xl md:text-9xl pointer-events-none select-none text-[var(--ink)] group-hover:opacity-10 transition-opacity duration-500">
                  M
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--champagne)] font-semibold block mb-6">
                    Our Core Purpose
                  </span>
                  <h3 className="font-display font-bold uppercase text-2xl md:text-3xl text-[var(--ink)] mb-6">
                    Our Mission
                  </h3>
                  <p className="font-editorial italic text-xl md:text-2xl text-[var(--muted-ink)] leading-relaxed">
                    {"To provide exceptional construction services through innovation, integrity, and commitment to quality."}
                  </p>
                </div>
                <div className="w-12 h-[1px] bg-[var(--stone)] group-hover:w-20 transition-all duration-500 mt-8" />
              </div>

              {/* Vision Card */}
              <div className="fade-up-in p-8 md:p-14 rounded-2xl border border-[var(--stone)]/40 bg-[var(--background)] flex flex-col justify-between min-h-[350px] shadow-sm relative overflow-hidden group hover:border-[var(--champagne)]/60 transition-all duration-500">
                <div className="absolute top-0 right-0 p-6 opacity-5 font-display font-bold text-8xl md:text-9xl pointer-events-none select-none text-[var(--ink)] group-hover:opacity-10 transition-opacity duration-500">
                  V
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--champagne)] font-semibold block mb-6">
                    Our Future Target
                  </span>
                  <h3 className="font-display font-bold uppercase text-2xl md:text-3xl text-[var(--ink)] mb-6">
                    Our Vision
                  </h3>
                  <p className="font-editorial italic text-xl md:text-2xl text-[var(--muted-ink)] leading-relaxed">
                    {"To become a leading construction company known for reliability, safety, and sustainable building practices."}
                  </p>
                </div>
                <div className="w-12 h-[1px] bg-[var(--stone)] group-hover:w-20 transition-all duration-500 mt-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section (Warm Cream) */}
        <section id="values" className="relative py-24 md:py-36 bg-[var(--background)]">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
              <span className="text-section-label tracking-widest text-muted-ink uppercase flex items-center justify-center gap-4 mb-6">
                <span className="w-8 h-[1px] bg-stone"></span>
                Foundational Principles
                <span className="w-8 h-[1px] bg-stone"></span>
              </span>
              <h2 className="font-display font-bold uppercase text-[clamp(2.2rem,4.5vw,4rem)] leading-[0.95] tracking-tighter text-[var(--ink)]">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Value 1: Quality */}
              <div className="fade-up-in p-8 rounded-2xl border border-[var(--stone)]/30 bg-[var(--surface)] hover:scale-[1.02] hover:shadow-md transition-all duration-500 flex flex-col justify-between min-h-[260px]">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[rgba(200,169,106,0.12)] flex items-center justify-center mb-6">
                    <span className="font-editorial italic text-[var(--bronze)] font-bold text-base">Q</span>
                  </div>
                  <h3 className="font-display font-bold uppercase text-lg text-[var(--ink)] mb-3 tracking-tight">
                    Quality
                  </h3>
                  <p className="text-sm text-[var(--muted-ink)] font-light leading-relaxed">
                    We set the highest standards of materials and craftsmanship, ensuring structures are durable, safe, and timeless.
                  </p>
                </div>
              </div>

              {/* Value 2: Integrity */}
              <div className="fade-up-in p-8 rounded-2xl border border-[var(--stone)]/30 bg-[var(--surface)] hover:scale-[1.02] hover:shadow-md transition-all duration-500 flex flex-col justify-between min-h-[260px]">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[rgba(200,169,106,0.12)] flex items-center justify-center mb-6">
                    <span className="font-editorial italic text-[var(--bronze)] font-bold text-base">I</span>
                  </div>
                  <h3 className="font-display font-bold uppercase text-lg text-[var(--ink)] mb-3 tracking-tight">
                    Integrity
                  </h3>
                  <p className="text-sm text-[var(--muted-ink)] font-light leading-relaxed">
                    Transparency, honesty, and ethical practices guide every project, budget assessment, and client relationship.
                  </p>
                </div>
              </div>

              {/* Value 3: Safety */}
              <div className="fade-up-in p-8 rounded-2xl border border-[var(--stone)]/30 bg-[var(--surface)] hover:scale-[1.02] hover:shadow-md transition-all duration-500 flex flex-col justify-between min-h-[260px]">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[rgba(200,169,106,0.12)] flex items-center justify-center mb-6">
                    <span className="font-editorial italic text-[var(--bronze)] font-bold text-base">S</span>
                  </div>
                  <h3 className="font-display font-bold uppercase text-lg text-[var(--ink)] mb-3 tracking-tight">
                    Safety
                  </h3>
                  <p className="text-sm text-[var(--muted-ink)] font-light leading-relaxed">
                    We foster a safety-first culture on all job sites to protect our valued workforce, clients, and community.
                  </p>
                </div>
              </div>

              {/* Value 4: Innovation */}
              <div className="fade-up-in p-8 rounded-2xl border border-[var(--stone)]/30 bg-[var(--surface)] hover:scale-[1.02] hover:shadow-md transition-all duration-500 flex flex-col justify-between min-h-[260px] md:col-span-1 lg:col-span-1">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[rgba(200,169,106,0.12)] flex items-center justify-center mb-6">
                    <span className="font-editorial italic text-[var(--bronze)] font-bold text-base">N</span>
                  </div>
                  <h3 className="font-display font-bold uppercase text-lg text-[var(--ink)] mb-3 tracking-tight">
                    Innovation
                  </h3>
                  <p className="text-sm text-[var(--muted-ink)] font-light leading-relaxed">
                    Employing modern engineering techniques, sustainable building practices, and state-of-the-art materials.
                  </p>
                </div>
              </div>

              {/* Value 5: Customer Satisfaction */}
              <div className="fade-up-in p-8 rounded-2xl border border-[var(--stone)]/30 bg-[var(--surface)] hover:scale-[1.02] hover:shadow-md transition-all duration-500 flex flex-col justify-between min-h-[260px] md:col-span-2 lg:col-span-2">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[rgba(200,169,106,0.12)] flex items-center justify-center mb-6">
                    <span className="font-editorial italic text-[var(--bronze)] font-bold text-base">C</span>
                  </div>
                  <h3 className="font-display font-bold uppercase text-lg text-[var(--ink)] mb-3 tracking-tight">
                    Customer Satisfaction
                  </h3>
                  <p className="text-sm text-[var(--muted-ink)] font-light leading-relaxed">
                    Collaborating closely with client partners to bring their concepts to life exactly as envisioned, managing risks and delivering quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <ContactSection />
      </main>
    </>
  );
}
