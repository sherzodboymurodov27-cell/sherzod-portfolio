import { site } from "@/data/site";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// Skills as a flowing typographic field — deliberately not a labelled
// header + divider (that pattern already carries About, Services, Work).
// Two offset columns create a controlled deviation from a flat list.
export function SkillsSection() {
  const [colA, colB] = [site.skills.slice(0, 3), site.skills.slice(3)];

  return (
    <section className="px-5 md:px-10 py-20 md:py-32 border-t border-line">
      <div className="max-w-grid mx-auto">
        <span className="block text-xs uppercase tracking-[0.16em] text-muted mb-10 md:mb-16">
          Skills
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          <RevealOnScroll>
            <SkillColumn items={colA} start={1} />
          </RevealOnScroll>
          <RevealOnScroll delay={100} className="md:mt-14 lg:mt-20">
            <SkillColumn items={colB} start={colA.length + 1} />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

function SkillColumn({ items, start }: { items: string[]; start: number }) {
  return (
    <ul className="flex flex-col">
      {items.map((skill, i) => (
        <li
          key={skill}
          className="group flex items-baseline gap-4 py-3 md:py-4 border-b border-line last:border-b-0"
        >
          <span className="text-xs text-accent tabular-nums opacity-0 -translate-x-1 transition-all duration-300 ease-editorial group-hover:opacity-100 group-hover:translate-x-0">
            {String(start + i).padStart(2, "0")}
          </span>
          <span className="text-2xl md:text-3xl font-light tracking-tight transition-transform duration-300 ease-editorial group-hover:translate-x-1">
            {skill}
          </span>
        </li>
      ))}
    </ul>
  );
}
