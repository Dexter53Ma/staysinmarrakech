"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icon, faMapMarkerAlt, faPhone, faEnvelope, faFacebookF, faInstagram, faLinkedinIn } from "@/components/icons";
import { useSettings } from "@/components/SettingsContext";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      // handle silently
    }
  };

  const contactInfo = [
    {
      icon: faMapMarkerAlt,
      label: "Address",
      value: settings.address || "",
    },
    ...(settings.phone_1
      ? [{ icon: faPhone, label: "Phone", value: settings.phone_1, href: `tel:${settings.phone_1.replace(/[^0-9+]/g, "")}` }]
      : []),
    ...(settings.phone_2
      ? [{ icon: faPhone, label: "Phone", value: settings.phone_2, href: `tel:${settings.phone_2.replace(/[^0-9+]/g, "")}` }]
      : []),
    ...(settings.email
      ? [{ icon: faEnvelope, label: "Email", value: settings.email, href: `mailto:${settings.email}` }]
      : []),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-[#f5f5f5]">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0d47a1] mb-8">Contact</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#34495e] mb-6">Envoyez-nous un message</h2>
              {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  Merci ! Votre message a été envoyé avec succès.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#34495e] mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 border border-[#eaedf1] rounded text-[#34495e] focus:outline-none focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#34495e] mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 border border-[#eaedf1] rounded text-[#34495e] focus:outline-none focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#34495e] mb-1">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 border border-[#eaedf1] rounded text-[#34495e] focus:outline-none focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#34495e] mb-1">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 border border-[#eaedf1] rounded text-[#34495e] focus:outline-none focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#34495e] mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2.5 border border-[#eaedf1] rounded text-[#34495e] focus:outline-none focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1] resize-vertical"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#0d47a1] hover:bg-[#0a3a82] text-white font-bold uppercase py-2.5 px-8 rounded transition-colors w-fit"
                    style={{ padding: "10px 30px" }}
                  >
                    Envoyer
                  </button>
                </form>
              )}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#34495e] mb-6">Information</h2>
              <div className="flex flex-col gap-5">
                {contactInfo.map((item) => (
                  <div key={item.label + item.value} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0d47a1] rounded-full flex items-center justify-center shrink-0">
                      <Icon icon={item.icon} className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-[#34495e] text-[16px]">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-[#34495e] hover:text-[#0d47a1] transition-colors"
                          style={{ fontSize: "16px", lineHeight: "24px" }}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#34495e]" style={{ fontSize: "16px", lineHeight: "24px" }}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#0d47a1] rounded-full flex items-center justify-center shrink-0">
                    <Icon icon={faMapMarkerAlt} className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-[#34495e] text-[16px]">Website</p>
                    <a
                      href="https://www.villapremium.fr"
                      className="text-[#34495e] hover:text-[#0d47a1] transition-colors"
                      style={{ fontSize: "16px", lineHeight: "24px" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.villapremium.fr
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2">
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

          <div className="mt-8 rounded-lg overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846!2d-8.008!3d31.629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ0LjQiTiA4wrAwMCc" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="StaysInMarrakech Location"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
