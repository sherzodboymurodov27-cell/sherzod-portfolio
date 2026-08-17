import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

const RATIO = {
  portrait: "aspect-[4/5]",
  square: "aspect-[4/3]",
  wide: "aspect-[16/11]",
} as const;

export function ProjectCard({
  project,
  priority = false,
  featured = false,
  ratio = "portrait",
}: {
  project: Project;
  priority?: boolean;
  featured?: boolean;
  ratio?: keyof typeof RATIO;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group block ${project.gridSpan === 2 ? "md:col-span-2" : ""}`}
    >
      <div className={`relative overflow-hidden bg-surface ${RATIO[featured ? "wide" : ratio]}`}>
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-[transform,filter] duration-700 ease-editorial group-hover:scale-[1.035] group-hover:contrast-[1.03]"
        />
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4 transition-transform duration-500 ease-editorial group-hover:translate-x-1">
        <h3 className={`font-medium tracking-tight ${featured ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>
          {project.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted uppercase tracking-[0.08em] shrink-0">
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-accent/60" aria-hidden="true" />
          <span>{project.year}</span>
        </div>
      </div>

      {featured && (
        <p className="mt-2 max-w-md text-sm md:text-base text-muted">{project.description}</p>
      )}
    </Link>
  );
}
