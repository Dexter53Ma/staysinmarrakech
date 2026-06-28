"use client";

import { useSettings } from "@/components/SettingsContext";
import { useServices } from "@/components/ServicesContext";
import {
  Icon,
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@/components/icons";

const villaLinks = [
  { label: "Location villa Marrakech", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Vente villa Marrakech", href: "/marrakech-villas/vente-villa-marrakech" },
  { label: "Villas de luxe", href: "/marrakech-villas/villa-de-luxe" },
  { label: "Villas d'exception", href: "/marrakech-villas/villa-exception" },
  { label: "Location courte durée", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location longue durée", href: "/marrakech-villas/location-villa-marrakech" },
];

const usefulLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Location villa luxe Gueliz", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa luxe Palmeraie", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa luxe Route de l'Ourika", href: "/marrakech-villas/location-villa-marrakech" },
  { label: "Location villa luxe Amelkis", href: "/marrakech-villas/location-villa-marrakech" },
];

export default function Footer() {
  const settings = useSettings();
  const { services } = useServices();

  const contactLinks = [
    { label: settings.address || "Residence Farah, Camp Mangin, Gueliz, 40000 Marrakech", href: "" },
    { label: settings.phone_1 || "+212 6 21 18 94 96", href: settings.phone_1 ? `tel:${settings.phone_1.replace(/\s/g, "")}` : "tel:+212621189496" },
    { label: settings.phone_2 || "+212 6 21 94 74 93", href: settings.phone_2 ? `tel:${settings.phone_2.replace(/\s/g, "")}` : "tel:+212621947493" },
    { label: settings.email || "contact@staysinmarrakech.com", href: settings.email ? `mailto:${settings.email}` : "mailto:contact@staysinmarrakech.com" },
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
    <footer className="bg-[#001122] py-12 px-4 lg:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-[1140px] mx-auto">
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-lg font-semibold text-gray-300 mb-2">
              {col.title}
            </h4>
            {col.description ? (
              <p className="text-sm text-gray-300 leading-5">
                {col.description}
              </p>
            ) : (
              <div className="flex flex-col">
                {col.links.map((link) =>
                  link.href ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm text-gray-300 py-2 hover:text-white transition-colors min-h-[44px] flex items-center"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span
                      key={link.label}
                      className="text-sm text-gray-300 py-2 min-h-[44px] flex items-center"
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

      <h4 className="text-base font-semibold text-gray-300 mt-5 mb-2 max-w-[1140px] mx-auto">
        Suivez-nous
      </h4>
      <div className="flex gap-3.5 mt-2 max-w-[1140px] mx-auto">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="w-11 h-11 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Icon icon={social.icon} />
          </a>
        ))}
      </div>

      <div className="text-center mt-7 pt-5 border-t border-white/20 max-w-[1140px] mx-auto text-sm text-gray-300">
        &copy; {new Date().getFullYear()} StaysInMarrakech. Tous droits réservés.
      </div>
    </footer>
  );
}
