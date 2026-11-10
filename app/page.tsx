import { Hero } from "@/components/sections/Hero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ServicesCards } from "@/components/sections/ServicesCards";
import type { Metadata } from "next";
import { publishedProjects } from "@/data/projects";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(null, site.seo.description, "/");

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <WorkShowcase projects={publishedProjects} />
      <ClientLogos />
      <ServicesCards />
    </>
  );
}
