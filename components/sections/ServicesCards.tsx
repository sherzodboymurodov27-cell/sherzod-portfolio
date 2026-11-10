import { site } from "@/data/site";

export function ServicesCards() {
  return (
    <section className="services paper" aria-labelledby="services-heading">
      <div className="section-grid" aria-hidden="true" />
      <h2 id="services-heading" className="services-word">
        Services
      </h2>

      <ul className="services-list">
        {site.services.map((service) => (
          <li key={service.title} className="service-card">
            <div className="service-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={service.image} alt="" loading="lazy" />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
