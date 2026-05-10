import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Suspense, lazy } from "react";
import { useIntlayer } from "react-intlayer";

import { SocialLinks } from "~/components/ui/social-links";
import { Button } from "~/components/ui/button";
import { useIsDark } from "~/hooks/use-is-dark";

const QuantumField = lazy(() =>
  import("~/components/visuals/quantum-field").then((module) => ({
    default: module.QuantumField,
  })),
);

export function Hero() {
  const { tagline, subline, cta, scroll } = useIntlayer("hero");
  const { scrollY } = useScroll();
  const isDark = useIsDark();

  const textY = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full bg-background" />}>
          <QuantumField key={isDark ? "dark" : "light"} isDark={isDark} />
        </Suspense>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ${isDark ? "opacity-0" : "bg-[radial-gradient(circle_at_center,transparent_0%,_#ffffff_100%)] opacity-80"}`}
      />
      {isDark && (
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,_#000000_100%)] opacity-60" />
      )}

      <motion.div
        style={{ opacity, y: textY }}
        initial={{ filter: "blur(8px)", opacity: 0, scale: 0.97 }}
        animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center rounded-3xl border border-zinc-200/40 bg-white/50 px-8 py-14 text-center shadow-sm backdrop-blur-lg transition-colors duration-500 sm:px-12 md:px-16 dark:border-white/10 dark:bg-black/40 dark:shadow-none"
      >
        <h1 className="mb-6 text-6xl leading-[0.9] font-bold tracking-tighter text-black sm:text-7xl md:text-8xl lg:text-9xl dark:text-white">
          SANTIAGO
          <br />
          <span className="text-zinc-400 dark:text-zinc-500">CORREA</span>
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed font-light text-zinc-600 sm:text-xl dark:text-zinc-300">
          {tagline}
        </p>
        <span className="mt-3 block font-mono text-sm text-zinc-400 sm:text-base dark:text-zinc-500">
          {subline}
        </span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 flex flex-col items-center gap-5 sm:flex-row"
        >
          <Button
            asChild
            className="group h-12 rounded-full bg-zinc-900 px-7 text-base font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <a href="#projects">
              {cta}
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </Button>

          <SocialLinks />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
          {scroll}
        </span>
        <div className="h-10 w-px overflow-hidden bg-zinc-300 dark:bg-zinc-800">
          <motion.div
            className="h-1/2 w-full bg-zinc-600 dark:bg-zinc-500"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
