"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

type Tile = { src: string; alt: string; slug: string; title: string; category: string };

/**
 * Staggered work tiles on the paper background. Tiles come from published
 * projects: each project's cover first, then its gallery images, up to five.
 * With more projects published, every tile becomes a different project.
 */
export function WorkShowcase({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLElement>(null);
  const bubble = useRef<HTMLSpanElement>(null);
  const tiles = buildTiles(projects, 5);

  // A "View" bubble that trails the cursor over the tiles (fine pointers only).
  useEffect(() => {
    const el = root.current;
    const b = bubble.current;
    if (!el || !b || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const x = gsap.quickTo(b, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(b, "y", { duration: 0.35, ease: "power3" });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
    };
    const show = (on: boolean) => gsap.to(b, { scale: on ? 1 : 0, duration: 0.3, ease: "power3.out" });
    const tilesEls = el.querySelectorAll<HTMLElement>(".work-tile");
    const enter = () => show(true);
    const leave = () => show(false);
    window.addEventListener("pointermove", move, { passive: true });
    tilesEls.forEach((t) => {
      t.addEventListener("pointerenter", enter);
      t.addEventListener("pointerleave", leave);
    });
    return () => {
      window.removeEventListener("pointermove", move);
      tilesEls.forEach((t) => {
        t.removeEventListener("pointerenter", enter);
        t.removeEventListener("pointerleave", leave);
      });
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>(".work-tile").forEach((tile) => {
          const speed = Number(tile.dataset.speed ?? 0);
          gsap.fromTo(
            tile,
            { yPercent: speed * 6 },
            {
              yPercent: -speed * 6,
              ease: "none",
              scrollTrigger: { trigger: tile, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="work paper" aria-labelledby="work-heading">
      <div className="section-grid" aria-hidden="true" />
      <h2 id="work-heading" className="sr-only">
        Selected work
      </h2>

      <div className="work-tiles">
        {tiles.map((tile, i) => (
          <Link
            key={`${tile.src}-${i}`}
            href={`/work/${tile.slug}`}
            className={`work-tile work-tile-${i + 1}`}
            data-speed={[1, -1, 1.5, -0.5, 1][i]}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tile.src} alt={tile.alt} loading="lazy" />
            <span className="tag">
              <i aria-hidden="true" />
              {tile.title}
              <span>{tile.category}</span>
            </span>
          </Link>
        ))}
      </div>

      <span ref={bubble} className="view-bubble" aria-hidden="true">
        View
      </span>

      <Link href="/work" className="show-all">
        All work<sup>{projects.length}</sup>
      </Link>
    </section>
  );
}

function buildTiles(projects: Project[], max: number): Tile[] {
  const pools = projects.map((p) => {
    const images = [{ src: p.cover, alt: p.coverAlt }];
    for (const block of p.blocks) {
      if ("images" in block) block.images.forEach((src, i) => images.push({ src, alt: block.alt[i] ?? p.title }));
      if ("image" in block) images.push({ src: block.image, alt: block.alt });
    }
    return images.map((img) => ({ ...img, slug: p.slug, title: p.title.split(" — ")[0], category: p.category }));
  });

  // Round-robin across projects so tiles show as many different projects as possible.
  const tiles: Tile[] = [];
  for (let round = 0; tiles.length < max; round++) {
    let added = false;
    for (const pool of pools) {
      if (pool[round] && tiles.length < max) {
        tiles.push(pool[round]);
        added = true;
      }
    }
    if (!added) break;
  }
  return tiles;
}
