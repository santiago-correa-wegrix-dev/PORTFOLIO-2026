import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Trans, useTranslation } from "react-i18next";

import { experiences } from "~/data/experience";

import { SpotlightCard } from "./experience/spotlight-card";

export function ExperienceTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 50%"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-background dark:bg-black relative overflow-hidden transition-colors duration-700">
            {/* Technical Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_100%,transparent_0%)]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row gap-16 md:gap-24 relative">

                    {/* Sticky Header - UX Best Practice for long lists */}
                    <div className="md:w-1/3 md:sticky md:top-32 h-fit z-10">
                        <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground tracking-tighter mb-6">
                            <Trans i18nKey="experience.title">
                                Career <span className="text-muted-foreground">History</span>
                            </Trans>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-sm">
                            {t('experience.desc')}
                        </p>
                    </div>

                    {/* Timeline Content */}
                    <div className="md:w-2/3 relative flex flex-col gap-16 pl-8 md:pl-0">

                        {/* Glowing Progress Line */}
                        <div className="absolute left-0 md:left-[-40px] top-2 bottom-0 w-[2px] bg-border/50 overflow-hidden rounded-full">
                            <motion.div
                                style={{ scaleY, transformOrigin: "top" }}
                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
                            />
                            {/* Glowing Beacon */}
                            <motion.div
                                style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                                className="absolute left-1/2 -translate-x-1/2 w-4 h-32 bg-gradient-to-b from-transparent via-white to-transparent blur-md opacity-50"
                            />
                        </div>

                        {experiences.map((job, index) => (
                            <SpotlightCard key={job.id} job={job} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
