"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isLight = saved === "light";
    setLight(isLight);
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    localStorage.setItem("theme", next ? "light" : "dark");
  };

  return (
    <button type="button" onClick={toggle} aria-label={light ? "Switch to dark mode" : "Switch to light mode"} title={light ? "Dark mode" : "Light mode"} className="theme-toggle fixed right-5 top-5 md:right-10 md:top-7 z-[90]">
      <span className="theme-toggle-track" aria-hidden="true"><span className="theme-toggle-icon">{light ? "☾" : "☼"}</span></span>
    </button>
  );
}
