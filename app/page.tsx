import { Hero } from "@/components/sections/Hero";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { AboutBlock } from "@/components/sections/AboutBlock";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { Services } from "@/components/sections/Services";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <SelectedWork />
      <AboutBlock />
      <SkillsSection />
      <Services />
      <ContactSection />
    </>
  );
}
