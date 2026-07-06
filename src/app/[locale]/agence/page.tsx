"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageData {
  title: string;
  content: string;
}

export default function Agence() {
  const tSeo = useTranslations("seo");
  const tAgency = useTranslations("agency");
  const [page, setPage] = useState<PageData | null>(null);

  useEffect(() => {
    fetch("/api/pages?slug=agence")
      .then((r) => r.json())
      .then((data: PageData | PageData[]) => {
        const result = Array.isArray(data) ? data[0] : data;
        if (result && result.title) setPage(result);
      })
      .catch(() => {});
  }, []);

  const title = page?.title || tSeo("agencyTitle");
  const paragraphs = page?.content
    ? page.content.split("\n").filter((p) => p.trim())
    : (tAgency.raw('fallbackContent') as string[]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="max-w-6xl mx-auto py-[60px] px-5">
          <h1 className="text-[32px] font-bold text-[#22313d] mb-10 text-center">
            {title}
          </h1>
          <div className="flex flex-col md:flex-row gap-[30px] items-center">
            <div className="flex-1 min-w-0">
              <Image
                src="/images/owner.webp"
                alt="Cyrille - StaysInMarrakech"
                width={600}
                height={400}
                className="w-full h-auto rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              {paragraphs.map((text, i) => (
                <p
                  key={i}
                  className="text-base leading-6 text-[#22313d] mb-4"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
