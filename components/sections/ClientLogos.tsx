"use client";

type LogoSpec = {
  id: number;
  name: string;
  extension: "svg" | "png";
  width: string;
  height: string;
  y?: string;
};

// Optical sizing is calibrated against the supplied 4×4 reference sheet.
// The card size remains identical; only the visual logo bounds vary so brands
// with different source viewBox ratios appear equally weighted.
const logoSpecs: LogoSpec[] = [
  { id: 1, name: "Essi", extension: "svg", width: "58%", height: "62%" },
  { id: 2, name: "Red Fox Branding", extension: "svg", width: "50%", height: "64%", y: "-1%" },
  { id: 3, name: "PDP School", extension: "svg", width: "66%", height: "62%" },
  { id: 4, name: "PDP EcoSystem", extension: "svg", width: "68%", height: "64%" },
  { id: 5, name: "PDP University", extension: "svg", width: "70%", height: "66%" },
  { id: 6, name: "TIFT University", extension: "svg", width: "60%", height: "64%" },
  { id: 7, name: "Thermo Tech", extension: "svg", width: "58%", height: "72%" },
  { id: 8, name: "Dastirxan", extension: "svg", width: "58%", height: "70%", y: "2%" },
  { id: 9, name: "PDP Junior", extension: "svg", width: "62%", height: "68%" },
  { id: 10, name: "PDP Elevator", extension: "svg", width: "63%", height: "66%" },
  { id: 11, name: "RBC PRO", extension: "svg", width: "58%", height: "62%" },
  { id: 12, name: "PDP Online", extension: "svg", width: "66%", height: "64%" },
  { id: 13, name: "PDP Academy", extension: "svg", width: "62%", height: "66%" },
  { id: 14, name: "Gorizont Modern School", extension: "png", width: "62%", height: "72%", y: "1%" },
  { id: 15, name: "PDP Unicorn 4.0", extension: "png", width: "70%", height: "66%" },
  { id: 16, name: "Zamin Maktabi", extension: "png", width: "58%", height: "70%" },
];

const logos = logoSpecs.map((logo) => ({
  ...logo,
  src: `/images/clients/${String(logo.id).padStart(2, "0")}.${logo.extension}`,
}));

function LogoCard({ logo }: { logo: (typeof logos)[number] }) {
  const logoStyle = {
    width: logo.width,
    height: logo.height,
    transform: logo.y ? `translateY(${logo.y})` : undefined,
  };

  return (
    <div className="client-logo-card glass-panel" aria-label={logo.name}>
      <img
        src={logo.src}
        alt={logo.name}
        className="client-logo-image"
        style={logoStyle}
        onError={(event) => {
          event.currentTarget.style.display = "none";
          event.currentTarget.nextElementSibling?.classList.remove("is-hidden");
        }}
      />
      <span className="client-logo-placeholder is-hidden">{logo.name}</span>
    </div>
  );
}

export function ClientLogos() {
  const firstRow = logos.slice(0, 8);
  const secondRow = logos.slice(8, 16);

  return (
    <section className="client-logos-section" aria-label="Companies I have worked with">
      <div className="client-logos-heading">
        <span>SELECTED COLLABORATIONS</span>
        <span className="client-logos-heading-line" />
        <span>COMPANIES, TEAMS & BRANDS I’VE WORKED WITH · 16</span>
      </div>

      <div className="client-marquee client-marquee-top">
        <div className="client-marquee-track">
          {[...firstRow, ...firstRow].map((logo, index) => (
            <LogoCard key={`top-${logo.id}-${index}`} logo={logo} />
          ))}
        </div>
      </div>

      <div className="client-marquee client-marquee-bottom">
        <div className="client-marquee-track">
          {[...secondRow, ...secondRow].map((logo, index) => (
            <LogoCard key={`bottom-${logo.id}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
