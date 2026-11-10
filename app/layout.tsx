import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/meta";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

// Self-hosted variable font (Latin + Cyrillic support) — avoids a Google
// Fonts network fetch at build time, which some CI/deploy environments block.
const manrope = localFont({
  src: "../public/fonts/Manrope-Variable.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

// Display face: Archivo 800 at 100% width, instanced and Latin-subset (OFL-1.1).
const archivo = localFont({
  src: "../public/fonts/Archivo-800.woff2",
  variable: "--font-archivo",
  display: "swap",
  weight: "800",
});

// Script face for the "Designer" signature line. OFL-1.1.
const parisienne = localFont({
  src: "../public/fonts/Parisienne.woff2",
  variable: "--font-script",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...pageMeta(null, site.seo.description, "/"),
  alternates: undefined,
  title: { default: site.seo.title, template: `%s — ${site.name}` },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${archivo.variable} ${parisienne.variable}`}>
      <body>
         <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <Navbar />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
