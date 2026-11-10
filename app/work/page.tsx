import type { Metadata } from "next";
import { publishedProjects } from "@/data/projects";
import { ProjectCard } from "@/components/sections/ProjectCard";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <section className="work-page">
      <div className="section-grid" aria-hidden="true" />
      <h1 className="services-word">
        Work<sup>{publishedProjects.length}</sup>
      </h1>
      <div className="work-page-grid">
        {publishedProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} priority={i < 3} />
        ))}
      </div>
    </section>
  );
}
