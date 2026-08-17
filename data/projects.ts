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
      { type: "full", image: "/images/projects/zamin-maktabi-smm-2026/02.webp", alt: "Zamin Maktabi — Open Doors Day visual" },
      { type: "full", image: "/images/projects/zamin-maktabi-smm-2026/03.webp", alt: "Zamin Maktabi — teacher recruitment visual" },
      { type: "full", image: "/images/projects/zamin-maktabi-smm-2026/04.webp", alt: "Zamin Maktabi — 8K achievement visual" },
      { type: "full", image: "/images/projects/zamin-maktabi-smm-2026/05.webp", alt: "Zamin Maktabi — Open Doors Day keyhole concept" },
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
