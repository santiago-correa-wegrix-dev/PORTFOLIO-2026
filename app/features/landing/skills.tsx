import { AnimatePresence, motion } from "framer-motion";
import { Suspense, lazy, useState } from "react";
import { useIntlayer } from "react-intlayer";

import { TechIcon } from "~/components/ui/tech-icon";

const HolographicSkills = lazy(() =>
  import("~/components/visuals/holographic-skills").then((module) => ({
    default: module.HolographicSkills,
  })),
);

interface SkillGalaxyProps {
  data: string[];
}

export function SkillGalaxy({ data: skillsList }: SkillGalaxyProps) {
  const { title, titleAccent, description } = useIntlayer("skills");
  const [viewMode, setViewMode] = useState<"3d" | "list">("list");

  return (
    <section className="relative overflow-hidden px-6 py-24 transition-colors duration-700 md:px-12 lg:px-24">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-muted/5" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="relative z-20 mb-16 flex w-full flex-col items-center gap-8 md:px-8">
            <div className="text-center">
              <h2 className="mb-4 min-h-[1em] font-display text-5xl font-bold tracking-tighter text-foreground md:text-7xl">
                {title} <span className="text-muted-foreground">{titleAccent}</span>
              </h2>
              <p className="mx-auto min-h-[1.5em] max-w-2xl text-xl leading-relaxed font-light text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="flex items-center gap-1 rounded-full border border-border/50 bg-zinc-100 p-1 dark:bg-zinc-900/50">
              <button
                onClick={() => setViewMode("3d")}
                className={`rounded-full px-5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${viewMode === "3d" ? "bg-white text-foreground shadow-sm dark:bg-zinc-800" : "text-muted-foreground hover:text-foreground"}`}
              >
                3D
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-full px-5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${viewMode === "list" ? "bg-white text-foreground shadow-sm dark:bg-zinc-800" : "text-muted-foreground hover:text-foreground"}`}
              >
                List
              </button>
            </div>
          </div>

          <div className="relative min-h-[500px] w-full">
            <AnimatePresence mode="wait">
              {viewMode === "3d" ? (
                <motion.div
                  key="3d"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <Suspense
                    fallback={
                      <div className="flex min-h-[500px] items-center justify-center text-muted-foreground">
                        Loading 3D view…
                      </div>
                    }
                  >
                    <HolographicSkills />
                  </Suspense>
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
                  <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 px-4 pt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {skillsList.map((skill) => (
                      <div
                        key={skill}
                        className="group relative flex cursor-default items-center gap-3 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/50"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all group-hover:border-primary/30 group-hover:text-primary">
                          <TechIcon name={skill} className="h-5 w-5" />
                        </div>
                        <span className="relative z-10 text-sm font-medium tracking-wide text-foreground transition-colors group-hover:text-primary md:text-base">
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
