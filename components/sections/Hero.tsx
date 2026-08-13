import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center px-5 md:px-10 pt-24">
      <div className="max-w-grid mx-auto w-full">
        <p className="text-xs tracking-[0.18em] uppercase text-muted font-semibold mb-6 md:mb-8">
          {site.role}
        </p>

        <h1 className="text-display font-extralight tracking-tight -ml-1">{site.name}</h1>

        <div className="mt-8 md:mt-12 flex flex-wrap items-center spine text-sm md:text-base text-muted tracking-tight">
          {site.tagline.map((item) => (
            <span key={item} className="pl-4 pr-4 first:pl-0 py-1">
              {item}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#work"
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors duration-200"
      >
        Selected Work
        <span className="block w-px h-10 bg-line" aria-hidden="true" />
      </a>
    </section>
  );
}
