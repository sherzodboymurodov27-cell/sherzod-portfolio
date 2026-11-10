import type { Metadata } from "next";
import { publishedProjects } from "@/data/projects";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGrid } from "@/components/sections/WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description: "Social media, brand identity and print projects by Sherzod Boymurodov.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader lines={["Work"]} count={publishedProjects.length} label="Work" />
      <WorkGrid projects={publishedProjects} />
    </>
  );
}
