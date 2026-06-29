import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Location villa Gueliz Marrakech | StaysInMarrakech",
  description:
    "Louez une villa de luxe dans le quartier moderne de Gueliz à Marrakech. Commerces, restaurants et vie nocturne à portée de main.",
  openGraph: {
    title: "Location villa Gueliz Marrakech | StaysInMarrakech",
    description:
      "Villas de luxe dans le quartier moderne de Gueliz. Proximité des commerces et restaurants.",
  },
};

export default async function GuelizPage() {
  const properties = await prisma.property.findMany({
    where: { quarter: { contains: "gueliz", mode: "insensitive" } },
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
              Location de villa à Gueliz, Marrakech
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Gueliz, le quartier moderne de Marrakech, allie urbanité et charme marocain. Vivant, accessible et dynamique, c&apos;est l&apos;endroit idéal pour un séjour à Marrakech.
            </p>
          </div>
        </section>

        <section className="max-w-[1140px] mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-[#34495e] mb-6">
            Pourquoi choisir Gueliz ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Gueliz est le quartier moderne de Marrakech, créé pendant le protectorat français. C&apos;est aujourd&apos;hui le cœur névralgique de la vie urbaine de la ville, avec ses boutiques de design, ses galeries d&apos;art et sa scène gastronomique en plein essor.
              </p>
              <p>
                Les villas de Gueliz offrent un accès direct aux commerces, restaurants et lieux culturels, tout en bénéficiant du calme des résidences privées. Idéal pour les voyageurs qui souhaitent profiter de la ville sans se déplacer.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Quartier moderne et dynamique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Boutiques, restaurants et galeries à pied</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Proximité de la place Jemaa el-Fna</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Bien connecté (taxis, bus, tramway)</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-[#34495e] mb-4">Vie à Gueliz</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🛍️</span>
                  <span>Carré Eden — centre commercial moderne</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🎨</span>
                  <span>Galerie d&apos;art contemporain et musées</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">☕</span>
                  <span>Cafés tendance et restaurants gastronomiques</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🌳</span>
                  <span>Jardin Majorelle à 5 minutes</span>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#34495e] mb-6">
            Nos villas disponibles à Gueliz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {properties.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center py-8">
                Aucune villa disponible à Gueliz pour le moment.
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
              FAQ — Gueliz
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Gueliz est-il un quartier sûr ?",
                  a: "Oui, Gueliz est l'un des quartiers les plus sûrs de Marrakech, très fréquenté par les touristes et les expatriés. Les rues sont bien éclairées et animées jusqu'à tard le soir.",
                },
                {
                  q: "Peut-on se déplacer à pied depuis Gueliz ?",
                  a: "Oui, Gueliz est l'un des rares quartiers de Marrakech où la marche est agréable. Les boutiques, cafés et restaurants sont accessibles à pied, et le Jardin Majorelle est à quelques minutes.",
                },
                {
                  q: "Les villas de Gueliz sont-elles bruyantes ?",
                  a: "Non, nos villas sont situées dans des résidences privées calmes, tout en étant à proximité immédiate de l'animation du quartier. Vous avez le meilleur des deux mondes.",
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
