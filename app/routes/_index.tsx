import { realProjects } from "~/data/projects";
import { skillsList } from "~/data/skills";
import { Contact } from "~/features/landing/contact";
import { ExperienceTimeline } from "~/features/landing/experience";
import { Hero } from "~/features/landing/hero";
import { Kudos } from "~/features/landing/kudos";
import { Projects } from "~/features/landing/projects";
import { SkillGalaxy } from "~/features/landing/skills";

import type { Route } from "./+types/_index";

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
            <Kudos />
            <Projects id="projects" data={projects} />
            <ExperienceTimeline />
            <SkillGalaxy data={skills} />
            <Contact />
        </div>
    );
}
