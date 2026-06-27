"use client";

import { useEffect, useState } from "react";
import {
  Icon,
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@/components/icons";
import { useSettings } from "@/components/SettingsContext";

interface Service {
  id: number;
  title: string;
  slug: string;
}

const villaLinks = [
  { label: "Location villa Marrakech", href: "/" },
  { label: "Villa a louer Marrakech", href: "/" },
  { label: "Achat villa Marrakech", href: "/marrakech-villas/vente-villa-marrakech" },
  { label: "Location villa pour mariage Marrakech", href: "/service/vos-soirees-festives" },
  { label: "Location villa Marrakech avec piscine privée", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa Marrakech avec piscine chauffée", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa courte durée Marrakech", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Louer villa pour vacances Marrakech", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Vente villa Marrakech", href: "/marrakech-villas/vente-villa-marrakech" },
  { label: "Villa a vendre marrakech", href: "/marrakech-villas/vente-villa-marrakech" },
];

const usefulLinks = [
  { label: "Location villa luxe Gueliz", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa luxe palmeraie", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa luxe route de l'Ourika", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa luxe Royal Palm", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa luxe golf de Samanah", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa luxe Targa", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa luxe désert d'Agafay", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa luxe Medina", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa luxe route de Fès", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa luxe golf Amelkis", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa Amelkis", href: "/marrakech-villas/location-villa-marrakech" },
];

export default function Footer() {
  const settings = useSettings();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data: Service[]) => setServices(data))
      .catch(() => {});
  }, []);

  const contactLinks = [
    { label: settings.address || "Residence Farah, Camp Mangin, Gueliz, 40000 Marrakech", href: "" },
    { label: settings.phone_1 || "+33 6 19 07 84 48", href: settings.phone_1 ? `tel:${settings.phone_1.replace(/\s/g, "")}` : "tel:+33619078448" },
    { label: settings.phone_2 || "+ 212 6 59 59 33 49", href: settings.phone_2 ? `tel:${settings.phone_2.replace(/\s/g, "")}` : "tel:+212659593349" },
    { label: settings.email || "contact@villapremium.fr", href: settings.email ? `mailto:${settings.email}` : "mailto:contact@villapremium.fr" },
    { label: "www.villapremium.fr", href: "https://www.villapremium.fr" },
  ];

  const serviceLinks = services.map((s) => ({
    label: s.title,
    href: `/service/${s.slug}`,
  }));

  const socialLinks = [
    ...(settings.facebook ? [{ icon: faFacebookF, href: settings.facebook, label: "Facebook" }] : []),
    ...(settings.twitter ? [{ icon: faTwitter, href: settings.twitter, label: "Twitter" }] : []),
    ...(settings.instagram ? [{ icon: faInstagram, href: settings.instagram, label: "Instagram" }] : []),
    ...(settings.linkedin ? [{ icon: faLinkedinIn, href: settings.linkedin, label: "LinkedIn" }] : []),
  ];

  const columns = [
    { title: "Location & vente villas", links: villaLinks },
    { title: "Liens utiles", links: usefulLinks },
    { title: "Services & activités", links: serviceLinks },
    { title: "À propos", links: [], description: settings.site_description || "StaysInMarrakech est une société spécialisée dans la location de villas de luxe et de prestige à Marrakech." },
    { title: "Contact", links: contactLinks },
  ];

  return (
    <footer style={{ backgroundColor: "rgb(0, 17, 34)", padding: "50px 15px 20px" }}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[30px] max-w-[1140px] mx-auto">
        {columns.map((col) => (
          <div key={col.title}>
            <h4 style={{ fontSize: 18, fontWeight: 600, color: "#d9d9d9", marginBottom: 8 }}>
              {col.title}
            </h4>
            {col.description ? (
              <p style={{ fontSize: 14, color: "#d9d9d9", lineHeight: "20px" }}>
                {col.description}
              </p>
            ) : (
              <div className="flex flex-col">
                {col.links.map((link) =>
                  link.href ? (
                    <a
                      key={link.label}
                      href={link.href}
                      style={{ fontSize: 14, color: "#d9d9d9", marginBottom: 5 }}
                      className="block hover:text-white transition-colors"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span
                      key={link.label}
                      style={{ fontSize: 14, color: "#d9d9d9", marginBottom: 5 }}
                      className="block"
                    >
                      {link.label}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <h4 style={{ fontSize: 16, fontWeight: 600, color: "#d9d9d9", marginBottom: 8, marginTop: 20 }} className="max-w-[1140px] mx-auto">
        Suivez-nous
      </h4>
      <div className="flex gap-[15px] mt-2 max-w-[1140px] mx-auto">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#d9d9d9] hover:text-white hover:bg-white/10 transition-colors"
          >
            <Icon icon={social.icon} />
          </a>
        ))}
      </div>

      <div
        className="text-center mt-[30px] pt-5 max-w-[1140px] mx-auto"
        style={{ borderTop: "1px solid rgba(217, 217, 217, 0.2)", fontSize: 14, color: "#d9d9d9" }}
      >
        &copy; {new Date().getFullYear()} {settings.copyright || "All rights reserved - Villa premium | Powered by SEOCOM"}
      </div>
    </footer>
  );
}
