"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icon, faHeart, faTimes } from "@/components/icons";

interface WishlistVilla {
  slug: string;
  name: string;
  image: string;
  quartier: string;
  chambres: number;
  pax: number;
  features: string[];
}

const STORAGE_KEY = "villa-wishlist";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistVilla[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadWishlist() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setWishlist(JSON.parse(stored));
        }
      } catch {}
      setLoaded(true);
    }
    loadWishlist();
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
      } catch {}
    }
  }, [wishlist, loaded]);

  const removeFromWishlist = (slug: string) => {
    setWishlist((prev) => prev.filter((v) => v.slug !== slug));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section
          className="relative py-20 flex items-center justify-center"
          style={{
            backgroundImage: "url(/images/header-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-wide mb-3">
              Ma sélection
            </h1>
            <p className="text-white/80 text-lg">
              {wishlist.length > 0
                ? `${wishlist.length} villa${wishlist.length > 1 ? "s" : ""} dans votre sélection`
                : "Retrouvez vos villas favorites ici"}
            </p>
          </div>
        </section>

        <section className="max-w-[1140px] mx-auto px-4 py-12">
          {!loaded ? (
            <div className="text-center py-20">
              <p className="text-[#34495e]">Chargement...</p>
            </div>
          ) : wishlist.length === 0 ? (
            <div className="text-center py-20">
              <Icon icon={faHeart} className="text-5xl text-gray-300 mb-6" />
              <h2 className="text-xl font-semibold text-[#34495e] mb-3">
                Aucune villa sélectionnée
              </h2>
              <p className="text-[#34495e]/70 mb-6 max-w-md mx-auto">
                Vous n&apos;avez pas encore de villas dans votre sélection. Parcourez nos villas et ajoutez vos favorites !
              </p>
              <Link
                href="/marrakech-villas/location-villa-marrakech"
                className="inline-block bg-[#0d47a1] text-white px-8 py-3 rounded hover:bg-[#0a3a82] transition-colors font-medium uppercase text-sm tracking-wide"
              >
                Découvrir nos villas
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((villa) => (
                <div
                  key={villa.slug}
                  className="bg-white rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow relative group"
                >
                  <div className="relative h-[220px]">
                    <Image
                      src={villa.image}
                      alt={villa.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <button
                      onClick={() => removeFromWishlist(villa.slug)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-red-500 hover:bg-white hover:text-red-600 transition-colors shadow"
                      aria-label="Retirer de la sélection"
                    >
                      <Icon icon={faTimes} className="text-sm" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#0d47a1] mb-1">
                      {villa.name}
                    </h3>
                    <p className="text-sm text-[#34495e]/70 mb-3">
                      {villa.quartier}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#34495e]">
                      <span>{villa.chambres} chambres</span>
                      <span>{villa.pax} pax</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {villa.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="text-[11px] bg-[#f0f4f8] text-[#34495e] px-2 py-0.5 rounded"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`/villa/${villa.slug}`}
                      className="block mt-4 text-center bg-[#0d47a1] text-white py-2 rounded text-sm font-medium hover:bg-[#0a3a82] transition-colors"
                    >
                      Voir la villa
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
