export type ProjectBlock =
  | { type: "full"; image: string; alt: string }
  | { type: "split"; images: [string, string]; alt: [string, string] }
  | { type: "gallery"; images: string[]; alt: string[] }
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
    slug: "project-01",
    title: "Zamin Maktabi — Social Media",
    category: "Social Media",
    year: "2026",
    role: "Graphic Designer",
    gridSpan: 2,
    description:
      "A selection of social media campaigns and promotional visuals created for Zamin Maktabi, combining bold typography, vivid blue tones and conceptual photography to communicate school news, admissions and events.",
    cover: "/images/projects/project-01/cover.webp",
    coverAlt: "Zamin Maktabi social media campaign cover",
    blocks: [
      {
        type: "gallery",
        images: [
          "/images/projects/project-01/01.webp",
          "/images/projects/project-01/02.webp",
          "/images/projects/project-01/03.webp",
          "/images/projects/project-01/04.webp",
          "/images/projects/project-01/05.webp",
        ],
        alt: [
          "Zamin Maktabi — Open Doors Day visual",
          "Zamin Maktabi — event campaign visual",
          "Zamin Maktabi — admission campaign visual",
          "Zamin Maktabi — teacher recruitment visual",
          "Zamin Maktabi — Open Doors Day campaign visual",
        ],
      },
    ],
  },
  {
    slug: "project-02",
    title: "Project 02",
    category: "Art Direction",
    year: "2026",
    role: "Graphic Designer",
    gridSpan: 1,
    description: "Additional portfolio project — to be replaced with a selected body of work.",
    cover: "/images/projects/project-02/cover.webp",
    coverAlt: "Project 02 cover",
    blocks: [
      { type: "full", image: "/images/projects/project-02/01.webp", alt: "Project 02 visual" },
      { type: "single", image: "/images/projects/project-02/02.webp", alt: "Project 02 detail" },
    ],
  },
  {
    slug: "project-03",
    title: "Project 03",
    category: "Advertising",
    year: "2025",
    role: "Graphic Designer",
    gridSpan: 1,
    description: "Selected visual design work — to be replaced with a final project narrative.",
    cover: "/images/projects/project-03/cover.webp",
    coverAlt: "Project 03 cover",
    blocks: [
      { type: "full", image: "/images/projects/project-03/01.webp", alt: "Project 03 visual" },
      { type: "split", images: ["/images/projects/project-03/02.webp", "/images/projects/project-03/03.webp"], alt: ["Project 03 detail one", "Project 03 detail two"] },
    ],
  },
  {
    slug: "project-04",
    title: "Project 04",
    category: "Digital Design",
    year: "2025",
    role: "Graphic Designer",
    gridSpan: 2,
    description: "Selected digital design work — to be replaced with a final project narrative.",
    cover: "/images/projects/project-04/cover.webp",
    coverAlt: "Project 04 cover",
    blocks: [
      { type: "full", image: "/images/projects/project-04/01.webp", alt: "Project 04 visual" },
      { type: "text", heading: "Details", body: "Project details and deliverables to be added." },
      { type: "single", image: "/images/projects/project-04/02.webp", alt: "Project 04 detail" },
    ],
  },
  {
    slug: "project-05",
    title: "Project 05",
    category: "Brand Identity",
    year: "2025",
    role: "Graphic Designer",
    gridSpan: 1,
    description: "Selected branding work — to be replaced with a final project narrative.",
    cover: "/images/projects/project-05/cover.webp",
    coverAlt: "Project 05 cover",
    blocks: [
      { type: "full", image: "/images/projects/project-05/01.webp", alt: "Project 05 visual" },
      { type: "split", images: ["/images/projects/project-05/02.webp", "/images/projects/project-05/03.webp"], alt: ["Project 05 detail one", "Project 05 detail two"] },
    ],
  },
  {
    slug: "project-06",
    title: "Project 06",
    category: "Art Direction",
    year: "2024",
    role: "Art Director",
    gridSpan: 1,
    description: "Selected art direction work — to be replaced with a final project narrative.",
    cover: "/images/projects/project-06/cover.webp",
    coverAlt: "Project 06 cover",
    blocks: [
      { type: "full", image: "/images/projects/project-06/01.webp", alt: "Project 06 visual" },
      { type: "single", image: "/images/projects/project-06/02.webp", alt: "Project 06 detail" },
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
