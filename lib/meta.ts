import type { Metadata } from "next";
import { site } from "@/data/site";

/** Page metadata with its own canonical URL and social preview. */
export function pageMeta(title: string | null, description: string, path: string): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : site.seo.title;
  return {
    title: title ?? { absolute: site.seo.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, graphic designer` }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/og.png"] },
  };
}
