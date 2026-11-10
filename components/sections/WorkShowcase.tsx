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
  const tiles = buildTiles(projects, 5);

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
