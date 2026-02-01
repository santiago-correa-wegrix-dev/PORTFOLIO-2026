import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    const handleMouseMove = (e: React.MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleProjectHover = (e: React.MouseEvent, projectId: string) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        setHoveredProject(projectId);
    };

    return (
        <section id={id} className="py-32 px-6 md:px-12 lg:px-24 bg-zinc-50 dark:bg-black text-foreground relative transition-colors duration-700" onMouseMove={handleMouseMove}>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-6xl font-display font-bold min-h-[1em]">
                            <Trans i18nKey="projects.title">
                                Selected <span className="text-muted-foreground">Work</span>
                            </Trans>
                        </h2>
                        <p className="text-muted-foreground font-mono min-h-[1.5em]">{t('projects.years')}</p>
                    </div>
                </motion.div>

                <div className="relative">
                    {/* Project List */}
                    <div className="flex flex-col z-10 relative">
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

                    {/* Hover Image Reveal */}
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
