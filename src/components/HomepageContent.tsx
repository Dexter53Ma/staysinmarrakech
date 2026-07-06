"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomepageContent() {
  const t = useTranslations("homepage.content");

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0d47a1]/10 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#0d47a1] text-sm font-semibold">{t("expertiseTitle")}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#34495e] mb-4">
            {t("expertiseHeading")}
          </h2>
          <div className="w-20 h-1 bg-[#ffb000] mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed">
            {t("expertiseP1")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#0d47a1]/5 to-transparent border border-[#0d47a1]/10 hover:border-[#ffb000]/30 transition-colors duration-300">
            <div className="text-5xl font-bold text-[#ffb000] mb-3">1000+</div>
            <div className="text-sm font-semibold text-[#34495e] uppercase tracking-wide mb-3">{t("statClients")}</div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t("statClientsDesc")}
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#0d47a1]/5 to-transparent border border-[#0d47a1]/10 hover:border-[#ffb000]/30 transition-colors duration-300">
            <div className="text-5xl font-bold text-[#ffb000] mb-3">50+</div>
            <div className="text-sm font-semibold text-[#34495e] uppercase tracking-wide mb-3">{t("statVillas")}</div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t("statVillasDesc")}
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#0d47a1]/5 to-transparent border border-[#0d47a1]/10 hover:border-[#ffb000]/30 transition-colors duration-300">
            <div className="text-5xl font-bold text-[#ffb000] mb-3">10+</div>
            <div className="text-sm font-semibold text-[#34495e] uppercase tracking-wide mb-3">{t("statYears")}</div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t("statYearsDesc")}
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-[#34495e] mb-4">
            {t("stayTitle")}
          </h3>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
              {t("stayP1")}
            </p>
            <p>
              {t("stayP2")}
            </p>
            <p>
              {t("stayP3")}
            </p>

            <h4 className="text-lg font-semibold text-[#34495e] pt-4">
              {t("bookingTitle")}
            </h4>
            <p>
              {t("bookingP1")}
            </p>
            <p>
              {t("bookingP2")}
            </p>

            <h4 className="text-lg font-semibold text-[#34495e] pt-4">
              {t("conciergeTitle")}
            </h4>
            <p>
              {t("conciergeP1")}
            </p>
            <p>
              {t("conciergeP2")}
            </p>

            <h4 className="text-lg font-semibold text-[#34495e] pt-4">
              {t("destinationTitle")}
            </h4>
            <p>
              {t("destinationP1")}
            </p>
            <p>
              {t("destinationP2")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
