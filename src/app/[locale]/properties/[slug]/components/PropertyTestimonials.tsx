import { Star } from "lucide-react";
import type { Testimonial } from "@/types";

interface PropertyTestimonialsProps {
  testimonials: Testimonial[];
}

export default function PropertyTestimonials({ testimonials }: PropertyTestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Avis</h2>
      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold text-gray-900">{t.guestName}</p>
                {t.guestCountry && (
                  <p className="text-sm text-gray-500">{t.guestCountry}</p>
                )}
              </div>
              {t.rating && (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < t.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              )}
            </div>
            {t.reviewText && (
              <p className="text-gray-600 text-sm leading-relaxed">{t.reviewText}</p>
            )}
            {(t.duration || t.year) && (
              <p className="text-xs text-gray-400 mt-2">
                {[t.duration, t.year].filter(Boolean).join(" - ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
