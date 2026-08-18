import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#05050A",
        surface: "rgba(255,255,255,0.07)",
        ink: "#F7F2FF",
        muted: "#AAA0BA",
        line: "rgba(207,175,255,0.20)",
        accent: "#A855F7",
        "accent-soft": "#28103F",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(3.4rem, 10vw, 10rem)", { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        h1: ["clamp(2.3rem, 5.4vw, 4.2rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        h2: ["clamp(1.6rem, 3vw, 2.5rem)", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        grid: "1440px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
