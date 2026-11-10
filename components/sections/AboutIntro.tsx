"use client";

import Link from "next/link";
import { useRef } from "react";
import { useIsoLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

/** The about statement sharpens word by word as it scrolls into view. */
export function AboutIntro({ showLink = true }: { showLink?: boolean }) {
  const root = useRef<HTMLElement>(null);
  // Keep the last two words together so the sentence never ends on a lone word.
  const words = site.about.intro.replace(/ (\S+)$/, "\u00a0$1").split(" ");

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".about-word",
          { opacity: 0.14, filter: "blur(6px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.04,
            ease: "none",
            scrollTrigger: { trigger: ".about-statement", start: "top 80%", end: "bottom 50%", scrub: true },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="about-intro" aria-labelledby="about-heading">
      <div className="section-grid" aria-hidden="true" />
      <div className="container">
        <h2 id="about-heading" className="sr-only">
          About
        </h2>
        <p className="statement about-statement">
          {words.map((word, i) => (
            <span key={i} className="about-word">
              {word}{" "}
            </span>
          ))}
        </p>

        <div className="about-foot">
          <p className="meta">
            {site.name} <span>Since {site.about.since}</span> <span>{site.location}</span>
          </p>
          {showLink && (
            <Link href="/about" className="btn">
              More about me
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
