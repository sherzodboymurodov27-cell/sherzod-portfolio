import Link from "next/link";
import type { Project } from "@/data/projects";
import { clientOf } from "@/data/projects";
import { imgProps } from "@/lib/img";

/** All published projects on paper, two columns, the right column dropped half a tile. */
export function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="work-grid paper" aria-label="All projects">
      <div className="section-grid" aria-hidden="true" />
      <ul className={`container work-grid-list${projects.length < 3 ? " is-few" : ""}`}>
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Link href={`/work/${project.slug}`} className="work-card">
              <span className="work-card-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img {...imgProps(project.cover, "(min-width: 768px) 50vw, 100vw")} alt={project.coverAlt} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
              </span>
              <span className="work-card-text">
                <span className="work-card-title">{clientOf(project)}</span>
                <span className="meta work-card-meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </span>
                {projects.length < 3 && (
                  <span className="btn btn-signal work-card-cta" aria-hidden="true">
                    <i />
                    View case
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
