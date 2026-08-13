"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ease-editorial ${
        scrolled || open ? "bg-paper/90 backdrop-blur-sm border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="max-w-grid mx-auto px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="text-sm md:text-base font-semibold tracking-tight">
          {site.name}
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="uppercase tracking-[0.1em] text-xs font-medium text-ink/80 hover:text-ink transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden text-xs uppercase tracking-[0.1em] font-medium"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-paper px-5 py-6 flex flex-col gap-5">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-medium tracking-tight"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
