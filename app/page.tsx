import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { AboutSection } from "@/components/sections/AboutSection";
import { Services } from "@/components/sections/Services";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <AboutSection />
      <Services />
      <ContactSection />
    </>
  );
}
