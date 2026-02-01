import { useState, useEffect } from "react";
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
    const [mounted, setMounted] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setMounted(true);
    }, []);

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
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter min-h-[1em]">
                        {mounted && (
                            <Trans i18nKey="projects.title">
                                Selected <span className="text-muted-foreground">Works</span>
                            </Trans>
                        )}
                    </h2>
                    <span className="font-mono text-muted-foreground text-sm hidden md:block min-h-[1.5em]">
                        {mounted ? t('projects.years') : ""}
                    </span>
                </div>

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
