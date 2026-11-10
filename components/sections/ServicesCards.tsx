import Link from "next/link";
import { site } from "@/data/site";
import { ChromeIcons, ChromeFallback, type ChromeShape } from "@/components/three/ChromeIcons";

const SHAPES: ChromeShape[] = ["heart", "nib", "registration"];

export function ServicesCards() {
  return (
    <section className="services paper" aria-labelledby="services-heading">
      <div className="section-grid" aria-hidden="true" />
      <p className="display services-word" aria-hidden="true">
        Services
      </p>

      <div className="services-head">
        <h2 id="services-heading" className="section-heading">
          What I do
        </h2>
      </div>

      <div className="services-stage">
      <ul className="services-list">
        {site.services.map((service, i) => (
          <li key={service.title} className="service-card">
            <span className="corner corner-tl" aria-hidden="true" />
            <span className="corner corner-tr" aria-hidden="true" />
            <span className="corner corner-bl" aria-hidden="true" />
            <span className="corner corner-br" aria-hidden="true" />
            <div className="service-media">
              <ChromeFallback shape={SHAPES[i % SHAPES.length]} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
      <ChromeIcons shapes={SHAPES} />
      </div>

      <Link href="/contact" className="btn btn-signal services-more">
        <i aria-hidden="true" />
        Start a project
      </Link>
    </section>
  );
}
