import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Location villa Amelkis Marrakech | StaysInMarrakech",
  description:
    "Louez une villa de luxe dans le quartier d'Amelkis à Marrakech. Domaine golfique, calme absolu et prestige au cœur de la ville rouge.",
  openGraph: {
    title: "Location villa Amelkis Marrakech | StaysInMarrakech",
    description:
      "Villas de luxe dans le quartier résidentiel d'Amelkis. Golf, calme et prestige.",
  },
};

export default async function AmelkisPage() {
  const properties = await prisma.property.findMany({
    where: { quarter: { contains: "amelkis", mode: "insensitive" } },
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
              Location de villa à Amelkis, Marrakech
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Amelkis est un quartier résidentiel prisé de Marrakech, réputé pour son domaine golfique et ses villas de prestige. Un cadre d&apos;exception pour des vacances de luxe.
            </p>
          </div>
        </section>

        <section className="max-w-[1140px] mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-[#34495e] mb-6">
            Pourquoi choisir Amelkis ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Amelkis est l&apos;un des quartiers les plus prestigieux de Marrakech. Ce domaine résidentiel de 400 hectares entoure le Royal Golf d&apos;Amelkis, l&apos;un des plus beaux parcours du Maroc. Les villas y sont nichées dans un cadre verdoyant, entre oliviers et palmiers.
              </p>
              <p>
                Le quartier attire une clientèle internationale exigeante en quête de calme, de sécurité et de prestige. Les propriétés y sont spacieuses, avec des jardins paysagers et des piscines privées, idéales pour les familles et les passionnés de golf.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Domaine golfique prestigieux (Royal Golf Amelkis)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Calme et sécurité 24h/24</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Villas spacieuses avec grands jardins</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Proximité du centre-ville (15 min)</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-[#34495e] mb-4">Le quartier Amelkis</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">⛳</span>
                  <span>Royal Golf Amelkis — 27 trous, classement national</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🏪</span>
                  <span>Centre commercial à 5 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🍽️</span>
                  <span>Restaurants et cafés branchés</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🏥</span>
                  <span>Proximité des cliniques et hôpitaux</span>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#34495e] mb-6">
            Nos villas disponibles à Amelkis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {properties.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center py-8">
                Aucune villa disponible à Amelkis pour le moment.
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
              FAQ — Amelkis
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Faut-il être golfeur pour habiter à Amelkis ?",
                  a: "Non, le golf est un atout mais pas une obligation. Amelkis est avant tout un quartier résidentiel calme et sécurisé, apprécié par les familles et les voyageurs en quête de tranquillité.",
                },
                {
                  q: "Amelkis est-il bien desservi ?",
                  a: "Oui, Amelkis est à 15 minutes du centre-ville, à proximité des commerces et bien connecté. Notre conciergerie peut organiser des transferts et des véhicules.",
                },
                {
                  q: "Les villas sont-elles grandes ?",
                  a: "Oui, les villas d'Amelkis sont parmi les plus spacieuses de Marrakech, souvent avec 4 à 6 chambres, des jardins de 1000m² et plus, et des piscines privées.",
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
