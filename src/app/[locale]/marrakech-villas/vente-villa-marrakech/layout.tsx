import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "Villa for sale in Marrakech" : "Vente de villa à Marrakech";
  const description = locale === "en"
    ? "Buy a luxury villa in Marrakech. Exclusive properties for sale in the best neighborhoods of Marrakech."
    : "Achetez une villa de luxe à Marrakech. Biens exclusifs à la vente dans les meilleurs quartiers de Marrakech.";
  return { title, description };
}

export default function VenteVillaMarrakechLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
