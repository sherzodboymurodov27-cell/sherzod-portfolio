import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
  featured?: boolean;
  ratio?: "portrait" | "square" | "wide";
}) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="overflow-hidden rounded-3xl glass-panel p-2 md:p-3">
        <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem]">
          <img
            src={project.cover}
            alt={project.coverAlt}
            loading={priority ? "eager" : "lazy"}
            className="block w-full h-full object-cover transition-[transform,filter] duration-700 ease-editorial group-hover:scale-[1.012] group-hover:contrast-[1.03]"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 transition-transform duration-500 ease-editorial group-hover:translate-x-1">
        <h3 className="font-medium tracking-tight text-base md:text-lg">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted uppercase tracking-[0.08em]">
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-accent/60" aria-hidden="true" />
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}
