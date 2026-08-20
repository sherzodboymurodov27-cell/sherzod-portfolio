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
      <div className="overflow-hidden rounded-3xl glass-panel p-2 md:p-3 transition-[transform,border-color,box-shadow] duration-700 ease-editorial group-hover:-translate-y-1 group-hover:border-accent/20">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]">
          <img
            src={project.cover}
            alt={project.coverAlt}
            loading={priority ? "eager" : "lazy"}
            className="block w-full h-full object-cover transition-[transform,filter] duration-1000 ease-editorial group-hover:scale-[1.025] group-hover:contrast-[1.04]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-editorial group-hover:opacity-100"
          />
          <span
            aria-hidden="true"
            className="absolute right-5 bottom-5 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/20 text-white/90 opacity-0 translate-y-2 scale-90 backdrop-blur-md transition-[opacity,transform] duration-500 ease-editorial group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
          >
            <span className="transition-transform duration-500 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 transition-transform duration-500 ease-editorial group-hover:translate-x-1">
        <h3 className="font-medium tracking-tight text-base md:text-lg">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted uppercase tracking-[0.08em] transition-colors duration-500 group-hover:text-ink">
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-accent/60" aria-hidden="true" />
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}
