import { Quote } from "lucide-react";

import type { Testimonial } from "~/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start cursor-grab active:cursor-grabbing pb-4">
      {/* Quote Side */}
      <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8 select-none">
        <Quote className="w-10 h-10 md:w-12 md:h-12 text-zinc-300 dark:text-zinc-700 rotate-180 shrink-0" />

        <p className="text-2xl md:text-4xl font-medium leading-tight text-foreground tracking-tight">
          "{testimonial.quote}"
        </p>

        <div className="flex flex-col gap-1 shrink-0">
          <cite className="text-lg md:text-xl font-semibold not-italic">{testimonial.name}</cite>
          <span className="text-zinc-500 font-medium text-sm md:text-base">{testimonial.role}</span>
        </div>
      </div>

      {/* Visual/Highlight Side */}
      <div className="lg:col-span-4 hidden lg:flex flex-col justify-start border-l border-zinc-200 dark:border-zinc-800 pl-12 select-none">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-mono uppercase tracking-wider mb-4">
          Key Highlight
        </p>
        <p className="text-2xl text-zinc-600 dark:text-zinc-300 font-serif italic leading-relaxed">
          "{testimonial.highlight}"
        </p>
      </div>
    </div>
  );
}
