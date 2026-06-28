"use client";

import { useState } from "react";
import { Icon, faChevronDown } from "@/components/icons";
import { faqs } from "@/lib/faqs";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 max-w-[800px] mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#34495e] mb-3 text-center">
        Questions fréquentes
      </h2>
      <p className="text-gray-500 text-center mb-10">
        Tout ce que vous devez savoir sur nos locations de villas à Marrakech
      </p>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors min-h-[48px]"
            >
              <span className="font-semibold text-gray-900 text-sm pr-4">{faq.question}</span>
              <Icon
                icon={faChevronDown}
                className={`text-gray-400 text-xs shrink-0 transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
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
