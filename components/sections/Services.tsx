import { site } from "@/data/site";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// Services as a numbered editorial list — the index numbers carry real
// sequence (a scannable list order), not a decorative header pattern.
export function Services() {
  return (
    <section className="px-5 md:px-10 py-20 md:py-32 border-t border-line">
      <div className="max-w-grid mx-auto">
        <span className="block text-xs uppercase tracking-[0.16em] text-muted mb-10 md:mb-16">
          Services
        </span>

        <div>
          {site.services.map((service, i) => (
            <RevealOnScroll key={service.title} delay={i * 60}>
              <div className="group grid grid-cols-[2.5rem_1fr] md:grid-cols-[4rem_1fr_1fr] items-baseline gap-x-4 md:gap-x-8 py-6 md:py-7 border-t border-line last:border-b last:border-line">
                <span className="text-sm text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-h2 font-light tracking-tight transition-transform duration-300 ease-editorial group-hover:translate-x-1">
                  {service.title}
                </h3>
                <p className="hidden md:block text-muted text-base md:text-lg max-w-sm md:text-right">
                  {service.description}
                </p>
              </div>
              <p className="md:hidden text-muted text-base pl-[2.5rem] pb-6">{service.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
