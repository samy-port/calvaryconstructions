"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { initLenis, destroyLenis } from "@/lib/lenis";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import FloatingNav from "@/components/FloatingNav";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import ServicesSection from "@/components/ServicesSection";
import UniquenessSection from "@/components/UniquenessSection";
import SpecialisationSection from "@/components/SpecialisationSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import OnGoingProjectsSection from "@/components/OnGoingProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    /* Initialize Lenis smooth scroll */
    const lenis = initLenis();
    let lenisRaf: ((time: number) => void) | null = null;

    if (lenis) {
      /* Sync Lenis with GSAP ScrollTrigger */
      lenis.on("scroll", ScrollTrigger.update);

      lenisRaf = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);
    }

    /* Refresh ScrollTrigger after layout settles */
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad, { once: true });
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 800);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener("load", onLoad);
      if (lenisRaf) gsap.ticker.remove(lenisRaf);
      destroyLenis();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Preloader />
      <FloatingNav />
      <main ref={mainRef} id="main-content" role="main">
        <HeroSection />
        <ManifestoSection />
        <ServicesSection />
        <UniquenessSection />
        <SpecialisationSection />
        <WhyChooseUsSection />
        <OnGoingProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}

