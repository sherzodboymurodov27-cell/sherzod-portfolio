import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  priority = false,
  featured = false,
}: {
  project: Project;
  priority?: boolean;
  featured?: boolean;
  ratio?: "portrait" | "square" | "wide";
}) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="overflow-hidden rounded-3xl glass-panel p-2 md:p-3">
        <img
          src={project.cover}
          alt={project.coverAlt}
          loading={priority ? "eager" : "lazy"}
          className="block w-full h-auto rounded-[1.25rem] transition-[transform,filter] duration-700 ease-editorial group-hover:scale-[1.012] group-hover:contrast-[1.03]"
        />
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 transition-transform duration-500 ease-editorial group-hover:translate-x-1">
        <h3 className={`font-medium tracking-tight ${featured ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>
          {project.title}
        </h3>
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted uppercase tracking-[0.08em]">
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-accent/60" aria-hidden="true" />
          <span>{project.year}</span>
        </div>
      </div>

      {featured && (
        <p className="mt-2 max-w-xl text-sm md:text-base text-muted">{project.description}</p>
      )}
    </Link>
  );
}
