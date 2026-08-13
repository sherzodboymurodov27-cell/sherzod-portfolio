import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: site.seo.description,
};

export default function ContactPage() {
  return (
    <div className="min-h-[100svh] flex flex-col justify-center px-5 md:px-10 pt-24 pb-16">
      <div className="max-w-grid mx-auto w-full">
        <p className="text-xs tracking-[0.18em] uppercase text-muted font-semibold mb-6">Contact</p>

        <h1 className="text-display font-extralight tracking-tight leading-[0.98] mb-14 md:mb-20">
          {site.contact.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="grid gap-6 md:gap-8 max-w-xl">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.label === "Email" ? undefined : "_blank"}
              rel={s.label === "Email" ? undefined : "noopener noreferrer"}
              className="flex items-baseline justify-between border-b border-line pb-4 group"
            >
              <span className="text-xs uppercase tracking-[0.14em] text-muted">{s.label}</span>
              <span className="text-lg md:text-xl tracking-tight group-hover:opacity-60 transition-opacity duration-200">
                {s.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
