"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { motion, AnimatePresence } from "framer-motion";
import { prefersReducedMotion } from "@/lib/utils";
import MagneticButton from "./ui/MagneticButton";
import AtmosphereLayer from "./AtmosphereLayer";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";

// Custom Pinterest SVG Icon
const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.204 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 11.988-5.367 11.988-11.987C24 5.367 18.637 0 12.017 0z" />
  </svg>
);

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenConsultation = () => {
      setIsModalOpen(true);
    };
    window.addEventListener("open-consultation", handleOpenConsultation);
    return () => {
      window.removeEventListener("open-consultation", handleOpenConsultation);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Contact heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#cta",
              start: "top 65%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Contact copy reveal
      if (copyRef.current) {
        gsap.fromTo(
          copyRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#cta",
              start: "top 60%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Contact CTA button reveal
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#cta",
              start: "top 55%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="cta" 
      className="relative min-h-screen flex flex-col justify-between items-center pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden"
      style={{ backgroundColor: "var(--surface)" }}
      aria-label="Ready to Build — Contact Calvary Constructions"
    >
      {/* Atmospheric layers */}
      <AtmosphereLayer type="dust" opacity={0.12} speed={0.2} />
      <AtmosphereLayer type="bloom" opacity={0.08} speed={0.1} blendMode="soft-light" />

      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,169,106,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center flex-1 flex flex-col justify-center my-auto">
        {/* Decorative mark */}
        <div className="mb-12 flex justify-center">
          <Image
            src="/icons/logo-aureon-mark.svg"
            alt=""
            width={40}
            height={40}
            className="opacity-30"
            aria-hidden="true"
          />
        </div>

        <h2
          ref={headingRef}
          className="text-section-title font-display text-[var(--ink)] mb-8"
        >
          Ready to Build Your Dream Project?
        </h2>

        <div ref={copyRef}>
          <p className="text-section-body text-[var(--muted-ink)] mb-3 max-w-xl mx-auto">
            Partner with us for dependable construction services that combine quality, innovation, and integrity.
          </p>
        </div>

        <div ref={ctaRef} className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
          <MagneticButton
            id="cta-primary"
            onClick={() => setIsModalOpen(true)}
            className="bg-[var(--ink)] text-[var(--cloud)] border-[var(--ink)] hover:bg-[var(--bronze)] hover:border-[var(--bronze)]"
          >
            Contact Us Today
          </MagneticButton>
        </div>
      </div>

      {/* Bottom decoration / Footer */}
      <footer className="relative z-10 text-center w-full mt-auto pt-8 pb-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-[var(--stone)] opacity-40" aria-hidden="true" />
          <Image
            src="/icons/logo-aureon-mark.svg"
            alt=""
            width={16}
            height={16}
            className="opacity-40"
            aria-hidden="true"
          />
          <div className="w-8 h-[1px] bg-[var(--stone)] opacity-40" aria-hidden="true" />
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted-ink)] hover:text-[var(--bronze)] flex items-center justify-center w-8 h-8 rounded-full border border-[var(--stone)]/20 hover:border-[var(--bronze)]/50 hover:bg-[rgba(138,106,62,0.05)] transition-colors duration-300"
            initial={{ opacity: 0.6 }}
            whileHover={{ 
              scale: 1.15, 
              y: -3, 
              opacity: 1,
              borderColor: "var(--bronze)",
              boxShadow: "0 4px 12px rgba(138, 106, 62, 0.15)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label="Instagram"
          >
            <Instagram size={15} className="stroke-[1.5]" />
          </motion.a>
          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted-ink)] hover:text-[var(--bronze)] flex items-center justify-center w-8 h-8 rounded-full border border-[var(--stone)]/20 hover:border-[var(--bronze)]/50 hover:bg-[rgba(138,106,62,0.05)] transition-colors duration-300"
            initial={{ opacity: 0.6 }}
            whileHover={{ 
              scale: 1.15, 
              y: -3, 
              opacity: 1,
              borderColor: "var(--bronze)",
              boxShadow: "0 4px 12px rgba(138, 106, 62, 0.15)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label="Facebook"
          >
            <Facebook size={15} className="stroke-[1.5]" />
          </motion.a>
          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted-ink)] hover:text-[var(--bronze)] flex items-center justify-center w-8 h-8 rounded-full border border-[var(--stone)]/20 hover:border-[var(--bronze)]/50 hover:bg-[rgba(138,106,62,0.05)] transition-colors duration-300"
            initial={{ opacity: 0.6 }}
            whileHover={{ 
              scale: 1.15, 
              y: -3, 
              opacity: 1,
              borderColor: "var(--bronze)",
              boxShadow: "0 4px 12px rgba(138, 106, 62, 0.15)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label="Pinterest"
          >
            <PinterestIcon className="w-[14px] h-[14px]" />
          </motion.a>
        </div>

        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted-ink)] opacity-70">
          &copy; {new Date().getFullYear()} Calvary Constructions — Building Strong Foundations
        </p>
      </footer>

      {/* Consultation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Request a Private Consultation"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[rgba(23,19,15,0.6)] backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
              aria-hidden="true"
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-2xl p-10 md:p-14"
              style={{ backgroundColor: "var(--surface)" }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(138,106,62,0.1)] transition-colors duration-300"
                aria-label="Close consultation form"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1L13 13M1 13L13 1" stroke="var(--ink)" strokeWidth="1.2" />
                </svg>
              </button>

              <h3 className="text-2xl font-display font-bold text-[var(--ink)] mb-2 tracking-tight">
                Private Consultation
              </h3>
              <p className="text-sm text-[var(--muted-ink)] mb-10">
                Begin shaping your world. Our team responds within 48 hours.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div>
                  <label
                    htmlFor="consult-name"
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-ink)] block mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="consult-name"
                    type="text"
                    className="w-full bg-transparent border-b border-[var(--stone)] py-3 text-sm text-[var(--ink)] focus:border-[var(--champagne)] transition-colors duration-300 outline-none"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="consult-email"
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-ink)] block mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="consult-email"
                    type="email"
                    className="w-full bg-transparent border-b border-[var(--stone)] py-3 text-sm text-[var(--ink)] focus:border-[var(--champagne)] transition-colors duration-300 outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="consult-project"
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-ink)] block mb-2"
                  >
                    Project Vision
                  </label>
                  <textarea
                    id="consult-project"
                    rows={3}
                    className="w-full bg-transparent border-b border-[var(--stone)] py-3 text-sm text-[var(--ink)] focus:border-[var(--champagne)] transition-colors duration-300 outline-none resize-none"
                    placeholder="Describe your impossible vision..."
                  />
                </div>

                <div className="pt-4">
                  <MagneticButton
                    id="consult-submit"
                    className="w-full bg-[var(--ink)] text-[var(--cloud)] border-[var(--ink)] hover:bg-[var(--bronze)] hover:border-[var(--bronze)]"
                  >
                    Begin Conversation
                  </MagneticButton>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
