import Link from "next/link";
import type { Project, ProjectBlock } from "@/data/projects";
import { clientOf } from "@/data/projects";
import { PageHeader } from "@/components/ui/PageHeader";
import { imgProps } from "@/lib/img";

/** A project page: header with facts, the cover, the work on paper, then the next project. */
export function CaseStudy({ project, next }: { project: Project; next: Project | null }) {
  const client = clientOf(project);

  return (
    <article>
      <PageHeader lines={client.split(" ")} script={project.category} label={`${client}, ${project.category}`}>
        <p className="lead">{project.description}</p>
        <dl className="facts">
          <div>
            <dt className="meta">Client</dt>
            <dd>{client}</dd>
          </div>
          <div>
            <dt className="meta">Discipline</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt className="meta">Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt className="meta">Year</dt>
            <dd>{project.year}</dd>
          </div>
        </dl>
      </PageHeader>

      <section className="case-body paper" aria-label="Project work">
        <div className="section-grid" aria-hidden="true" />
        <div className="container case-blocks">
          {project.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
        <div className="container case-back">
          <Link href="/work" className="btn">
            Back to all work
          </Link>
        </div>
      </section>

      {next && (
        <Link href={`/work/${next.slug}`} className="next-project">
          <span className="container next-project-inner">
            <span className="meta">Next project</span>
            <span className="display next-project-title">{clientOf(next)}</span>
            <span className="next-project-media" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img {...imgProps(next.cover, "280px")} alt="" loading="lazy" decoding="async" />
            </span>
          </span>
        </Link>
      )}
    </article>
  );
}

function Img({ src, alt, sizes = "(min-width: 768px) 50vw, 100vw" }: { src: string; alt: string; sizes?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...imgProps(src, sizes)} alt={alt} loading="lazy" decoding="async" />;
}

function Block({ block }: { block: ProjectBlock }) {
  switch (block.type) {
    case "full":
      return (
        <figure className="case-full">
          <Img src={block.image} alt={block.alt} sizes="100vw" />
        </figure>
      );
    case "single":
      return (
        <figure className="case-single">
          <Img src={block.image} alt={block.alt} />
        </figure>
      );
    case "split":
    case "gallery":
      return (
        <div className="case-gallery">
          {block.images.map((src, i) => (
            <figure key={src}>
              <Img src={src} alt={block.alt[i] ?? ""} />
            </figure>
          ))}
        </div>
      );
    case "text":
      return (
        <div className="case-text">
          {block.heading && <h2 className="meta">{block.heading}</h2>}
          <p className="lead">{block.body}</p>
        </div>
      );
    default:
      return null;
  }
}
