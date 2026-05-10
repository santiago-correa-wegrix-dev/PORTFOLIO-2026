import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import { SplitText } from "~/components/ui/split-text";
import { TechIcon } from "~/components/ui/tech-icon";
import { realProjects } from "~/data/projects";
import { HeroMedia } from "~/features/projects/hero-media";
import type { Route } from "./+types/projects.$slug";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const sectionTransition = { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const };

const viewport = { margin: "-60px", once: true };

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Project Not Found" }];
  }
  const { project } = data;
  const title = `${project.title} | Santiago Correa`;
  const image = project.imageUrl
    ? `https://wegrix.dev${project.imageUrl}`
    : "https://wegrix.dev/og-image.jpg";
  return [
    { title },
    { content: project.description, name: "description" },
    { content: title, property: "og:title" },
    { content: project.description, property: "og:description" },
    { content: "website", property: "og:type" },
    { content: `https://wegrix.dev/projects/${project.id}`, property: "og:url" },
    { content: image, property: "og:image" },
    { content: "summary_large_image", property: "twitter:card" },
    { content: title, property: "twitter:title" },
    { content: project.description, property: "twitter:description" },
    { content: image, property: "twitter:image" },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const index = realProjects.findIndex((item) => item.id === params.slug);
  if (index === -1) {
    throw new Response("Not Found", { status: 404 });
  }
  return {
    next: index < realProjects.length - 1 ? realProjects[index + 1] : null,
    prev: index > 0 ? realProjects[index - 1] : null,
    project: realProjects[index],
  };
}

export default function ProjectDetail({ loaderData }: Route.ComponentProps) {
  const { project, prev, next } = loaderData;
  const {
    back,
    challengeLabel,
    industryLabel,
    nextLabel,
    prevLabel,
    roleLabel,
    solutionLabel,
    stackLabel,
    visitSite,
    yearLabel,
  } = useIntlayer("project-detail");

  return (
    <div className="min-h-screen bg-background cursor-auto selection:bg-zinc-800 selection:text-white dark:selection:bg-white dark:selection:text-black">
      <div className="fixed top-5 left-5 md:top-6 md:left-8 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2.5 bg-background/80 backdrop-blur-md border border-border rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-all shadow-xl hover:scale-105 active:scale-95 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">{back}</span>
        </Link>
      </div>

      <div className="pt-24 md:pt-32 pb-10 md:pb-14 px-5 sm:px-8 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <p className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest mb-5 md:mb-7">
            {project.category}
          </p>

          {project.comingSoon && (
            <span className="inline-block mb-4 md:mb-6 px-3 py-1 rounded-full border border-border text-xs font-mono text-muted-foreground">
              Coming Soon
            </span>
          )}

          <h1 className="text-[13vw] sm:text-7xl md:text-9xl font-display font-bold tracking-tighter mb-8 md:mb-12 text-foreground leading-[0.9]">
            <SplitText>{project.title.toUpperCase()}</SplitText>
          </h1>

          <div className="flex flex-wrap gap-x-8 gap-y-5 border-t border-border pt-6 md:pt-8">
            {project.role && (
              <div>
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                  {roleLabel}
                </p>
                <p className="text-sm md:text-base font-medium text-foreground">{project.role}</p>
              </div>
            )}
            <div>
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                {yearLabel}
              </p>
              <p className="text-sm md:text-base font-medium text-foreground">{project.year}</p>
            </div>
            <div>
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                {industryLabel}
              </p>
              <p className="text-sm md:text-base font-medium text-foreground">{project.category}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        className="px-4 sm:px-6 md:px-8 lg:px-16 mb-14 md:mb-24"
      >
        <div className="max-w-7xl mx-auto h-[56vw] min-h-[240px] max-h-[680px] rounded-2xl md:rounded-3xl overflow-hidden border border-border/40 shadow-[0_0_80px_-20px_rgba(255,255,255,0.07)]">
          <HeroMedia project={project} />
        </div>
      </motion.div>

      {project.challenge && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={sectionTransition}
          className="px-5 sm:px-8 md:px-12 lg:px-24 mb-16 md:mb-24 border-t border-border pt-12 md:pt-18"
        >
          <div className="max-w-5xl mx-auto">
            <p className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-6 md:mb-8">
              {challengeLabel}
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tighter text-foreground leading-tight">
              {project.challenge}
            </p>
          </div>
        </motion.div>
      )}

      {project.solution && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={sectionTransition}
          className="px-5 sm:px-8 md:px-12 lg:px-24 mb-16 md:mb-24 border-t border-border pt-12 md:pt-18"
        >
          <div className="max-w-5xl mx-auto">
            <p className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-6 md:mb-8">
              {solutionLabel}
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tighter text-foreground leading-tight">
              {project.solution}
            </p>
          </div>
        </motion.div>
      )}

      {project.stack && project.stack.length > 0 && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={sectionTransition}
          className="px-5 sm:px-8 md:px-12 lg:px-24 mb-16 md:mb-24 border-t border-border pt-12 md:pt-18"
        >
          <div className="max-w-5xl mx-auto">
            <p className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-8 md:mb-10">
              {stackLabel}
            </p>
            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {project.stack.map((tech: string) => (
                <span
                  key={tech}
                  className="flex items-center gap-2 px-3 py-2 bg-muted/10 border border-border text-xs sm:text-sm font-mono text-muted-foreground rounded-lg hover:bg-foreground/5 hover:text-foreground hover:border-foreground/20 transition-all duration-200 cursor-default"
                >
                  <TechIcon name={tech} className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={sectionTransition}
        className="px-5 sm:px-8 md:px-12 lg:px-24 border-t border-border pt-10 md:pt-14 mb-14 md:mb-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-3 md:gap-6">
          {prev ? (
            <Link
              to={`/projects/${prev.id}`}
              className="group flex flex-col gap-1 p-4 md:p-6 rounded-xl md:rounded-2xl border border-border hover:bg-muted/10 hover:border-foreground/20 transition-all duration-300"
            >
              <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">
                <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:-translate-x-1 transition-transform" />
                {prevLabel}
              </span>
              <span className="text-sm sm:text-base md:text-xl font-display font-semibold tracking-tight text-foreground line-clamp-1">
                {prev.title}
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground font-mono mt-0.5">
                {prev.category}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              to={`/projects/${next.id}`}
              className="group flex flex-col gap-1 p-4 md:p-6 rounded-xl md:rounded-2xl border border-border hover:bg-muted/10 hover:border-foreground/20 transition-all duration-300 items-end text-right"
            >
              <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">
                {nextLabel}
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-sm sm:text-base md:text-xl font-display font-semibold tracking-tight text-foreground line-clamp-1">
                {next.title}
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground font-mono mt-0.5">
                {next.category}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </motion.div>

      {project.url && (
        <div className="flex flex-col items-center justify-center pb-20 md:pb-28 px-5">
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="rounded-full px-8 md:px-10 h-13 md:h-16 text-sm md:text-lg bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all shadow-[0_0_60px_-15px_rgba(255,255,255,0.3)]"
            >
              {visitSite} <ArrowUpRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}
