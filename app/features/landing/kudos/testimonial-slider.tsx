import 'swiper/css';

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { Testimonial } from "~/data/testimonials";
import { cn } from "~/lib/utils";

import { TestimonialCard } from "./testimonial-card";

interface TestimonialSliderProps {
    testimonials: Testimonial[];
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="flex flex-col gap-12">
            {/* Main Swiper Content - Fixed Height for Stability */}
            <div className="relative h-[500px] w-full">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    speed={600}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    className="h-full w-full"
                >
                    {testimonials.map((current) => (
                        <SwiperSlide key={current.id} className="h-full w-full">
                            <TestimonialCard testimonial={current} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-0">
                <div className="flex gap-2">
                    {/* Indicators */}
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => swiperRef.current?.slideToLoop(idx)}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-500",
                                idx === activeIndex
                                    ? "w-12 bg-black dark:bg-white"
                                    : "w-2 bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400"
                            )}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
