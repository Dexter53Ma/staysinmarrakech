"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AuteurAminePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 px-4 max-w-[800px] mx-auto">
          <h1 className="text-3xl font-bold text-[#0d47a1] mb-8">Amine Benali — Rédacteur voyage</h1>

          <div className="flex flex-col sm:flex-row gap-8 mb-10">
            <div className="shrink-0">
              <div className="w-32 h-32 rounded-full bg-[#0d47a1]/10 flex items-center justify-center text-4xl font-bold text-[#0d47a1]">
                A
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">À propos</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Amine est rédacteur voyage et spécialiste du tourisme de luxe à Marrakech chez StaysInMarrakech depuis 2022. Fort de ses connaissances approfondies de la ville rouge et de ses environs, il rédige des guides pratiques, des conseils d&apos;experts et des articles d&apos;inspiration pour les voyageurs exigeants.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Ses sujets de prédilection : les meilleures villas de luxe, les activités incontournables, les quartiers de Marrakech et les conseils pour un séjour parfait au Maroc.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Articles récents</h2>
            <div className="space-y-4">
              {[
                { title: "Plongée au cœur de nos 10 villas de luxe les plus somptueuses au Maroc", date: "25 février 2025" },
                { title: "5 stratégies incontournables pour dénicher une bonne affaire en immobilier au Maroc", date: "10 février 2025" },
                { title: "Piscines chauffées : l'atout luxe des villas à Marrakech en hiver", date: "17 décembre 2024" },
                { title: "Idées d'activités pour des vacances inoubliables à Marrakech", date: "15 mars 2024" },
              ].map((article) => (
                <div key={article.title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{article.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{article.date}</p>
                  </div>
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
