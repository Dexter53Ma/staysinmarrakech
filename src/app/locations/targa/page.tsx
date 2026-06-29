import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Location villa Targa Marrakech | StaysInMarrakech",
  description:
    "Louez une villa de luxe dans le quartier de Targa à Marrakech. Tranquillité, espaces verts et prestige à proximité du centre-ville.",
  openGraph: {
    title: "Location villa Targa Marrakech | StaysInMarrakech",
    description:
      "Villas de luxe dans le quartier résidentiel de Targa. Calme et prestige à Marrakech.",
  },
};

export default async function TargaPage() {
  const properties = await prisma.property.findMany({
    where: { quarter: { contains: "targa", mode: "insensitive" } },
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
              Location de villa à Targa, Marrakech
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Targa est un quartier résidentiel tranquille de Marrakech, apprécié pour ses villas familiales, ses espaces verts et sa proximité avec le centre-ville.
            </p>
          </div>
        </section>

        <section className="max-w-[1140px] mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-[#34495e] mb-6">
            Pourquoi choisir Targa ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Targa est un quartier résidentiel en pleine expansion, situé entre Gueliz et l&apos;océan de sables. Ce quartier combine le calme des résidences familiales et la proximité des commerces et écoles internationales.
              </p>
              <p>
                Les villas de Targa sont modernes, spacieuses et entourées de jardins paysagers. Le quartier est particulièrement apprécié par les familles avec enfants et les expatriés en recherche de tranquillité et de sécurité.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Quartier familial et sécurisé</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Villas modernes avec grands jardins</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Proximité des écoles internationales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>10-15 minutes du centre-ville</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-[#34495e] mb-4">Le quartier Targa</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🏫</span>
                  <span>Écoles internationales à proximité</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🛒</span>
                  <span>Centres commerciaux et marchés</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🌳</span>
                  <span>Espaces verts et parcs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🏥</span>
                  <span>Cliniques et pharmacies à proximité</span>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#34495e] mb-6">
            Nos villas disponibles à Targa
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {properties.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center py-8">
                Aucune villa disponible à Targa pour le moment.
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
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                      Aucune image
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-[#34495e]">{p.title}</h3>
                    <p className="text-[#ffb000] font-semibold mt-2">
                      À partir de {p.price.toLocaleString("fr-FR")} {p.currency === "MAD" ? "DH" : p.currency} / nuit
                    </p>
                    <span className="text-[#0d47a1] text-sm mt-2 inline-block">
                      Voir la villa →
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="bg-[#f8f9fa] rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#34495e] mb-4">
              FAQ — Targa
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Targa est-il adapté aux familles ?",
                  a: "Oui, Targa est l'un des quartiers les plus familiaux de Marrakech. Les rues sont calmes, les villas spacieuses et les écoles internationales sont à proximité.",
                },
                {
                  q: "Peut-on se déplacer facilement depuis Targa ?",
                  a: "Oui, Targa est bien connecté au centre-ville (10-15 min en voiture) et à la route de l'Ourika. Notre conciergerie peut organiser des transferts.",
                },
                {
                  q: "Les villas sont-elles modernes ?",
                  a: "Oui, la plupart des villas de Targa sont récentes ou rénovées, avec des équipements modernes (cuisine équipée, climatisation, piscine privée).",
                },
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
