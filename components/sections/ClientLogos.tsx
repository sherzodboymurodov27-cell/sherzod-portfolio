const logoIds = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15];

const logos = logoIds.map((id) => ({
  id,
  src: `/images/clients/${String(id).padStart(2, "0")}.${id <= 13 ? "svg" : "png"}`,
}));

/** Collaborations: one light band of slanted cells, logos as dark silhouettes, drifting left. */
export function ClientLogos() {
  return (
    <section className="collabs paper" aria-labelledby="collabs-heading">
      <div className="section-grid" aria-hidden="true" />
      <h2 id="collabs-heading" className="collabs-heading">
        Brands and teams
        <br />
        I&rsquo;ve worked with<sup>{logos.length}</sup>
      </h2>

      <div className="collabs-band">
        <ul className="collabs-track">
          {[...logos, ...logos].map((logo, i) => (
            <li key={`${logo.id}-${i}`} className="collabs-cell" aria-hidden={i >= logos.length || undefined}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.src} alt="" loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
