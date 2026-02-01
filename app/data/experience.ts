export interface Job {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
    stack: string[];
}

export const experiences: Job[] = [
    {
        id: "statista",
        role: "Senior Frontend Engineer",
        company: "Statista",
        period: "Jan 2024 — Present",
        description: "Migrated legacy products to a modern stack using Remix, React, and TypeScript, while maintaining existing Vue and PHP applications. Developed secure AWS CDK infrastructure to streamline database provisioning and connection management for the team. Improved translation workflows that are used cross-functionally and contributed to technical planning, documentation, and tooling configuration.",
        stack: ["Remix", "React", "AWS CDK", "Node.js", "TypeScript", "Vitest", "Playwright", "Tailwind", "SCSS", 'PHP', 'Vue.js', "Figma"],
    },
    {
        id: "dnl",
        role: "Frontend Engineer",
        company: "Deep Neuron Lab",
        period: "May 2021 — Jan 2024",
        description: "Engineered a new efficient, scalable, and rich data-driven product from the ground up using Vue.js. Proactively identified and mitigated technical constraints and development risks to streamline feature delivery. Collaborated closely with backend engineers and product teams during technical planning to solve complex cross-functional problems and align architectural decisions with business goals.",
        stack: ["Vue.js", "TypeScript", "Python Integration", "Figma"],
    },
    {
        id: "globant",
        role: "Frontend Engineer",
        company: "Globant",
        period: "Dec 2020 — May 2021",
        description: "Led the frontend migration of a legacy financial application to Vue.js, establishing modern coding standards for a team of 10+ developers. Mentored junior engineers on component best practices and implemented a robust design system to ensure UI consistency across the suite.",
        stack: ["Vue.js", "TypeScript", "React", "Figma"],
    },
    {
        id: "adk",
        role: "Frontend Engineer",
        company: "ADK Group",
        period: "Aug 2019 — Dec 2020",
        description: "Delivered 10+ high-quality production websites for diverse clients, focusing on performance optimization and accessibility compliance. Significantly improved load times and SEO rankings by optimizing bundle sizes and implementing progressive enhancement techniques such as code splitting and lazy loading.",
        stack: ["React", "Vue", "TypeScript", "Figma"],
    },
    {
        id: "freelance",
        role: "Full Stack Developer",
        company: "Freelance",
        period: "2017 — 2019",
        description: "Developed custom web solutions for small businesses and startups. Managed the full lifecycle from client requirements to deployment, building e-commerce sites and portfolio platforms using modern JavaScript frameworks.",
        stack: ["JavaScript", "React", "Node.js", "Shopify", "Wordpress", "Hubspot", "Wix"],
    },
];
