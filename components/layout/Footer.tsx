import { site } from "@/data/site";
import { BadgeScene } from "@/components/three/BadgeScene";
import { FooterCta } from "@/components/layout/FooterCta";
import { FooterPages } from "@/components/layout/FooterPages";

export function Footer() {
  const year = new Date().getFullYear();
  const [first] = site.name.split(" ");

  return (
    <footer className="footer">
      <div className="section-grid" aria-hidden="true" />
      <BadgeScene name={site.name} role="Designer" place={`${site.location} · since ${site.about.since}`} />

      <FooterCta />

      <div className="footer-links">
        <FooterPages />
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
          {site.name}, {year}
        </span>
        <span>{site.location}</span>
      </div>
    </footer>
  );
}
