import { site } from "@/data/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function AboutSection() {
  return (
    <section className="px-5 md:px-10 py-20 md:py-32 border-t border-line">
      <div className="max-w-grid mx-auto">
        <SectionTitle eyebrow="Info" title={site.about.heading} />

        <RevealOnScroll>
          <div className="max-w-2xl grid gap-5 text-lg md:text-xl leading-relaxed tracking-tight text-ink/90">
            {site.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
