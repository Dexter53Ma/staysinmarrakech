"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Calendar, MapPin, CreditCard, Loader2 } from "lucide-react";

interface PaymentDetails {
  bookingId: string;
  propertyTitle: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestsCount: number;
  totalPrice: number;
  currency: string;
  guestName: string;
  guestEmail: string;
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("No session ID provided");
      return;
    }

    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/payments/session?session_id=${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          setDetails(data);
        } else {
          setError("Unable to retrieve payment details");
        }
      } catch {
        setError("Error loading payment details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [sessionId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          {loading ? (
            <div className="space-y-4">
              <Loader2 className="size-12 text-[#0d47a1] mx-auto animate-spin" />
              <p className="text-gray-500">Chargement des détails du paiement...</p>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <div className="size-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                <CreditCard className="size-8 text-yellow-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Paiement en cours de vérification</h1>
              <p className="text-gray-500">{error}. Veuillez vérifier votre email pour la confirmation.</p>
              <Link href="/" className="inline-block bg-[#0d47a1] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#0a3a82] transition-colors">
                Retour à l&apos;accueil
              </Link>
            </div>
          ) : details ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <CheckCircle className="size-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Paiement réussi !</h1>
                <p className="text-gray-500">Votre réservation a été confirmée et payée.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="size-5 text-[#0d47a1] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{details.propertyTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="size-5 text-[#0d47a1] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(details.checkIn).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} →{" "}
                      {new Date(details.checkOut).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                    </p>
                    <p className="text-xs text-gray-500">{details.nights} nuit(s) · {details.guestsCount} voyageur(s)</p>
                  </div>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Montant payé</span>
                  <span className="text-lg font-bold text-gray-900">
                    {new Intl.NumberFormat("fr-FR", { style: "currency", currency: details.currency }).format(details.totalPrice)}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 text-left">
                <p className="text-sm text-blue-800">
                  <strong>Référence :</strong> {details.bookingId.slice(0, 8).toUpperCase()}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Un email de confirmation a été envoyé à {details.guestEmail}
                </p>
              </div>

              <div className="flex gap-3">
                <Link href="/properties" className="flex-1 bg-[#0d47a1] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#0a3a82] transition-colors text-center">
                  Nos propriétés
                </Link>
                <Link href="/" className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors text-center">
                  Accueil
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="size-8 text-[#0d47a1] animate-spin" />
        </main>
        <Footer />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
