import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIntlayer } from "react-intlayer";

import { experiences } from "~/data/experience";

import { SpotlightCard } from "./experience/spotlight-card";

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { title, titleAccent, description } = useIntlayer("experience");
  const { scrollYProgress } = useScroll({
    offset: ["start 80%", "end 50%"],
    target: containerRef,
  });

  const scaleY = useSpring(scrollYProgress, {
    damping: 30,
    restDelta: 0.001,
    stiffness: 100,
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative overflow-hidden bg-background px-6 py-32 transition-colors duration-700 md:px-12 lg:px-24 dark:bg-black"
    >
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] opacity-[0.05] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,#000_100%,transparent_0%)] dark:opacity-[0.1]" />

      <div className="relative z-10 mx-auto max-w-7xl">
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
            <p className="min-h-[1.5em] max-w-xl font-mono leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </motion.div>

        <div className="relative flex flex-col gap-16 md:flex-row md:gap-24">
          <div className="relative flex flex-col gap-16 pl-8 md:w-2/3 md:pl-0">
            <div className="absolute top-2 bottom-0 left-0 w-0.5 overflow-hidden rounded-full bg-border/50 md:-left-10">
              <motion.div
                style={{ scaleY, transformOrigin: "top" }}
                className="absolute top-0 left-0 h-full w-full bg-linear-to-b from-blue-500 via-purple-500 to-pink-500"
              />
              <motion.div
                style={{
                  top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                }}
                className="absolute left-1/2 h-32 w-4 -translate-x-1/2 bg-linear-to-b from-transparent via-white to-transparent opacity-50 blur-md"
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
