import type { Metadata } from "next";
import { publishedProjects } from "@/data/projects";
import { pageMeta } from "@/lib/meta";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGrid } from "@/components/sections/WorkGrid";

export const metadata: Metadata = pageMeta("Work", "Social media, brand identity and print projects by Sherzod Boymurodov.", "/work");

export default function WorkPage() {
  return (
    <>
      <PageHeader lines={["Work"]} count={publishedProjects.length} label={`Work, ${publishedProjects.length} ${publishedProjects.length === 1 ? "project" : "projects"}`} />
      <WorkGrid projects={publishedProjects} />
    </>
  );
}
