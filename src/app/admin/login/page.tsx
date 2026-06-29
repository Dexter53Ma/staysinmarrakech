"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createSupabaseBrowser();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email ou mot de passe incorrect");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="relative min-h-screen min-h-dvh flex items-center justify-center overflow-hidden p-4 sm:p-6">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-sky-100 to-blue-50">
        {/* Floating clouds — hidden on small screens */}
        <div className="absolute top-[8%] left-[3%] w-80 h-28 bg-white/60 rounded-full blur-2xl animate-[float_8s_ease-in-out_infinite] hidden sm:block" />
        <div className="absolute top-[14%] left-[8%] w-52 h-18 bg-white/40 rounded-full blur-xl animate-[float_10s_ease-in-out_infinite_1s] hidden sm:block" />
        <div className="absolute top-[4%] right-[12%] w-96 h-24 bg-white/50 rounded-full blur-2xl animate-[float_9s_ease-in-out_infinite_0.5s] hidden md:block" />
        <div className="absolute top-[18%] right-[6%] w-60 h-16 bg-white/35 rounded-full blur-xl animate-[float_11s_ease-in-out_infinite_2s] hidden md:block" />
        <div className="absolute bottom-[22%] left-[18%] w-[500px] h-32 bg-white/55 rounded-full blur-2xl animate-[float_12s_ease-in-out_infinite_1.5s] hidden lg:block" />
        <div className="absolute bottom-[28%] left-[22%] w-64 h-20 bg-white/40 rounded-full blur-xl animate-[float_7s_ease-in-out_infinite_3s] hidden sm:block" />
        <div className="absolute bottom-[18%] right-[18%] w-80 h-28 bg-white/50 rounded-full blur-2xl animate-[float_10s_ease-in-out_infinite_0.8s] hidden md:block" />
        <div className="absolute bottom-[12%] right-[28%] w-52 h-16 bg-white/30 rounded-full blur-xl animate-[float_9s_ease-in-out_infinite_2.5s] hidden lg:block" />
        {/* Subtle radial rings — smaller on mobile */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] border border-white/15 rounded-full pointer-events-none animate-[pulse-ring_6s_ease-in-out_infinite]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] border border-white/10 rounded-full pointer-events-none animate-[pulse-ring_8s_ease-in-out_infinite_1s]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[1000px] sm:h-[1000px] border border-white/5 rounded-full pointer-events-none animate-[pulse-ring_10s_ease-in-out_infinite_2s]" />
      </div>

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-[440px] transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.97]"
        }`}
      >
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/80 p-6 sm:p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div
              className={`transition-all duration-500 ease-out delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#0d47a1]/30 to-[#ffb000]/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1a2332] flex items-center justify-center shadow-2xl shadow-[#0B1120]/40 ring-2 ring-white/10 group-hover:ring-white/20 group-hover:scale-105 transition-all duration-300">
                  <Image
                    src="/images/logo.png"
                    alt="StaysInMarrakech"
                    width={100}
                    height={100}
                    className="object-contain w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div
            className={`text-center mb-6 sm:mb-8 transition-all duration-500 ease-out delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2">
              Connexion
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed px-2">
              Entrez vos identifiants pour accéder au tableau de bord administrateur
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
            {/* Email */}
            <div
              className={`transition-all duration-500 ease-out delay-[400ms] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <div className="relative group">
                <Mail className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0d47a1] transition-colors duration-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  autoComplete="email"
                  className="w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-4 rounded-xl bg-white/80 border border-gray-200/80 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d47a1]/20 focus:border-[#0d47a1]/40 focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            {/* Password */}
            <div
              className={`transition-all duration-500 ease-out delay-[500ms] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <div className="relative group">
                <Lock className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0d47a1] transition-colors duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  required
                  autoComplete="current-password"
                  className="w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-12 rounded-xl bg-white/80 border border-gray-200/80 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d47a1]/20 focus:border-[#0d47a1]/40 focus:bg-white transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                >
                  <span className="relative block w-4 h-4">
                    <EyeOff
                      className={`absolute inset-0 w-4 h-4 transition-all duration-300 ${
                        showPassword ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
                      }`}
                    />
                    <Eye
                      className={`absolute inset-0 w-4 h-4 transition-all duration-300 ${
                        showPassword ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
                      }`}
                    />
                  </span>
                </button>
              </div>
            </div>

            {/* Error */}
            <div
              className={`transition-all duration-300 ${
                error
                  ? "opacity-100 max-h-20 translate-y-0"
                  : "opacity-0 max-h-0 -translate-y-2 overflow-hidden"
              }`}
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm text-red-600 bg-red-50/80 border border-red-100 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
                {error}
              </div>
            </div>

            {/* Submit */}
            <div
              className={`transition-all duration-500 ease-out delay-[600ms] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <button
                type="submit"
                disabled={loading}
                className="relative w-full h-11 sm:h-12 bg-gradient-to-r from-[#0d47a1] to-[#1565c0] hover:from-[#0a3a82] hover:to-[#0d47a1] active:from-[#082d66] active:to-[#0a3a82] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-[#0d47a1]/25 hover:shadow-xl hover:shadow-[#0d47a1]/30 hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="w-4 h-4 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div
            className={`mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-200/60 transition-all duration-500 ease-out delay-700 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-center text-[11px] sm:text-xs text-gray-400">
              Accès réservé aux administrateurs
            </p>
          </div>
        </div>

        {/* Brand below card */}
        <div
          className={`flex items-center justify-center gap-2 sm:gap-2.5 mt-4 sm:mt-6 transition-all duration-500 ease-out delay-[800ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <Image
            src="/images/logo.png"
            alt="StaysInMarrakech"
            width={24}
            height={24}
            className="object-contain sm:w-7 sm:h-7"
            priority
          />
          <span className="font-bold text-gray-700 text-xs sm:text-sm tracking-tight">StaysInMarrakech</span>
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.03); opacity: 0.15; }
        }
      `}</style>
    </div>
  );
}
