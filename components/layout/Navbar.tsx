"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const LINKS = [
  { href: "/#work", label: "Work", index: "01" },
  { href: "/about", label: "About", index: "02" },
  { href: "/contact", label: "Contact", index: "03" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 md:px-6 pt-3 md:pt-5 transition-all duration-300 ease-editorial">
      <div className={`max-w-[1320px] mx-auto rounded-2xl border border-white/10 px-4 md:px-7 flex items-center justify-between transition-all duration-300 ease-editorial ${scrolled || open ? "h-14 md:h-16 bg-[#09090A]/78 backdrop-blur-2xl shadow-[0_18px_50px_rgba(0,0,0,0.35)]" : "h-14 md:h-16 bg-black/10 backdrop-blur-xl"}`}>
        <Link href="/" className="text-xs md:text-sm font-semibold tracking-[0.08em] uppercase text-ink">
          {site.name}
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-baseline gap-1.5 uppercase tracking-[0.12em] text-[10px] font-medium text-ink/65 hover:text-ink transition-colors duration-200"
            >
              <span className="text-accent tabular-nums opacity-0 -translate-x-1 transition-all duration-300 ease-editorial group-hover:opacity-100 group-hover:translate-x-0">
                {link.index}
              </span>
              <span className="relative after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 ease-editorial group-hover:after:w-full">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden text-xs uppercase tracking-[0.12em] font-medium text-ink"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="md:hidden max-w-[1320px] mx-auto mt-2 rounded-2xl border border-white/10 bg-[#09090A]/92 backdrop-blur-2xl px-5 py-6 flex flex-col gap-5">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3 text-2xl font-light tracking-tight text-ink"
            >
              <span className="text-xs text-accent tabular-nums">{link.index}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
