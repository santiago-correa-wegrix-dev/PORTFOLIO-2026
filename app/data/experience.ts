export interface Job {
  company: string;
  description: string;
  id: string;
  period: string;
  role: string;
  stack: string[];
}

export const experiences: Job[] = [
  {
    company: "Statista",
    description:
      "Frontend engineer on the registration and personalization team, owning flows that power the primary conversion funnel for 1M+ monthly users. Delivered multi-step signup and account experiences, built the team's first backend API in Node.js/Remix enabling persistent user personalization, and monitored production via Datadog. Coached junior engineers on testing, accessibility, and code quality. Promoted to Senior Frontend Engineer in April 2026.",
    id: "statista",
    period: "Jan 2024 - Present",
    role: "Senior Frontend Engineer",
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
  },
  {
    company: "Deep Neuron Lab",
    description:
      "Founding frontend engineer on two AI-powered SaaS products (ai/checklist and ai/numbers), audit tools for financial and ESG compliance. Architected dynamic workflows with AI-driven suggestions, role-based access, real-time collaboration, and cross-document verification. Worked directly with the CEO and CTO to shape product direction, and established the frontend patterns a growing team inherited.",
    id: "dnl",
    period: "May 2021 - Jan 2024",
    role: "Frontend Engineer",
    stack: ["Vue.js", "TypeScript", "Python Integration", "Figma"],
  },
  {
    company: "Globant",
    description:
      "Modernized a data-intensive stock trading application, transforming legacy code into Vue components alongside a team of 10+ developers. Mentored junior engineers through code reviews and pairing sessions, and implemented new UI/UX designs for real-time financial data views.",
    id: "globant",
    period: "Dec 2020 - May 2021",
    role: "Frontend Engineer",
    stack: ["Vue.js", "TypeScript", "React", "Figma"],
  },
  {
    company: "ADK Group",
    description:
      "Built and redesigned 10+ client websites using Vue, React, and WordPress. Improved site performance through progressive enhancement and led accessibility improvements aligned with WCAG standards.",
    id: "adk",
    period: "Aug 2019 - Dec 2020",
    role: "Frontend Engineer",
    stack: ["React", "Vue", "TypeScript", "Figma"],
  },
  {
    company: "Upwork",
    description:
      "Freelance frontend work delivering websites and SPAs for clients across various industries. Built with HTML, CSS, JavaScript, Angular, and React. Used Node.js, PHP, and MongoDB for backend work where needed.",
    id: "freelance",
    period: "2017 - 2019",
    role: "Frontend Developer",
    stack: ["JavaScript", "React", "Node.js", "Shopify", "WordPress"],
  },
];
