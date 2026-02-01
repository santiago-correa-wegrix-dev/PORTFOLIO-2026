import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { TechIcon } from "~/components/ui/tech-icon";
import { HolographicSkills } from "~/components/visuals/holographic-skills";



interface SkillGalaxyProps {
    data: string[];
}

export function SkillGalaxy({ data: skillsList }: SkillGalaxyProps) {
    const { t } = useTranslation();
    const [viewMode, setViewMode] = useState<'3d' | 'list'>('3d');

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden transition-colors duration-700">
            {/* Subtle Gradient Fade instead of hard background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-muted/5 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col gap-8 text-center items-center">

                    {/* Header + Toggle Row */}
                    <div className="flex flex-col items-center w-full gap-8 md:px-8 mb-16 relative z-20">
                        <div className="text-center">
                            <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground tracking-tighter mb-4">
                                <Trans i18nKey="skills.title">
                                    Tech <span className="text-muted-foreground">Stack</span>
                                </Trans>
                            </h2>
                            <p className="text-muted-foreground font-light text-xl leading-relaxed max-w-2xl mx-auto">
                                {t('skills.desc')}
                            </p>
                        </div>

                        {/* Minimal Toggle */}
                        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900/50 p-1 rounded-full border border-border/50">
                            <button
                                onClick={() => setViewMode('3d')}
                                className={`px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${viewMode === '3d' ? 'bg-white dark:bg-zinc-800 shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                3D
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${viewMode === 'list' ? 'bg-white dark:bg-zinc-800 shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                List
                            </button>
                        </div>
                    </div>

                    {/* Content Switcher */}
                    <div className="w-full relative min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {viewMode === '3d' ? (
                                <motion.div
                                    key="3d"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full"
                                >
                                    <HolographicSkills />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="list"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full"
                                >
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full pt-4 px-4 max-w-6xl mx-auto">
                                        {skillsList.map((skill) => (
                                            <div
                                                key={skill}
                                                className="group relative flex items-center gap-3 p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default overflow-hidden"
                                            >
                                                {/* Gradient Glow Effect on Hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                <div className="relative z-10 w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-all">
                                                    <TechIcon name={skill} className="w-5 h-5" />
                                                </div>
                                                <span className="relative z-10 font-medium text-sm md:text-base tracking-wide text-foreground group-hover:text-primary transition-colors">
                                                    {skill}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
