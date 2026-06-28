"use client";

import { useState } from "react";
import {
  Icon,
  faPhone,
  faEnvelope,
  faWhatsapp,
  faTimes,
} from "@/components/icons";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 sm:right-6 z-50" style={{ bottom: "calc(80px + env(safe-area-inset-bottom, 0px))" }}>
      {open && (
        <div className="mb-3 flex flex-col gap-3 items-end">
          <a
            href="tel:+212621189496"
            className="flex items-center gap-3 bg-white text-[#34495e] px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow text-sm font-medium"
          >
            <Icon icon={faPhone} className="text-[#0d47a1]" />
            <span className="hidden sm:inline">Appelez-nous</span>
          </a>
          <a
            href="https://wa.me/212621189496"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow text-sm font-medium"
          >
            <Icon icon={faWhatsapp} className="text-base" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <a
            href="mailto:contact@staysinmarrakech.com"
            className="flex items-center gap-3 bg-white text-[#34495e] px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow text-sm font-medium"
          >
            <Icon icon={faEnvelope} className="text-[#ea4335]" />
            <span className="hidden sm:inline">Email</span>
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full bg-[#0d47a1] text-white flex items-center justify-center shadow-lg hover:bg-[#0a3a82] transition-colors"
        aria-label="Contact"
      >
        <Icon icon={open ? faTimes : faPhone} className="text-xl" />
      </button>
    </div>
  );
}
