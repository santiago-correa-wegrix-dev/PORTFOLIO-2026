import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

import type { Project } from "~/data/projects";

interface ProjectRowProps {
    project: Project;
    onMouseEnter: (e: React.MouseEvent, projectId: string) => void;
    onMouseLeave: () => void;
}

export function ProjectRow({ project, onMouseEnter, onMouseLeave }: ProjectRowProps) {
    return (
        <Link
            to={`/projects/${project.id}`}
            className="group border-t border-border py-12 flex flex-col md:flex-row justify-between md:items-center transition-colors hover:bg-muted/10 px-4 md:px-8 cursor-pointer relative z-10"
            onMouseEnter={(e) => onMouseEnter(e, project.id)}
            onMouseLeave={onMouseLeave}
        >
            <div className="flex flex-col gap-2">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">
                    {project.category}
                </span>
                <h3 className="text-3xl md:text-5xl font-bold text-foreground group-hover:opacity-70 transition-opacity duration-300">
                    {project.title}
                </h3>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-8 opacity-0 md:opacity-100 md:group-hover:opacity-100 md:translate-x-4 md:group-hover:translate-x-0 transition-all duration-300">
                <span className="font-mono text-muted-foreground">{project.year}</span>
                <div className="p-3 rounded-full border border-border bg-card text-foreground group-hover:bg-foreground group-hover:text-background transition-colors shadow-lg">
                    <ArrowUpRight className="w-5 h-5" />
                </div>
            </div>
        </Link>
    );
}
