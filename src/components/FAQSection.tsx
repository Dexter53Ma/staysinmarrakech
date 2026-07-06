"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon, faChevronDown } from "@/components/icons";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("faqs");

  const faqs = [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
    { question: t("q3"), answer: t("a3") },
    { question: t("q4"), answer: t("a4") },
    { question: t("q5"), answer: t("a5") },
    { question: t("q6"), answer: t("a6") },
    { question: t("q7"), answer: t("a7") },
    { question: t("q8"), answer: t("a8") },
  ];

  return (
    <section className="py-16 px-4 max-w-[800px] mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#0d47a1]/10 rounded-full px-4 py-1.5 mb-5">
          <span className="text-[#0d47a1] text-sm font-semibold">FAQ</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#34495e] mb-3">
          {t("title")}
        </h2>
        <p className="text-gray-500">
          {t("subtitle")}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`border rounded-xl overflow-hidden transition-all duration-300 ${
              openIndex === i
                ? "border-[#0d47a1]/30 shadow-sm"
                : "border-gray-200"
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors min-h-[48px] ${
                openIndex === i ? "bg-[#0d47a1]/5" : "hover:bg-gray-50"
              }`}
            >
              <span className={`font-semibold text-sm pr-4 ${
                openIndex === i ? "text-[#0d47a1]" : "text-gray-900"
              }`}>
                {faq.question}
              </span>
              <Icon
                icon={faChevronDown}
                className={`text-xs shrink-0 transition-transform duration-300 ${
                  openIndex === i ? "rotate-180 text-[#0d47a1]" : "text-gray-400"
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
