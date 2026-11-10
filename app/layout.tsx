import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

// Self-hosted variable font (Latin + Cyrillic support) — avoids a Google
// Fonts network fetch at build time, which some CI/deploy environments block.
const manrope = localFont({
  src: "../public/fonts/Manrope-Variable.ttf",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

// Display face for the name: Archivo's width axis (62–125%) lets both name
// lines be set to one measure. Latin subset only; OFL-1.1.
const archivo = localFont({
  src: [
    { path: "../public/fonts/Archivo-Variable.woff2", style: "normal" },
    { path: "../public/fonts/Archivo-Variable-Italic.woff2", style: "italic" },
  ],
  variable: "--font-archivo",
  display: "swap",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
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
  title: {
    default: site.seo.title,
    template: `%s — ${site.name}`,
  },
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    type: "website",
    siteName: site.name,
  },
  icons: {
    icon: "/favicon.svg",
  },
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
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
