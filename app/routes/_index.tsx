import { lazy, Suspense } from "react";

import { SectionSkeleton } from "~/components/ui/skeleton";
import { realProjects } from "~/data/projects";
import { skillsList } from "~/data/skills";
import { Hero } from "~/features/landing/hero";

import type { Route } from "./+types/_index";

const SkillsList = lazy(() =>
  import("~/features/landing/skills").then((module) => ({
    default: module.SkillGalaxy,
  })),
);
const Projects = lazy(() =>
  import("~/features/landing/projects").then((module) => ({
    default: module.Projects,
  })),
);
const ExperienceTimeline = lazy(() =>
  import("~/features/landing/experience").then((module) => ({
    default: module.ExperienceTimeline,
  })),
);
const Contact = lazy(() =>
  import("~/features/landing/contact").then((module) => ({
    default: module.Contact,
  })),
);
const Kudos = lazy(() =>
  import("~/features/landing/kudos").then((module) => ({
    default: module.Kudos,
  })),
);

export function meta() {
  return [
    { title: "Santiago Correa | Senior Engineer" },
    {
      name: "description",
      content: "Senior engineer building consumer products at scale.",
    },
    {
      name: "keywords",
      content:
        "Senior Engineer, Frontend, React, Remix, TypeScript, Consumer Products, Performance, Accessibility",
    },
    {
      property: "og:title",
      content: "Santiago Correa | Senior Engineer",
    },
    {
      property: "og:description",
      content: "Senior engineer building consumer products at scale.",
    },
    {
      property: "og:image",
      content: "https://wegrix.dev/og-image.jpg",
    },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:creator", content: "@santicorrea" },
  ];
}

export function loader() {
  return {
    projects: realProjects,
    skills: skillsList,
  };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { projects, skills } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-zinc-800 selection:text-white">
      <Hero />
      <Suspense fallback={<SectionSkeleton />}>
        <Kudos />
        <Projects id="projects" data={projects} />
        <ExperienceTimeline />
        <SkillsList data={skills} />
        <Contact />
      </Suspense>
    </div>
  );
}
