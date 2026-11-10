import type { Metadata } from "next";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/meta";
import { PageHeader } from "@/components/ui/PageHeader";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { ClientLogos } from "@/components/sections/ClientLogos";

export const metadata: Metadata = pageMeta(
  "About",
  "Sherzod Boymurodov is a graphic designer in Tashkent working since 2022 across social media, brand identity and print.",
  "/about",
);

export default function AboutPage() {
  const behance = site.socials.find((s) => s.label === "Behance");

  return (
    <>
      <PageHeader lines={["About"]} script="me" label="About me" />
      <AboutIntro showLink={false} />

      <section className="list-section" aria-labelledby="experience-heading">
        <div className="section-grid" aria-hidden="true" />
        <div className="container list-inner">
          <div className="list-side">
            <h2 id="experience-heading" className="section-heading">
              Teams and clients
            </h2>
            {behance && (
              <a href={behance.href} className="btn" target="_blank" rel="noopener noreferrer">
                Full portfolio on Behance
              </a>
            )}
          </div>
          <ul className="list-rows">
            {site.experience.map((item) => (
              <li key={item.name}>
                <span className="list-name">{item.name}</span>
                <span className="list-desc">{item.what}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="list-section" aria-labelledby="tools-heading">
        <div className="container list-inner">
          <div className="list-side">
            <h2 id="tools-heading" className="section-heading">
              Tools I work in
            </h2>
          </div>
          <ul className="list-rows">
            {site.tools.map((tool) => (
              <li key={tool.name}>
                <span className="list-name">{tool.name}</span>
                <span className="list-desc">{tool.use}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClientLogos />
    </>
  );
}
