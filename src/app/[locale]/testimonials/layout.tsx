import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "Client testimonials" : "Témoignages des clients";
  const description = locale === "en"
    ? "Read what our clients say about their luxury villa experience in Marrakech with StaysInMarrakech."
    : "Découvrez ce que disent nos clients de leur expérience villa de luxe à Marrakech avec StaysInMarrakech.";
  return { title, description };
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
