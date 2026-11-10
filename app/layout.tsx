import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/meta";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

// The site's one typeface: Archivo (OFL-1.1), roman and italic, weights 400–800,
// self-hosted and subset to Latin. Display, body and labels all use it.
const archivo = localFont({
  src: [
    { path: "../public/fonts/Archivo.woff2", style: "normal", weight: "400 800" },
    { path: "../public/fonts/Archivo-Italic.woff2", style: "italic", weight: "400 800" },
  ],
  variable: "--font-archivo",
  display: "swap",
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
    <html lang="en" className={archivo.variable}>
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
