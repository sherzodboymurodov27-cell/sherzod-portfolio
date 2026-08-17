import type { Metadata } from "next";
import { site } from "@/data/site";
import { AboutBlock } from "@/components/sections/AboutBlock";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "About",
  description: site.seo.description,
};

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-28">
      <AboutBlock bordered={false} />
      <SkillsSection />
      <Services />
    </div>
  );
}
