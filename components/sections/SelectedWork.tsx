import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function SelectedWork() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="px-5 md:px-10 py-20 md:py-32 scroll-mt-20">
      <div className="max-w-grid mx-auto">
        <SectionTitle eyebrow={String(projects.length).padStart(2, "0")} title="Selected Work" />

        {featured && (
          <RevealOnScroll className="mb-16 md:mb-24">
            <span className="block text-xs uppercase tracking-[0.16em] text-muted mb-4">Featured Project</span>
            <ProjectCard project={featured} priority featured ratio="portrait" />
          </RevealOnScroll>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14 md:gap-y-20">
            {rest.map((project, i) => (
              <RevealOnScroll key={project.slug} delay={(i % 3) * 80}>
                <ProjectCard project={project} priority={i < 1} ratio={i % 3 === 1 ? "square" : "portrait"} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
