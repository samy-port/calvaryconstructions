import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        editorial: ["var(--font-editorial)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      colors: {
        surface: "var(--background)",
        ink: "var(--ink)",
        "muted-ink": "var(--muted-ink)",
        stone: "var(--stone)",
        bronze: "var(--bronze)",
        champagne: "var(--champagne)",
        cloud: "var(--cloud)",
      },
      fontSize: {
        "section-title": ["clamp(3.5rem, 8vw, 8rem)", { lineHeight: "0.85", letterSpacing: "-0.03em" }],
        "section-body": ["clamp(1.125rem, 2vw, 1.5rem)", { lineHeight: "1.5", fontWeight: "300" }],
        "section-label": ["0.75rem", { letterSpacing: "0.3em", fontWeight: "500" }],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      transitionTimingFunction: {
        aureon: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      zIndex: {
        preloader: "9999",
        cursor: "9998",
        nav: "1000",
        modal: "2000",
      },
    },
  },
  plugins: [],
};

export default config;
