"use client";

import Link from "next/link";
import { useRef } from "react";
import { useIsoLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** The closing ask in giant type; its lines rise into place as the footer arrives. */
export function FooterCta() {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cta-line-inner", {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 85%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="cta">
      <h2 className="cta-title">
        <span className="cta-line">
          <span className="cta-line-inner">Got a project</span>
        </span>
        <span className="cta-line cta-line-script">
          <span className="cta-line-inner">in mind?</span>
        </span>
      </h2>
      <Link href="/contact" className="btn btn-signal cta-btn">
        <i aria-hidden="true" />
        Get in touch
      </Link>
    </div>
  );
}
