"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/lib/lenis";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);
  const navigated = useRef(false);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // The mobile menu only exists below 768px; close it if the window grows past that.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const onChange = () => wide.matches && setOpen(false);
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

  // While the menu is open the page behind it is inert and does not scroll;
  // focus moves into the menu and comes back to the toggle when it closes.
  useEffect(() => {
    const outside = document.querySelectorAll<HTMLElement>("main, footer, .skip-link");
    outside.forEach((el) => (el.inert = open));
    document.body.style.overflow = open ? "hidden" : "";
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      firstLink.current?.focus();
    } else {
      lenis?.start();
      if (wasOpen.current) {
        // After following a menu link, start the new page at its content; otherwise back on the toggle.
        if (navigated.current) document.getElementById("main")?.focus({ preventScroll: true });
        else toggle.current?.focus();
      }
      navigated.current = false;
    }
    wasOpen.current = open;

    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled || open ? "is-solid" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-mark">
          SB<span className="sr-only">, Sherzod Boymurodov, home</span>
        </Link>

        <nav className="nav-links" aria-label="Main">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link" aria-current={isCurrent(link.href) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn btn-signal nav-cta" aria-current={isCurrent("/contact") ? "page" : undefined}>
          <i aria-hidden="true" />
          Contact
        </Link>

        <button
          ref={toggle}
          type="button"
          className="nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav id="mobile-menu" className={`nav-mobile ${open ? "is-open" : ""}`} aria-label="Mobile" hidden={!open}>
        {[...LINKS, { href: "/contact", label: "Contact" }].map((link, i) => (
          <Link
            key={link.href}
            ref={i === 0 ? firstLink : undefined}
            href={link.href}
            onClick={() => {
              navigated.current = true;
              setOpen(false);
            }}
            aria-current={isCurrent(link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
