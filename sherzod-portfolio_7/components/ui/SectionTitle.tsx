export function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-10 md:mb-14">
      {eyebrow && (
        <span className="text-xs tracking-[0.18em] uppercase text-muted font-semibold whitespace-nowrap">
          {eyebrow}
        </span>
      )}
      <span className="h-px flex-1 bg-line hidden sm:block" aria-hidden="true" />
      <h2 className="text-h2 font-light tracking-tight">{title}</h2>
    </div>
  );
}
