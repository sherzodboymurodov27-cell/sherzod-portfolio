import Image from "next/image";
import type { ProjectBlock } from "@/data/projects";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function ProjectVisuals({ blocks }: { blocks: ProjectBlock[] }) {
  return (
    <div className="flex flex-col gap-16 md:gap-28">
      {blocks.map((block, i) => (
        <RevealOnScroll key={i}>
          <Block block={block} />
        </RevealOnScroll>
      ))}
    </div>
  );
}

function Block({ block }: { block: ProjectBlock }) {
  switch (block.type) {
    case "full":
      return (
        <div className="relative w-full aspect-[16/9] bg-surface overflow-hidden">
          <Image
            src={block.image}
            alt={block.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      );

    case "split":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {block.images.map((img, i) => (
            <div key={img} className="relative aspect-[4/5] bg-surface overflow-hidden">
              <Image
                src={img}
                alt={block.alt[i]}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      );

    case "single":
      return (
        <div className="relative w-full max-w-2xl mx-auto aspect-[4/5] bg-surface overflow-hidden">
          <Image
            src={block.image}
            alt={block.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      );

    case "text":
      return (
        <div className="max-w-2xl">
          {block.heading && (
            <p className="text-xs tracking-[0.18em] uppercase text-muted font-semibold mb-4">
              {block.heading}
            </p>
          )}
          <p className="text-lg md:text-xl leading-relaxed tracking-tight text-ink/90">{block.body}</p>
        </div>
      );

    default:
      return null;
  }
}
