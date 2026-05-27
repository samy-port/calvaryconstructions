"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const SPECIALISATIONS = [
  {
    title: "Infrastructure Sector",
    image: "/images/specialisation/infrastructure.jpg",
    link: "#contact"
  },
  {
    title: "Industrial Sector",
    image: "/images/specialisation/industrial.jpg",
    link: "#contact"
  },
  {
    title: "Educational Sector",
    image: "/images/specialisation/educational.jpg",
    link: "#contact"
  },
  {
    title: "Power Sector",
    image: "/images/specialisation/power.jpg",
    link: "#contact"
  },
  {
    title: "Dams",
    image: "/images/specialisation/dams.jpg",
    link: "#contact"
  },
  {
    title: "Bridges",
    image: "/images/specialisation/bridges.jpg",
    link: "#contact"
  },
  {
    title: "Jetty",
    image: "/images/specialisation/jetty.jpg",
    link: "#contact"
  }
];

export default function SpecialisationSection() {
  const [visibleCards, setVisibleCards] = useState(3);
  
  // We duplicate the items 3 times for a seamless infinite loop
  const extendedItems = [
    ...SPECIALISATIONS,
    ...SPECIALISATIONS,
    ...SPECIALISATIONS
  ];

  // We start at the beginning of the middle set
  const [currentIndex, setCurrentIndex] = useState(SPECIALISATIONS.length);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay loop
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3500); // slide every 3.5 seconds

    return () => clearInterval(interval);
  }, [isHovered, currentIndex]);

  const handleNext = () => {
    setIsTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitionEnabled(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    // If we've scrolled into the third set (e.g. past index 13)
    if (currentIndex >= SPECIALISATIONS.length * 2) {
      setIsTransitionEnabled(false);
      setCurrentIndex(currentIndex - SPECIALISATIONS.length);
    }
    // If we've scrolled into the first set (e.g. below index 7)
    else if (currentIndex < SPECIALISATIONS.length) {
      setIsTransitionEnabled(false);
      setCurrentIndex(currentIndex + SPECIALISATIONS.length);
    }
  };

  return (
    <section
      id="specialisation"
      className="w-full py-20 md:py-28 bg-[var(--surface)] border-t border-[rgba(138,106,62,0.15)] border-b border-[rgba(138,106,62,0.15)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mb-16">
          <span className="font-display text-xs font-semibold tracking-[0.25em] text-[#8A6A3E] uppercase block mb-4">
            Our Specialisation
          </span>
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-[#17130F] font-bold leading-tight">
            Industry Verticals We Serve
          </h2>
          <div className="w-16 h-[2px] bg-[#8A6A3E] mx-auto mt-6 opacity-30" />
        </div>

        {/* Carousel Slider Outer Wrapper */}
        <div 
          className="w-full relative px-0 md:px-6" 
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Navigation Controls - Always active in infinite loop */}
          <button
            onClick={handlePrev}
            className="absolute -left-2 md:left-2 top-[50%] -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-[#f37321] hover:bg-[#e05f0c] text-white shadow-[0_4px_14px_rgba(243,115,33,0.4)] transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Previous specialisations"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3px]" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-2 md:right-2 top-[50%] -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-[#f37321] hover:bg-[#e05f0c] text-white shadow-[0_4px_14px_rgba(243,115,33,0.4)] transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Next specialisations"
          >
            <ChevronRight className="w-6 h-6 stroke-[3px]" />
          </button>

          {/* Carousel Viewport Container */}
          <div className="overflow-hidden w-full py-4 px-2 -mx-2">
            <div
              className="flex items-stretch"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
                transition: isTransitionEnabled 
                  ? "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)" 
                  : "none"
              }}
            >
              {extendedItems.map((spec, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <a
                    href={spec.link}
                    className="group relative block aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(138,106,62,0.18)] hover:-translate-y-2 transition-all duration-500 border border-[rgba(138,106,62,0.1)] cursor-pointer"
                  >
                    
                    {/* Background Image */}
                    <Image
                      src={spec.image}
                      alt={spec.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index >= SPECIALISATIONS.length && index < SPECIALISATIONS.length + 3}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:via-black/50 transition-colors duration-500" />

                    {/* Content Section */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                      <h3 className="font-display font-bold text-xl md:text-2xl text-white tracking-wide uppercase leading-tight max-w-[90%] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                        {spec.title}
                      </h3>
                      
                      {/* Sliding Action Button on Hover */}
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C8A96A] opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out delay-75">
                        <span>Explore Projects</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
