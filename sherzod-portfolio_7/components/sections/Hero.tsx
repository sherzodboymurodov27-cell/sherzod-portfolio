import { site } from "@/data/site";
import { TickMarks } from "@/components/ui/TickMarks";

// The hero as a poster-like editorial composition: role label anchored
// top, the name broken across two lines as a typographic block, and a
// numbered discipline system reading left-to-right like a spec list —
// anchored to the lower third rather than centered.
export function Hero() {
  const [firstName, ...rest] = site.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between px-5 md:px-10 pt-28 pb-10 md:pb-14 overflow-hidden">
      <TickMarks corners={["tl", "tr"]} />

      <div className="max-w-grid mx-auto w-full">
        <p className="text-xs tracking-[0.2em] uppercase text-muted">{site.role}</p>
      </div>

      <div className="max-w-grid mx-auto w-full">
        <div className="md:flex md:items-end md:justify-between md:gap-10">
          <h1 className="text-display font-extralight tracking-tight leading-[0.9] -ml-1">
            <span className="block">{firstName}</span>
            <span className="block">{lastName}</span>
          </h1>

          <ol className="mt-8 md:mt-0 shrink-0 text-sm md:text-base text-muted tracking-tight">
            {site.tagline.map((item, i) => (
              <li key={item} className="flex items-baseline gap-3 py-0.5">
                <span className="text-[10px] text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <a
        href="#work"
        className="hidden md:flex mx-auto mt-10 flex-col items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors duration-300 ease-editorial group"
      >
        Scroll to explore
        <span className="relative block w-px h-10 bg-line overflow-hidden" aria-hidden="true">
          <span className="absolute inset-x-0 top-0 h-full bg-accent -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-editorial" />
        </span>
      </a>
    </section>
  );
}
