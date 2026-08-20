import type { Metadata } from "next";
import { site } from "@/data/site";
import { TickMarks } from "@/components/ui/TickMarks";

export const metadata: Metadata = {
  title: "Contact",
  description: site.seo.description,
};

function SocialIcon({ label }: { label: string }) {
  const common = {
    width: 30,
    height: 30,
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

  if (label === "Phone") {
    return (
      <svg {...common}>
        <path d="M7.2 3.8 9.5 3c.65-.22 1.35.1 1.58.72l1.1 3.02c.2.55.03 1.17-.42 1.53l-1.58 1.25a14.1 14.1 0 0 0 4.3 4.3l1.25-1.58c.36-.45.98-.62 1.53-.42l3.02 1.1c.62.23.94.93.72 1.58l-.8 2.3c-.27.78-1 1.3-1.83 1.3C10.88 18.1 5.9 13.12 5.9 6.03c0-.83.52-1.56 1.3-1.83Z" />
      </svg>
    );
  }

  return (
    <svg {...common} viewBox="0 0 32 24">
      <text
        x="1"
        y="19"
        fill="currentColor"
        stroke="none"
        fontSize="18"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        Bē
      </text>
    </svg>
  );
}

export default function ContactPage() {
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

        <div className="grid gap-0 max-w-2xl">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.label === "Phone" ? undefined : "_blank"}
              rel={s.label === "Phone" ? undefined : "noopener noreferrer"}
              className="group relative flex items-center gap-5 py-5 md:py-6 border-b border-line overflow-hidden transition-transform duration-200 ease-out hover:translate-x-1"
            >
              <span className="absolute inset-0 -z-10 bg-white/[0.025] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
              <span className="shrink-0 text-accent transition-transform duration-200 ease-out group-hover:scale-110 group-hover:-rotate-6">
                <SocialIcon label={s.label} />
              </span>
              <span className="text-base md:text-lg uppercase tracking-[0.14em] text-primary transition-all duration-200 ease-out group-hover:text-accent group-hover:translate-x-1">
                {s.label}
              </span>
              <span
                aria-hidden="true"
                className="ml-auto text-xl md:text-2xl font-light text-primary transition-all duration-200 ease-out group-hover:text-accent group-hover:translate-x-2 group-hover:scale-125"
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
