import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, FileDown, Mail, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { useIntlayer } from "react-intlayer";
import { useFetcher } from "react-router";
import confetti from "canvas-confetti";

import { Button } from "~/components/ui/button";
import { SimpleIcon, siGithub, siLinkedin } from "~/components/ui/simple-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export function Contact() {
  const content = useIntlayer("contact");
  const fetcher = useFetcher<{
    success?: boolean;
    error?: string;
    details?: {
      name?: string[];
      email?: string[];
      message?: string[];
    };
  }>();
  const { data, state } = fetcher;
  const isSubmitting = state === "submitting";
  const isSuccess = data?.success;
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isSuccess) return;
    formRef.current?.reset();

    const duration = 5_000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
    };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isSuccess]);

  return (
    <TooltipProvider>
      <section
        id="contact"
        className="relative overflow-hidden bg-background px-6 py-32 text-foreground transition-colors duration-500 md:px-12 lg:px-24 dark:bg-black"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <h2 className="min-h-[1em] font-display text-6xl font-bold leading-[0.9] tracking-tighter md:text-8xl">
              {content.titleLine1} <br />
              <span className="text-foreground">{content.titleLine2}</span>{" "}
              <br />
              <span className="text-foreground">{content.titleLine3}</span>
            </h2>

            <div className="mt-8 flex flex-col gap-6">
              <p className="min-h-[1.5em] max-w-md text-xl leading-relaxed text-muted-foreground">
                {content.description}
              </p>

              <div className="flex gap-4">
                <SocialLink
                  href="https://github.com/scorrea-ui"
                  icon={<SimpleIcon icon={siGithub} />}
                  label="GitHub"
                  tooltip="Check out my work"
                />
                <SocialLink
                  href="https://www.linkedin.com/in/wegrix/"
                  icon={<SimpleIcon icon={siLinkedin} />}
                  label="LinkedIn"
                  tooltip="Let's Connect"
                />
                <SocialLink
                  href="mailto:scorrea.dev@gmail.com"
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  tooltip="Hiring someone awesome?"
                />
                <div className="mx-2 h-8 w-px bg-border" />
                <SocialLink
                  href="/SANTIAGO%20CORREA%20-%20RESUME.pdf"
                  icon={<FileDown className="h-5 w-5" />}
                  label="Resume"
                  tooltip="Grab my CV"
                />
              </div>

              <div className="mt-8 border-t border-border pt-8">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  &copy; 2026 Santiago Correa. All rights reserved.
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="rounded-3xl border border-border bg-card/50 p-8 shadow-2xl backdrop-blur-sm md:p-10"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                    <Send className="h-10 w-10 text-green-500" />
                  </div>
                  <h3 className="mb-4 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-3xl font-bold text-transparent">
                    Message Sent!
                  </h3>
                  <p className="max-w-sm text-lg text-muted-foreground">
                    Thanks for reaching out! I'll get back to you as soon as
                    possible.
                  </p>
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="mt-8"
                  >
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <fetcher.Form
                  ref={formRef}
                  method="post"
                  action="/api/contact"
                  className="relative z-10 flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      name="name"
                      label={content.nameLabel}
                      type="text"
                      placeholder="John Doe"
                      error={data?.details?.name?.[0]}
                    />
                    <FormField
                      name="email"
                      label={content.emailLabel}
                      type="email"
                      placeholder="john@example.com"
                      error={data?.details?.email?.[0]}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="font-mono text-sm uppercase tracking-wider text-muted-foreground"
                    >
                      {content.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      required
                      className="resize-none rounded-lg border border-border bg-background p-3 text-foreground transition-colors focus:border-zinc-500 focus:outline-none"
                      placeholder="Tell me about your project..."
                    />
                    <AnimatePresence mode="wait">
                      {data?.details?.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="mt-1 flex items-center gap-1.5 text-xs font-medium text-red-500"
                        >
                          <CircleAlert className="h-3.5 w-3.5" />
                          {data.details.message[0]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <Button
                    disabled={isSubmitting}
                    className="mt-2 h-14 w-full rounded-xl bg-foreground text-lg font-medium text-background shadow-lg transition-all hover:scale-[1.02] hover:opacity-90 hover:shadow-xl active:scale-[0.98]"
                  >
                    {isSubmitting ? "Sending..." : content.sendButton}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>

                  <AnimatePresence mode="wait">
                    {data?.error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-red-500/10 p-2 text-sm text-red-500"
                      >
                        <CircleAlert className="h-4 w-4" />
                        {data.error}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </fetcher.Form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.03] dark:opacity-[0.07]" />
      </section>
    </TooltipProvider>
  );
}

function FormField({
  name,
  label,
  type,
  placeholder,
  error,
}: {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-mono text-sm uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      <input
        name={name}
        id={name}
        type={type}
        required
        className="rounded-lg border border-border bg-background p-3 text-foreground transition-colors focus:border-zinc-500 focus:outline-none"
        placeholder={placeholder}
      />
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-1 flex items-center gap-1.5 text-xs font-medium text-red-500"
          >
            <CircleAlert className="h-3.5 w-3.5" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label,
  tooltip,
}: {
  href: string;
  icon: React.ReactNode;
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
          className="group relative rounded-full border border-border bg-card p-4 text-muted-foreground shadow-sm transition-all duration-300 hover:border-zinc-400 hover:bg-zinc-100 hover:text-foreground hover:shadow-md dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
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
