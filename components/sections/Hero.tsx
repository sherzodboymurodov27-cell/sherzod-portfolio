import { site } from "@/data/site";
import { TickMarks } from "@/components/ui/TickMarks";

// Editorial hero with restrained motion: staged typography entrance and slow ambient glass glows.
export function Hero() {
  const [firstName, ...rest] = site.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between px-5 md:px-10 pt-28 pb-10 md:pb-14 overflow-hidden">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <TickMarks corners={["tl", "tr"]} />

      <div className="max-w-grid mx-auto w-full relative z-10">
        <div className="md:flex md:items-end md:justify-between md:gap-10">
          <div>
            <p className="hero-enter hero-enter-delay-1 text-xs tracking-[0.2em] uppercase text-muted mb-7">{site.role}</p>
            <h1 className="hero-enter hero-enter-delay-2 hero-name text-display font-extralight tracking-tight leading-[0.9] -ml-1">
              <span className="block">{firstName}</span>
              <span className="block">{lastName}</span>
            </h1>
          </div>

          <ol className="hero-enter hero-enter-delay-3 mt-8 md:mt-0 shrink-0 text-sm md:text-base text-muted tracking-tight">
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
        className="hero-enter hero-enter-delay-4 relative z-10 hidden md:flex mx-auto mt-10 flex-col items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors duration-300 ease-editorial group"
      >
        Scroll to explore
        <span className="relative block w-px h-10 bg-line overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-full bg-accent -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-editorial" />
        </span>
      </a>

      <span className="hero-line absolute bottom-0 left-5 right-5 md:left-10 md:right-10 h-px bg-line/70" aria-hidden="true" />
    </section>
  );
}
