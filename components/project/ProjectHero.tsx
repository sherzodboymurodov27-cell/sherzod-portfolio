import Image from "next/image";
import type { Project } from "@/data/projects";
import { TickMarks } from "@/components/ui/TickMarks";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="pt-28 md:pt-36">
      <div className="max-w-grid mx-auto px-5 md:px-10">
        <div className="flex items-end justify-between gap-8 border-b border-line pb-8 md:pb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted mb-4">Project</p>
            <h1 className="text-h1 font-extralight tracking-tight max-w-4xl">{project.title}</h1>
          </div>
          <span className="hidden md:block text-xs text-muted">{project.year}</span>
        </div>

        <div className="flex flex-wrap spine text-[10px] uppercase tracking-[0.12em] text-muted mt-5 mb-12 md:mb-16">
          <span className="pr-4 py-1 first:pl-0">{project.category}</span>
          <span className="px-4 py-1">{project.role}</span>
          <span className="px-4 py-1">{project.year}</span>
        </div>
      </div>

      <div className="max-w-grid mx-auto px-5 md:px-10">
        <div className="relative w-full aspect-[5/4] md:aspect-[4/3] overflow-hidden rounded-[2px] bg-surface project-image">
          <TickMarks corners={["tl", "tr", "bl", "br"]} />
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            priority
            sizes="(min-width: 1024px) 90vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="max-w-grid mx-auto px-5 md:px-10">
        <p className="max-w-3xl text-base md:text-lg leading-relaxed tracking-tight text-muted mt-8 md:mt-12">
          {project.description}
        </p>
      </div>
    </div>
  );
}
