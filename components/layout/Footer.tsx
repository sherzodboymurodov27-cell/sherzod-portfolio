import Link from "next/link";
import { site } from "@/data/site";

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
      <div className="footer-top">
        <p className="footer-ask">Have a project in mind?</p>
        <Link href="/contact" className="btn btn-signal">
          <i aria-hidden="true" />
          Get in touch
        </Link>
      </div>

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

      <p className="footer-word" aria-hidden="true">
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
