import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "Villa rental in Marrakech" : "Location de villa à Marrakech";
  const description = locale === "en"
    ? "Rent a luxury villa in Marrakech. Discover our selection of villas with private pool, in the best neighborhoods."
    : "Louez une villa de luxe à Marrakech. Découvrez notre sélection de villas avec piscine privée, dans les meilleurs quartiers.";
  return { title, description };
}

export default function LocationVillaMarrakechLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
