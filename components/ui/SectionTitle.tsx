export function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="group flex items-baseline gap-4 mb-10 md:mb-14">
      {eyebrow && (
        <span className="text-xs tracking-[0.18em] uppercase text-muted font-semibold whitespace-nowrap transition-colors duration-300 group-hover:text-ink">
          {eyebrow}
        </span>
      )}
      <span className="relative h-px flex-1 bg-line hidden sm:block overflow-hidden" aria-hidden="true">
        <span className="absolute inset-y-0 left-0 w-1/3 bg-accent -translate-x-full transition-transform duration-700 ease-editorial group-hover:translate-x-[300%]" />
      </span>
      <h2 className="text-h2 font-light tracking-tight transition-transform duration-500 ease-editorial group-hover:translate-x-1">
        {title}
      </h2>
    </div>
  );
}
