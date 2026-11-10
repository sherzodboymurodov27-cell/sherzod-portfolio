import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  // Design tokens live in app/globals.css (see DESIGN.md); Tailwind only supplies its reset.
  theme: { extend: {} },
  plugins: [],
};

export default config;
