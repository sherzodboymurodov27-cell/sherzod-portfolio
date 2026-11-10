import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sherzod Boymurodov on Instagram, Telegram, Behance or by phone.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader lines={["Let's"]} script="talk" label="Let's talk">
        <p className="lead">
          Write about your project on Telegram or Instagram, or call. I&rsquo;m based in {site.location} and work with
          brands anywhere.
        </p>
      </PageHeader>

      <section className="contact-list" aria-label="Ways to reach me">
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
                    <path d="M7 17 17 7M9 7h8v8" />
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
