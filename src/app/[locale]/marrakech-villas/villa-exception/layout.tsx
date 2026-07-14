import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "Exceptional villas in Marrakech" : "Villas d'exception à Marrakech";
  const description = locale === "en"
    ? "Explore our exceptional collection of prestigious villas in Marrakech. Unique properties for a once-in-a-lifetime experience."
    : "Explorez notre collection exceptionnelle de villas prestigieuses à Marrakech. Biens uniques pour une expérience inoubliable.";
  return { title, description };
}

export default function VillaExceptionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
