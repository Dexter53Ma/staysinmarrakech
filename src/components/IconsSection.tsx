"use client";

import { Icon, faStar, faUsers, faHome, faConciergeBell, faShieldAlt } from "@/components/icons";
import { useSettings } from "@/components/SettingsContext";

export default function IconsSection() {
  const settings = useSettings();

  const cards = [
    { icon: faStar, title: "Expérience", description: settings.stats_experience || "StaysInMarrakech existe depuis 2014" },
    { icon: faUsers, title: "Base clients", description: settings.stats_clients || "+ de 1000 clients" },
    { icon: faHome, title: "Qualité villas", description: settings.stats_quality || "Villas vérifiées tous les 3 mois" },
    { icon: faConciergeBell, title: "Services intégrés", description: settings.stats_services || "Conciergerie dédiée pour vous" },
    { icon: faShieldAlt, title: "Présence sur place", description: settings.stats_presence || "Accompagnement tout au long de votre séjour" },
  ];

  return (
    <section id="icons-section" className="bg-[#0a1628] py-4 px-3">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-gradient-to-br from-[#0d47a1]/20 to-transparent border border-white/5 rounded-xl p-4 text-center hover:border-[#ffb000]/30 transition-colors"
          >
            <div className="w-10 h-10 bg-[#0d47a1]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon icon={card.icon} className="text-[#ffb000] text-lg" />
            </div>
            <h3 className="text-white text-xs sm:text-sm font-bold uppercase mb-1">{card.title}</h3>
            <p className="text-white/50 text-[10px] sm:text-xs leading-tight">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
