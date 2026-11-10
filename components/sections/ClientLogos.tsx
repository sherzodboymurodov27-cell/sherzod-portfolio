"use client";

import { useState } from "react";

const LOGOS: { id: number; name: string }[] = [
  { id: 1, name: "ESSI" },
  { id: 2, name: "Red Fox Branding" },
  { id: 3, name: "PDP School" },
  { id: 4, name: "PDP EcoSystem" },
  { id: 5, name: "TIFT University" },
  { id: 6, name: "PDP University" },
  { id: 8, name: "RBC.PRO" },
  { id: 9, name: "PDP Elevator" },
  { id: 10, name: "PDP Online" },
  { id: 11, name: "Zamin Maktabi" },
  { id: 12, name: "PDP Academy" },
  { id: 13, name: "PDP Unicorn 4.0" },
  { id: 14, name: "ThermoTech" },
  { id: 15, name: "Gorizont Modern School" },
];

const src = (id: number) => `/images/clients/${String(id).padStart(2, "0")}.${id <= 13 ? "svg" : "png"}`;

/**
 * Collaborations: one light band of slanted cells, logos as dark silhouettes,
 * drifting left. It pauses on hover, on keyboard focus and with the button.
 */
export function ClientLogos() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="collabs paper" aria-labelledby="collabs-heading">
      <div className="section-grid" aria-hidden="true" />
      <div className="container collabs-head">
        <h2 id="collabs-heading" className="section-heading">
          Brands and teams I&rsquo;ve designed for
        </h2>
        <button type="button" className="collabs-toggle" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
          {paused ? "Play" : "Pause"}
        </button>
      </div>

      <div className={`collabs-band ${paused ? "is-paused" : ""}`}>
        <ul className="collabs-track">
          {[...LOGOS, ...LOGOS].map((logo, i) => {
            const copy = i >= LOGOS.length;
            return (
              <li key={`${logo.id}-${i}`} className="collabs-cell" aria-hidden={copy || undefined}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src(logo.id)} alt={copy ? "" : logo.name} loading="lazy" decoding="async" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
