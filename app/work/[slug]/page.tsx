import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject, getAdjacentProject } from "@/data/projects";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectVisuals } from "@/components/project/ProjectVisuals";
import { NextProject } from "@/components/project/NextProject";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const next = getAdjacentProject(project.slug);

  return (
    <article>
      <ProjectHero project={project} />

      <div className="py-16 md:py-24">
        <ProjectVisuals blocks={project.blocks} />
      </div>

      <NextProject project={next} />
    </article>
  );
}
