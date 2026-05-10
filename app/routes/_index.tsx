import { Suspense, lazy } from "react";

import { SectionErrorBoundary } from "~/components/ui/section-error-boundary";
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
    { title: "Santiago Correa | Senior Frontend Engineer" },
    {
      content:
        "Senior frontend engineer with 9+ years building consumer products at scale. React, Remix, TypeScript. Currently at Statista. Building with the Anthropic API.",
      name: "description",
    },
    {
      content: "Santiago Correa | Senior Frontend Engineer",
      property: "og:title",
    },
    {
      content:
        "Senior frontend engineer with 9+ years building consumer products at scale. React, Remix, TypeScript. Currently at Statista. Building with the Anthropic API.",
      property: "og:description",
    },
    { content: "website", property: "og:type" },
    { content: "https://wegrix.dev", property: "og:url" },
    { content: "https://wegrix.dev/og-image.jpg", property: "og:image" },
    { content: "summary_large_image", property: "twitter:card" },
    { content: "https://wegrix.dev/og-image.jpg", property: "twitter:image" },
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
      <SectionErrorBoundary name="Kudos">
        <Suspense fallback={<SectionSkeleton />}>
          <Kudos />
        </Suspense>
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Projects">
        <Suspense fallback={<SectionSkeleton />}>
          <Projects id="projects" data={projects} />
        </Suspense>
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Experience">
        <Suspense fallback={<SectionSkeleton />}>
          <ExperienceTimeline />
        </Suspense>
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Skills">
        <Suspense fallback={<SectionSkeleton />}>
          <SkillsList data={skills} />
        </Suspense>
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Contact">
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </SectionErrorBoundary>
    </div>
  );
}
