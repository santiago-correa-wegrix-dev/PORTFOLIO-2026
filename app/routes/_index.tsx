import { realProjects } from "~/data/projects";
import { skillsList } from "~/data/skills";
import { lazy, Suspense } from "react";
import { Hero } from "~/features/landing/hero";

const SkillsList = lazy(() => import("~/features/landing/skills").then(module => ({ default: module.SkillGalaxy })));
const Projects = lazy(() => import("~/features/landing/projects").then(module => ({ default: module.Projects })));
const ExperienceTimeline = lazy(() => import("~/features/landing/experience").then(module => ({ default: module.ExperienceTimeline })));
const Contact = lazy(() => import("~/features/landing/contact").then(module => ({ default: module.Contact })));
const Kudos = lazy(() => import("~/features/landing/kudos").then(module => ({ default: module.Kudos })));

import type { Route } from "./+types/_index";

export const handle = {
    i18n: "translation",
};

export function meta() {
    return [
        { title: "Santiago Correa | Creative Frontend Engineer" },
        { name: "description", content: "Portfolio of Santiago Correa. A creative frontend engineer specializing in all things frontend. Building award-winning digital experiences." },
        { name: "keywords", content: "Frontend Engineer, Creative Developer, React, Next.js, Remix, Vue, Freelancer, Shopify, HubSpot, Wordpress, PHP Design System, UI/UX" },
        { property: "og:title", content: "Santiago Correa | Creative Frontend Engineer" },
        { property: "og:description", content: "Building award-winning digital experiences with modern web technologies." },
        { property: "og:image", content: "https://santicorrea.com/og-image.jpg" },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:creator", content: "@santicorrea" },
    ];
}


export function loader() {
    return {
        projects: realProjects,
        skills: skillsList
    };
}

export default function Index({ loaderData }: Route.ComponentProps) {
    const { projects, skills } = loaderData;

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-zinc-800 selection:text-white">
            <Hero />
            <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
                <Kudos />
                <Projects id="projects" data={projects} />
                <ExperienceTimeline />
                <SkillsList data={skills} />
                <Contact />
            </Suspense>
        </div>
    );
}
