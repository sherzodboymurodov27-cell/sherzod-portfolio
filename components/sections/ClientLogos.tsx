"use client";

const logos = Array.from({ length: 15 }, (_, index) => {
  const id = index + 1;
  const extension = id <= 13 ? "svg" : "png";

  return {
    id,
    src: `/images/clients/${String(id).padStart(2, "0")}.${extension}`,
  };
});

function LogoCard({ id, src }: { id: number; src: string }) {
  const logoStyle = {
    width:
      id === 8 ? "48%" :
      id === 15 ? "52%" :
      "62%",
    height:
      id === 8 ? "55%" :
      id === 15 ? "58%" :
      "62%",
    marginTop: undefined,
  };

  return (
    <div className="client-logo-card glass-panel" aria-label={`Client logo ${id}`}>
      <img
        src={src}
        alt={`Client ${id}`}
        className="client-logo-image"
        style={logoStyle}
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
  const secondRow = logos.slice(8, 15);

  return (
    <section className="client-logos-section" aria-label="Companies I have worked with">
      <div className="client-logos-heading">
        <span>SELECTED COLLABORATIONS</span>
        <span className="client-logos-heading-line" />
        <span>COMPANIES, TEAMS & BRANDS I’VE WORKED WITH · 15</span>
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
