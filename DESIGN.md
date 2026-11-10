# DESIGN.md — Sherzod Boymurodov portfolio

Direction: a dark, graphite-to-grey stage for a graphic designer whose work lives on phone screens and in print.
Structure and rhythm follow the reference the owner chose (dylanbrouwer.design): huge two-line headline, one
object in front of it, columns visible as grid lines, light sections for the work. Brand, copy, imagery and the
phone object are his own; nothing is copied from the reference.

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
| `text-muted` | `#9A9A9D` | Secondary text on dark (7.3:1 on ink) |
| `text-dark` | `#0C0C0D` | Text on paper (15.8:1) |
| `text-dark-muted` | `#55555A` | Secondary text on paper (6:1) |
| `line` | `rgba(255,255,255,0.08)` | Grid lines and dividers on dark |
| `line-dark` | `rgba(0,0,0,0.09)` | Grid lines and dividers on paper |
| `signal` | `#FF5A1F` | The one accent: status dots, active nav, current slide, footer glow. Never body text. |

Headline metal (owner's choice, from the reference): `#FAFAFA → #BDBDC1 → #7C7C81` top to bottom; italic line
`#D7D7DA → #8E8E93 → #5C5C61`. Used only on the hero and footer wordmark.

## Typography

Three voices, never mixed inside one line except display + script.

- **Display — Archivo** (variable, OFL), weight 800, uppercase, tracking −0.035em, line height 0.86. Names,
  page words and section words only. Metal gradient on dark (`.metal`), flat ink on paper.
- **Script — Parisienne** (OFL), 400. Written across display type, rotated −6°, never smaller than 40px and
  never on its own as body copy. One script word per view.
- **Body — Manrope** (variable): 600 for the statement and card titles, 500 for UI text, 400 for paragraphs.
- **Meta — system mono**, 11px uppercase, 0.06em tracking, tabular figures: tags, facts, time.

| Class | Size | Line height | Tracking | Use |
|---|---|---|---|---|
| `.display` hero | `min(19vw, 36vh)` | 0.86 | −0.035em | SHERZOD |
| `.display` page | `clamp(64px, 15vw, 240px)` | 0.86 | −0.035em | ABOUT, WORK, LET'S, client name |
| `.display` section | `clamp(56px, 9vw, 150px)` | 0.86 | −0.035em | ALL WORK, CTA, contact rows |
| `.script` | 0.6–0.65 × the display it sits on | 1 | 0 | Designer, me, talk, in mind? |
| `.statement` | `clamp(34px, 5.4vw, 88px)` | 1.03 | −0.038em | About sentence, max 21ch, balanced |
| card title | `clamp(26px, 2.2vw, 34px)` 700 | 1.05 | −0.03em | Services, work cards |
| `.lead` | `clamp(19px, 1.55vw, 24px)` | 1.42 | −0.012em | Intros, project descriptions, max 44ch |
| body | 17px | 1.6 | 0 | Paragraphs, max 64ch |
| UI | 12px 600 uppercase | 1 | 0.08em | Buttons, nav |
| `.meta` | 11px mono | 1.4 | 0.06em | Tags, facts, clock |

Rules: headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`; no sentence ends on a lone word;
numbers in meta are tabular; superscript counts sit at 0.24em of the display size.

## Spacing and layout

- 8px scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- Content width 1440px; side padding `clamp(16px, 2.6vw, 40px)`.
- Section padding 160px top/bottom desktop, 96px mobile.
- Grid: 6 columns desktop, 4 mobile, drawn as 1px vertical lines on hero and paper sections.
- Text left-aligned everywhere except the hero headline.

## Shape and depth

- Radius: 0 on work images and sections; 4px on buttons, tags and the contact button; the phone keeps its own.
- One shadow, for objects only (the phone): `0 50px 60px rgba(0,0,0,.55)`. No shadows on cards or text.
- No glassmorphism except the navbar after scroll (`rgba(7,7,8,.72)` + 16px blur).

## Components

- **Nav**: "SB" mark left; dotted text links center (dot turns `signal` on hover); dark contact button right with a signal dot. Mobile: Menu toggle, full-height list, Escape closes.
- **Button**: dark (`graphite-1`, 1px `line` border, 4px radius, 12px uppercase); hover one step lighter; focus ring 2px `text` with 3px offset.
- **Work tile**: image with no radius at varied sizes in a staggered grid; a dark tag pinned bottom-left: `• Project name  Category`.
- **All work link**: big Archivo word with a superscript count.
- **Service card**: paper-2 panel, a crop of real work on top, title below; three across.
- **Footer**: giant metallic wordmark, links in two columns, contact button, signal glow at the bottom edge.

## Imagery

- Only real project work: posts, covers, print. No stock photos, no AI people.
- Hero phone shows a feed of chosen posts (4:5).
- Icons: simple 1.8px stroke line icons, drawn inline; no emoji, no icon font.

## Motion

GSAP + ScrollTrigger and Lenis smooth scroll. One load sequence (headline lines rise, phone settles), one
pinned scroll scene in the hero, blur-to-sharp reveal on the about statement, parallax offsets on work tiles.
Everything off under `prefers-reduced-motion`.
