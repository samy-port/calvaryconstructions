"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SERVICES = [
  {
    id: "residential",
    title: "Residential",
    italic: false,
    label: "Modern homes, villas, apartments, and renovation projects built with quality craftsmanship.",
    image: "/images/projects/villa-01.webp",
  },
  {
    id: "commercial",
    title: "Commercial",
    italic: true,
    label: "Office buildings, retail spaces, warehouses, and commercial complexes designed for functionality and growth.",
    image: "/images/projects/tower-01.webp",
  },
  {
    id: "industrial",
    title: "Industrial",
    italic: false,
    label: "Industrial facilities, factories, and infrastructure projects delivered with safety and efficiency.",
    image: "/images/amenities/vault.png",
  },
  {
    id: "renovation",
    title: "Renovation",
    italic: true,
    label: "Transforming existing spaces with modern designs and structural improvements.",
    image: "/images/services/rent.png",
  },
  {
    id: "management",
    title: "Management",
    italic: false,
    label: "End-to-end planning, budgeting, supervision, and execution for seamless project delivery.",
    image: "/images/services/sell.png",
  },
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="services"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        overflow: "hidden",
        height: isMobile ? "auto" : "100vh",
        minHeight: isMobile ? "auto" : "600px",
        backgroundColor: "var(--ink)",
        borderTop: "1px solid rgba(180,170,155, 0.2)",
        borderBottom: "1px solid rgba(180,170,155, 0.2)",
      }}
    >
      {SERVICES.map((service, index) => {
        const isHovered = hoveredIndex === index;
        const isOthersHovered = hoveredIndex !== null && hoveredIndex !== index;

        const flexValue = isHovered
          ? "2.5 1 0%"
          : isOthersHovered
            ? "0.5 1 0%"
            : "1 1 0%";

        return (
          <div
            key={service.id}
            style={{
              position: "relative",
              cursor: "pointer",
              overflow: "hidden",
              height: isMobile ? "20vh" : "100%",
              flex: flexValue,
              transition: "flex 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              borderRight:
                !isMobile && index < SERVICES.length - 1
                  ? "1px solid rgba(180,170,155,0.2)"
                  : "none",
              borderBottom:
                isMobile && index < SERVICES.length - 1
                  ? "1px solid rgba(180,170,155,0.2)"
                  : "none",
              backgroundColor: "var(--ink)",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background Image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                transform: isHovered ? "scale(1)" : "scale(1.08)",
                transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                quality={80}
                sizes="(max-width: 768px) 100vw, 20vw"
                style={{
                  objectFit: "cover",
                  opacity: isHovered ? 0.95 : 0.65,
                  transition: "opacity 0.8s ease",
                }}
              />
              {/* Dark overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: isHovered
                    ? "rgba(0,0,0,0.25)"
                    : "rgba(0,0,0,0.48)",
                  transition: "background-color 0.8s ease",
                }}
              />
            </div>

            {/* Content */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
              }}
            >
              {/* Title */}
              <h2
                style={{
                  fontFamily: service.italic
                    ? "var(--font-editorial), Georgia, serif"
                    : "var(--font-display), system-ui, sans-serif",
                  fontStyle: service.italic ? "italic" : "normal",
                  fontWeight: service.italic ? 400 : 700,
                  textTransform: service.italic ? "none" : "uppercase",
                  fontSize: isHovered
                    ? "clamp(2.5rem, 5vw, 6rem)"
                    : isOthersHovered
                      ? "clamp(1rem, 1.8vw, 2rem)"
                      : "clamp(1.8rem, 3.5vw, 4rem)",
                  color: isHovered
                    ? "#FFFFFF"
                    : isOthersHovered
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(255,255,255,0.88)",
                  letterSpacing: service.italic ? "normal" : "-0.04em",
                  lineHeight: 0.85,
                  whiteSpace: "nowrap",
                  transform: isHovered ? "translateY(-3.5rem)" : "translateY(0)",
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  margin: 0,
                  padding: 0,
                }}
              >
                {service.title}
              </h2>

              {/* Revealed Description */}
              <div
                style={{
                  position: "absolute",
                  bottom: "3rem",
                  left: "1.5rem",
                  right: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(2.5rem)",
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: isHovered ? "0.1s" : "0s",
                  pointerEvents: isHovered ? "auto" : "none",
                }}
              >
                {/* Decorative divider */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "1.5rem",
                      height: "1px",
                      backgroundColor: "var(--champagne)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-display), system-ui, sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--champagne)",
                    }}
                  >
                    Services
                  </span>
                  <div
                    style={{
                      width: "1.5rem",
                      height: "1px",
                      backgroundColor: "var(--champagne)",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans), system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(0.85rem, 1.2vw, 1.05rem)",
                    color: "rgba(255,255,255,0.9)",
                    maxWidth: "20rem",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {service.label}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
