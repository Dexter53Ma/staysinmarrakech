import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { Icon, faArrowRight } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services & Activités à Marrakech",
  description: "Conciergerie, gastronomie, transport, bien-être, sports, excursions et plus encore. Tous nos services pour un séjour inoubliable à Marrakech.",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: {
      slug: true,
      title: true,
      image: true,
      category: true,
      description: true,
      price: true,
      priceUnit: true,
    },
  });

  const categories = [...new Set(services.map((s) => s.category).filter(Boolean))];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0d47a1] to-[#1565c0] py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <span className="inline-block bg-white/10 text-white/90 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
              Marrakech
            </span>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Nos Services & Activités
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
              Découvrez notre sélection complète de services de conciergerie et d&apos;activités pour rendre votre séjour à Marrakech inoubliable.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="max-w-[1200px] mx-auto px-4 py-12 md:py-16">
          {/* Category quick nav */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/service/${service.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
              >
                <div className="relative w-full h-[200px] sm:h-[220px]">
                  <Image
                    src={service.image || "/images/activities/sonotherapie.webp"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {service.category && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0d47a1] text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                      {service.category}
                    </span>
                  )}
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-bold text-[#34495e] group-hover:text-[#0d47a1] transition-colors truncate">
                      {service.title}
                    </h2>
                    {service.price && (
                      <p className="text-sm text-gray-500 mt-1">
                        À partir de {service.price} € {service.priceUnit || ""}
                      </p>
                    )}
                  </div>
                  <Icon icon={faArrowRight} className="text-gray-300 group-hover:text-[#0d47a1] transition-colors text-sm group-hover:translate-x-1 transform duration-300 shrink-0 ml-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="max-w-[800px] mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#34495e] mb-4">
              Une demande spécifique ?
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Vous ne trouvez pas l&apos;activité que vous recherchez ? Notre équipe est capable d&apos;organiser n&apos;importe quelle expérience sur mesure à Marrakech.
            </p>
            <Link
              href="/contactez-nous"
              className="inline-flex items-center gap-2 bg-[#0d47a1] hover:bg-[#0a3a82] text-white font-bold py-3.5 px-8 rounded-xl transition-all hover:shadow-lg text-sm"
            >
              Contactez-nous
              <Icon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
