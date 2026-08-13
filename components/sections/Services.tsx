import { site } from "@/data/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Services() {
  return (
    <section className="px-5 md:px-10 py-20 md:py-32 border-t border-line">
      <div className="max-w-grid mx-auto">
        <SectionTitle eyebrow="Capabilities" title="Services" />

        <div className="grid grid-cols-1 md:grid-cols-2">
          {site.services.map((service, i) => {
            const isFirstRowOnDesktop = i === 0 || i === 1;
            return (
              <RevealOnScroll key={service.title} delay={(i % 2) * 80}>
                <div
                  className={`py-6 md:py-8 border-line ${i === 0 ? "" : "border-t"} ${
                    isFirstRowOnDesktop ? "md:border-t-0" : "md:border-t"
                  }`}
                >
                  <h3 className="text-h2 font-medium tracking-tight mb-2">{service.title}</h3>
                  <p className="text-muted text-base md:text-lg max-w-md">{service.description}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
