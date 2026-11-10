import Link from "next/link";
import type { Project } from "@/data/projects";
import { clientOf } from "@/data/projects";

/** All published projects on paper, two columns, the right column dropped half a tile. */
export function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="work-grid paper" aria-label="All projects">
      <div className="section-grid" aria-hidden="true" />
      <ul className="container work-grid-list">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Link href={`/work/${project.slug}`} className="work-card">
              <span className="work-card-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.cover} alt={project.coverAlt} loading={i < 2 ? "eager" : "lazy"} />
              </span>
              <span className="work-card-text">
                <span className="work-card-title">{clientOf(project)}</span>
                <span className="meta work-card-meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
