# DESIGN.md — Sherzod Boymurodov portfolio

Direction: a dark, graphite-to-grey stage for a graphic designer whose work lives on phone screens and in print.
Structure, rhythm and signature objects follow the reference the owner chose (dylanbrouwer.design) on purpose:
huge headline with a 3D monitor in front, grid columns as lines, light paper sections for work and services,
chrome objects, a lanyard badge and a giant wordmark in the footer. Name, copy, imagery and the print details
(crop marks, CMYK strip, registration mark) are his own.

## Color

| Token | Value | Role |
|---|---|---|
| `ink` | `#050506` | Page base, footer, dark sections |
| `graphite-1` | `#18181B` | Hero gradient, raised dark surfaces |
| `graphite-2` | `#4A4A4F` | Hero gradient middle |
| `graphite-3` | `#6A6A6F` | Hero gradient bottom |
| `paper` | `#E7E7E8` | Light sections (work, services) |
| `paper-2` | `#F4F4F4` | Cards and panels on paper |
| `text` | `#F1F1F0` | Text on dark (18:1 on ink) |
| `text-soft` | `#C9C9CB` | Lead paragraphs on dark |
| `text-muted` | `#9A9A9D` | Secondary text on dark (7.3:1 on ink) |
| `text-dark` | `#0C0C0D` | Text on paper (15.8:1) |
| `text-dark-muted` | `#55555A` | Secondary text on paper (6:1) |
| `line` | `rgba(255,255,255,0.08)` | Grid lines on dark |
| `line-strong` | `rgba(255,255,255,0.16)` | Row dividers and button borders on dark |
| `line-dark` | `rgba(0,0,0,0.09)` | Grid lines and dividers on paper |
| `signal` | `#FF5A1F` | The one accent: dots (nav, buttons, live clock, captions, service titles), superscript counts, the ALL WORK underline, button and contact-row hover, badge strap, footer glow. Never body text. |

Headline metal: `--metal` `#FFF → #E4E4E7 → #A9A9AE → #6E6E73`; italic lines use `--metal-deep`
`#D9D9DC → #9A9A9F → #5E5E63 → #3E3E42`. Hero, page titles, next-project title and the footer wordmark only.

## Typography

One family for everything: **Archivo** (OFL), roman and italic, variable weight 400–800, width fixed at 100%,
self-hosted and subset to Latin (28 KB + 31 KB). No script, no mono, no second family.

| Class | Weight | Size | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `.display` hero line 1 | 800 | `min(17.6vw, 31vh)` | 0.84 | −0.035em | SHERZOD, metal gradient |
| `.display-italic` hero line 2 | 800 italic | 0.8 × line 1 | 0.84 | −0.045em | DESIGNER, deeper metal |
| `.display` page | 800 | `clamp(64px, 15vw, 240px)` | 0.86 | −0.035em | ABOUT / *ME*, LET'S / *TALK*, client name |
| `.display` section | 800 | `clamp(56px, 9vw, 150px)` | 0.86 | −0.035em | ALL WORK, CTA (second line italic), contact rows |
| `.statement` | 600 | `clamp(32px, 4.8vw, 76px)` | 1.04 | −0.04em | Home about sentence, max 23ch |
| `.section-heading` | 700 | `clamp(22px, 2vw, 30px)` | 1.1 | −0.03em | What I do, Brands, Teams, Tools |
| card title | 700 | `clamp(26px, 2.2vw, 34px)` | 1.05 | −0.03em | Services, work cards |
| `.lead` | 400 | `clamp(19px, 1.55vw, 24px)` | 1.42 | −0.015em | Intros, descriptions, max 44ch |
| body | 400 | 17px | 1.6 | 0 | Paragraphs, max 64ch |
| secondary | 400 | 16px | 1.5 | 0 | Card and list descriptions, footer links |
| UI | 600 | 12px uppercase | 1 | 0.08em | Buttons, nav |
| `.meta` | 500 | 11px uppercase | 1.4 | 0.08em | Tags, facts, clock; tabular figures |

Two-line titles: first line roman, second line italic of the same weight, never a different typeface.
Superscript counts are 0.24em of the display size, in signal orange.
Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`; no sentence ends on a lone word.

## Spacing and layout

- 8px scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- Content width 1440px; side padding `clamp(16px, 2.6vw, 40px)`.
- Section padding `clamp(96px, 14vh, 160px)` (`--section-y`).
- Grid: 6 columns desktop, 4 under 768px, drawn as 1px vertical lines on every section.
- Text left-aligned everywhere except the hero headline.

## Shape and depth

- Radius: 0 on work images and sections; 4px on buttons, tags and the contact button; the monitor and badge keep their own.
- One shadow, for objects only (monitor, badge): `0 50px 60px rgba(0,0,0,.55)`. No shadows on cards or text.
- No glassmorphism except the navbar after scroll (`rgba(5,5,6,.78)` + 16px blur).

## Components

- **Nav**: "SB" mark left; dotted text links center (dot turns `signal` when hovered or current); dark contact button right with a signal dot. Mobile: Menu toggle opens a full-height list in display type; page behind is inert and does not scroll; Escape closes and returns focus.
- **Button** (`.btn`): dark, 1px border, 4px radius, 12px uppercase 600, min height 40px, never wraps. `.btn-signal` adds the orange dot.
- **Hero**: SHERZOD over italic DESIGNER in metal display type, three.js monitor playing a feed of posts. A flat HTML monitor with the same posts shows until the 3D is ready and when WebGL is missing.
- **Work tile**: image with no radius at varied sizes in a staggered grid; caption (signal dot, client, category) under the image, never over the artwork. Only the first tile per project is a tab stop.
- **All work link**: display word with a superscript count (hidden from screen readers, count read as text).
- **Collaborations**: light band of slanted cells, logos as dark silhouettes with names as alt text, drifting continuously (owner's choice: no pause); a static grid under reduced motion.
- **Service card**: paper-2 panel with crop marks, a chrome object on a dark gradient (one shared WebGL canvas for all cards; flat SVG fallback), title and one-line description. Ghost "SERVICES" word above is decorative; the real heading is "What I do".
- **Footer**: giant two-line CTA (hidden on /contact), lanyard badge (hidden on /contact and without WebGL; drag with a mouse, swings on its own on touch), links, full-width metal wordmark, signal glow at the bottom edge.
- **Page header** (inner pages): giant metal display word(s), optional italic second line, lead and facts.

## Imagery

- Only real project work: posts, covers, print. No stock photos, no AI people.
- Every image under /public/images has a 640px variant; `lib/img.ts` adds width, height and srcset from `data/image-sizes.json` (regenerate with `python3 scripts/prepare_images.py`).
- Icons: simple 1.6–1.8px stroke line icons drawn inline; no emoji, no icon font.
- Social preview: `public/og.png` (1200×630).

## Motion

GSAP + ScrollTrigger, Lenis smooth scroll, three.js. One load sequence (headline rises, monitor settles), one
sticky scroll scene in the hero (camera moves into the screen, grid columns close over it), a soft
blur-to-sharp reveal on the about statement, parallax on work tiles, a trailing "View" cursor, the footer CTA
rising in. 3D scenes are created when near the viewport, render only while on screen and draw still frames
under `prefers-reduced-motion`, where all other motion is off.
