import { AnimatePresence, motion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import type { Project } from "~/data/projects";

interface ProjectRevealProps {
    hoveredProject: string | null;
    cursorPos: { x: number; y: number };
    projects: Project[];
}

export function ProjectReveal({ hoveredProject, cursorPos, projects }: ProjectRevealProps) {
    // Modern hydration check to prevent mismatch
    const isMounted = useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    );

    if (!isMounted) return null;

    return createPortal(
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
            <AnimatePresence>
                {hoveredProject && (
                    <motion.div
                        key="reveal"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: cursorPos.x - 200,
                            y: cursorPos.y - 150
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.1 }}
                        className="absolute left-0 top-0 w-[400px] h-[300px] rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/50 backdrop-blur-sm"
                    >
                        {projects.find(p => p.id === hoveredProject)?.imageUrl ? (
                            <img
                                src={projects.find(p => p.id === hoveredProject)?.imageUrl}
                                alt="Project Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div
                                className="w-full h-full"
                                style={{ backgroundColor: projects.find(p => p.id === hoveredProject)?.imageColor }}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>,
        document.body
    );
}
