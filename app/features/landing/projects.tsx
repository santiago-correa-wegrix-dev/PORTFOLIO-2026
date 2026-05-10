import { useState } from "react";
import { motion } from "framer-motion";
import { useIntlayer } from "react-intlayer";

import type { realProjects } from "~/data/projects";

import { ProjectReveal } from "./projects/project-reveal";
import { ProjectRow } from "./projects/project-row";

interface ProjectsProps {
  id?: string;
  data: typeof realProjects;
}

export function Projects({ id, data: projects }: ProjectsProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const { title, titleAccent, years } = useIntlayer("projects");

  const handleMouseMove = (event: React.MouseEvent) => {
    setCursorPos({ x: event.clientX, y: event.clientY });
  };

  const handleProjectHover = (event: React.MouseEvent, projectId: string) => {
    setCursorPos({ x: event.clientX, y: event.clientY });
    setHoveredProject(projectId);
  };

  return (
    <section
      id={id}
      className="relative bg-zinc-50 px-6 py-32 text-foreground transition-colors duration-700 md:px-12 lg:px-24 dark:bg-black"
      onMouseMove={handleMouseMove}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="relative z-10 mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <h2 className="min-h-[1em] font-display text-4xl font-bold md:text-6xl">
              {title} <span className="text-muted-foreground">{titleAccent}</span>
            </h2>
            <p className="min-h-[1.5em] font-mono text-muted-foreground">{years}</p>
          </div>
        </motion.div>

        <div className="relative">
          <div className="relative z-10 flex flex-col">
            {projects.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                onMouseEnter={handleProjectHover}
                onMouseLeave={() => setHoveredProject(null)}
              />
            ))}
            <div className="border-t border-border" />
          </div>

          <ProjectReveal
            hoveredProject={hoveredProject}
            cursorPos={cursorPos}
            projects={projects}
          />
        </div>
      </div>
    </section>
  );
}
