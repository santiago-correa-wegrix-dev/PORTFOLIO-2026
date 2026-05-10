import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, FileDown, Mail } from "lucide-react";
import { lazy, Suspense, useRef } from "react";
import { useIntlayer } from "react-intlayer";

import { Button } from "~/components/ui/button";
import { SimpleIcon, siGithub, siLinkedin } from "~/components/ui/simple-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useIsDark } from "~/hooks/use-is-dark";

const QuantumField = lazy(() =>
  import("~/components/visuals/quantum-field").then((m) => ({
    default: m.QuantumField,
  })),
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { tagline, subline, cta, scroll } = useIntlayer("hero");
  const { scrollY } = useScroll();
  const isDark = useIsDark();

  // Lenis already smooths scroll — no need for useSpring (avoids double-interpolation jank)
  const textY = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  return (
    <TooltipProvider>
      <section
        ref={containerRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-20 md:pt-0"
      >
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

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 px-6 text-center md:px-12 lg:px-24">
          <motion.div
            style={{ y: textY, opacity }}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center rounded-[2rem] border border-zinc-200/50 bg-white/40 px-8 py-12 shadow-sm backdrop-blur-md transition-colors duration-500 md:px-16 md:py-20 dark:border-white/10 dark:bg-black/40 dark:shadow-none dark:backdrop-blur-md"
          >
            <h1 className="z-20 mb-10 text-7xl leading-[0.85] font-bold tracking-tighter text-black md:text-9xl lg:text-[11rem] dark:text-white">
              SANTIAGO
              <br />
              <span className="text-zinc-500 dark:text-zinc-300">CORREA</span>
            </h1>

            <p className="max-w-3xl text-xl leading-relaxed font-light text-zinc-600 dark:text-zinc-200 md:text-2xl">
              {tagline}
            </p>
            <span className="mt-6 block font-mono text-base text-zinc-500 md:text-lg dark:text-zinc-400">
              {subline}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="z-30 flex flex-col items-center gap-6 md:flex-row"
          >
            <Button
              className="group h-14 min-w-[180px] rounded-full bg-white px-8 text-lg font-medium text-zinc-950 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-zinc-200 hover:shadow-xl"
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {cta}
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>

            <div className="flex gap-4">
              <SocialIcon
                href="https://github.com/scorrea-ui"
                icon={<SimpleIcon icon={siGithub} />}
                label="GitHub Profile"
                tooltip="Check out my work"
              />
              <SocialIcon
                href="https://www.linkedin.com/in/wegrix/"
                icon={<SimpleIcon icon={siLinkedin} />}
                label="LinkedIn Profile"
                tooltip="Let's Connect"
              />
              <SocialIcon
                href="mailto:scorrea.dev@gmail.com"
                icon={<Mail className="h-5 w-5" />}
                label="Email Contact"
                tooltip="Hiring someone awesome?"
              />
              <SocialIcon
                href="/SANTIAGO%20CORREA%20-%20RESUME.pdf"
                icon={<FileDown className="h-5 w-5" />}
                label="Download Resume"
                tooltip="Grab my CV"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="mb-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            {scroll}
          </span>
          <div className="h-16 w-[1px] overflow-hidden bg-zinc-300 dark:bg-zinc-800">
            <motion.div
              className="h-1/2 w-full bg-zinc-900 dark:bg-zinc-400"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>
    </TooltipProvider>
  );
}

function SocialIcon({
  icon,
  href,
  label,
  tooltip,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
  tooltip: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group relative rounded-full border border-zinc-200 bg-white/80 p-3 text-zinc-600 backdrop-blur-sm transition-colors hover:scale-110 hover:border-zinc-400 hover:text-black hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white"
        >
          {icon}
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
