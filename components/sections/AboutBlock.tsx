import { site } from "@/data/site";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

/**
 * The canonical About composition. Rendered identically on the homepage
 * and on /about — same label, same statement, same "2022" anchor. Only
 * the outer border (via `bordered`) differs, since on /about it sits at
 * the top of the page rather than after Selected Work.
 *
 * The "Designing since 2022..." paragraph IS the primary statement here —
 * there is no separate positioning headline above it.
 */
export function AboutBlock({ bordered = true }: { bordered?: boolean }) {
  return (
    <section className={`px-5 md:px-10 py-20 md:py-32 ${bordered ? "border-t border-line" : ""}`}>
      <div className="max-w-grid mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-6">
        <div className="md:col-span-2">
          <span className="text-xs uppercase tracking-[0.16em] text-muted">About</span>
        </div>

        <RevealOnScroll className="md:col-span-7">
          <p className="text-h2 font-light leading-[1.35] tracking-tight text-ink/90">
            {site.about.body[0]}
          </p>
        </RevealOnScroll>

        {/* the "since" year as a restrained typographic anchor — supports the
            "Designing since 2022" claim in the statement rather than
            decorating for its own sake */}
        <div className="md:col-span-3 flex items-end md:justify-end" aria-hidden="true">
          <span className="text-[4.5rem] md:text-[6.5rem] font-extralight leading-none tracking-tight text-ink/[0.08] select-none">
            {site.about.since}
          </span>
        </div>
      </div>
    </section>
  );
}
