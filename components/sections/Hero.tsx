import { site } from "@/data/site";
import { TickMarks } from "@/components/ui/TickMarks";
import { MeshTextHover } from "@/components/ui/MeshTextHover";
import { GyroRings } from "@/components/ui/GyroRings";

export function Hero() {
  const [firstName, ...rest] = site.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section className="relative min-h-[100svh] flex flex-col px-5 md:px-10 pt-28 pb-10 md:pb-14 overflow-hidden">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <TickMarks corners={["tl", "tr"]} />

      <div className="flex-1 flex items-center">
        <div className="max-w-grid mx-auto w-full relative z-10">
          <div className="hero-main-grid">
            <div className="hero-copy">
              <p className="hero-enter hero-enter-delay-1 text-xs tracking-[0.2em] uppercase text-muted mb-7">{site.role}</p>
              <h1
                className="hero-enter hero-enter-delay-2 hero-name text-display font-extralight tracking-tight leading-[0.9] -ml-1 [&_.mesh-text-hover]:h-full [&_.mesh-text-hover]:w-full [&_.mesh-text-hover_canvas]:block [&_.mesh-text-hover_canvas]:h-full [&_.mesh-text-hover_canvas]:w-full"
                aria-label={site.name}
              >
                <span className="grid hero-name-line" style={{ height: "clamp(6.4rem, 10vw, 10rem)" }}>
                  <MeshTextHover text={firstName} />
                </span>
                <span className="grid hero-name-line" style={{ height: "clamp(6.4rem, 10vw, 10rem)" }}>
                  <MeshTextHover text={lastName} />
                </span>
              </h1>

              <div className="hero-tagline hero-enter hero-enter-delay-3" aria-label="Design disciplines">
                {site.tagline.map((item, i) => (
                  <span key={item}>
                    {i > 0 && <b className="hero-tagline-slash">/</b>}
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-abstract hero-enter hero-enter-delay-3">
              <GyroRings />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#work"
        className="hero-enter hero-enter-delay-4 relative z-10 flex mx-auto mt-10 flex-col items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors duration-300 ease-editorial group"
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
