"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Icon, faEnvelope, faCheck, faSpinner } from "@/components/icons";
import { useCsrf } from "@/hooks/useCsrf";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const { csrfFetch } = useCsrf();
  const t = useTranslations("homepage");
  const mountedRef = useRef(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await csrfFetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (mountedRef.current) {
        if (res.ok) {
          setStatus("success");
          setMessage(data.message || t("subscribeSuccess"));
          setEmail("");
        } else {
          setStatus("error");
          setMessage(data.error || t("subscribeError"));
        }
      }
    } catch {
      if (mountedRef.current) {
        setStatus("error");
        setMessage(t("subscribeNetworkError"));
      }
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (mountedRef.current) setStatus("idle");
    }, 5000);
  }

  return (
    <section className="bg-gradient-to-r from-[#0d47a1] to-[#1565c0] py-14 md:py-20">
      <div className="max-w-[1140px] mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
          <Icon icon={faEnvelope} className="text-[#ffb000] text-xs" />
          <span className="text-white/90 text-sm font-medium">Newsletter</span>
        </div>
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3">
          {t("newsletterTitle")}
        </h2>
        <p className="text-white/70 text-sm sm:text-base mb-10 max-w-xl mx-auto">
          {t("newsletterSubtitle")}
        </p>

        <form onSubmit={handleSubmit} className="max-w-[500px] mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Icon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t("emailPlaceholder")}
                className="w-full h-13 pl-11 pr-4 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#ffb000] focus:ring-offset-2 transition-all"
                disabled={status === "loading"}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-13 px-8 bg-[#ffb000] hover:bg-[#e6a000] text-[#0d47a1] font-bold text-sm rounded-xl transition-all hover:shadow-lg disabled:opacity-50 flex items-center gap-2 shrink-0"
            >
              {status === "loading" ? (
                <Icon icon={faSpinner} className="text-sm animate-spin" />
              ) : status === "success" ? (
                <Icon icon={faCheck} className="text-sm" />
              ) : null}
              <span className="hidden sm:inline">{t("subscribe")}</span>
              <span className="sm:hidden">OK</span>
            </button>
          </div>
          {message && (
            <p className={`mt-4 text-sm ${status === "success" ? "text-green-300" : "text-red-300"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
