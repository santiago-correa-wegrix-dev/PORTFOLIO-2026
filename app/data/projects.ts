export interface Project {
  category: string;
  challenge?: string;
  description: string;
  id: string;
  imageColor: string;
  imageUrl?: string;
  role?: string;
  solution?: string;
  stack?: string[];
  title: string;
  url?: string;
  year: string;
}

export const realProjects: Project[] = [
  {
    category: "AI Newsletter",
    challenge:
      "Filtering signal from noise across hundreds of daily AI publications, papers, and launches.",
    description: "AI-curated daily brief on models, tools, and research. Human-edited, zero spam.",
    id: "dispatch",
    imageColor: "#1a1a1a",
    imageUrl: "/images/projects/dispatch.webp",
    role: "Curator & Editor",
    solution:
      "Built a curation pipeline that surfaces the highest-impact stories, then applies human editorial judgement before every send.",
    stack: ["AI Curation", "Editorial"],
    title: "Dispatch",
    url: "https://deliver-ai.xyz/",
    year: "2025 — Present",
  },
  {
    category: "Data Platform",
    challenge:
      "Modernizing a legacy monolithic architecture serving millions of daily users while maintaining zero downtime.",
    description: "Global business intelligence portal. React, Remix, Vue, Node.js.",
    id: "statista",
    imageColor: "#004e93",
    imageUrl: "/images/projects/statista.webp",
    role: "Senior Frontend Engineer",
    solution:
      "Architecting the migration to Remix, significantly improving Core Web Vitals and developer velocity through component modularization.",
    stack: [
      "Remix",
      "React",
      "AWS CDK",
      "Node.js",
      "TypeScript",
      "Vitest",
      "Playwright",
      "Tailwind",
      "SCSS",
      "PHP",
      "Vue.js",
      "Figma",
    ],
    title: "Statista",
    url: "https://www.statista.com/",
    year: "2024 — Present",
  },
  {
    category: "AI Research",
    challenge:
      "Visualizing complex, high-dimensional AI datasets in a performant, browser-based interface.",
    description: "AI-powered data analysis platform. Vue, Python.",
    id: "dnl",
    imageColor: "#4f46e5",
    imageUrl: "/images/projects/dnl.webp",
    role: "Frontend Engineer",
    solution:
      "Engineered a custom WebGL-accelerated visualization library, enabling real-time interaction with large-scale data models.",
    stack: ["Vue.js", "TypeScript", "Python Integration", "Figma"],
    title: "Deep Neuron Lab",
    url: "https://www.dnl.ai",
    year: "2023",
  },
  {
    category: "Industrial",
    challenge:
      "Unifying fragmented regional data into a seamless global dealer locator experience.",
    description: "Global dealer logistics platform.",
    id: "toyota",
    imageColor: "#cc0000",
    imageUrl: "/images/projects/toyota.webp",
    role: "Frontend Developer",
    solution:
      "Developed a robust geospatial search engine integration, reducing query times and improving lead generation conversion.",
    stack: ["Vue.js", "Google Maps API", "Laravel"],
    title: "Toyota Forklift",
    url: "https://www.toyotaforklift.com/",
    year: "2022",
  },
  {
    category: "Web3",
    challenge:
      "Bridging the UX gap between traditional e-commerce and complex blockchain interactions.",
    description: "Tokenized real-world asset marketplace.",
    id: "tresr",
    imageColor: "#10b981",
    imageUrl: "/images/projects/tresr.webp",
    role: "Lead Frontend",
    solution:
      "Led the frontend architecture, implementing seamless wallet integration and a friction-free checkout flow for non-crypto natives.",
    stack: ["React", "Web3.js", "Solidity", "Tailwind"],
    title: "Tresr",
    url: "https://www.tresr.com/",
    year: "2022",
  },
  {
    category: "HR SaaS",
    challenge:
      "Scaling complex payroll and benefits workflows for thousands of enterprise clients.",
    description: "Enterprise HR management platform.",
    id: "buk",
    imageColor: "#3b82f6",
    imageUrl: "/images/projects/buk.webp",
    role: "Full Stack Engineer",
    solution:
      "Designed and implemented modular micro-frontends for the HR suite, reducing deployment conflicts and enabling parallel feature development.",
    stack: ["Ruby on Rails", "React", "PostgreSQL"],
    title: "Buk",
    url: "https://www.buk.cl/",
    year: "2021",
  },
  {
    category: "E-commerce",
    challenge:
      "Translating a high-energy brand identity into a high-conversion digital storefront.",
    description: "DTC healthy snacking brand.",
    id: "unreal",
    imageColor: "#f59e0b",
    imageUrl: "/images/projects/unreal.webp",
    role: "Frontend Developer",
    solution:
      "Developed a custom headless-style Shopify theme with performant GSAP animations, increasing engagement and conversion rates.",
    stack: ["Shopify", "Liquid", "JavaScript", "GSAP"],
    title: "Unreal Snacks",
    url: "https://www.unrealsnacks.com/",
    year: "2020",
  },
  {
    category: "Consultancy",
    challenge:
      "Delivering enterprise-grade software solutions within strict regulatory and timeline constraints.",
    description: "Enterprise digital transformation.",
    id: "globant",
    imageColor: "#bfdbfe",
    imageUrl: "/images/projects/globant.webp",
    role: "Frontend Engineer",
    solution:
      "Collaborated in distributed agile teams to ship scalable features for Fortune 500 financial and healthcare clients.",
    stack: ["Vue.js", "TypeScript", "React", "Figma"],
    title: "Globant",
    url: "https://www.globant.com/",
    year: "2020",
  },
];
