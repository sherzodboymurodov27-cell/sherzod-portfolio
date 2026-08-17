import Link from "next/link";
import { site } from "@/data/site";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TickMarks } from "@/components/ui/TickMarks";

export function ContactSection() {
  return (
    <section id="contact" className="relative px-5 md:px-10 py-24 md:py-44 border-t border-line overflow-hidden">
      <TickMarks corners={["tl", "br"]} />
      <div className="max-w-grid mx-auto">
        <RevealOnScroll>
          <h2 className="text-display font-extralight tracking-tight leading-[0.98]">
            {site.contact.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 mt-10 md:mt-14 text-lg md:text-xl group"
          >
            <span className="border-b border-accent pb-0.5 group-hover:opacity-70 transition-opacity duration-200">
              {site.contact.cta}
            </span>
            <span
              aria-hidden="true"
              className="text-accent transition-transform duration-300 ease-editorial group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
