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
        paper: "#07101F",
        surface: "rgba(255,255,255,0.06)",
        ink: "#F4F7FF",
        muted: "#9AA9C2",
        line: "rgba(195,213,255,0.18)",
        accent: "#7FA5FF",
        "accent-soft": "#182B52",
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
