"use client";

import { useState } from "react";
import { Icon, faEnvelope, faCheck, faSpinner } from "@/components/icons";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Inscription réussie !");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Erreur lors de l'inscription");
      }
    } catch {
      setStatus("error");
      setMessage("Erreur réseau. Veuillez réessayer.");
    }
    setTimeout(() => setStatus("idle"), 5000);
  }

  return (
    <section className="bg-gradient-to-r from-[#0d47a1] to-[#1565c0] py-12 md:py-16">
      <div className="max-w-[1140px] mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
          <Icon icon={faEnvelope} className="text-[#ffb000] text-xs" />
          <span className="text-white/90 text-sm font-medium">Newsletter</span>
        </div>
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3">
          Restez informé
        </h2>
        <p className="text-white/70 text-sm sm:text-base mb-8 max-w-xl mx-auto">
          Rejoignez notre newsletter et restez informé des dernières nouveautés, offres exclusives et événements exceptionnels.
        </p>

        <form onSubmit={handleSubmit} className="max-w-[480px] mx-auto">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Icon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Votre adresse email"
                className="w-full h-12 pl-11 pr-4 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#ffb000]"
                disabled={status === "loading"}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-12 px-6 bg-[#ffb000] hover:bg-[#e6a000] text-[#0d47a1] font-bold text-sm rounded-xl transition-all hover:shadow-lg disabled:opacity-50 flex items-center gap-2 shrink-0"
            >
              {status === "loading" ? (
                <Icon icon={faSpinner} className="text-sm animate-spin" />
              ) : status === "success" ? (
                <Icon icon={faCheck} className="text-sm" />
              ) : null}
              <span className="hidden sm:inline">S&apos;abonner</span>
              <span className="sm:hidden">OK</span>
            </button>
          </div>
          {message && (
            <p className={`mt-3 text-sm ${status === "success" ? "text-green-300" : "text-red-300"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
