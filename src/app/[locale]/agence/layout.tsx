import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "The agency - StaysInMarrakech" : "L'agence - StaysInMarrakech";
  const description = locale === "en"
    ? "StaysInMarrakech specialises in luxury and prestige villa rentals in Marrakech."
    : "StaysInMarrakech est une société spécialisée dans la location de villas de luxe et de prestige à Marrakech.";
  return { title, description };
}

export default function AgenceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
