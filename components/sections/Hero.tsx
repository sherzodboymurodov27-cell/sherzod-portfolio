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
 * Hero: SHERZOD in heavy metallic caps with "Designer" written across it in
 * script, and a monitor standing in front playing a feed of the work.
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
          .from(".hero-word-inner", { yPercent: 110, duration: 1.4 })
          .from(".hero-script", { opacity: 0, x: -40, duration: 1.6 }, 0.35)
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
            onUpdate: (self) => (progress.current = Math.min(1, self.progress / 0.72)),
          },
        });
        tl.to(".hero-title", { yPercent: -22, opacity: 0.15, ease: "none", duration: 0.7 }, 0)
          .to(".hero-meta", { opacity: 0, ease: "none", duration: 0.3 }, 0)
          .fromTo(
            ".hero-shutter i",
            { yPercent: 100 },
            { yPercent: 0, ease: "power2.inOut", duration: 0.3, stagger: { each: 0.035, from: "random" } },
            0.68,
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
        <span className="hero-word">
          <span className="hero-word-inner display metal">Sherzod</span>
        </span>
        <span className="hero-script script">Designer</span>
        <span className="sr-only">{site.name}, graphic designer</span>
      </h1>

      <MonitorScene posts={POSTS} progress={progress} />

      <div className="hero-meta">
        <div className="hero-meta-left meta">
          <span>{site.name}</span>
          <LocalTime />
        </div>
        <p className="hero-meta-right">
          Graphic designer from Tashkent. I design social media, brand identities and print for brands that want
          to be noticed.
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
      UZ <span className="hero-time">{time ?? "--:--"}</span> GMT+5
    </span>
  );
}
