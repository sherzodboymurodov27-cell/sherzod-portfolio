import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { publishedProjects } from "@/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/contact", ...publishedProjects.map((p) => `/work/${p.slug}`)];
  return pages.map((path) => ({ url: `${site.url}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 }));
}
