"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useIsoLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

type Props = {
  /** Heavy uppercase word(s); each array item is a line. */
  lines: string[];
  /** Optional second line in heavy italic, like the hero's DESIGNER. */
  italic?: string;
  /** Superscript count after the last line. */
  count?: number;
  /** Visually hidden full heading when the display words alone are not enough. */
  label?: string;
  children?: ReactNode;
};

/** The opening of every inner page: giant display type on the hero gradient, lines rising on load. */
export function PageHeader({ lines, italic, count, label, children }: Props) {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".page-line-inner", { yPercent: 110, duration: 1.3, stagger: 0.1 });
        // Only animate parts this header actually has (avoids GSAP "target not found").
        if (children) tl.from(".page-head-body > *", { opacity: 0, y: 16, duration: 1, stagger: 0.08 }, 0.5);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <header ref={root} className="page-head">
      <div className="section-grid" aria-hidden="true" />
      <div className="container">
        <h1 className="page-title" aria-label={label}>
          {lines.map((line, i) => (
            <span key={`${i}-${line}`} className="page-line" aria-hidden={label ? true : undefined}>
              <span className="page-line-inner display">
                {line}
                {i === lines.length - 1 && count !== undefined && <sup aria-hidden="true">{count}</sup>}
              </span>
            </span>
          ))}
          {italic && (
            <span className="page-line" aria-hidden={label ? true : undefined}>
              <span className="page-line-inner display display-italic">{italic}</span>
            </span>
          )}
        </h1>
        {children && <div className="page-head-body">{children}</div>}
      </div>
    </header>
  );
}
