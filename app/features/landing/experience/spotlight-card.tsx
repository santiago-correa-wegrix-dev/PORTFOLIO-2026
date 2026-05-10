import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

import type { Job } from "~/data/experience";

export function SpotlightCard({ job, index }: { job: Job; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -10, x: 50 }}
      whileInView={{ opacity: 1, rotateX: 0, x: 0 }}
      viewport={{ margin: "-50px", once: true }}
      transition={{
        damping: 20,
        delay: index * 0.1,
        stiffness: 50,
        type: "spring",
      }}
      className="group perspective-1000 relative isolate overflow-hidden rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm"
      onMouseMove={handleMouseMove}
    >
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

      <div className="relative z-10 flex flex-col gap-4">
        <div className="absolute top-10 left-[-52px] h-4 w-4 rounded-full border-2 border-background bg-border shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)] transition-colors duration-200 group-hover:bg-foreground md:left-[-52px]" />

        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-foreground transition-colors duration-200 md:min-h-[1em]">
              {job.role}
            </h3>
            <span className="flex items-center gap-2 font-medium text-muted-foreground">
              <Briefcase className="h-4 w-4" /> {job.company}
            </span>
          </div>
          <span className="flex h-fit w-fit items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 font-mono text-sm text-muted-foreground md:min-h-[1.5em]">
            <Calendar className="h-3 w-3" /> {job.period}
          </span>
        </div>

        <p className="min-h-[1.5em] leading-relaxed font-light text-foreground/80">
          {job.description}
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {job.stack.map((tech) => (
            <span
              key={tech}
              className="cursor-default rounded border border-border bg-muted/20 px-2 py-1 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
