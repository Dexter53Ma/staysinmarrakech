"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyFilters, { type FilterState } from "@/components/PropertyFilters";
import PropertyGrid from "@/components/PropertyGrid";

interface PropertyImage {
  url: string;
  alt?: string | null;
}

interface Property {
  id: string;
  title: string;
  slug: string;
  type: string;
  status: string;
  price: number;
  currency: string;
  pricePeriod?: string | null;
  address: string;
  city: string;
  quarter?: string | null;
  bedrooms: number;
  bathrooms: number;
  images: PropertyImage[];
  _count: { views: number };
  createdAt: string;
  updatedAt: string;
}

interface PropertiesPageClientProps {
  properties: Property[];
  total: number;
  page: number;
  totalPages: number;
  initialFilters: FilterState;
}

export default function PropertiesPageClient({
  properties,
  total,
  page,
  totalPages,
  initialFilters,
}: PropertiesPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const applyFilters = useCallback(
    (newFilters: FilterState, newPage?: number) => {
      setFilters(newFilters);
      const p = newPage || 1;
      const params = new URLSearchParams();
      if (p > 1) params.set("page", p.toString());
      if (newFilters.type !== "ALL") params.set("type", newFilters.type);
      if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice);
      if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice);
      if (newFilters.bedrooms) params.set("bedrooms", newFilters.bedrooms);
      if (newFilters.quarter) params.set("quarter", newFilters.quarter);
      if (newFilters.features.length > 0) params.set("features", newFilters.features.join(","));
      if (newFilters.sort !== "newest") params.set("sort", newFilters.sort);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      applyFilters(filters, newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [filters, applyFilters]
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section
          className="relative py-16 flex items-center justify-center"
          style={{
            backgroundImage: "url(/images/header-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-wide mb-3">
              Nos propriétés
            </h1>
            <p className="text-white/80 text-lg">
              Découvrez notre sélection de biens d&apos;exception à Marrakech
            </p>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <PropertyFilters filters={filters} onFiltersChange={(f) => applyFilters(f)} />
            <div className="flex-1 min-w-0">
              <PropertyGrid
                properties={properties}
                total={total}
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12 md:py-16">
          <div className="max-w-[900px] mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#34495e] mb-4">
              Villas de luxe à Marrakech — Trouvez la propriété idéale
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Explorez notre catalogue complet de villas et propriétés de luxe à Marrakech. Chaque bien est soigneusement sélectionné pour son emplacement privilégié, son architecture distinctive et ses prestations haut de gamme. Que vous cherchiez une villa avec piscine chauffée dans la Palmeraie, un riad rénové dans la Médina ou un domaine de charme près du golf Amelkis, notre équipe vous accompagne à chaque étape.
              </p>
              <p>
                Filtrez vos résultats par type de propriété, budget, nombre de chambres ou quartier. Nous proposons des villas pour toutes les occasions : séjours en famille, vacances entre amis, mariages d&apos;exception, séminaires d&apos;entreprise ou investissement immobilier. Nos biens sont situés dans les quartiers les plus prisés — <strong>Gueliz</strong>, <strong>La Palmeraie</strong>, <strong>Route de l&apos;Ourika</strong>, <strong>Targa</strong>, <strong>Amelkis</strong> et <strong>Sidi Youssef Ben Ali</strong>.
              </p>
              <p>
                Chaque villa dispose d&apos;une page détaillée avec galerie photos, description complète, tarifs, disponibilité en temps réel et avis de nos clients. Vous pouvez directement effectuer une demande de réservation en ligne ou contacter notre équipe pour un conseil personnalisé.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
