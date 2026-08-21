"use client";

import { useTranslations } from "next-intl";
import { Icon, faInstagram } from "@/components/icons";

const placeholderGradients = [
  "from-rose-500 to-orange-400",
  "from-purple-600 to-pink-500",
  "from-amber-500 to-red-500",
  "from-emerald-500 to-teal-400",
  "from-blue-600 to-indigo-500",
  "from-fuchsia-500 to-purple-500",
];

const placeholderCaptions = [
  "Villa de luxe avec piscine",
  "Sunset vu de la terrasse",
  "Jardin tropical paradisiaque",
  "Intérieur design & moderne",
  "Piscine à débordement",
  "Terrasse roof top",
];

export default function InstagramFeed() {
  const t = useTranslations("instagram");

  return (
    <section className="bg-gray-950 py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-pink-500/10 rounded-full px-4 py-1.5 mb-4">
            <Icon icon={faInstagram} className="w-4 h-4 text-pink-400" />
            <span className="text-pink-400 text-sm font-semibold">{t("title")}</span>
          </div>
          <p className="text-gray-400 text-sm">@staysinmarrakech</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {placeholderGradients.map((gradient, i) => (
            <a
              key={i}
              href="https://instagram.com/staysinmarrakech"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />

              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: `20px 20px`,
              }} />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Icon icon={faInstagram} className="w-5 h-5 text-white" />
                </div>
                <p className="text-white/80 text-[11px] font-medium leading-tight">{placeholderCaptions[i]}</p>
              </div>

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  @staysinmarrakech
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com/staysinmarrakech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold px-6 py-3 rounded-lg transition-colors"
          >
            <Icon icon={faInstagram} className="w-4 h-4" />
            {t("follow")}
          </a>
        </div>
      </div>
    </section>
  );
}
