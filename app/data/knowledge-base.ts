import { experiences } from "~/data/experience";
import { realProjects } from "~/data/projects";

export interface KnowledgeItem {
    id: string;
    type: "project" | "experience" | "stat" | "resource" | "social" | "career-summary";
    title: string;
    keywords: string[];
    content: string;
    url?: string;
}

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
    // --- Projects ---
    ...realProjects.map((project) => ({
        id: project.id,
        type: "project" as const,
        title: project.title,
        keywords: [
            ...(project.stack || []),
            project.category,
            project.title,
            // EN
            "project", "projects", "work", "works", "case study",
            // ES
            "proyecto", "proyectos", "trabajo", "trabajos", "obra", "obras",
            // DE
            "projekt", "projekte", "arbeit", "arbeiten",
            // FR
            "projet", "projets", "travail", "travaux"
        ],
        content: `${project.description} ${project.challenge || ""} ${project.solution || ""}`,
        url: project.url,
    })),
    // --- Experience ---
    ...experiences.map((experience) => ({
        id: experience.id,
        type: "experience" as const,
        title: experience.company,
        keywords: [
            ...experience.stack,
            experience.role,
            // EN
            "experience", "experiences", "job", "jobs", "career", "employment", "work history",
            // ES
            "experiencia", "experiencias", "trabajo", "trabajos", "empleo", "empleos", "carrera", "trayectoria",
            // DE
            "erfahrung", "erfahrungen", "job", "jobs", "beruf", "karriere",
            // FR
            "expérience", "expériences", "emploi", "emplois", "carrière"
        ],
        content: `${experience.description} Role: ${experience.role}.`,
        url: undefined,
    })),
    // --- Stats / Info ---
    {
        id: "hire",
        type: "stat",
        title: "Hire Me",
        keywords: [
            "hire", "hiring", "resume", "cv", "contact", "email", "available",
            "contratar", "contrato", "contacto",
            "anstellen", "kontakt",
            "embaucher", "contact"
        ],
        content: "I am currently open to high-impact opportunities. Check the Contact section.",
        url: "/#contact"
    },
    {
        id: "tech",
        type: "stat",
        title: "Tech Stack",
        keywords: [
            "stack", "tech", "technology", "technologies", "tools",
            "tecnologia", "tecnologias", "herramientas",
            "technologie", "technologien",
            "react", "vue", "remix", "nextjs", "typescript", "node", "tailwind", "hubspot",
            "what is your tech stack", "tech stack",
            "webflow", "spotify", "zapier", "n8n", "automation"
        ],
        content: "I align perfectly with the **Modern Stack**: React, Next.js/Remix, Tailwind, and TypeScript. I also excel at **Integrations & Automation** (Zapier, N8N, HubSpot) and No-Code platforms like **Webflow**.",
        url: undefined
    },
    {
        id: "human-factor",
        type: "stat",
        title: "Human Edge",
        keywords: ["ai", "human", "advantage", "sets you apart", "difference", "diferencia", "unique"],
        content: "**AI writes code. I build products.** My edge is understanding *users* and *business goals*. I bring creativity, strategic empathy, and the ability to handle ambiguity that LLMs simply can't match.",
        url: undefined
    },
    // --- Resources ---
    {
        id: "resume-cv",
        type: "resource",
        title: "Resume / CV",
        keywords: [
            "resume", "cv", "curriculum", "vitae", "pdf", "download",
            "hoja de vida", "lebenslauf"
        ],
        content: "Here is my official Resume. It covers my experience at Statista, Deep Neuron Lab, and more.",
        url: "/SANTIAGO%20CORREA%20-%20RESUME.pdf"
    },
    {
        id: "github-link",
        type: "social",
        title: "GitHub Profile",
        keywords: ["github", "git", "code", "repos", "repositories", "source"],
        content: "Check out my code on GitHub. I have several open-source contributions and portfolio projects.",
        url: "https://github.com/santiago-correa-wegrix-dev"
    },
    {
        id: "linkedin-link",
        type: "social",
        title: "LinkedIn Profile",
        keywords: ["linkedin", "social", "network", "connect", "profile"],
        content: "Let's connect on LinkedIn! I post about React, Engineering, and Design.",
        url: "https://www.linkedin.com/in/wegrix/"
    },
    {
        id: "location",
        type: "stat",
        title: "Current Location",
        keywords: ["location", "where", "based", "city", "live", "living", "ubicacion", "donde", "wo", "stadt"],
        content: "I am currently based in **Berlin, Germany** 🇩🇪 (and open to remote work worldwide).",
        url: undefined
    },
    {
        id: "languages",
        type: "stat",
        title: "Languages",
        keywords: ["language", "languages", "speak", "english", "spanish", "german", "idiomas", "hablas", "sprachen", "deutsch"],
        content: "I am fluent in **English** and **Spanish** (Native), and I speak **German** at an intermediate level (B1/B2).",
        url: undefined
    },
    {
        id: "overview",
        type: "stat",
        title: "Overview",
        keywords: ["what do you do", "what does he do", "que haces", "was machst du", "profession", "job"],
        content: "I am a **Front-End Engineer**. I build high-performance web applications with a focus on polished UI/UX.",
        url: "/#work"
    },
    {
        id: "education",
        type: "stat",
        title: "Education",
        keywords: ["education", "university", "degree", "study", "studied", "college", "educacion", "universidad", "studium", "uni", "self taught", "bootcamp"],
        content: "I am a **Self-Taught Developer** who accelerated my learning through multiple intensive bootcamps and continuous hands-on building.",
        url: undefined
    },
    {
        id: "hobbies",
        type: "stat",
        title: "Hobbies & Interests",
        keywords: ["hobbies", "interests", "free time", "fun", "cycling", "baking", "movies", "series", "learning", "pasatiempos", "hobbys"],
        content: "In my free time, I love **cycling**, **baking**, and watching **movies/series**. I'm also always **learning** new topics, and yes... I do **Web Development** for fun too! 🤓",
        url: undefined
    }
];
