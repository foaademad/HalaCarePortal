import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

type TestimonialItem = {
  name: string;
  image: string;
  rating: number; // 1-5
  text: string;
};

export default function Testimonials() {
  const { t } = useLanguage();

  // Array of objects — each object holds testimonial data
  const slides: TestimonialItem[] = [
    {
      name: "Sara Ahmed",
      image: "https://i.pravatar.cc/160?img=12",
      rating: 5,
      text: t("about.testimonials.0") || "Excellent home‑care service—professional and on time.",
    },
    {
      name: "Mohamed Karim",
      image: "https://i.pravatar.cc/160?img=24",
      rating: 5,
      text: t("about.testimonials.1") || "Doctors explained everything clearly and kindly.",
    },
    {
      name: "Lina Saeed",
      image: "https://i.pravatar.cc/160?img=36",
      rating: 5,
      text: t("about.testimonials.2") || "Fast diagnostics with modern equipment.",
    },
    {
      name: "Ahmed Mostafa",
      image: "https://i.pravatar.cc/160?img=48",
      rating: 5,
      text: t("about.testimonials.3") || "Professional team and smooth booking process.",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false, align: "center" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <Section className="mb-16" delay={0.15}>
      <h3 className="text-2xl font-semibold text-center mb-8">{t("about.testimonials_title")}</h3>

      <div className="relative">
        {/* Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {slides.map((item, i) => (
              <div className="min-w-0 flex-[0_0_90%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_33%]" key={i}>
                <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm p-6 shadow-lg h-full my-2">
                  <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />

                  <div className="relative flex items-center gap-3 mb-3">
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} size={16} fill={s < item.rating ? "currentColor" : "transparent"} className={s < item.rating ? "text-yellow-400" : "text-yellow-400"} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <blockquote className="relative">
                    <p className="italic opacity-90">“{item.text}”</p>
                  </blockquote>
                </figure>
              </div>
            ))}
          </div>
        </div>

        {/* Custom small arrows */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
          <button onClick={scrollPrev} disabled={!canPrev} className="pointer-events-auto ml-1 sm:ml-2 rounded-full bg-black/50 dark:bg-white/20 text-white p-1 hover:scale-105 transition disabled:opacity-30">
            <ChevronLeft size={16} />
          </button>
          <button onClick={scrollNext} disabled={!canNext} className="pointer-events-auto mr-1 sm:mr-2 rounded-full bg-black/50 dark:bg-white/20 text-white p-1 hover:scale-105 transition disabled:opacity-30">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </Section>
  );
}


