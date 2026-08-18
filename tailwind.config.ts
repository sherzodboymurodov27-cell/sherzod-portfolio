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
        paper: "#080D18",
        surface: "rgba(255,255,255,0.075)",
        ink: "#F5F7FC",
        muted: "#A8B3C7",
        line: "rgba(202,216,255,0.17)",
        accent: "#7596FF",
        "accent-soft": "#17264A",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(3.4rem, 10vw, 10rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        h1: ["clamp(2.3rem, 5.4vw, 4.2rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        h2: ["clamp(1.6rem, 3vw, 2.5rem)", { lineHeight: "1.08", letterSpacing: "-0.018em" }],
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
