import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Location villa Palmeraie Marrakech | StaysInMarrakech",
  description:
    "Louez une villa de luxe dans la Palmeraie de Marrakech. Piscine privée, jardin, calme et prestige à quelques minutes du centre-ville. Séjours de qualité.",
  openGraph: {
    title: "Location villa Palmeraie Marrakech | StaysInMarrakech",
    description:
      "Villas de luxe avec piscine privée dans la Palmeraie de Marrakech. Cadre verdoyant et prestigieux.",
  },
};

const properties = [
  { slug: "villa-palmeraie", name: "Villa Palmeraie", price: "3 500" },
  { slug: "villa-soleil", name: "Villa Soleil", price: "2 800" },
];

export default function PalmeraiePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-[#0d47a1] text-white py-16 px-4">
          <div className="max-w-[1140px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Location de villa dans la Palmeraie de Marrakech
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Découvrez nos villas de luxe dans le quartier le plus prestigieux de Marrakech. La Palmeraie offre un cadre verdoyant et paisible, idéal pour des vacances en famille ou entre amis.
            </p>
          </div>
        </section>

        <section className="max-w-[1140px] mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-[#34495e] mb-6">
            Pourquoi choisir la Palmeraie ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                La Palmeraie de Marrakech est un quartier résidentiel prisé, situé à environ 10 minutes en voiture du centre-ville. Ce domaine de plusieurs milliers d&apos;hectares de palmiers-dattiers offre un cadre naturel exceptionnel, loin de l&apos;agitation de la médina.
              </p>
              <p>
                Les villas de la Palmeraie se distinguent par leurs grands jardins paysagers, leurs piscines privées chauffées et leur architecture mêlant tradition marocaine et confort moderne. C&apos;est le choix idéal pour les familles, les groupes d&apos;amis ou les voyageurs en quête de tranquillité et de prestige.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Calme et verdure en plein cœur de Marrakech</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>10 minutes du centre-ville et de la médina</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Villas avec grands jardins et piscines privées</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffb000] mt-1">●</span>
                  <span>Proximité des golfs et centres équestres</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-[#34495e] mb-4">Activités à proximité</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">⛳</span>
                  <span>Golf Royal — 18 trous, ambiance internationale</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🐪</span>
                  <span>Balades en dromadaire dans les palmeraies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🏍️</span>
                  <span>Buggys et quads dans le désert d&apos;Agafay</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ffb000] font-bold">🍽️</span>
                  <span>Restaurants gastronomiques à 10 min</span>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#34495e] mb-6">
            Nos villas disponibles à la Palmeraie
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
              FAQ — La Palmeraie
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "La Palmeraie est-elle éloignée du centre-ville ?",
                  a: "Non, la Palmeraie se situe à seulement 10-15 minutes en voiture du centre-ville et de la place Jemaa el-Fna. C'est le meilleur des deux mondes : tranquillité et proximité.",
                },
                {
                  q: "Les villas de la Palmeraie ont-elles des piscines ?",
                  a: "Oui, toutes nos villas de la Palmeraie disposent de piscines privées chauffées, entourées de jardins paysagers avec palmiers et oliviers.",
                },
                {
                  q: "Peut-on organiser des excursions depuis la Palmeraie ?",
                  a: "Absolument. Notre conciergerie organise des balades en dromadaire, des excursions au désert d'Agafay, des visites de la médina et bien plus.",
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
