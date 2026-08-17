export type ProjectBlock =
  | { type: "full"; image: string; alt: string }
  | { type: "split"; images: [string, string]; alt: [string, string] }
  | { type: "single"; image: string; alt: string }
  | { type: "text"; heading?: string; body: string };

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  gridSpan?: 1 | 2;
  description: string;
  cover: string;
  coverAlt: string;
  blocks: ProjectBlock[];
}

export const projects: Project[] = [
  {
    slug: "zamin-maktabi-smm-2026",
    title: "Zamin Maktabi — SMM 2026",
    category: "Social Media",
    year: "2026",
    role: "Graphic Designer",
    gridSpan: 2,
    description:
      "A social media design series created for Zamin Maktabi, combining bold editorial typography, blue-led visual direction and AI-assisted photographic compositions for admissions and school communication campaigns.",
    cover: "/images/projects/zamin-maktabi-smm-2026/01.webp",
    coverAlt: "Zamin Maktabi SMM — Open Doors Day",
    blocks: [
      { type: "full", image: "/images/projects/zamin-maktabi-smm-2026/02.webp", alt: "Zamin Maktabi — Primary school teacher recruitment visual" },
      { type: "full", image: "/images/projects/zamin-maktabi-smm-2026/03.webp", alt: "Zamin Maktabi — 8K achievement announcement" },
      { type: "full", image: "/images/projects/zamin-maktabi-smm-2026/04.webp", alt: "Zamin Maktabi — Open Doors Day keyhole concept" },
      { type: "full", image: "/images/projects/zamin-maktabi-smm-2026/05.webp", alt: "Zamin Maktabi — Russian-language classes admission announcement" },
    ],
  },
  {
    slug: "project-01",
    title: "Project 01",
    category: "Brand Identity",
    year: "2026",
    role: "Graphic Designer",
    gridSpan: 2,
    description: "Placeholder project. Replace this description with a short introduction to the brief, the client and the approach.",
    cover: "/images/projects/project-01/cover.webp",
    coverAlt: "Project 01 cover placeholder",
    blocks: [
      { type: "full", image: "/images/projects/project-01/01.webp", alt: "Project 01 — full width visual" },
      { type: "text", heading: "Process", body: "Replace with process notes: research, concept, iteration." },
      { type: "split", images: ["/images/projects/project-01/02.webp", "/images/projects/project-01/03.webp"], alt: ["Project 01 — detail one", "Project 01 — detail two"] },
      { type: "single", image: "/images/projects/project-01/04.webp", alt: "Project 01 — detail visual" },
    ],
  },
  {
    slug: "project-02",
    title: "Project 02",
    category: "Art Direction",
    year: "2026",
    role: "Art Director",
    gridSpan: 1,
    description: "Placeholder project. Replace with a short introduction to the brief and approach.",
    cover: "/images/projects/project-02/cover.webp",
    coverAlt: "Project 02 cover placeholder",
    blocks: [
      { type: "full", image: "/images/projects/project-02/01.webp", alt: "Project 02 — full width visual" },
      { type: "single", image: "/images/projects/project-02/02.webp", alt: "Project 02 — detail visual" },
    ],
  },
  {
    slug: "project-03",
    title: "Project 03",
    category: "Advertising",
    year: "2025",
    role: "Graphic Designer",
    gridSpan: 1,
    description: "Placeholder project. Replace with a short introduction to the brief and approach.",
    cover: "/images/projects/project-03/cover.webp",
    coverAlt: "Project 03 cover placeholder",
    blocks: [
      { type: "full", image: "/images/projects/project-03/01.webp", alt: "Project 03 — full width visual" },
      { type: "split", images: ["/images/projects/project-03/02.webp", "/images/projects/project-03/03.webp"], alt: ["Project 03 — detail one", "Project 03 — detail two"] },
    ],
  },
  {
    slug: "project-04",
    title: "Project 04",
    category: "Digital Design",
    year: "2025",
    role: "Graphic Designer",
    gridSpan: 2,
    description: "Placeholder project. Replace with a short introduction to the brief and approach.",
    cover: "/images/projects/project-04/cover.webp",
    coverAlt: "Project 04 cover placeholder",
    blocks: [
      { type: "full", image: "/images/projects/project-04/01.webp", alt: "Project 04 — full width visual" },
      { type: "text", heading: "Details", body: "Replace with notes on the deliverables and system." },
      { type: "single", image: "/images/projects/project-04/02.webp", alt: "Project 04 — detail visual" },
    ],
  },
  {
    slug: "project-05",
    title: "Project 05",
    category: "Brand Identity",
    year: "2025",
    role: "Graphic Designer",
    gridSpan: 1,
    description: "Placeholder project. Replace with a short introduction to the brief and approach.",
    cover: "/images/projects/project-05/cover.webp",
    coverAlt: "Project 05 cover placeholder",
    blocks: [
      { type: "full", image: "/images/projects/project-05/01.webp", alt: "Project 05 — full width visual" },
      { type: "split", images: ["/images/projects/project-05/02.webp", "/images/projects/project-05/03.webp"], alt: ["Project 05 — detail one", "Project 05 — detail two"] },
    ],
  },
  {
    slug: "project-06",
    title: "Project 06",
    category: "Art Direction",
    year: "2024",
    role: "Art Director",
    gridSpan: 1,
    description: "Placeholder project. Replace with a short introduction to the brief and approach.",
    cover: "/images/projects/project-06/cover.webp",
    coverAlt: "Project 06 cover placeholder",
    blocks: [
      { type: "full", image: "/images/projects/project-06/01.webp", alt: "Project 06 — full width visual" },
      { type: "single", image: "/images/projects/project-06/02.webp", alt: "Project 06 — detail visual" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
