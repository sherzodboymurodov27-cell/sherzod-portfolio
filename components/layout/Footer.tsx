import Link from "next/link";
import { site } from "@/data/site";
import { BadgeScene } from "@/components/three/BadgeScene";
import { FooterCta } from "@/components/layout/FooterCta";

const PAGES = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [first] = site.name.split(" ");

  return (
    <footer className="footer">
      <BadgeScene name={site.name} role="Designer" place={`${site.location} · since ${site.about.since}`} />

      <FooterCta />

      <div className="footer-links">
        <nav aria-label="Pages">
          {PAGES.map((p) => (
            <Link key={p.href} href={p.href}>
              {p.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Social">
          {site.socials
            .filter((s) => s.label !== "Phone")
            .map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
        </nav>
      </div>

      <p className="footer-word display metal" aria-hidden="true">
        <span>©</span>
        {first}
      </p>

      <div className="footer-base">
        <span>
          © {year} {site.name}
        </span>
        <span>{site.location}</span>
      </div>
    </footer>
  );
}
