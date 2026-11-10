"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type IndexItem = { slug: string; title: string; category: string; year: string; cover: string };

/**
 * A plain list of published work under the name. On a desktop pointer the
 * hovered project's cover follows the cursor, so the list doubles as a
 * contact sheet; on touch it is just the list.
 */
export function WorkIndex({ projects }: { projects: IndexItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [canPreview, setCanPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanPreview(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const onMove = (event: React.PointerEvent) => {
    const el = previewRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${event.clientX + 28}px, ${event.clientY - 204}px, 0)`;
  };

  if (projects.length === 0) return null;

  return (
    <nav className="work-index max-w-grid mx-auto" aria-label="Selected work" onPointerMove={canPreview ? onMove : undefined}>
      <h2 className="work-index-heading">
        Selected work <span>{projects.length === 1 ? "1 project" : `${projects.length} projects`}</span>
      </h2>

      <ul>
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              className="work-index-row"
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(null)}
            >
              <span className="work-index-year">{project.year}</span>
              <span className="work-index-title">{project.title}</span>
              <span className="work-index-category">{project.category}</span>
            </Link>
          </li>
        ))}
      </ul>

      {canPreview && (
        <div ref={previewRef} className={`work-index-preview ${active !== null ? "is-active" : ""}`} aria-hidden="true">
          {projects.map((project, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={project.slug} src={project.cover} alt="" className={i === active ? "is-current" : ""} loading="lazy" />
          ))}
        </div>
      )}
    </nav>
  );
}
