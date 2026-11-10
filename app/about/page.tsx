import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ServicesCards } from "@/components/sections/ServicesCards";

export const metadata: Metadata = {
  title: "About",
  description: site.seo.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader lines={["About"]} script="me" label="About me" />
      <AboutIntro showLink={false} />
      <section className="tools" aria-labelledby="tools-heading">
        <div className="section-grid" aria-hidden="true" />
        <div className="container tools-inner">
          <h2 id="tools-heading" className="tools-heading">
            Tools I work in
          </h2>
          <ul className="tools-list">
            {site.tools.map((tool) => (
              <li key={tool.name}>
                <span className="tools-name">{tool.name}</span>
                <span className="tools-use">{tool.use}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ClientLogos />
      <ServicesCards showLink={false} />
    </>
  );
}
