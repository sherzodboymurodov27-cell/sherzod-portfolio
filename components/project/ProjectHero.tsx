import type { Project } from "@/data/projects";
import { TickMarks } from "@/components/ui/TickMarks";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="pt-28 md:pt-36">
      <div className="max-w-grid mx-auto px-5 md:px-10">
        <div className="project-title-glass flex items-end justify-between gap-8 px-5 py-6 md:px-8 md:py-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted mb-4">Project</p>
            <h1 className="text-h1 font-extralight tracking-tight max-w-4xl transition-transform duration-500 ease-editorial hover:translate-x-1">{project.title}</h1>
          </div>
          <span className="hidden md:block text-xs text-muted">{project.year}</span>
        </div>

        <div className="flex flex-wrap spine text-[10px] uppercase tracking-[0.12em] text-muted mt-5 mb-10 md:mb-14 px-5 md:px-8">
          <span className="pr-4 py-1 first:pl-0">{project.category}</span>
          <span className="px-4 py-1">{project.role}</span>
          <span className="px-4 py-1">{project.year}</span>
        </div>
      </div>

      <div className="max-w-grid mx-auto px-5 md:px-10">
        <div className="group relative w-full max-w-5xl mx-auto overflow-hidden rounded-3xl glass-panel p-2 md:p-3">
          <TickMarks corners={["tl", "tr", "bl", "br"]} />
          <img
            src={project.cover}
            alt={project.coverAlt}
            className="block w-full h-auto rounded-[1.25rem] transition-[transform,filter] duration-1000 ease-editorial group-hover:scale-[1.012] group-hover:contrast-[1.02]"
            fetchPriority="high"
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
