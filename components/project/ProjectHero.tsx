import Image from "next/image";
import type { Project } from "@/data/projects";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="pt-28 md:pt-36">
      <div className="max-w-grid mx-auto px-5 md:px-10">
        <h1 className="text-h1 font-extralight tracking-tight max-w-4xl mb-8 md:mb-12">
          {project.title}
        </h1>

        <div className="flex flex-wrap spine text-xs uppercase tracking-[0.1em] text-muted mb-14 md:mb-20">
          <span className="pl-4 pr-4 first:pl-0 py-1">{project.category}</span>
          <span className="pl-4 pr-4 py-1">{project.year}</span>
          <span className="pl-4 pr-4 py-1">{project.role}</span>
        </div>
      </div>

      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-surface">
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-grid mx-auto px-5 md:px-10">
        <p className="max-w-2xl text-lg md:text-xl leading-relaxed tracking-tight text-ink/90 mt-14 md:mt-20">
          {project.description}
        </p>
      </div>
    </div>
  );
}
