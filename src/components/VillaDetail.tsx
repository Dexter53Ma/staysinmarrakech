"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Icon,
  faMapMarkerAlt,
  faMaximize,
  faBed,
  faUsers,
  faCheck,
  faTimes,
  faChevronDown,
  faPhone,
  faWhatsapp,
  faEnvelope,
} from "@/components/icons";

export interface VillaDetailData {
  slug: string;
  title: string;
  images: string[];
  terrain: string;
  surface: string;
  chambres: number;
  pax: number;
  description: string;
  nousAimons: string;
  avisSpecialiste: string;
  chambresLits: string;
  features: string[];
  equipment: string[];
  servicesIncluded: string[];
  servicesExtra: string[];
}

const featureIcons = [
  { icon: faMapMarkerAlt, label: "Terrain" },
  { icon: faMaximize, label: "Surface" },
  { icon: faBed, label: "Chambres" },
  { icon: faUsers, label: "Pax" },
];

function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#eaedf1] rounded-lg mb-3 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-[#f8f9fa] transition-colors"
      >
        <span className="text-[16px] font-semibold text-[#0d47a1]">{title}</span>
        <Icon
          icon={faChevronDown}
          className={`text-[#0d47a1] text-sm transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="px-5 pb-4 text-[15px] text-[#34495e] leading-relaxed">{children}</div>}
    </div>
  );
}

export default function VillaDetail({ villa }: { villa: VillaDetailData }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const featureValues = [
    villa.terrain,
    villa.surface,
    String(villa.chambres),
    String(villa.pax),
  ];

  return (
    <div>
      <section className="max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0d47a1] mb-6">{villa.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <div>
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-3">
              <Image
                src={villa.images[selectedImage]}
                alt={villa.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {villa.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative flex-none w-[80px] h-[60px] rounded overflow-hidden border-2 transition-colors ${
                    i === selectedImage ? "border-[#0d47a1]" : "border-transparent hover:border-[#0d47a1]/50"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#eaedf1] rounded-lg p-5 shadow-sm h-fit sticky top-24">
            <div className="grid grid-cols-2 gap-3 mb-5">
              {featureIcons.map((feat, i) => (
                <div key={feat.label} className="flex items-center gap-2 text-[14px] text-[#34495e]">
                  <Icon icon={feat.icon} className="text-[#0d47a1] text-[13px]" />
                  <span>
                    <strong>{featureValues[i]}</strong> {feat.label === "Terrain" || feat.label === "Surface" ? "" : feat.label.toLowerCase()}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[14px] text-[#34495e] leading-relaxed mb-5">{villa.description}</p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <div>
                <label className="block text-xs font-semibold text-[#34495e] uppercase mb-1">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border border-[#eaedf1] rounded px-3 py-2.5 text-sm text-[#34495e] focus:outline-none focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#34495e] uppercase mb-1">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border border-[#eaedf1] rounded px-3 py-2.5 text-sm text-[#34495e] focus:outline-none focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#34495e] uppercase mb-1">Voyageurs</label>
                <div className="flex items-center border border-[#eaedf1] rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="px-4 py-2.5 text-[#34495e] hover:bg-[#f0f0f0] text-sm"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-sm font-medium text-[#34495e]">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(20, g + 1))}
                    className="px-4 py-2.5 text-[#34495e] hover:bg-[#f0f0f0] text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#0d47a1] hover:bg-[#0a3a82] text-white font-semibold py-3 rounded transition-colors text-sm uppercase tracking-wide"
              >
                Réserver
              </button>
            </form>

            <div className="flex gap-2 mt-4">
              <a
                href="tel:+212600000000"
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#0d47a1] text-white text-[13px] font-medium py-2 rounded hover:bg-[#0a3a82] transition-colors"
              >
                <Icon icon={faPhone} className="text-[11px]" />
                <span>Téléphoner</span>
              </a>
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white text-[13px] font-medium py-2 rounded hover:bg-[#1ebe57] transition-colors"
              >
                <Icon icon={faWhatsapp} className="text-[11px]" />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:info@villapremium.ma"
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#ea4335] text-white text-[13px] font-medium py-2 rounded hover:bg-[#d33426] transition-colors"
              >
                <Icon icon={faEnvelope} className="text-[11px]" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 pb-8">
        <AccordionSection title="Nous aimons" defaultOpen>
          <p>{villa.nousAimons}</p>
        </AccordionSection>

        <AccordionSection title="L'avis du spécialiste">
          <p>{villa.avisSpecialiste}</p>
        </AccordionSection>

        <AccordionSection title="Chambres & lits">
          <p>{villa.chambresLits}</p>
        </AccordionSection>

        <AccordionSection title="Équipements">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {villa.equipment.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Icon icon={faCheck} className="text-green-500 text-xs" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </AccordionSection>

        <AccordionSection title="Services inclus">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {villa.servicesIncluded.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Icon icon={faCheck} className="text-green-500 text-xs" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </AccordionSection>

        <AccordionSection title="Services en extra">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {villa.servicesExtra.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Icon icon={faTimes} className="text-[#ea4335] text-xs" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </AccordionSection>
      </section>
    </div>
  );
}
