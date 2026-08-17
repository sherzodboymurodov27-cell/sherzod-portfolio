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

// Project artwork must keep its original aspect ratio.
// Do not force 16:9, 4:5, or any other ratio: the source files are the authority.
function Contained({ children }: { children: React.ReactNode }) {
  return <div className="max-w-grid mx-auto px-5 md:px-10">{children}</div>;
}

function ProjectImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`block w-full h-auto ${className}`}
      loading="lazy"
    />
  );
}

function Block({ block }: { block: ProjectBlock }) {
  switch (block.type) {
    case "full":
      return (
        <div className="w-full overflow-hidden bg-surface">
          <ProjectImage src={block.image} alt={block.alt} />
        </div>
      );

    case "split":
      return (
        <Contained>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {block.images.map((img, i) => (
              <div key={img} className="overflow-hidden bg-surface">
                <ProjectImage src={img} alt={block.alt[i]} />
              </div>
            ))}
          </div>
        </Contained>
      );

    case "single":
      return (
        <Contained>
          <div className="w-full max-w-2xl mx-auto overflow-hidden bg-surface">
            <ProjectImage src={block.image} alt={block.alt} />
          </div>
        </Contained>
      );

    case "text":
      return (
        <Contained>
          <div className="max-w-2xl">
            {block.heading && (
              <p className="text-xs tracking-[0.18em] uppercase text-muted font-semibold mb-4">
                {block.heading}
              </p>
            )}
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-ink/90">{block.body}</p>
          </div>
        </Contained>
      );

    default:
      return null;
  }
}
