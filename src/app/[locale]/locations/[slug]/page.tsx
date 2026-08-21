import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceDisplay from "@/components/PriceDisplay";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface LocationPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const location = await prisma.location.findUnique({ where: { slug } });

  if (!location) {
    return { title: "Location not found" };
  }

  const name = locale === "en" && location.nameEn ? location.nameEn : location.name;
  const description = locale === "en" && location.descriptionEn ? location.descriptionEn : location.description;

  return {
    title: name,
    description: description || undefined,
    openGraph: {
      title: name,
      description: description || undefined,
      images: location.image ? [location.image] : [],
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "locations.dynamic" });

  const location = await prisma.location.findUnique({ where: { slug } });

  if (!location) {
    notFound();
  }

  const name = locale === "en" && location.nameEn ? location.nameEn : location.name;
  const description = locale === "en" && location.descriptionEn ? location.descriptionEn : location.description;

  const properties = await prisma.property.findMany({
    where: {
      OR: [
        { quarter: { contains: name, mode: "insensitive" } },
        { quarter: { contains: location.name, mode: "insensitive" } },
      ],
    },
    include: { images: { where: { isPrimary: true }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-[#0d47a1] text-white py-16 px-4">
          {location.image && (
            <div className="absolute inset-0 z-0">
              <Image
                src={location.image}
                alt={name}
                fill
                unoptimized={location.image.startsWith("http")}
                className="object-cover opacity-30"
                sizes="100vw"
              />
            </div>
          )}
          <div className="relative z-10 max-w-[1140px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{name}</h1>
            {description && (
              <p className="text-lg text-white/90 max-w-2xl">{description}</p>
            )}
          </div>
        </section>

        {/* Properties Section */}
        <section className="max-w-[1140px] mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-[#34495e] mb-6">
            {t("villasTitle")} {name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {properties.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center py-8">
                {t("noVilla")}
              </p>
            ) : (
              properties.map((p) => (
                <Link
                  key={p.slug}
                  href={`/properties/${p.slug}`}
                  className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {p.images[0] ? (
                    <div className="relative h-48">
                      <Image
                        src={p.images[0].url}
                        alt={p.images[0].alt || p.title}
                        fill
                        unoptimized={p.images[0].url.startsWith("http")}
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-[#34495e]">{p.title}</h3>
                    <p className="text-[#ffb000] font-semibold mt-2">
                      <PriceDisplay price={p.price} currency={p.currency} suffix=" / night" />
                    </p>
                    <span className="text-[#0d47a1] text-sm mt-2 inline-block">
                      {t("seeVilla")} →
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Map Section */}
          {location.latitude && location.longitude && (
            <div className="bg-[#f8f9fa] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#34495e] mb-4">
                {t("mapTitle")} {name}
              </h2>
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.01},${location.latitude - 0.01},${location.longitude + 0.01},${location.latitude + 0.01}&layer=mapnik&marker=${location.latitude},${location.longitude}`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  title={`Map of ${name}`}
                />
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
