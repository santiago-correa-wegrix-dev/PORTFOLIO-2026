import { motion } from "framer-motion";
import { FileDown, Github, Linkedin, Mail, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

export function Contact() {
    const { t } = useTranslation();

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
                                <SocialLink href="https://github.com/santiago-correa-wegrix-dev" icon={<Github className="w-5 h-5" />} label="GitHub" tooltip="Most repos are private! 🕵️‍♂️" />
                                <SocialLink href="https://www.linkedin.com/in/wegrix/" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" tooltip="Let's Connect" />
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
                        <form className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{t('contact.name')}</label>
                                    <input id="name" type="text" className="bg-background border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-zinc-500 transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{t('contact.email')}</label>
                                    <input id="email" type="email" className="bg-background border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-zinc-500 transition-colors" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{t('contact.message')}</label>
                                <textarea id="message" rows={4} className="bg-background border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-zinc-500 transition-colors resize-none" placeholder="Tell me about your project..." />
                            </div>

                            <Button className="h-14 mt-2 bg-foreground text-background hover:opacity-90 text-lg font-medium w-full rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                                {t('contact.send')}
                                <Send className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
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
