import Link from "next/link";
import { site } from "@/data/site";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function ContactSection() {
  return (
    <section id="contact" className="px-5 md:px-10 py-24 md:py-40 border-t border-line">
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
            <span className="border-b border-ink pb-0.5 group-hover:opacity-60 transition-opacity duration-200">
              {site.contact.cta}
            </span>
            <span aria-hidden="true" className="transition-transform duration-300 ease-editorial group-hover:translate-x-1">
              →
            </span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
