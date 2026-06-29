"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Icon,
  faArrowLeft,
  faArrowRight,
} from "@/components/icons";

interface Activity {
  name: string;
  image: string;
  slug: string;
}

export default function ActivitiesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) =>
        setActivities(
          data
            .filter((s: { isActive: boolean }) => s.isActive)
            .map((s: { title: string; image: string; slug: string }) => ({
              name: s.title,
              image: s.image,
              slug: s.slug,
            }))
        )
      );
  }, []);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector<HTMLElement>(":scope > div")?.offsetWidth || 200;
    const gap = 16;
    const amount = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="max-w-[1140px] mx-auto py-[60px] px-[15px] overflow-hidden">
      <h2 className="text-[26px] font-bold uppercase text-[#0b1014] mb-10">
        Activités marrakech à découvrir
      </h2>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-11 h-11 flex items-center justify-center hover:bg-[#0d47a1] hover:text-white transition-all duration-300"
            aria-label="Précédent"
          >
            <Icon icon={faArrowLeft} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
        >
          {activities.length === 0 ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-none w-[70vw] sm:w-[260px] lg:w-[300px] h-[200px] sm:h-[220px] rounded-xl bg-gray-200 animate-pulse" />
            ))
          ) : (
            activities.map((activity) => (
            <a
              key={activity.slug}
              href={`/service/${activity.slug}`}
              className="relative flex-none w-[70vw] sm:w-[260px] lg:w-[300px] h-[200px] sm:h-[220px] rounded-xl overflow-hidden snap-start group cursor-pointer block shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={activity.image || "/images/placeholder.svg"}
                alt={activity.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 260px, 300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                <span className="text-white text-[15px] font-bold uppercase tracking-wide">
                  {activity.name}
                </span>
              </div>
            </a>
          ))
        )}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-11 h-11 flex items-center justify-center hover:bg-[#0d47a1] hover:text-white transition-all duration-300"
            aria-label="Suivant"
          >
            <Icon icon={faArrowRight} />
          </button>
        )}
      </div>
    </section>
  );
}
