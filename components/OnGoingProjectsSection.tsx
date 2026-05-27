"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Play, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const MEDIA_ITEMS = [
  {
    type: "image",
    src: "/images/projects/WhatsApp%20Image%202026-05-26%20at%2016.58.18.jpeg",
    caption: "Structural retrofitting and concrete jacketing implementation for high-load column reinforcement."
  },
  {
    type: "video",
    src: "/images/WhatsApp%20Video%202026-05-26%20at%2016.58.22.mp4",
    caption: "Real-time shotcreting process showing high-pressure concrete spraying for structural repair."
  },
  {
    type: "image",
    src: "/images/projects/WhatsApp%20Image%202026-05-26%20at%2016.58.19.jpeg",
    caption: "Advanced waterproofing membrane application ensuring water-tightness on critical commercial slab structures."
  },
  {
    type: "video",
    src: "/images/WhatsApp%20Video%202026-05-26%20at%2016.58.22%20(1).mp4",
    caption: "Detailed epoxy injection grouting demonstration for sealing structural fissures and micro-cracks."
  },
  {
    type: "image",
    src: "/images/projects/WhatsApp%20Image%202026-05-26%20at%2016.58.18%20(1).jpeg",
    caption: "Precision carbon fiber wrapping (CFRP) on beam-column joints for seismic strengthening."
  },
  {
    type: "video",
    src: "/images/WhatsApp%20Video%202026-05-26%20at%2016.58.22%20(2).mp4",
    caption: "Visual inspection and visual assessment of concrete distresses on multi-story building facade."
  },
  {
    type: "image",
    src: "/images/projects/WhatsApp%20Image%202026-05-26%20at%2016.58.19%20(1).jpeg",
    caption: "Quality checks and concrete surface preparation for high-durability polymer mortar application."
  }
];

export default function OnGoingProjectsSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => {
    setActiveIdx(idx);
    document.body.style.overflow = "hidden"; // disable scroll
  };

  const closeLightbox = () => {
    setActiveIdx(null);
    document.body.style.overflow = "unset"; // restore scroll
  };

  const nextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % MEDIA_ITEMS.length);
    }
  };

  const prevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + MEDIA_ITEMS.length) % MEDIA_ITEMS.length);
    }
  };

  return (
    <section
      id="ongoing-projects"
      className="w-full py-20 md:py-28 bg-[var(--background)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-display text-xs font-semibold tracking-[0.25em] text-[#8A6A3E] uppercase block mb-4">
            Live Showcase
          </span>
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-[#17130F] font-bold leading-tight">
            On-Going Projects
          </h2>
          <p className="font-sans text-sm md:text-base text-[var(--muted-ink)] mt-4 max-w-lg mx-auto font-light leading-relaxed">
            Real-time visual updates from our active sites, demonstrating structural precision and engineering expertise.
          </p>
          <div className="w-16 h-[2px] bg-[#8A6A3E] mx-auto mt-6 opacity-30" />
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MEDIA_ITEMS.map((item, idx) => {
            // Asymmetrical grid logic: let the last item span full width on large screens
            const isLast = idx === MEDIA_ITEMS.length - 1;
            return (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className={`group bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(138,106,62,0.12)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden border border-[rgba(138,106,62,0.08)] flex flex-col cursor-pointer ${
                  isLast ? "lg:col-span-3 lg:max-w-md lg:mx-auto lg:w-full" : ""
                }`}
              >
                {/* Media Container */}
                <div className="relative aspect-[16/10] w-full bg-[#17130F] overflow-hidden">
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <video
                      src={item.src}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}

                  {/* Overlay triggers */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-[#17130F] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                      {item.type === "video" ? (
                        <Play className="w-5 h-5 fill-current ml-0.5 text-[#f37321]" />
                      ) : (
                        <Maximize2 className="w-5 h-5 text-[#f37321]" />
                      )}
                    </div>
                  </div>

                  {/* Media Type Badge */}
                  <div className="absolute top-4 right-4 bg-[#17130F]/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-white uppercase tracking-wider select-none border border-white/10">
                    {item.type}
                  </div>
                </div>

                {/* Caption Section */}
                <div className="p-6 flex-grow flex items-center bg-white border-t border-[rgba(138,106,62,0.05)]">
                  <p className="text-sm font-medium text-[var(--ink)] leading-relaxed font-sans">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-md flex flex-col justify-between items-center p-6 md:p-12 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Top Controls */}
          <div className="w-full flex justify-between items-center z-[1001] text-white">
            <span className="text-xs font-mono tracking-widest text-white/50 select-none">
              {activeIdx + 1} / {MEDIA_ITEMS.length}
            </span>
            <button
              onClick={closeLightbox}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Media Center Content */}
          <div className="relative w-full max-w-5xl h-[60vh] flex items-center justify-center my-auto">
            {/* Left Nav */}
            <button
              onClick={prevMedia}
              className="absolute left-0 md:-left-16 z-[1001] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Media */}
            <div
              className="w-full h-full relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {MEDIA_ITEMS[activeIdx].type === "image" ? (
                <div className="relative w-full h-full max-h-[60vh]">
                  <Image
                    src={MEDIA_ITEMS[activeIdx].src}
                    alt={MEDIA_ITEMS[activeIdx].caption}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
              ) : (
                <video
                  src={MEDIA_ITEMS[activeIdx].src}
                  controls
                  autoPlay
                  className="max-w-full max-h-full h-full rounded-lg"
                />
              )}
            </div>

            {/* Right Nav */}
            <button
              onClick={nextMedia}
              className="absolute right-0 md:-right-16 z-[1001] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="w-full max-w-3xl text-center z-[1001] pb-4">
            <p className="text-white text-base md:text-lg font-light leading-relaxed font-sans drop-shadow-md">
              {MEDIA_ITEMS[activeIdx].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
