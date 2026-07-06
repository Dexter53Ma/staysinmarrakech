"use client";

import { useTranslations } from "next-intl";
import { Icon, faStar, faUsers, faHome, faConciergeBell, faShieldAlt } from "@/components/icons";
import { useSettings } from "@/components/SettingsContext";

export default function IconsSection() {
  const settings = useSettings();
  const t = useTranslations("homepage");

  const cards = [
    { icon: faStar, title: t("experienceLabel"), description: settings.stats_experience || "StaysInMarrakech existe depuis 2014" },
    { icon: faUsers, title: t("clientsLabel"), description: settings.stats_clients || "+ de 1000 clients" },
    { icon: faHome, title: t("qualityLabel"), description: settings.stats_quality || "Villas vérifiées tous les 3 mois" },
    { icon: faConciergeBell, title: t("servicesLabel"), description: settings.stats_services || "Conciergerie dédiée pour vous" },
    { icon: faShieldAlt, title: t("presenceLabel"), description: settings.stats_presence || "Accompagnement tout au long de votre séjour" },
  ];

  return (
    <section id="icons-section" className="bg-[#0a1628] py-6 px-3">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-gradient-to-br from-[#0d47a1]/20 to-transparent border border-white/5 rounded-xl p-5 text-center hover:border-[#ffb000]/30 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#0d47a1]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon icon={card.icon} className="text-[#ffb000] text-xl" />
            </div>
            <h3 className="text-white text-xs sm:text-sm font-bold uppercase mb-1">{card.title}</h3>
            <p className="text-white/50 text-[10px] sm:text-xs leading-tight">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
