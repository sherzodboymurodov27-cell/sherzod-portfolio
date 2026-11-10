import { Hero } from "@/components/sections/Hero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ServicesCards } from "@/components/sections/ServicesCards";
import { publishedProjects } from "@/data/projects";

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
