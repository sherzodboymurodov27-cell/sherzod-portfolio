import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group block ${project.gridSpan === 2 ? "md:col-span-2" : ""}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-[transform,filter] duration-700 ease-editorial group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-base md:text-lg font-medium tracking-tight">{project.title}</h3>
        <div className="flex spine text-xs text-muted uppercase tracking-[0.08em] shrink-0">
          <span className="pl-3 pr-3 first:pl-0">{project.category}</span>
          <span className="pl-3 pr-3">{project.year}</span>
        </div>
      </div>
    </Link>
  );
}
