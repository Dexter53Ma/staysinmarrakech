import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "Luxury villas in Marrakech" : "Villas de luxe à Marrakech";
  const description = locale === "en"
    ? "Discover our premium selection of luxury villas in Marrakech. Exceptional properties with top-of-the-range amenities."
    : "Découvrez notre sélection premium de villas de luxe à Marrakech. Biens d'exception avec des équipements haut de gamme.";
  return { title, description };
}

export default function VillaDeLuxeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
