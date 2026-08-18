const logos = Array.from({ length: 16 }, (_, index) => ({
  id: index + 1,
  src: `/images/clients/logo-${String(index + 1).padStart(2, "0")}.svg`,
}));

function LogoCard({ id, src }: { id: number; src: string }) {
  return (
    <div className="client-logo-card glass-panel" aria-label={`Client logo ${id}`}>
      <img
        src={src}
        alt={`Client ${id}`}
        className="client-logo-image"
        onError={(event) => {
          event.currentTarget.style.display = "none";
          event.currentTarget.nextElementSibling?.classList.remove("is-hidden");
        }}
      />
      <span className="client-logo-placeholder is-hidden">LOGO {String(id).padStart(2, "0")}</span>
    </div>
  );
}

export function ClientLogos() {
  const firstRow = logos.slice(0, 8);
  const secondRow = logos.slice(8, 16);

  return (
    <section className="client-logos-section" aria-label="Companies I have worked with">
      <div className="client-logos-heading">
        <span>TRUSTED BY</span>
        <span className="client-logos-heading-line" />
        <span>SELECTED CLIENTS · 16</span>
      </div>

      <div className="client-marquee client-marquee-top">
        <div className="client-marquee-track">
          {[...firstRow, ...firstRow].map((logo, index) => (
            <LogoCard key={`top-${logo.id}-${index}`} id={logo.id} src={logo.src} />
          ))}
        </div>
      </div>

      <div className="client-marquee client-marquee-bottom">
        <div className="client-marquee-track">
          {[...secondRow, ...secondRow].map((logo, index) => (
            <LogoCard key={`bottom-${logo.id}-${index}`} id={logo.id} src={logo.src} />
          ))}
        </div>
      </div>
    </section>
  );
}
