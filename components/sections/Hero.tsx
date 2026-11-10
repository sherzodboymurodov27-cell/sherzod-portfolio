import { site } from "@/data/site";
import { publishedProjects } from "@/data/projects";
import { TickMarks } from "@/components/ui/TickMarks";
import { WorkIndex } from "@/components/sections/WorkIndex";

/**
 * The hero is set like a trimmed print sheet: crop marks on the corners,
 * a process-colour bar and a registration mark in the margins, and the
 * name locked to one measure. Both name lines share the same width — the
 * first name is widened on Archivo's width axis until it matches the
 * condensed last name.
 */
export function Hero() {
  const [firstName, ...rest] = site.name.split(" ");
  const lastName = rest.join(" ");
  const disciplines = site.tagline.map((t, i) => (i === 0 ? t : t.toLowerCase()));
  const disciplineLine = `${disciplines.slice(0, -1).join(", ")} and ${disciplines.at(-1)}.`;

  return (
    <section className="hero px-3 md:px-6 pt-20 md:pt-28">
      <div className="hero-sheet max-w-grid mx-auto">
        <TickMarks corners={["tl", "tr", "bl", "br"]} />

        <div className="hero-slug">
          <p>
            {site.role} in {site.location}, working since {site.about.since}.
          </p>
          <ProcessBar />
        </div>

        <h1 className="hero-name">
          <span className="hero-name-first">{firstName}</span>
          <span className="hero-name-last">{lastName}</span>
        </h1>

        <div className="hero-foot">
          <p className="hero-disciplines">{disciplineLine}</p>
          <RegistrationMark />
        </div>
      </div>

      <WorkIndex
        projects={publishedProjects.map(({ slug, title, category, year, cover }) => ({
          slug,
          title,
          category,
          year,
          cover,
        }))}
      />
    </section>
  );
}

/** Cyan, magenta, yellow and key: the colour bar printed in a sheet's margin. */
function ProcessBar() {
  return (
    <span className="process-bar" aria-hidden="true">
      <i style={{ background: "#00A0E3" }} />
      <i style={{ background: "#E5007D" }} />
      <i style={{ background: "#FFED00" }} />
      <i className="process-bar-key" />
    </span>
  );
}

function RegistrationMark() {
  return (
    <svg className="reg-mark" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="9" />
      <circle cx="16" cy="16" r="4.5" />
      <path d="M16 0v32M0 16h32" />
    </svg>
  );
}
