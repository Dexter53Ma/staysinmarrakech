"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icon, faStar, faFilter } from "@/components/icons";

interface Testimonial {
  id: string;
  guestName: string;
  guestCountry: string | null;
  propertyName: string | null;
  duration: string | null;
  year: number | null;
  rating: number | null;
  reviewText: string | null;
  isApproved: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) =>
        setTestimonials(
          data
            .filter((t: Testimonial) => t.isApproved)
            .sort((a: Testimonial, b: Testimonial) => (b.year ?? 0) - (a.year ?? 0))
        )
      )
      .catch(() => {});
  }, []);

  const filtered = testimonials.filter(
    (t) =>
      !filterValue ||
      t.propertyName?.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-20 bg-[#f8f9fa]">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-[#34495e] uppercase mb-4">
                Témoignages des clients
              </h1>
              <div className="w-20 h-1 bg-[#ffb000] mb-6" />
            </div>

            <div className="mb-8">
              <button
                onClick={() => setShowFilters((f) => !f)}
                className="flex items-center gap-2 bg-[#0d47a1] hover:bg-[#0a3a82] text-white font-medium py-2.5 px-6 rounded transition-colors text-sm uppercase tracking-wide"
              >
                <Icon icon={faFilter} className="text-sm" />
                <span>Filtrer</span>
              </button>
            </div>

            {showFilters && (
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-3 mb-8"
              >
                <input
                  type="text"
                  placeholder="Nom de la villa"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="border border-[#ddd] rounded px-4 py-2 text-sm w-64 focus:outline-none focus:border-[#0d47a1]"
                />
                <button
                  type="submit"
                  className="bg-[#0d47a1] hover:bg-[#0a3a82] text-white font-medium py-2 px-6 rounded text-sm"
                >
                  Filtrer
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col"
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
                  {t.reviewText && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                      {t.reviewText}
                    </p>
                  )}
                  <div className="border-t border-gray-100 pt-3">
                    <p className="font-semibold text-[#34495e] text-sm">
                      {t.guestName}
                      {t.guestCountry && (
                        <span className="text-gray-400 font-normal ml-1">
                          — {t.guestCountry}
                        </span>
                      )}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {t.propertyName && `Villa ${t.propertyName}`}
                      {t.duration && ` — ${t.duration}`}
                      {t.year && ` — ${t.year}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-gray-500 py-12">
                Aucun témoignage trouvé.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
