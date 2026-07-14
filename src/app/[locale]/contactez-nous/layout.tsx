import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "Contact us - StaysInMarrakech" : "Contactez-nous - StaysInMarrakech";
  const description = locale === "en"
    ? "Get in touch with StaysInMarrakech for luxury villa rental and sale inquiries in Marrakech."
    : "Contactez StaysInMarrakech pour toute demande de location ou vente de villa de luxe à Marrakech.";
  return { title, description };
}

export default function ContactezNousLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
