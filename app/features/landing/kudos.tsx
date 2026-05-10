import { useIntlayer } from "react-intlayer";

import { TESTIMONIALS } from "~/data/testimonials";

import { TestimonialSlider } from "./kudos/testimonial-slider";

export function Kudos() {
  const { label, title, titleAccent1, titleAccent2 } = useIntlayer("kudos");

  return (
    <section
      id="kudos"
      className="relative overflow-hidden bg-zinc-50 px-6 py-24 md:px-12 md:py-32 lg:px-24 dark:bg-zinc-950"
    >
      <div className="pointer-events-none absolute top-0 left-0 select-none text-[20vw] leading-none font-bold text-zinc-100 opacity-50 dark:text-zinc-900">
        KUDOS
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-sm uppercase tracking-widest text-zinc-500">
              {label}
            </span>
            <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              {title} <span className="text-zinc-400">{titleAccent1}</span> &{" "}
              <span className="text-zinc-400">{titleAccent2}</span>.
            </h2>
          </div>

          <TestimonialSlider testimonials={TESTIMONIALS} />
        </div>
      </div>
    </section>
  );
}
