export interface Project {
    id: string;
    title: string;
    category: string;
    year: string;
    description: string;
    imageColor: string;
    url?: string;
    imageUrl?: string;
    // Detail specific fields
    challenge?: string;
    solution?: string;
    stack?: string[];
    role?: string;
}

export const realProjects: Project[] = [
    {
        id: "dispatch",
        title: "Dispatch",
        category: "AI Newsletter",
        year: "2025 — Present",
        description: "AI-curated daily brief on models, tools, and research. Human-edited, zero spam.",
        imageColor: "#1a1a1a",
        url: "https://deliver-ai.xyz/",
        imageUrl: "/images/projects/dispatch.webp",
        role: "Curator & Editor",
        stack: ["AI Curation", "Editorial"],
        challenge: "Filtering signal from noise across hundreds of daily AI publications, papers, and launches.",
        solution: "Built a curation pipeline that surfaces the highest-impact stories, then applies human editorial judgement before every send."
    },
    {
        id: "statista",
        title: "Statista",
        category: "Data Platform",
        year: "2024 — Present",
        description: "Global business intelligence portal. React, Remix, Vue, Node.js.",
        imageColor: "#004e93",
        url: "https://www.statista.com/",
        imageUrl: "/images/projects/statista.webp",
        role: "Senior Frontend Engineer",
        stack: ["Remix", "React", "AWS CDK", "Node.js", "TypeScript", "Vitest", "Playwright", "Tailwind", "SCSS", 'PHP', 'Vue.js', "Figma"],
        challenge: "Modernizing a legacy monolithic architecture serving millions of daily users while maintaining zero downtime.",
        solution: "Architecting the migration to Remix, significantly improving Core Web Vitals and developer velocity through component modularization."
    },
    {
        id: "dnl",
        title: "Deep Neuron Lab",
        category: "AI Research",
        year: "2023",
        description: "AI-powered data analysis platform. Vue, Python.",
        imageColor: "#4f46e5",
        url: "https://www.dnl.ai",
        imageUrl: "/images/projects/dnl.webp",
        role: "Frontend Engineer",
        stack: ["Vue.js", "TypeScript", "Python Integration", "Figma"],
        challenge: "Visualizing complex, high-dimensional AI datasets in a performant, browser-based interface.",
        solution: "Engineered a custom WebGL-accelerated visualization library, enabling real-time interaction with large-scale data models."
    },
    {
        id: "toyota",
        title: "Toyota Forklift",
        category: "Industrial",
        year: "2022",
        description: "Global dealer logistics platform.",
        imageColor: "#cc0000",
        url: "https://www.toyotaforklift.com/",
        imageUrl: "/images/projects/toyota.webp",
        role: "Frontend Developer",
        stack: ["Vue.js", "Google Maps API", "Laravel"],
        challenge: "Unifying fragmented regional data into a seamless global dealer locator experience.",
        solution: "Developed a robust geospatial search engine integration, reducing query times and improving lead generation conversion."
    },
    {
        id: "tresr",
        title: "Tresr",
        category: "Web3",
        year: "2022",
        description: "Tokenized real-world asset marketplace.",
        imageColor: "#10b981",
        url: "https://www.tresr.com/",
        imageUrl: "/images/projects/tresr.webp",
        role: "Lead Frontend",
        stack: ["React", "Web3.js", "Solidity", "Tailwind"],
        challenge: "Bridging the UX gap between traditional e-commerce and complex blockchain interactions.",
        solution: "Led the frontend architecture, implementing seamless wallet integration and a friction-free checkout flow for non-crypto natives."
    },
    {
        id: "buk",
        title: "Buk",
        category: "HR SaaS",
        year: "2021",
        description: "Enterprise HR management platform.",
        imageColor: "#3b82f6",
        url: "https://www.buk.cl/",
        imageUrl: "/images/projects/buk.webp",
        role: "Full Stack Engineer",
        stack: ["Ruby on Rails", "React", "PostgreSQL"],
        challenge: "Scaling complex payroll and benefits workflows for thousands of enterprise clients.",
        solution: "Designed and implemented modular micro-frontends for the HR suite, reducing deployment conflicts and enabling parallel feature development."
    },
    {
        id: "unreal",
        title: "Unreal Snacks",
        category: "E-commerce",
        year: "2020",
        description: "DTC healthy snacking brand.",
        imageColor: "#f59e0b",
        url: "https://www.unrealsnacks.com/",
        imageUrl: "/images/projects/unreal.webp",
        role: "Frontend Developer",
        stack: ["Shopify", "Liquid", "JavaScript", "GSAP"],
        challenge: "Translating a high-energy brand identity into a high-conversion digital storefront.",
        solution: "Developed a custom headless-style Shopify theme with performant GSAP animations, increasing engagement and conversion rates."
    },
    {
        id: "globant",
        title: "Globant",
        category: "Consultancy",
        year: "2020",
        description: "Enterprise digital transformation.",
        imageColor: "#bfdbfe",
        url: "https://www.globant.com/",
        imageUrl: "/images/projects/globant.webp",
        role: "Frontend Engineer",
        stack: ["Vue.js", "TypeScript", "React", "Figma"],
        challenge: "Delivering enterprise-grade software solutions within strict regulatory and timeline constraints.",
        solution: "Collaborated in distributed agile teams to ship scalable features for Fortune 500 financial and healthcare clients."
    }
];
