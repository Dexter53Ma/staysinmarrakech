import type { Metadata } from "next";
import {Link} from "@/i18n/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "locations.palmeraie" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
    },
  };
}

export default async function PalmeraiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "locations.palmeraie" });

  const properties = await prisma.property.findMany({
    where: { quarter: { contains: "palmeraie", mode: "insensitive" } },
    include: { images: { where: { isPrimary: true }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-[#0d47a1] text-white py-16 px-4">
          <div className="max-w-[1140px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
        </section>

        <section className="max-w-[1140px] mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-[#34495e] mb-6">
            {t("whyChoose")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{t("description1")}</p>
              <p>{t("description2")}</p>
              <ul className="space-y-2">
                {t.raw("bullets").map((bullet: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#ffb000] mt-1">●</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-[#34495e] mb-4">{t("nearbyTitle")}</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {t.raw("nearbyItems").map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#ffb000] font-bold">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#34495e] mb-6">
            {t("villasTitle")}
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
                      {p.price.toLocaleString()} {p.currency === "MAD" ? "DH" : p.currency} / night
                    </p>
                    <span className="text-[#0d47a1] text-sm mt-2 inline-block">
                      {t("seeVilla")} →
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="bg-[#f8f9fa] rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#34495e] mb-4">
              {t("faqTitle")}
            </h2>
            <div className="space-y-4">
              {[
                { q: t("faq.q1"), a: t("faq.a1") },
                { q: t("faq.q2"), a: t("faq.a2") },
                { q: t("faq.q3"), a: t("faq.a3") },
              ].map((faq) => (
                <div key={faq.q} className="bg-white rounded-xl p-5">
                  <h3 className="font-semibold text-[#34495e] mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
