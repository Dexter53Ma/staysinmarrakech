"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Testimonial } from "@/types";

interface PropertyTestimonialsProps {
  testimonials: Testimonial[];
}

export default function PropertyTestimonials({ testimonials }: PropertyTestimonialsProps) {
  const t = useTranslations("properties");
  if (testimonials.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{t("reviews")}</h2>
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold text-gray-900">{testimonial.guestName}</p>
                {testimonial.guestCountry && (
                  <p className="text-sm text-gray-500">{testimonial.guestCountry}</p>
                )}
              </div>
              {testimonial.rating && (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < testimonial.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              )}
            </div>
            {testimonial.reviewText && (
              <p className="text-gray-600 text-sm leading-relaxed">{testimonial.reviewText}</p>
            )}
            {(testimonial.duration || testimonial.year) && (
              <p className="text-xs text-gray-400 mt-2">
                {[testimonial.duration, testimonial.year].filter(Boolean).join(" - ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
