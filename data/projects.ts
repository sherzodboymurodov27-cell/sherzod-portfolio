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
    title: "Silk Road Express — Seasonal Campaign",
    category: "Social Media",
    year: "2026",
    role: "Graphic Designer",
    gridSpan: 1,
    description:
      "Seasonal campaign visuals for Silk Road Express, a cargo and delivery brand: a teaser, 11.11 Sale, Black Friday and Cyber Monday posts built on a red and white identity with bold italic typography and three-dimensional product scenes.",
    cover: "/images/projects/project-02/cover.webp",
    coverAlt: "Silk Road Express Black Friday campaign post",
    blocks: [
      {
        type: "gallery",
        images: [
          "/images/projects/project-02/01.webp",
          "/images/projects/project-02/02.webp",
          "/images/projects/project-02/03.webp",
          "/images/projects/project-02/04.webp",
          "/images/projects/project-02/05.webp",
          "/images/projects/project-02/06.webp"
        ],
        alt: [
          "Silk Road Express teaser post, coming soon",
          "Silk Road Express November discount days post",
          "Silk Road Express 11.11 Sale post",
          "Silk Road Express Black Friday post",
          "Silk Road Express Cyber Monday post",
          "Silk Road Express US online shopping delivery post"
        ],
      },
    ],
  },
  {
    slug: "project-03",
    title: "ESSI — Social Media Series",
    category: "Social Media",
    year: "2026",
    role: "Graphic Designer",
    gridSpan: 1,
    description:
      "A social media series for ESSI dairy products built on one idea: a magnifying glass that reveals the products, from yogurt and qaymoq to tvorog. Warm wood tones keep the packaging as the focus, with a separate frozen curd snack post.",
    cover: "/images/projects/project-03/cover.webp",
    coverAlt: "ESSI products seen through a magnifying glass",
    blocks: [
      {
        type: "gallery",
        images: [
          "/images/projects/project-03/01.webp",
          "/images/projects/project-03/02.webp",
          "/images/projects/project-03/03.webp",
          "/images/projects/project-03/04.webp"
        ],
        alt: [
          "ESSI teaser post, tiny products on a wooden table",
          "ESSI products under a magnifying glass",
          "ESSI qaymoq post",
          "ESSI tvorog post"
        ],
      },
      { type: "single", image: "/images/projects/project-03/05.webp", alt: "ESSI curd snacks in a freezer, social media post" },
    ],
  },
  {
    slug: "project-04",
    title: "Sirdarya Metal Construction — Social Media",
    category: "Social Media",
    year: "2026",
    role: "Graphic Designer",
    gridSpan: 1,
    description:
      "Informational social posts for Sirdarya Metal Construction explaining steel structure topics such as standard versus custom design, fasteners, connections and special structures, using one yellow and navy caption system over architectural photography.",
    cover: "/images/projects/project-04/cover.webp",
    coverAlt: "Sirdarya Metal Construction post with steel frame photography",
    blocks: [
      {
        type: "gallery",
        images: [
          "/images/projects/project-04/01.webp",
          "/images/projects/project-04/02.webp",
          "/images/projects/project-04/03.webp",
          "/images/projects/project-04/04.webp"
        ],
        alt: [
          "Sirdarya Metal Construction post on bolts and fasteners",
          "Sirdarya Metal Construction post on fastening elements",
          "Sirdarya Metal Construction post on individual connections",
          "Sirdarya Metal Construction post on special structures"
        ],
      },
    ],
  },
  {
    slug: "project-05",
    title: "Abu Sahiy Cargo — Print & Social",
    category: "Print & Social",
    year: "2026",
    role: "Graphic Designer",
    gridSpan: 1,
    description:
      "Print and social materials for Abu Sahiy Cargo, a cargo service on the Belarus to Uzbekistan route: a trifold brochure in two versions and a promotional post for NVIDIA AI hardware orders.",
    cover: "/images/projects/project-05/cover.webp",
    coverAlt: "Abu Sahiy Cargo trifold brochure",
    blocks: [
      {
        type: "split",
        images: ["/images/projects/project-05/01.webp", "/images/projects/project-05/02.webp"],
        alt: ["Abu Sahiy Cargo NVIDIA AI hardware promotional post", "Abu Sahiy Cargo trifold brochure, front and back"],
      },
      { type: "single", image: "/images/projects/project-05/03.webp", alt: "Abu Sahiy Cargo trifold brochure, second version" },
    ],
  },
  {
    slug: "project-06",
    title: "Zikrilla Marinade — Food Content",
    category: "Social Media",
    year: "2026",
    role: "Graphic Designer",
    gridSpan: 1,
    description:
      "Recipe-idea posts for Zikrilla Marinade built on a red monogram pattern: one dish per post, from minced meat basics to kotlet, golubtsi and manti, with a repeatable white card layout.",
    cover: "/images/projects/project-06/cover.webp",
    coverAlt: "Zikrilla Marinade minced meat recipe post",
    blocks: [
      {
        type: "gallery",
        images: [
          "/images/projects/project-06/01.webp",
          "/images/projects/project-06/02.webp",
          "/images/projects/project-06/03.webp",
          "/images/projects/project-06/04.webp"
        ],
        alt: [
          "Zikrilla Marinade post on dishes made with minced meat",
          "Zikrilla Marinade kotlet post",
          "Zikrilla Marinade golubtsi post",
          "Zikrilla Marinade manti post"
        ],
      },
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
