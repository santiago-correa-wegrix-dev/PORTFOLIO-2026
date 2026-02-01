import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

import type { Job } from "~/data/experience";

import { useTranslation } from "react-i18next";

export function SpotlightCard({ job, index }: { job: Job; index: number }) {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                delay: index * 0.1
            }}
            className="group relative border border-border bg-card/50 backdrop-blur-sm rounded-2xl p-8 isolate overflow-hidden perspective-1000"
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Gradient */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-200 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        var(--spotlight-color, rgba(255, 255, 255, 0.1)),
                        transparent 80%
                        )
                    `,
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-4">
                {/* Timeline Dot (Static) */}
                <div className="absolute left-[-52px] md:left-[-52px] top-10 w-4 h-4 rounded-full border-2 border-background bg-border group-hover:bg-foreground transition-colors duration-200 shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)]">
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-bold text-foreground transition-colors duration-200 md:min-h-[1em]">{mounted ? t(`experience.jobs.${job.id}.role`) : ""}</h3>
                        <span className="text-muted-foreground font-medium flex items-center gap-2">
                            <Briefcase className="w-4 h-4" /> {job.company}
                        </span>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground border border-border px-3 py-1 rounded-full flex items-center gap-2 w-fit bg-background/50 md:min-h-[1.5em] h-fit">
                        <Calendar className="w-3 h-3" /> {mounted ? t(`experience.jobs.${job.id}.period`) : ""}
                    </span>
                </div>

                <p className="text-foreground/80 leading-relaxed font-light min-h-[1.5em]">
                    {mounted ? t(`experience.jobs.${job.id}.description`) : ""}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                    {job.stack.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-muted/20 border border-border text-xs font-mono text-muted-foreground rounded hover:bg-foreground/5 hover:text-foreground hover:border-foreground/20 transition-colors duration-200 cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
