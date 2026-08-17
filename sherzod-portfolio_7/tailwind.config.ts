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
        // "Soft Digital Editorial" — warm off-white paper, near-black ink,
        // a soft neutral surface, and one cool indigo accent used sparingly
        // for focus states, hover details and the registration-mark motif.
        paper: "#FAF9F5",
        surface: "#F1EFE9",
        ink: "#16150F",
        muted: "#7C7A70",
        line: "#E6E2D8",
        accent: "#4C56C9",
        "accent-soft": "#EEF0FB",
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
