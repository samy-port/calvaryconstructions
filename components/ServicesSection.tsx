"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SERVICES_DATA = [
  {
    title: "Structural Repairs Services",
    image: "/images/services/structural-repairs.png",
    items: [
      "Carbon Fibre Wrapping",
      "Carbon Fiber Laminate",
      "Micro Concrete Jacketing",
      "Glass Fiber Wrapping",
      "Guniting and Shotcreting"
    ],
    link: "#contact"
  },
  {
    title: "Waterproofing Services",
    image: "/images/services/waterproofing.png",
    items: [
      "Membrane Waterproofing",
      "Light Weight Waterproofing",
      "Brick Bat Coba Waterproofing Service (stamped finish)"
    ],
    link: "#contact"
  },
  {
    title: "Specialized Coating Services",
    image: "/images/services/specialized-coating.jpg",
    items: [
      "Fire Protection to Structures",
      "Anti-Carbonation Coating",
      "Elastomeric Coatings",
      "Epoxy Coating Contractors",
      "Polyurethane (PU) Coatings"
    ],
    link: "#contact"
  },
  {
    title: "Commercial Interior Services",
    image: "/images/services/commercial-interior.jpg",
    items: [
      "Defining the Design Concept",
      "Space Planning and Layout",
      "Design Development",
      "Documentation"
    ],
    link: "#contact"
  },
  {
    title: "PEB Structure Services",
    image: "/images/services/peb-structure.jpg",
    items: [
      "PEB Structures",
      "Tower Foundation",
      "Shed Foundation Contractors",
      "Tremix Flooring Contractors"
    ],
    link: "#contact"
  },
  {
    title: "Grouting Services",
    image: "/images/services/grouting.jpeg",
    items: [
      "PU Grouting Contractors",
      "Epoxy Injection Grouting",
      "Micro Fine Cement Grouting",
      "Cement Grouting"
    ],
    link: "#contact"
  }
];

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
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

  const nextSlide = () => {
    if (currentIndex < SERVICES_DATA.length - visibleCards) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const showPrev = currentIndex > 0;
  const showNext = currentIndex < SERVICES_DATA.length - visibleCards;

  return (
    <section
      id="services"
      className="w-full py-20 md:py-28 bg-[var(--background)] border-t border-[rgba(138,106,62,0.15)] border-b border-[rgba(138,106,62,0.15)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mb-16">
          <span className="font-display text-xs font-semibold tracking-[0.25em] text-[#8A6A3E] uppercase block mb-4">
            Our Offerings
          </span>
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-[#17130F] font-bold leading-tight">
            Leading the Civil Engineering Services
          </h2>
          <div className="w-16 h-[2px] bg-[#8A6A3E] mx-auto mt-6 opacity-30" />
        </div>

        {/* Carousel Slider Outer Wrapper */}
        <div className="w-full relative px-0 md:px-6" ref={containerRef}>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            disabled={!showPrev}
            className={`absolute left-0 md:left-2 top-[50%] -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-[#f37321] text-white shadow-[0_4px_14px_rgba(243,115,33,0.4)] transition-all duration-300 ${showPrev
                ? "opacity-100 scale-100 cursor-pointer hover:bg-[#e05f0c] hover:scale-105 active:scale-95"
                : "opacity-0 scale-90 pointer-events-none"
              }`}
            aria-label="Previous services"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3px]" />
          </button>

          <button
            onClick={nextSlide}
            disabled={!showNext}
            className={`absolute right-0 md:right-2 top-[50%] -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-[#f37321] text-white shadow-[0_4px_14px_rgba(243,115,33,0.4)] transition-all duration-300 ${showNext
                ? "opacity-100 scale-100 cursor-pointer hover:bg-[#e05f0c] hover:scale-105 active:scale-95"
                : "opacity-0 scale-90 pointer-events-none"
              }`}
            aria-label="Next services"
          >
            <ChevronRight className="w-6 h-6 stroke-[3px]" />
          </button>

          {/* Carousel Viewport Container */}
          <div className="overflow-hidden w-full py-4 px-2 -mx-2">
            <div
              className="flex items-stretch transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`
              }}
            >
              {SERVICES_DATA.map((service, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="group bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(138,106,62,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden border border-[rgba(138,106,62,0.08)]">

                    {/* Card Image */}
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#17130F]/15 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Card Body */}
                    <div className="p-8 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="font-display font-bold text-xl md:text-2xl text-[#17130F] mb-6 leading-snug tracking-tight">
                          {service.title}
                        </h3>
                        <ul className="space-y-4">
                          {service.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="flex items-start text-sm font-semibold text-[#f37321] leading-relaxed group-hover:text-[#e05f0c] transition-colors duration-300"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#f37321] mt-2 mr-3 flex-shrink-0 group-hover:bg-[#e05f0c] transition-colors duration-300" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* know More button */}
                      <a
                        href={service.link}
                        className="mt-8 border-2 border-[#f37321] text-[#f37321] hover:bg-[#f37321] hover:text-white rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 inline-block text-center self-start hover:shadow-md"
                      >
                        Know More
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
