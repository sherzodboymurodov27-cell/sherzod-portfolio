import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function SelectedWork() {
  return (
    <section id="work" className="px-5 md:px-10 py-20 md:py-32 scroll-mt-20">
      <div className="max-w-grid mx-auto">
        <SectionTitle eyebrow={String(projects.length).padStart(2, "0")} title="Selected Work" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.slug} delay={(i % 3) * 80}>
              <ProjectCard project={project} priority={i < 3} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
