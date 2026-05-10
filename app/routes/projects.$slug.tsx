import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";

import { Button } from "~/components/ui/button";
import { Magnetic } from "~/components/ui/magnetic";
import { SplitText } from "~/components/ui/split-text";
import { realProjects } from "~/data/projects";

import type { Route } from "./+types/projects.$slug";

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Project Not Found" }];
  }
  return [
    { title: `${data.title} | Case Study` },
    { content: data.description, name: "description" },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const project = realProjects.find((item) => item.id === params.slug);
  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }
  return project;
}

export default function ProjectDetail({ loaderData }: Route.ComponentProps) {
  const project = loaderData;
  const { slug } = useParams();

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 md:px-12 lg:px-24 cursor-auto selection:bg-zinc-800 selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Back Nav - Floating Pill (Top Left) - Fixed relative to viewport */}
      <div className="fixed top-6 left-6 md:left-12 z-50">
        <Magnetic strength={0.2}>
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-background/80 backdrop-blur-md border border-border rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-all shadow-xl hover:scale-105 active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </Link>
        </Magnetic>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-12 text-foreground leading-[0.9]">
          <SplitText>{project.title.toUpperCase()}</SplitText>
        </h1>
      </motion.div>

      {/* Hero Media - "Window" into the project */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto mb-40 min-h-[40vh] md:h-[80vh] w-full bg-card/50 rounded-xl md:rounded-3xl overflow-hidden relative border-0 md:border md:border-border shadow-[0_0_100px_-20px_rgba(255,255,255,0.1)]"
      >
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center text-muted-foreground font-display text-4xl md:text-6xl font-bold tracking-tighter opacity-50"
            style={{ backgroundColor: project.imageColor }}
          >
            {project.title}
          </div>
        )}
      </motion.div>

      {/* Stack - Sharp & Defined */}
      <div className="max-w-5xl mx-auto mb-40 border-t border-border pt-16">
        <h3 className="text-xs font-mono text-muted-foreground mb-12 uppercase tracking-widest">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-3">
          {project.stack?.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-muted/20 border border-border text-xs font-mono text-muted-foreground rounded hover:bg-foreground/5 hover:text-foreground hover:border-foreground/20 transition-colors duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Nav - Call to Action */}
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center pb-20">
        <Magnetic>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="rounded-full px-10 h-16 text-lg bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all shadow-[0_0_60px_-15px_rgba(255,255,255,0.3)]"
            >
              Visit Live Site <ArrowUpRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </Magnetic>
      </div>
    </div>
  );
}
