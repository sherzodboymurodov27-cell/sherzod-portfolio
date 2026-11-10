import type { Metadata } from "next";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/meta";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMeta(
  "Contact",
  "Get in touch with Sherzod Boymurodov on Instagram, Telegram, Behance or by phone.",
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <PageHeader lines={["Let's"]} script="talk" label="Let's talk">
        <p className="lead">
          Write about your project on Telegram or Instagram, or call. I&rsquo;m based in {site.location}, and work with
          brands anywhere.
        </p>
      </PageHeader>

      <section className="contact-list" aria-label="Ways to reach me">
        <div className="section-grid" aria-hidden="true" />
        <ul className="container">
          {site.socials.map((s) => {
            const external = s.label !== "Phone";
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="contact-row"
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  <span className="display contact-label">{s.label}</span>
                  <span className="contact-value">{s.value}</span>
                  <svg className="contact-arrow" viewBox="0 0 24 24" aria-hidden="true">
                    {/* Outbound links point out of the page; the phone row points across. */}
                    <path d={external ? "M7 17 17 7M9 7h8v8" : "M4 12h16M14 6l6 6-6 6"} />
                  </svg>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
