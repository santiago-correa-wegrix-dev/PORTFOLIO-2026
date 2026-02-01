import { TESTIMONIALS } from "~/data/testimonials";

import { TestimonialSlider } from "./kudos/testimonial-slider";

export function Kudos() {
    return (
        <section id="kudos" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
            {/* Massive Background Decor */}
            <div className="absolute top-0 left-0 text-[20vw] font-bold text-zinc-100 dark:text-zinc-900 leading-none select-none pointer-events-none opacity-50">
                KUDOS
            </div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="flex flex-col gap-12 md:gap-16">
                    {/* Header */}
                    <div className="flex flex-col gap-4">
                        <span className="text-sm font-mono text-zinc-500 uppercase tracking-widest">
                            Testimonials
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tight text-foreground max-w-2xl">
                            Trusted by <span className="text-zinc-400">Leaders</span> & <span className="text-zinc-400">Engineers</span>.
                        </h2>
                    </div>

                    {/* Slider */}
                    <TestimonialSlider testimonials={TESTIMONIALS} />
                </div>
            </div>
        </section>
    );
}
