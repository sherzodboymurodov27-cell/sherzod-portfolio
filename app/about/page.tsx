import type { Metadata } from "next";
import { site } from "@/data/site";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "About",
  description: site.seo.description,
};

export default function AboutPage() {
  return (
    <div className="pt-32 md:pt-44 pb-20 md:pb-32">
      <div className="max-w-grid mx-auto px-5 md:px-10">
        <p className="text-xs tracking-[0.18em] uppercase text-muted font-semibold mb-6">About</p>

        <h1 className="text-h1 font-extralight tracking-tight max-w-3xl mb-10 md:mb-14">
          {site.role} based in {site.location}.
        </h1>

        <div className="max-w-2xl grid gap-5 text-lg md:text-xl leading-relaxed tracking-tight text-ink/90">
          {site.about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <div className="mt-20 md:mt-32">
        <Services />
      </div>
    </div>
  );
}
