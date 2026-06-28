import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Location villa Route de l'Ourika Marrakech | StaysInMarrakech",
  description:
    "Louez une villa de luxe sur la route de l'Ourika. Panoramas sur l'Atlas, calme absolu et nature préservée à 20 minutes de Marrakech.",
  openGraph: {
    title: "Location villa Route de l'Ourika Marrakech | StaysInMarrakech",
    description:
      "Villas de luxe avec vue Atlas sur la route de l'Ourika. Nature, calme et panoramas exceptionnels.",
  },
};

const properties = [
  { slug: "villa-atlas-view", name: "Villa Atlas View", price: "4 000" },
  { slug: "villa-ourika", name: "Villa Ourika", price: "3 200" },
];

export default function RouteOurikaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-[#0d47a1] text-white py-16 px-4">
          <div className="max-w-[1140px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Location de villa sur la Route de l&apos;Ourika
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              La route de l&apos;Ourika est l&apos;une des routes les plus pittoresques du Maroc. Panoramas sur le Haut Atlas, villages berbères et nature préservée à 20 minutes de Marrakech.
            </p>
          </div>
        </section>

        <section className="max-w-[1140px] mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-[#34495e] mb-6">
            Pourquoi choisir la Route de l&apos;Ourika ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                La route de l&apos;Ourika s&apos;étire sur 30 kilomètres depuis Marrakech jusqu&apos;au cœur du Haut Atlas. C&apos;est une destination prisée pour ses paysages grandioses, ses cascades et ses villages berbères traditionnels.
              </p>
              <p>
                Les villas de cette zone offrent des vues spectaculaires sur les montagnes de l&apos;Atlas, un calme absolu et une connexion directe avec la nature. C&apos;est le choix idéal pour les voyageurs en quête d&apos;authenticité et de sérénité.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Panoramas exceptionnels sur le Haut Atlas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Calme absolu et nature préservée</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Villages berbères et cascades à découvrir</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>20-30 minutes du centre de Marrakech</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-[#34495e] mb-4">Activités à proximité</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🏔️</span>
                  <span>Randonnées dans le Haut Atlas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">💧</span>
                  <span>Cascades d&apos;Ourika (Setti Fatma)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🏡</span>
                  <span>Villages berbères traditionnels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🫖</span>
                  <span>Visite de souk et marchés locaux</span>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#34495e] mb-6">
            Nos villas sur la Route de l&apos;Ourika
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {properties.map((p) => (
              <Link
                key={p.slug}
                href={`/properties/${p.slug}`}
                className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-[#34495e]">{p.name}</h3>
                <p className="text-[#ffb000] font-semibold mt-2">
                  À partir de {p.price} DH / nuit
                </p>
                <span className="text-[#0d47a1] text-sm mt-2 inline-block">
                  Voir la villa →
                </span>
              </Link>
            ))}
          </div>

          <div className="bg-[#f8f9fa] rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#34495e] mb-4">
              FAQ — Route de l&apos;Ourika
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Faut-il une voiture pour se déplacer ?",
                  a: "Oui, une voiture est recommandée pour profiter pleinement de la zone. Notre conciergerie peut organiser un véhicule avec chauffeur ou une location.",
                },
                {
                  q: "Les villas ont-elles une vue sur l'Atlas ?",
                  a: "Oui, la plupart de nos villas de la route de l'Ourika offrent des vues spectaculaires sur les montagnes du Haut Atlas, parfois avec couchers de soleil inoubliables.",
                },
                {
                  q: "Peut-on faire des randonnées depuis la villa ?",
                  a: "Absolument. La route de l'Ourika est le point de départ de nombreuses randonnées, des balades douces aux treks plus ambitieux dans le Haut Atlas.",
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
