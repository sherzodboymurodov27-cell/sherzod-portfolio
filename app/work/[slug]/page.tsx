import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedProjects, getProject, getAdjacentProject } from "@/data/projects";
import { CaseStudy } from "@/components/project/CaseStudy";

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  return <CaseStudy project={project} next={getAdjacentProject(project.slug)} />;
}
