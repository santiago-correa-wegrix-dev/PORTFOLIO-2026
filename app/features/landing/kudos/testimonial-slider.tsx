import "swiper/css";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "~/components/ui/button";
import type { Testimonial } from "~/data/testimonials";
import { cn } from "~/utils/utils";

import { TestimonialCard } from "./testimonial-card";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slideTo = (idx: number) => swiperRef.current?.slideToLoop(idx);
  const slidePrev = () => swiperRef.current?.slidePrev();
  const slideNext = () => swiperRef.current?.slideNext();
  const onSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
  };
  const onSlideChange = (swiper: SwiperType) => setActiveIndex(swiper.realIndex);

  return (
    <div className="flex flex-col gap-12">
      <div className="relative w-full">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          speed={600}
          autoHeight={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={onSwiper}
          onSlideChange={onSlideChange}
          className="w-full"
        >
          {testimonials.map((current) => (
            <SwiperSlide key={current.id} className="h-full w-full">
              <TestimonialCard testimonial={current} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-8">
        <div className="flex gap-2">
          {testimonials.map((testimonial, idx) => (
            <Button
              key={testimonial.id}
              variant="ghost"
              onClick={() => slideTo(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className="h-11 w-11 p-0"
            >
              <span
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  idx === activeIndex
                    ? "w-8 bg-black dark:bg-white"
                    : "w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400",
                )}
              />
            </Button>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            aria-label="Go to previous Slide"
            onClick={slidePrev}
            className="h-auto w-auto rounded-full border border-zinc-200 p-3 dark:border-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            aria-label="Go to next Slide"
            onClick={slideNext}
            className="h-auto w-auto rounded-full border border-zinc-200 p-3 dark:border-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
