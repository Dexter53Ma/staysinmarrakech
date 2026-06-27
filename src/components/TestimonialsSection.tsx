"use client";

import { useEffect, useState } from "react";
import { Icon, faStar } from "@/components/icons";

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
      .catch(() => {});
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#34495e] mb-3">
            Témoignages de nos clients
          </h2>
          <p className="text-gray-500">
            Ce que nos clients disent de leur séjour à Marrakech
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
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
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                {t.reviewText}
              </p>
              <div className="border-t border-gray-100 pt-3">
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
          ))}
        </div>
      </div>
    </section>
  );
}
