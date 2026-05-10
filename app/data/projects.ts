export interface Project {
  category: string;
  challenge?: string;
  comingSoon?: boolean;
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
    category: "Personal AI",
    challenge:
      "I think better by speaking than typing. Context I need — tasks, research, notes — is always split across a dozen different places.",
    comingSoon: true,
    description: "A personal AI trained on my own data to organize how I think and work.",
    id: "cortex",
    imageColor: "#0f0f0f",
    role: "Builder",
    solution:
      "Training a personal model on my own data, using Whisper for voice capture and Groq for fast inference. Cortex becomes a second brain that knows how I think.",
    stack: ["Python", "Groq", "Whisper", "Hugging Face", "MongoDB"],
    title: "Cortex",
    year: "2025 - Present",
  },
  {
    category: "AI Newsletter",
    challenge:
      "Hundreds of AI papers, model releases, and tool launches ship every day. Most coverage is noise. Finding what actually matters requires reading everything.",
    description: "Daily AI brief built on Claude. Human-edited, zero spam.",
    id: "dispatch",
    imageColor: "#1a1a1a",
    imageUrl: "/images/projects/dispatch.webp",
    role: "Builder & Editor",
    solution:
      "Built a curation pipeline powered by the Anthropic API. Claude reads and scores hundreds of sources daily, surfacing the highest-signal stories. Human editorial judgement makes the final call before every send.",
    stack: ["Anthropic API", "Claude", "TypeScript", "Node.js"],
    title: "Dispatch",
    url: "https://deliver-ai.xyz/",
    year: "2025 - Present",
  },
  {
    category: "Data Platform",
    challenge:
      "Owning the registration and personalization flows for a platform serving 1M+ monthly users, where every millisecond and every form step directly affects conversion.",
    description: "Registration and personalization platform powering the primary conversion funnel for 1M+ monthly users.",
    id: "statista",
    imageColor: "#004e93",
    imageUrl: "/images/projects/statista.webp",
    role: "Senior Frontend Engineer",
    solution:
      "Delivered multi-step signup and account flows, built the team's first backend API in Node.js/Remix for persistent personalization, monitored production via Datadog, and coached junior engineers on testing and accessibility.",
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
    year: "2024 - Present",
  },
  {
    category: "AI SaaS",
    challenge:
      "Building two AI-powered compliance products from scratch as the sole frontend engineer, with real-time collaboration, role-based access, and cross-document verification, before handing off to a growing team.",
    description: "AI-powered audit tools for financial and ESG compliance. Two SaaS products built from the ground up.",
    id: "dnl",
    imageColor: "#4f46e5",
    imageUrl: "/images/projects/dnl.webp",
    role: "Frontend Engineer",
    solution:
      "Architected dynamic audit workflows with AI-driven suggestions and real-time collaboration. Established the frontend patterns and code standards that the engineering team inherited as it scaled.",
    stack: ["Vue.js", "TypeScript", "Python Integration", "Figma"],
    title: "Deep Neuron Lab",
    url: "https://www.dnl.ai",
    year: "2021 - 2024",
  },
  {
    category: "Industrial",
    challenge:
      "The existing Toyota Forklift site felt outdated and didn't reflect the scale or credibility of the brand.",
    description: "Landing page revamp for Toyota's North American forklift division.",
    id: "toyota",
    imageColor: "#cc0000",
    imageUrl: "/images/projects/toyota.webp",
    role: "Frontend Developer",
    solution:
      "Redesigned and rebuilt the landing page in Vue.js, modernizing the UI while staying true to the Toyota brand guidelines.",
    stack: ["Vue.js", "Laravel"],
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
      "Delivering performance improvements and new features for an HR platform serving companies across Latin America, on a short freelance engagement.",
    description: "Enterprise HR management platform serving companies across Latin America.",
    id: "buk",
    imageColor: "#3b82f6",
    imageUrl: "/images/projects/buk.webp",
    role: "Frontend Developer",
    solution:
      "Shipped performance improvements, new features, and new pages. Mentored junior developers through code reviews and pairing sessions.",
    stack: ["JavaScript", "Vue.js", "Figma"],
    title: "Buk",
    url: "https://www.buk.cl/",
    year: "2020",
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
      "A data-heavy stock trading application built in Java needed to be migrated to a modern frontend stack without disrupting the existing user base.",
    description: "Frontend migration of a stock trading application from Java to Vue.js.",
    id: "globant",
    imageColor: "#bfdbfe",
    imageUrl: "/images/projects/globant.webp",
    role: "Frontend Engineer",
    solution:
      "Refactored legacy Java views into Vue components alongside a team of 10+ developers, and mentored junior engineers through code reviews to keep quality consistent across the migration.",
    stack: ["Vue.js", "TypeScript", "React", "Figma"],
    title: "Globant",
    url: "https://www.globant.com/",
    year: "2020",
  },
];
