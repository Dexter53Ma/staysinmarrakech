"use client";

import { useEffect, useState } from "react";
import { Icon, faStar, faQuoteLeft } from "@/components/icons";

interface Testimonial {
  id: string;
  guestName: string;
  guestCountry: string;
  propertyName: string;
  rating: number;
  reviewText: string;
  duration: string;
  year: number;
  isApproved: boolean;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) =>
        setTestimonials(
          data.filter((t: Testimonial) => t.isApproved).slice(0, 6)
        )
      )
      .catch((e) => console.error("[TestimonialsSection] fetch error:", e));
  }, []);

  const isLoading = testimonials.length === 0;

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#0d47a1]/10 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[#0d47a1] text-sm font-semibold">Avis clients</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#34495e] mb-3">
            Témoignages de nos clients
          </h2>
          <p className="text-gray-500">
            Ce que nos clients disent de leur séjour à Marrakech
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))
          ) : (
            testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    icon={faStar}
                    className={`text-sm ${
                      i < (t.rating || 5) ? "text-yellow-400" : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div className="relative mb-4">
                <Icon icon={faQuoteLeft} className="text-[#0d47a1]/10 text-3xl absolute -top-1 -left-1" />
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 relative z-10 pl-4">
                  {t.reviewText}
                </p>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-[#34495e] text-sm">
                  {t.guestName}
                </p>
                <p className="text-gray-400 text-xs">
                  {t.guestCountry && `${t.guestCountry} — `}
                  {t.propertyName && `${t.propertyName}`}
                  {t.duration && ` — ${t.duration}`}
                </p>
              </div>
            </div>
          ))
        )}
        </div>
      </div>
    </section>
  );
}
