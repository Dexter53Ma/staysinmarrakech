"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/212621189496"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 sm:hidden bg-[#25D366] text-white size-14 rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all duration-200"
      aria-label="WhatsApp"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
