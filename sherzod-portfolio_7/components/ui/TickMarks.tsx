/**
 * Registration-mark corner ticks — a nod to print-production crop marks.
 * This is the site's one signature detail; use it sparingly (hero + one or
 * two section frames), never as general decoration.
 */
export function TickMarks({ corners = ["tl", "tr", "bl", "br"] as const }: { corners?: readonly ("tl" | "tr" | "bl" | "br")[] }) {
  return (
    <>
      {corners.map((c) => (
        <span key={c} className={`tick tick-${c}`} aria-hidden="true" />
      ))}
    </>
  );
}
