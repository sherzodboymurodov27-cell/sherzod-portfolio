import type { Metadata } from "next";
import { site } from "@/data/site";
import { TickMarks } from "@/components/ui/TickMarks";

export const metadata: Metadata = {
  title: "Contact",
  description: site.seo.description,
};

function SocialIcon({ label }: { label: string }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (label === "Instagram") {
    return (
      <svg {...common}>
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.5" cy="6.7" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (label === "Telegram") {
    return (
      <svg {...common}>
        <path d="M21 3.5 3.8 10.2c-.9.35-.88.86-.16 1.08l4.4 1.38 1.68 5.25c.2.58.1.82.7.82.47 0 .68-.22.93-.47l2.14-2.08 4.45 3.28c.82.45 1.4.22 1.61-.76L22.1 4.55c.3-1.22-.47-1.77-1.1-1.05Z" />
        <path d="m8.25 12.48 9.88-6.23-7.82 7.38" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4 5h5.2c2.65 0 4.25 1.3 4.25 3.35 0 1.35-.72 2.3-1.85 2.8 1.5.45 2.35 1.55 2.35 3.15C13.95 14.9 12.2 17 9.1 17H4V5Z" />
      <path d="M7 7.5v2.35h1.9c1 0 1.55-.4 1.55-1.18 0-.77-.55-1.17-1.55-1.17H7Zm0 4.65v2.35h2.1c1.08 0 1.68-.42 1.68-1.18 0-.77-.6-1.17-1.68-1.17H7Z" fill="currentColor" stroke="none" />
      <path d="M16 10.4c.4-1.35 1.5-2.1 3.05-2.1 1.9 0 3.15 1.25 3.15 3.45v.6h-6.25" />
      <path d="M15.95 12.35c.08 1.45.92 2.25 2.2 2.25.92 0 1.55-.35 1.9-1.05h2.05c-.45 1.65-1.85 2.65-3.98 2.65-2.68 0-4.28-1.5-4.28-4.05 0-2.5 1.65-4.1 4.2-4.1 2.58 0 4.16 1.65 4.16 4.3H15.95Z" fill="currentColor" stroke="none" />
      <path d="M17.1 5.65h3.65" />
    </svg>
  );
}

export default function ContactPage() {
  const socials = site.socials.filter((s) => s.label !== "Phone");

  return (
    <div className="relative min-h-[100svh] flex flex-col justify-center px-5 md:px-10 pt-24 pb-16 overflow-hidden">
      <TickMarks corners={["tl", "tr"]} />
      <div className="max-w-grid mx-auto w-full">
        <p className="text-xs tracking-[0.2em] uppercase text-muted font-semibold mb-6">Contact</p>

        <h1 className="text-display font-extralight tracking-tight leading-[0.98] mb-14 md:mb-20">
          {site.contact.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="grid gap-0 max-w-xl">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 py-7 md:py-8 border-b border-line group"
            >
              <span className="shrink-0 text-muted group-hover:text-accent transition-colors duration-300 ease-editorial">
                <SocialIcon label={s.label} />
              </span>
              <span className="text-base md:text-lg uppercase tracking-[0.14em] text-muted group-hover:text-accent transition-colors duration-300 ease-editorial">
                {s.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
