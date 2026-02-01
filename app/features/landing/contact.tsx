import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, FileDown, Mail, Send } from "lucide-react";
import { siGithub } from "simple-icons";
import { useTranslation } from "react-i18next";

const siLinkedin = {
    title: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
};

import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

import { useFetcher } from "react-router";

export function Contact() {
    const { t } = useTranslation();
    const fetcher = useFetcher<{
        success?: boolean;
        error?: string;
        details?: {
            name?: string[];
            email?: string[];
            message?: string[];
        }
    }>();
    const { data, state } = fetcher;
    const isSubmitting = state === "submitting";

    return (
        <TooltipProvider>
            <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-background dark:bg-black text-foreground relative overflow-hidden transition-colors duration-500">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col gap-8"
                    >
                        <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9]">
                            {t('contact.title_1')} <br />
                            <span className="text-foreground">{t('contact.title_2')}</span> <br />
                            <span className="text-foreground">{t('contact.title_3')}</span>
                        </h2>

                        <div className="flex flex-col gap-6 mt-8">
                            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
                                {t('contact.desc')}
                            </p>

                            <div className="flex gap-4">
                                <SocialLink href="https://github.com/santiago-correa-wegrix-dev" icon={<SimpleIconWrapper icon={siGithub} />} label="GitHub" tooltip="Most repos are private! 🕵️‍♂️" />
                                <SocialLink href="https://www.linkedin.com/in/wegrix/" icon={<SimpleIconWrapper icon={siLinkedin} />} label="LinkedIn" tooltip="Let's Connect" />
                                <SocialLink href="mailto:scorrea.dev@gmail.com" icon={<Mail className="w-5 h-5" />} label="Email" tooltip="Hiring someone awesome?" />
                                <div className="w-px h-8 bg-border mx-2" />
                                <SocialLink href="/SANTIAGO%20CORREA%20-%20RESUME.pdf" icon={<FileDown className="w-5 h-5" />} label="Resume" tooltip="Grab my CV" />
                            </div>

                            <div className="mt-8 pt-8 border-t border-border">
                                <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
                                    © 2026 Santiago Correa. All rights reserved.
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="bg-card/50 p-8 md:p-10 rounded-3xl border border-border backdrop-blur-sm shadow-2xl"
                    >
                        <fetcher.Form method="post" action="/api/contact" className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{t('contact.name')}</label>
                                    <input name="name" id="name" type="text" required className="bg-background border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-zinc-500 transition-colors" placeholder="John Doe" />
                                    <AnimatePresence mode="wait">
                                        <AnimatePresence mode="wait">
                                            {data?.details?.name && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    className="text-red-500 text-xs flex items-center gap-1.5 mt-1 font-medium"
                                                >
                                                    <CircleAlert className="w-3.5 h-3.5" />
                                                    {data.details.name[0]}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </AnimatePresence>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{t('contact.email')}</label>
                                    <input name="email" id="email" type="email" required className="bg-background border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-zinc-500 transition-colors" placeholder="john@example.com" />
                                    <AnimatePresence mode="wait">
                                        <AnimatePresence mode="wait">
                                            {data?.details?.email && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    className="text-red-500 text-xs flex items-center gap-1.5 mt-1 font-medium"
                                                >
                                                    <CircleAlert className="w-3.5 h-3.5" />
                                                    {data.details.email[0]}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{t('contact.message')}</label>
                                <textarea name="message" id="message" rows={4} required className="bg-background border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-zinc-500 transition-colors resize-none" placeholder="Tell me about your project..." />
                                <AnimatePresence mode="wait">
                                    <AnimatePresence mode="wait">
                                        {data?.details?.message && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                className="text-red-500 text-xs flex items-center gap-1.5 mt-1 font-medium"
                                            >
                                                <CircleAlert className="w-3.5 h-3.5" />
                                                {data.details.message[0]}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </AnimatePresence>
                            </div>

                            <Button disabled={isSubmitting} className="h-14 mt-2 bg-foreground text-background hover:opacity-90 text-lg font-medium w-full rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                                {isSubmitting ? "Sending..." : t('contact.send')}
                                <Send className="w-4 h-4 ml-2" />
                            </Button>

                            <AnimatePresence mode="wait">
                                {data?.error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-red-500 text-sm mt-3 flex items-center justify-center gap-2 bg-red-500/10 p-2 rounded-lg"
                                    >
                                        <CircleAlert className="w-4 h-4" />
                                        {data.error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {data?.success && (
                                <p className="text-green-500 text-sm mt-2 text-center">Message sent successfully!</p>
                            )}
                        </fetcher.Form>
                    </motion.div>

                </div>



                {/* Background Texture - Grid */}
                <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </section>
        </TooltipProvider>
    );
}

function SocialLink({ href, icon, label, tooltip }: { href: string; icon: React.ReactNode; label: string, tooltip: string }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full border border-border bg-card hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-foreground text-muted-foreground transition-all duration-300 group shadow-sm hover:shadow-md relative"
                    aria-label={label}
                >
                    <motion.div whileHover={{ scale: 1.1, rotate: 10 }}>
                        {icon}
                    </motion.div>
                </a>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
}

function SimpleIconWrapper({ icon, className = "w-5 h-5" }: { icon: { title: string; path: string }; className?: string }) {
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>{icon.title}</title>
            <path d={icon.path} />
        </svg>
    );
}
