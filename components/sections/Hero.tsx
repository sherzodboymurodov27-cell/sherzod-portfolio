"use client";

import { useEffect, useRef, useState } from "react";
import { useIsoLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";
import { MonitorScene } from "@/components/three/MonitorScene";

gsap.registerPlugin(ScrollTrigger);

// Placeholder feed until the final hero posts are chosen.
const POSTS = [1, 2, 3, 4, 5].map((n) => `/images/hero/post-${String(n).padStart(2, "0")}.webp`);
const COLUMNS = 6;

/**
 * Hero: SHERZOD over DESIGNER in heavy metal caps (the second line italic),
 * and a monitor standing in front of the second line playing a feed of the work.
 * The hero pins while the camera moves into the screen, then the grid
 * columns rise one after another and close over it.
 */
export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-word-inner", { yPercent: 110, duration: 1.4, stagger: 0.12 })
          .from(".monitor-scene", { opacity: 0, y: 120, duration: 1.8 }, 0.25)
          .from(".hero-meta > *", { opacity: 0, y: 12, duration: 1, stagger: 0.08 }, 0.9);

        const tl = gsap.timeline({
          scrollTrigger: {
            // The section is position: sticky inside a tall wrapper, so nothing
            // is pinned by moving DOM nodes React owns.
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate: (self) => (progress.current = Math.min(1, self.progress / 0.66)),
          },
        });
        tl.to(".hero-title", { yPercent: -22, opacity: 0.15, ease: "none", duration: 0.7 }, 0)
          .to(".hero-meta", { opacity: 0, ease: "none", duration: 0.3 }, 0)
          .fromTo(
            ".hero-shutter i",
            // y: 0 overrides the CSS translateY(100%) so only yPercent moves the columns.
            { y: 0, yPercent: 100 },
            { yPercent: 0, ease: "power3.inOut", duration: 0.22, stagger: { each: 0.03, from: "start" } },
            0.55,
          );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="hero-wrap">
    <section className="hero" aria-label="Introduction">
      <div className="hero-grid" aria-hidden="true" />

      <h1 className="hero-title">
        <span className="hero-word" aria-hidden="true">
          <span className="hero-word-inner display metal">Sherzod</span>
        </span>
        <span className="hero-word hero-word-2" aria-hidden="true">
          <span className="hero-word-inner display display-italic metal metal-deep">Designer</span>
        </span>
        <span className="sr-only">{site.name}, graphic designer</span>
      </h1>

      <MonitorScene posts={POSTS} progress={progress} />

      <div className="hero-meta">
        <div className="hero-meta-left meta">
          <span>{site.name}</span>
          <LocalTime />
        </div>
        <p className="hero-meta-right">
          Graphic designer in Tashkent. Social media, brand identity and print for brands that need to be seen and
          remembered.
        </p>
      </div>

      <div className="hero-shutter" aria-hidden="true">
        {Array.from({ length: COLUMNS }, (_, i) => (
          <i key={i} />
        ))}
      </div>
    </section>
    </div>
  );
}

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tashkent" }).format(new Date());
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 20000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span>
      <i className="hero-live" aria-hidden="true" />
      UZ <span className="hero-time">{time ?? "--:--"}</span> GMT+5
    </span>
  );
}
