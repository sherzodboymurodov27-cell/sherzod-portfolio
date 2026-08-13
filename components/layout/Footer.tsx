import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="max-w-grid mx-auto px-5 md:px-10 py-10 md:py-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-sm font-semibold tracking-tight">{site.name}</p>
          <p className="text-sm text-muted mt-1">{site.role}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.label === "Email" ? undefined : "_blank"}
              rel={s.label === "Email" ? undefined : "noopener noreferrer"}
              className="text-muted hover:text-ink transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-muted">
          &copy; {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
