"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageData {
  title: string;
  content: string;
}

const fallbackTitle = "Équipe StaysInMarrakech";
const fallbackContent = [
  "Directeur Commercial pendant de nombreuses années chez Filovent, leader en Europe de la location de bateaux avec plus de 17 000 réferences réparties sur 57 pays, Cyrille décide de créer en 2014 une agence spécialisée en location saisonnière de biens de charme et de caractère à Marrakech.",
  "Aujourd'hui, le domaine d'expertise de StaysInMarrakech s'est étendu de la location saisonnière à la location longue durée et plus récemment à la vente, toujours avec le même souci de proposer des biens de qualité et un service d'accompagnement rigoureux, dans la définition des besoins client comme dans la gestion au quotidien.",
  "Composée d'une équipe de spécialistes jeunes et dynamiques, dans chaque domaine de compétences, StaysInMarrakech offre un service optimum et réactif, toujours avec le souci d'être exemplaire sur le savoir faire comme sur le savoir être. La passion, la bonne humeur et l'excellence sont nos valeurs au quotidien.",
  "StaysInMarrakech est une société spécialisée dans la location de villas de luxe et de prestige à Marrakech.",
];

export default function Agence() {
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

  const title = page?.title || fallbackTitle;
  const paragraphs = page?.content
    ? page.content.split("\n").filter((p) => p.trim())
    : fallbackContent;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "60px 20px",
          }}
        >
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#22313d",
              marginBottom: 40,
              textAlign: "center",
            }}
          >
            {title}
          </h1>
          <div
            style={{
              display: "flex",
              gap: 30,
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <Image
                src="/images/agence/cyrille.jpg"
                alt="Cyrille - StaysInMarrakech"
                width={600}
                height={400}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 4,
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {paragraphs.map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 16,
                    lineHeight: "24px",
                    color: "#22313d",
                    marginBottom: 16,
                  }}
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
