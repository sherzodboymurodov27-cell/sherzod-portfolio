# Sherzod — Portfolio Website

A minimal, editorial portfolio built with Next.js 14 (App Router), TypeScript and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

Build for production (static export):

```bash
npx next build
```

This generates a fully static site in `out/` — no server, no API routes, ready for any static host.

Preview the exported static build locally with any static file server, e.g.:

```bash
npx serve out
```

## Deployment — Cloudflare Pages

This project is configured for static export (`output: "export"` in `next.config.mjs`), so it deploys to Cloudflare Pages with no adapter or extra dependency.

**Dashboard settings:**

| Setting | Value |
|---|---|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npx next build` |
| Build output directory | `out` |

**Steps:**

1. Push this project to a GitHub repository.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, select the repo.
3. Set the three values above (Cloudflare's Next.js preset fills the first one in automatically; confirm build command and output directory match).
4. Deploy. Every push to the connected branch redeploys automatically.
5. Once you know the real domain (custom domain or the `*.pages.dev` one Cloudflare assigns), update `url` in `data/site.ts` — it's the single source for the Open Graph/canonical URL.

**Other static hosts** (Netlify, GitHub Pages, S3, etc.) work the same way: run `npx next build`, deploy the `out/` folder.

## Project structure

```
app/                    routes (/, /work/[slug], /about, /contact)
components/
  layout/                Navbar, Footer
  sections/               Hero, SelectedWork, AboutSection, Services, ContactSection
  project/                ProjectHero, ProjectVisuals, NextProject
  ui/                     SectionTitle, RevealOnScroll
data/
  site.ts                 all site-wide copy, socials, services
  projects.ts              all project data
public/
  images/projects/<slug>/  project images
  fonts/                   self-hosted Manrope variable font
```

## Adding a new project

1. Create a folder: `public/images/projects/<slug>/`
2. Add a `cover.webp` (portrait, ~4:5) plus whatever detail images you want to use.
3. Open `data/projects.ts`, copy one of the existing project objects, and edit it:
   - `slug` — must match the folder name, becomes the URL `/work/<slug>`
   - `title`, `category`, `year`, `role`, `description`
   - `gridSpan` — `2` makes the card span two columns on the homepage grid, `1` is a single column
   - `blocks` — the content of the project page, in order. Each block is one of:
     - `{ type: "full", image, alt }` — full-width image
     - `{ type: "split", images: [a, b], alt: [a, b] }` — two images side by side
     - `{ type: "single", image, alt }` — one centered, smaller image
     - `{ type: "text", heading?, body }` — a paragraph of process/detail copy

The project appears automatically on the homepage grid and gets its own page — no other file needs to change.

To remove a project, delete its object from the `projects` array (and, optionally, its image folder).

## Replacing images

Drop new files into the relevant `public/images/projects/<slug>/` folder and update the paths in `data/projects.ts`. `.webp` is recommended for size; `.jpg`/`.png` also work.

## Changing personal information

All of it lives in `data/site.ts`:

- `name`, `role`, `tagline`, `location` — used in the hero and about page
- `about.body` — About section copy
- `services` — the four service rows
- `contact` — the closing headline on the homepage
- `socials` — email, Telegram, LinkedIn, Behance, Instagram (edit `href` and `value`)

## Deployment

The site is a standard Next.js app and deploys to any platform that supports Next.js:

**Vercel (recommended, zero config)**
```bash
npx vercel
```

**Netlify** — connect the repo, build command `npm run build`, publish directory is handled automatically by the Next.js runtime plugin.

**Static export** (GitHub Pages or any static host) — if you don't need image optimization at request time, add `output: "export"` to `next.config.mjs`, run `npm run build`, and deploy the generated `out/` folder.

## Notes

- Placeholder images and copy are clearly labeled (`PROJECT 01`–`06`, `hello@example.com`, etc.) — replace them before launch.
- The font (Manrope) is self-hosted from `public/fonts/` rather than fetched from Google Fonts at build time, so builds work in offline/restricted CI environments.
- Respects `prefers-reduced-motion`; all interactive elements have visible focus states.
