"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/components/SettingsContext";
import {
  Icon,
  faPhone,
  faEnvelope,
  faHeart,
  faLanguage,
  faBars,
  faChevronDown,
  faTimes,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faHome,
  faKey,
  faConciergeBell,
  faStar,
} from "@/components/icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

interface Service {
  id: number;
  title: string;
  slug: string;
  category: string;
  isActive: boolean;
}

interface SubMenuItem {
  label: string;
  href: string;
  icon: IconDefinition;
  children?: SubMenuItem[];
}

const villaLinks: SubMenuItem[] = [
  { label: "Location", href: "/marrakech-villas/location-villa-marrakech", icon: faKey },
  { label: "Vente", href: "/marrakech-villas/vente-villa-marrakech", icon: faHome },
  { label: "Villa de Luxe", href: "/marrakech-villas/villa-de-luxe", icon: faStar },
  { label: "Villa d'Exception", href: "/marrakech-villas/villa-exception", icon: faStar },
];

const extraNavLinks = [
  { label: "L'agence", href: "/agence" },
  { label: "Témoignages", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contactez-nous" },
];

const languages = ["Français", "English"];

export default function Header() {
  const settings = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [villasOpen, setVillasOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const servicesRef = useRef<HTMLDivElement>(null);
  const villasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => setServices(data.filter((s: Service) => s.isActive)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
      if (villasRef.current && !villasRef.current.contains(e.target as Node)) setVillasOpen(false);
      const target = e.target as HTMLElement;
      if (!target.closest("[data-dropdown]")) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const serviceCategories = services.reduce<Record<string, Service[]>>((acc, s) => {
    const cat = s.category || "Autres";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
      {/* Top Bar */}
      <div className="bg-[#0a1628] text-white/70 hidden lg:block">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-9 text-xs">
          <div className="flex items-center gap-5">
            {settings.phone_1 && (
              <a href={`tel:${settings.phone_1}`} className="flex items-center gap-1.5 hover:text-[#ffb000] transition-colors">
                <Icon icon={faPhone} className="text-[9px]" />
                <span>{settings.phone_1}</span>
              </a>
            )}
            {settings.phone_2 && (
              <a href={`tel:${settings.phone_2}`} className="flex items-center gap-1.5 hover:text-[#ffb000] transition-colors">
                <Icon icon={faPhone} className="text-[9px]" />
                <span>{settings.phone_2}</span>
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 hover:text-[#ffb000] transition-colors">
                <Icon icon={faEnvelope} className="text-[9px]" />
                <span>{settings.email}</span>
              </a>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffb000] transition-colors">
                  <Icon icon={faFacebookF} className="text-[10px]" />
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffb000] transition-colors">
                  <Icon icon={faInstagram} className="text-[10px]" />
                </a>
              )}
              {settings.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffb000] transition-colors">
                  <Icon icon={faLinkedinIn} className="text-[10px]" />
                </a>
              )}
            </div>
            <span className="w-px h-3 bg-white/20" />
            <Link href="/villas/wishlist" className="flex items-center gap-1.5 hover:text-[#ffb000] transition-colors">
              <Icon icon={faHeart} className="text-[9px]" />
              <span>Sélection</span>
            </Link>
            <div className="relative" data-dropdown>
              <button onClick={() => { setLangOpen(!langOpen); }} className="flex items-center gap-1 hover:text-[#ffb000] transition-colors">
                <Icon icon={faLanguage} className="text-[9px]" />
                <span>FR</span>
                <Icon icon={faChevronDown} className="text-[7px]" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 min-w-[120px] z-50 overflow-hidden">
                  {languages.map((l) => (
                    <button key={l} onClick={() => setLangOpen(false)} className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors $                      {l === "Français" ? "font-semibold text-black" : ""}`}>
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`bg-black transition-all duration-300 ${scrolled ? "bg-black/95 backdrop-blur-md shadow-lg" : ""}`}>
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-16 lg:h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src={settings.logo_url || "/images/logo.png"}
              alt="StaysInMarrakech"
              width={160}
              height={52}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Villas Mega Menu */}
            <div ref={villasRef} className="relative">
              <button
                onClick={() => { setVillasOpen(!villasOpen); setServicesOpen(false); }}
                className="flex items-center gap-1.5 text-white text-[13px] font-semibold uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Icon icon={faHome} className="text-[11px] text-[#ffb000]" />
                <span>Villas</span>
                <Icon icon={faChevronDown} className={`text-[9px] transition-transform duration-200 ${villasOpen ? "rotate-180" : ""}`} />
              </button>
              {villasOpen && (
                <div className="absolute left-0 top-full mt-2 w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                  {villaLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setVillasOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0d47a1] transition-colors group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-black flex items-center justify-center transition-colors">
                        <Icon icon={link.icon} className="text-xs text-black group-hover:text-[#ffb000] transition-colors" />
                      </span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services Mega Menu */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => { setServicesOpen(!servicesOpen); setVillasOpen(false); }}
                className="flex items-center gap-1.5 text-white text-[13px] font-semibold uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Icon icon={faConciergeBell} className="text-[11px] text-[#ffb000]" />
                <span>Services</span>
                <Icon icon={faChevronDown} className={`text-[9px] transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[600px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 z-50">
                  <div className="grid grid-cols-2 gap-6">
                    {Object.entries(serviceCategories).slice(0, 4).map(([cat, items]) => (
                      <div key={cat}>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{cat}</h4>
                        <div className="space-y-0.5">
                          {items.slice(0, 4).map((s) => (
                            <Link
                              key={s.slug}
                              href={`/service/${s.slug}`}
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0d47a1] rounded-lg transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0d47a1]/30" />
                              {s.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <Link href="/service" onClick={() => setServicesOpen(false)} className="text-sm font-semibold text-black hover:underline">
                      Voir tous les services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Simple Links */}
            {extraNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white text-[13px] font-semibold uppercase tracking-wider px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <Link
              href="/contactez-nous"
              className="hidden lg:flex items-center gap-2 bg-[#ffb000] hover:bg-[#e6a000] text-black text-[13px] font-bold px-5 py-2.5 rounded-lg transition-colors"
            >
              <Icon icon={faPhone} className="text-[10px]" />
              <span>Réserver</span>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <Icon icon={mobileOpen ? faTimes : faBars} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#111] border-t border-white/10 max-h-[80vh] overflow-y-auto">
            <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col gap-1">
              {/* Villas */}
              <div>
                <button onClick={() => setVillasOpen(!villasOpen)} className="flex items-center justify-between w-full text-white text-sm font-semibold uppercase py-3 border-b border-white/10">
                  <span className="flex items-center gap-2">
                    <Icon icon={faHome} className="text-[#ffb000] text-xs" />
                    Villas
                  </span>
                  <Icon icon={faChevronDown} className={`text-xs transition-transform ${villasOpen ? "rotate-180" : ""}`} />
                </button>
                {villasOpen && (
                  <div className="pl-6 py-2 space-y-1">
                    {villaLinks.map((link) => (
                      <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-white/70 text-sm py-2 hover:text-[#ffb000] transition-colors">
                        <Icon icon={link.icon} className="text-[10px] text-[#ffb000]/60" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services */}
              <div>
                <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center justify-between w-full text-white text-sm font-semibold uppercase py-3 border-b border-white/10">
                  <span className="flex items-center gap-2">
                    <Icon icon={faConciergeBell} className="text-[#ffb000] text-xs" />
                    Services
                  </span>
                  <Icon icon={faChevronDown} className={`text-xs transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                {servicesOpen && (
                  <div className="pl-6 py-2 space-y-1">
                    {services.slice(0, 10).map((s) => (
                      <Link key={s.slug} href={`/service/${s.slug}`} onClick={() => setMobileOpen(false)} className="text-white/70 text-sm py-1.5 hover:text-[#ffb000] transition-colors block">
                        {s.title}
                      </Link>
                    ))}
                    <Link href="/service" onClick={() => setMobileOpen(false)} className="text-[#ffb000] text-sm font-semibold py-1.5 block">
                      Voir tout →
                    </Link>
                  </div>
                )}
              </div>

              {/* Links */}
              {extraNavLinks.map((link) => (
                <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="text-white text-sm font-semibold uppercase py-3 border-b border-white/10 hover:text-[#ffb000] transition-colors">
                  {link.label}
                </Link>
              ))}

              <Link href="/contactez-nous" onClick={() => setMobileOpen(false)} className="mt-2 bg-[#ffb000] text-black text-sm font-bold py-3 rounded-lg text-center block">
                Réserver maintenant
              </Link>

              <div className="border-t border-white/10 mt-3 pt-3 flex flex-col gap-2 text-white/60 text-xs">
                {settings.phone_1 && (
                  <a href={`tel:${settings.phone_1}`} className="flex items-center gap-2 hover:text-[#ffb000]">
                    <Icon icon={faPhone} className="text-[9px]" /> {settings.phone_1}
                  </a>
                )}
                {settings.email && (
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-[#ffb000]">
                    <Icon icon={faEnvelope} className="text-[9px]" /> {settings.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
