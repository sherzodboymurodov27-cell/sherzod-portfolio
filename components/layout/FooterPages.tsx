"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGES = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function FooterPages() {
  const pathname = usePathname();
  return (
    <nav aria-label="Pages">
      {PAGES.map((p) => (
        <Link key={p.href} href={p.href} aria-current={pathname === p.href || pathname.startsWith(`${p.href}/`) ? "page" : undefined}>
          {p.label}
        </Link>
      ))}
    </nav>
  );
}
