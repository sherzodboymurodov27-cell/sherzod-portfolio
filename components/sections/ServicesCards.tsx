import Link from "next/link";
import { site } from "@/data/site";
import { ChromeIcon, type ChromeShape } from "@/components/three/ChromeIcon";

const SHAPES: ChromeShape[] = ["heart", "nib", "registration"];

export function ServicesCards({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="services paper" aria-labelledby="services-heading">
      <div className="section-grid" aria-hidden="true" />
      <h2 id="services-heading" className="display services-word">
        Services
      </h2>

      <ul className="services-list">
        {site.services.map((service, i) => (
          <li key={service.title} className="service-card">
            <span className="corner corner-tl" aria-hidden="true" />
            <span className="corner corner-tr" aria-hidden="true" />
            <span className="corner corner-bl" aria-hidden="true" />
            <span className="corner corner-br" aria-hidden="true" />
            <div className="service-media">
              <ChromeIcon shape={SHAPES[i % SHAPES.length]} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>

      {showLink && (
        <Link href="/about" className="btn btn-signal services-more">
          <i aria-hidden="true" />
          More about me
        </Link>
      )}
    </section>
  );
}
