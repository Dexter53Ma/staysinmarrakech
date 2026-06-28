import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { Icon, faArrowRight, faPhone } from "@/components/icons";

export const dynamic = "force-dynamic";

const BASE_URL = "https://staysinmarrakech.netlify.app";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug, isActive: true },
    select: { title: true, description: true, metaDescription: true, image: true, category: true },
  });
  if (!service) return { title: "Service introuvable" };

  const metaDesc = service.metaDescription || (service.description.length > 160
    ? service.description.substring(0, 157) + "..."
    : service.description);

  return {
    title: `${service.title} — StaysInMarrakech | ${service.category || "Service à Marrakech"}`,
    description: metaDesc,
    openGraph: {
      title: `${service.title} | StaysInMarrakech`,
      description: metaDesc,
      type: "website",
      locale: "fr_MA",
      url: `${BASE_URL}/service/${slug}`,
      images: service.image ? [{ url: `${BASE_URL}${service.image}`, width: 1200, height: 630, alt: service.title }] : [],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${service.title} | StaysInMarrakech`,
      description: metaDesc,
      images: service.image ? [`${BASE_URL}${service.image}`] : [],
    },
    alternates: {
      canonical: `${BASE_URL}/service/${slug}`,
    },
  };
}

function parseFeatures(features: string | null): string[] {
  if (!features) return [];
  try { return JSON.parse(features); } catch { return []; }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const service = await prisma.service.findUnique({
    where: { slug, isActive: true },
    select: {
      slug: true,
      title: true,
      description: true,
      longDescription: true,
      metaDescription: true,
      features: true,
      image: true,
      category: true,
      price: true,
      priceUnit: true,
    },
  });

  if (!service) notFound();

  const relatedServices = await prisma.service.findMany({
    where: { isActive: true, slug: { not: slug } },
    orderBy: { sortOrder: "asc" },
    take: 6,
    select: { slug: true, title: true, image: true, category: true },
  });

  const featureList = parseFeatures(service.features);
  const content = service.longDescription || service.description;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: (service.metaDescription || service.description).substring(0, 300),
    image: service.image ? `${BASE_URL}${service.image}` : undefined,
    url: `${BASE_URL}/service/${slug}`,
    provider: {
      "@type": "Organization",
      name: "StaysInMarrakech",
      url: BASE_URL,
    },
    areaServed: {
      "@type": "City",
      name: "Marrakech",
    },
    category: service.category || undefined,
    offers: service.price ? {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "EUR",
    } : undefined,
    inLanguage: "fr",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative w-full h-[350px] md:h-[450px]">
          {service.image && (
            <Image src={service.image} alt={service.title} fill className="object-cover" sizes="100vw" priority />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1140px] mx-auto w-full px-4 pb-10 md:pb-14">
              <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
                <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
                <span>/</span>
                <Link href="/service" className="hover:text-white transition-colors">Services</Link>
                <span>/</span>
                <span className="text-white">{service.title}</span>
              </nav>
              {service.category && (
                <span className="inline-block bg-[#ffb000] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-3">
                  {service.category}
                </span>
              )}
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{service.title}</h1>
              {service.price && (
                <p className="text-white/80 text-lg mt-3">
                  À partir de <span className="text-[#ffb000] font-bold">{service.price} €</span> {service.priceUnit || ""}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-[1140px] mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Content */}
            <article className="flex-1 max-w-[800px]">
              {/* Intro */}
              <p className="text-lg text-gray-700 leading-relaxed font-medium mb-8">{service.description}</p>

              {/* Long description HTML */}
              <div
                className="prose prose-lg max-w-none text-gray-600 leading-relaxed
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#0d47a1] [&_h2]:mt-10 [&_h2]:mb-4
                  [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#34495e] [&_h3]:mt-8 [&_h3]:mb-3
                  [&_p]:text-base [&_p]:mb-5 [&_p]:leading-7
                  [&_ul]:mb-5 [&_ul]:pl-5 [&_li]:mb-2
                  [&_strong]:text-[#34495e]"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Features */}
              {featureList.length > 0 && (
                <div className="mt-10 bg-gray-50 rounded-2xl p-6 md:p-8">
                  <h2 className="text-xl font-bold text-[#0d47a1] mb-4">Ce qui est inclus</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {featureList.map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon icon={faArrowRight} className="text-green-600 text-[8px]" />
                        </span>
                        <span className="text-sm text-gray-700">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-[#0d47a1]/5 border border-[#0d47a1]/10 rounded-2xl p-6 md:p-8 mt-10">
                <h3 className="text-xl font-bold text-[#0d47a1] mb-3">Intéressé par ce service ?</h3>
                <p className="text-gray-600 mb-5">
                  Contactez-nous pour un devis personnalisé ou pour réserver ce service. Notre équipe vous répond dans les plus brefs délais.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contactez-nous" className="inline-flex items-center gap-2 bg-[#0d47a1] hover:bg-[#0a3a82] text-white font-bold py-3 px-6 rounded-xl transition-all text-sm">
                    Demander un devis
                    <Icon icon={faArrowRight} className="text-xs" />
                  </Link>
                  <a href="tel:+212621189496" className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-[#0d47a1] text-[#0d47a1] font-bold py-3 px-6 rounded-xl transition-all text-sm">
                    <Icon icon={faPhone} className="text-xs" />
                    Appelez-nous
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-[320px] shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-[#0d47a1] mb-4">Résumé</h3>
                  <div className="space-y-3">
                    {service.category && (
                      <div className="flex items-center gap-3 text-sm">
                        <span className="w-8 h-8 rounded-lg bg-[#0d47a1]/10 flex items-center justify-center text-xs shrink-0">📁</span>
                        <span className="text-gray-600">{service.category}</span>
                      </div>
                    )}
                    {service.price && (
                      <div className="flex items-center gap-3 text-sm">
                        <span className="w-8 h-8 rounded-lg bg-[#0d47a1]/10 flex items-center justify-center text-xs shrink-0">💰</span>
                        <span className="text-gray-600">À partir de {service.price} € {service.priceUnit || ""}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm">
                      <span className="w-8 h-8 rounded-lg bg-[#0d47a1]/10 flex items-center justify-center text-xs shrink-0">📍</span>
                      <span className="text-gray-600">Marrakech, Maroc</span>
                    </div>
                  </div>
                </div>

                {relatedServices.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-[#0d47a1] mb-4">Autres services</h3>
                    <div className="space-y-3">
                      {relatedServices.map((rs) => (
                        <Link key={rs.slug} href={`/service/${rs.slug}`} className="flex items-center gap-3 group">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                            <Image src={rs.image || "/images/activities/sonotherapie.webp"} alt={rs.title} fill className="object-cover" sizes="48px" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-[#34495e] group-hover:text-[#0d47a1] transition-colors truncate">{rs.title}</h4>
                            {rs.category && <span className="text-xs text-gray-400">{rs.category}</span>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
