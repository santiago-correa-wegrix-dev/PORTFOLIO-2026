import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, FileDown, Mail } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";

import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { SimpleIcon, siGithub, siLinkedin } from "~/components/ui/simple-icon";
import { lazy, Suspense } from "react";
// Lazy load the heavy 3D background
const QuantumField = lazy(() => import("~/components/visuals/quantum-field").then(module => ({ default: module.QuantumField })));

import { useIsDark } from "~/hooks/use-is-dark";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const { scrollY } = useScroll();
    const isDark = useIsDark();

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    // Parallax Logic: "Heavy" & "Smooth" (2026 Feel)
    // We use a spring to dampen the raw scroll value, removing any jitter
    const springConfig = { mass: 0.1, stiffness: 100, damping: 20 };
    const smoothScrollY = useSpring(scrollY, springConfig);

    // Adjusted for better visibility - User Request
    // Moves half as fast, fades out much later (after 500px instead of 300px)
    const textY = useTransform(smoothScrollY, [0, 600], [0, 150]);
    const opacity = useTransform(smoothScrollY, [0, 600], [1, 0.2]); // Doesn't fully fade to 0 immediately

    return (
        <TooltipProvider>
            <section ref={containerRef} className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background pt-20 md:pt-0">
                {/* Full Screen Quantum Field - Next Level Background */}
                <div className="absolute inset-0 z-0">
                    <Suspense fallback={<div className="w-full h-full bg-background" />}>
                        <QuantumField key={isDark ? 'dark' : 'light'} isDark={isDark} />
                    </Suspense>
                </div>

                {/* Radial Gradient Overlay - Visibility Control */}
                {/* Light Mode: White center fade. Dark Mode: None (Pitch Black) or Subtle Vignette */}
                <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${isDark ? 'opacity-0' : 'opacity-80 bg-[radial-gradient(circle_at_center,transparent_0%,_#ffffff_100%)]'}`} />
                {isDark && <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,_#000000_100%)] opacity-60" />}

                {/* Content Container - Centered */}
                <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 relative z-10 flex flex-col items-center justify-center text-center gap-12">

                    <motion.div
                        style={{ y: textY, opacity: opacity }}
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Snappier entry (0.8s)
                        className="flex flex-col items-center relative px-8 py-12 md:px-16 md:py-20 rounded-[2rem] transition-colors duration-500 bg-white/40 backdrop-blur-md border border-zinc-200/50 dark:bg-black/40 dark:backdrop-blur-md dark:border-white/10 shadow-sm dark:shadow-none"
                    >
                        {/* Main Title - Name - Clean, Solid, Timeless - Geist Font */}
                        {/* font-sans implies Geist/Inter */}
                        <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter text-black dark:text-white leading-[0.85] mb-10 z-20">
                            SANTIAGO
                            <br />
                            <span className="text-zinc-500 dark:text-zinc-300">CORREA</span>
                        </h1>

                        {/* Subtitle - Role - i18n */}
                        <p className="text-xl md:text-3xl text-zinc-600 dark:text-zinc-200 max-w-3xl leading-relaxed font-light">
                            <Trans i18nKey="hero.role">
                                Front-End Engineer & <span className="text-black dark:text-white font-medium">Creative Developer</span>
                            </Trans>
                            <span className="block mt-6 text-base md:text-lg text-zinc-500 dark:text-zinc-400 font-mono min-h-[1.75rem]">
                                {mounted ? t('hero.tagline') : ""}
                            </span>
                        </p>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex flex-col md:flex-row gap-6 items-center z-30"
                    >
                        <Button
                            className="h-14 px-8 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 text-lg font-medium group transition-all duration-300 min-w-[180px] shadow-lg hover:shadow-xl hover:scale-105"
                            onClick={() => {
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {mounted ? t('hero.cta') : ""}
                            <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </Button>

                        <div className="flex gap-4">
                            <SocialIcon
                                href="https://github.com/santiago-correa-wegrix-dev"
                                icon={<SimpleIcon icon={siGithub} />}
                                label="GitHub Profile"
                                tooltip="Most repos are private! 🕵️‍♂️"
                            />
                            <SocialIcon
                                href="https://www.linkedin.com/in/wegrix/"
                                icon={<SimpleIcon icon={siLinkedin} />}
                                label="LinkedIn Profile"
                                tooltip="Let's Connect"
                            />
                            <SocialIcon
                                href="mailto:scorrea.dev@gmail.com"
                                icon={<Mail className="w-5 h-5" />}
                                label="Email Contact"
                                tooltip="Hiring someone awesome?"
                            />
                            <SocialIcon
                                href="/SANTIAGO%20CORREA%20-%20RESUME.pdf"
                                icon={<FileDown className="w-5 h-5" />}
                                label="Download Resume"
                                tooltip="Grab my CV"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator - Dynamic */}
                <motion.div
                    style={{ opacity }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                >
                    <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">{mounted ? t('hero.scroll') : ""}</span>
                    <div className="w-[1px] h-16 bg-zinc-300 dark:bg-zinc-800 overflow-hidden">
                        <motion.div
                            className="w-full h-1/2 bg-zinc-900 dark:bg-zinc-400"
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            </section>
        </TooltipProvider>
    );
}

// Custom Tooltip Component for that "nice" feel
// Radix Tooltip Component
function SocialIcon({ icon, href, label, tooltip }: { icon: React.ReactNode, href: string, label: string, tooltip: string }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm group hover:scale-110 hover:shadow-lg relative"
                >
                    {icon}
                </a>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    )
}
