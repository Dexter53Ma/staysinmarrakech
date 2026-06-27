"use client";

import { useSettings } from "@/components/SettingsContext";
import { Icon, faArrowRight } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

export default function EventsSection() {
  const settings = useSettings();

  const eventTitle = settings.events_title || "Location villas pour événements à Marrakech";
  const eventDescription = settings.events_description || "Organisez vos événements dans un cadre d'exception grâce à nos villas de luxe à Marrakech. Que ce soit pour une fête, un mariage, un anniversaire en villa de luxe, ou une réunion privée, StaysInMarrakech vous propose une sélection exclusive de villas à louer à Marrakech.";
  const eventImage = settings.events_image || "/images/sections/evenements.webp";

  const vacationTitle = settings.vacations_title || "Location villa de luxe pour vacances à Marrakech";
  const vacationDescription = settings.vacations_description || "Découvrez nos villas de luxe à Marrakech, parfaites pour des vacances inoubliables. Réservez dès maintenant et profitez d'un séjour d'exception avec services personnalisés.";
  const vacationImage = settings.vacations_image || "/images/sections/vacances-marrakech.webp";

  return (
    <>
      {/* Events */}
      <section className="relative w-full overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={eventImage}
            alt={eventTitle}
            fill
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 max-w-[1140px] mx-auto px-4 md:px-8 text-center">
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-4 md:mb-5 leading-tight">
            {eventTitle}
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-[800px] mx-auto">
            {eventDescription}
          </p>
          <Link
            href="/contactez-nous"
            className="inline-flex items-center gap-2 bg-[#0d47a1] hover:bg-[#0a3a82] text-white text-sm font-bold uppercase py-3 px-8 rounded-xl transition-all hover:shadow-lg"
          >
            Contactez-nous
            <Icon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>
      </section>

      {/* Vacations */}
      <section className="relative w-full overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={vacationImage}
            alt={vacationTitle}
            fill
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 max-w-[1140px] mx-auto px-4 md:px-8 text-center">
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-4 md:mb-5 leading-tight">
            {vacationTitle}
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-[800px] mx-auto">
            {vacationDescription}
          </p>
        </div>
      </section>
    </>
  );
}
