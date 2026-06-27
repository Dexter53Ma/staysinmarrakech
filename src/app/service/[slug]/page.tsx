"use client";

import { use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceDetail, { servicesData } from "@/components/ServiceDetail";

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-[#0d47a1] mb-4">Service introuvable</h1>
            <p className="text-[#34495e]">Le service que vous recherchez n&apos;existe pas.</p>
            <Link
              href="/"
              className="inline-block mt-6 bg-[#0d47a1] text-white px-6 py-3 rounded hover:bg-[#0a3a82] transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ServiceDetail service={service} />
      </main>
      <Footer />
    </div>
  );
}
