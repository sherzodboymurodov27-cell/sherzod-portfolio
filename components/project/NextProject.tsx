import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

export function NextProject({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block border-t border-line">
      <div className="max-w-grid mx-auto px-5 md:px-10 py-16 md:py-24">
        <p className="text-xs tracking-[0.18em] uppercase text-muted font-semibold mb-8">
          Next Project
        </p>

        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
          <div className="relative w-full md:w-1/2 aspect-[4/3] bg-surface overflow-hidden">
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
            />
          </div>

          <div className="flex items-baseline gap-4">
            <h2 className="text-h2 font-medium tracking-tight">{project.title}</h2>
            <span
              aria-hidden="true"
              className="text-2xl transition-transform duration-300 ease-editorial group-hover:translate-x-2"
            >
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
