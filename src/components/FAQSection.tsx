"use client";

import { useState } from "react";
import { Icon, faChevronDown } from "@/components/icons";
import { faqs } from "@/lib/faqs";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 max-w-[800px] mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#0d47a1]/10 rounded-full px-4 py-1.5 mb-5">
          <span className="text-[#0d47a1] text-sm font-semibold">FAQ</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#34495e] mb-3">
          Questions fréquentes
        </h2>
        <p className="text-gray-500">
          Tout ce que vous devez savoir sur nos locations de villas à Marrakech
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
