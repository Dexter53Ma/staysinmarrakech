"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icon, faMapMarkerAlt, faPhone, faEnvelope, faFacebookF, faInstagram, faLinkedinIn, faCheck, faCalendarAlt } from "@/components/icons";
import { useSettings } from "@/components/SettingsContext";

const FALLBACK = {
  address: "Résidence Farah, Camp Mangin, Gueliz, 40000 Marrakech",
phone1: "+212 6 21 18 94 96",
    phone2: "+212 6 21 94 74 93",
  email: "contact@staysinmarrakech.com",
};

export default function ContactPage() {
  const settings = useSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.");
    } finally {
      setSubmitting(false);
    }
  };

  const address = settings.address || FALLBACK.address;
  const phone1 = settings.phone_1 || FALLBACK.phone1;
  const phone2 = settings.phone_2 || FALLBACK.phone2;
  const email = settings.email || FALLBACK.email;

  const contactInfo = [
    { icon: faMapMarkerAlt, label: "Adresse", value: address },
    { icon: faPhone, label: "Téléphone", value: phone1, href: `tel:${phone1.replace(/[^0-9+]/g, "")}` },
    ...(phone2 ? [{ icon: faPhone, label: "Téléphone 2", value: phone2, href: `tel:${phone2.replace(/[^0-9+]/g, "")}` }] : []),
    { icon: faEnvelope, label: "Email", value: email, href: `mailto:${email}` },
    { icon: faCalendarAlt, label: "Horaires", value: "7j/7 — 9h à 20h" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-[#f5f5f5]">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0d47a1] mb-2">Contactez-nous</h1>
            <p className="text-gray-600">Nous répondons sous 2 heures durante les heures d&apos;ouverture.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#34495e] mb-6">Envoyez-nous un message</h2>
              {submitted ? (
                <div className="flex items-center gap-3 bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded">
                  <Icon icon={faCheck} className="text-green-600" />
                  <span>Merci ! Votre message a été envoyé avec succès. Nous vous répondrons sous 2 heures.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#34495e] mb-1">Nom *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-3 py-2.5 border border-[#eaedf1] rounded text-[#34495e] focus:outline-none focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#34495e] mb-1">Email *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                        className="w-full px-3 py-2.5 border border-[#eaedf1] rounded text-[#34495e] focus:outline-none focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#34495e] mb-1">Téléphone</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-[#eaedf1] rounded text-[#34495e] focus:outline-none focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#34495e] mb-1">Sujet *</label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                      className="w-full px-3 py-2.5 border border-[#eaedf1] rounded text-[#34495e] focus:outline-none focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]">
                      <option value="">Choisir un sujet</option>
                      <option value="Réservation">Réservation de villa</option>
                      <option value="Disponibilité">Vérifier la disponibilité</option>
                      <option value="Devis">Demande de devis</option>
                      <option value="Événement">Organisation d&apos;événement</option>
                      <option value="Conciergerie">Services de conciergerie</option>
                      <option value="Autre">Autre demande</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#34495e] mb-1">Message *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                      className="w-full px-3 py-2.5 border border-[#eaedf1] rounded text-[#34495e] focus:outline-none focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1] resize-vertical" />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="bg-[#0d47a1] hover:bg-[#0a3a82] disabled:bg-gray-400 text-white font-bold uppercase py-2.5 px-8 rounded transition-colors w-fit">
                    {submitting ? "Envoi en cours..." : "Envoyer"}
                  </button>
                </form>
              )}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#34495e] mb-6">Nos coordonnées</h2>
              <div className="flex flex-col gap-5">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0d47a1] rounded-full flex items-center justify-center shrink-0">
                      <Icon icon={item.icon} className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-[#34495e] text-[16px]">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-[#34495e] hover:text-[#0d47a1] transition-colors" style={{ fontSize: "16px", lineHeight: "24px" }}>
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#34495e]" style={{ fontSize: "16px", lineHeight: "24px" }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <p className="text-sm text-gray-500 mb-3">Suivez-nous</p>
                  <div className="flex items-center gap-4">
                    {settings.facebook && (
                      <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#0d47a1] rounded-full flex items-center justify-center text-white hover:bg-[#0a3a82] transition-colors">
                        <Icon icon={faFacebookF} />
                      </a>
                    )}
                    {settings.instagram && (
                      <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#0d47a1] rounded-full flex items-center justify-center text-white hover:bg-[#0a3a82] transition-colors">
                        <Icon icon={faInstagram} />
                      </a>
                    )}
                    {settings.linkedin && (
                      <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#0d47a1] rounded-full flex items-center justify-center text-white hover:bg-[#0a3a82] transition-colors">
                        <Icon icon={faLinkedinIn} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846!2d-8.008!3d31.629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ0LjQiTiA4wrAwMCc" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="StaysInMarrakech — Localisation"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
