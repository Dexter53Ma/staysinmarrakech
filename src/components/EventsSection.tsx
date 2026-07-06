"use client";

import { useTranslations } from "next-intl";
import { useSettings } from "@/components/SettingsContext";
import { Icon, faArrowRight } from "@/components/icons";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function EventsSection() {
  const settings = useSettings();
  const t = useTranslations("homepage");

  const eventTitle = settings.events_title || t("eventsFallbackTitle");
  const eventDescription = settings.events_description || t("eventsFallbackDesc");
  const eventImage = settings.events_image || "/images/sections/evenements.webp";

  const vacationTitle = settings.vacations_title || t("vacationsFallbackTitle");
  const vacationDescription = settings.vacations_description || t("vacationsFallbackDesc");
  const vacationImage = settings.vacations_image || "/images/sections/vacances-marrakech.webp";

  return (
    <>
      {/* Events */}
      <section className="relative w-full overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src={eventImage}
            alt={eventTitle}
            fill
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 max-w-[1140px] mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
            <span className="text-white/90 text-sm font-medium">{t("eventsTitle")}</span>
          </div>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-4 md:mb-5 leading-tight">
            {eventTitle}
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-[800px] mx-auto">
            {eventDescription}
          </p>
          <Link
            href="/contactez-nous"
            className="inline-flex items-center gap-2 bg-[#0d47a1] hover:bg-[#0a3a82] text-white text-sm font-bold uppercase py-3.5 px-10 rounded-xl transition-all hover:shadow-lg hover:shadow-[#0d47a1]/25"
          >
            {t("contactUs")}
            <Icon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>
      </section>

      {/* Vacations */}
      <section className="relative w-full overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src={vacationImage}
            alt={vacationTitle}
            fill
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 max-w-[1140px] mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
            <span className="text-white/90 text-sm font-medium">{t("vacationsTitle")}</span>
          </div>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-4 md:mb-5 leading-tight">
            {vacationTitle}
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-[800px] mx-auto">
            {vacationDescription}
          </p>
        </div>
      </section>
    </>
  );
}
