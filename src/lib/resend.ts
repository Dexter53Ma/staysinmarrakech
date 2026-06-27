import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(key);
  }
  return _resend;
}

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "contact@staysinmarrakech.com";

export async function sendBookingNotification(booking: {
  guestName: string;
  guestEmail: string;
  propertyTitle: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  message?: string;
}) {
  await getResend().emails.send({
    from: "StaysInMarrakech <onboarding@resend.dev>",
    to: ADMIN_EMAIL,
    subject: `Nouvelle demande de réservation — ${booking.propertyTitle}`,
    html: `
      <h2>Nouvelle demande de réservation</h2>
      <p><strong>Propriété:</strong> ${booking.propertyTitle}</p>
      <p><strong>Client:</strong> ${booking.guestName}</p>
      <p><strong>Email:</strong> ${booking.guestEmail}</p>
      <p><strong>Arrivée:</strong> ${booking.checkIn}</p>
      <p><strong>Départ:</strong> ${booking.checkOut}</p>
      <p><strong>Voyageurs:</strong> ${booking.guestsCount}</p>
      ${booking.message ? `<p><strong>Message:</strong> ${booking.message}</p>` : ""}
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/bookings">Gérer dans le dashboard</a></p>
    `,
  });
}

export async function sendBookingConfirmation(guestEmail: string, guestName: string, propertyTitle: string, status: string) {
  const isConfirmed = status === "CONFIRMED";
  await getResend().emails.send({
    from: "StaysInMarrakech <onboarding@resend.dev>",
    to: guestEmail,
    subject: isConfirmed
      ? `Réservation confirmée — ${propertyTitle}`
      : `Mise à jour de votre demande — ${propertyTitle}`,
    html: `
      <h2>Bonjour ${guestName},</h2>
      <p>Votre demande pour <strong>${propertyTitle}</strong> a été <strong>${isConfirmed ? "confirmée" : "refusée"}</strong>.</p>
      ${isConfirmed ? "<p>Nous vous contacterons prochainement avec les détails.</p>" : "<p>Nous vous invitons à consulter nos autres propriétés.</p>"}
      <p>Cordialement,<br>L'équipe StaysInMarrakech</p>
    `,
  });
}

export async function sendContactConfirmation(guestEmail: string, guestName: string) {
  await getResend().emails.send({
    from: "StaysInMarrakech <onboarding@resend.dev>",
    to: guestEmail,
    subject: "Votre message a bien été envoyé",
    html: `
      <h2>Bonjour ${guestName},</h2>
      <p>Nous avons bien reçu votre message. Nous vous répondrons dans les plus brefs délais.</p>
      <p>Cordialement,<br>L'équipe StaysInMarrakech</p>
    `,
  });
}

export async function sendContactNotification(name: string, email: string, subject: string, message: string) {
  await getResend().emails.send({
    from: "StaysInMarrakech <onboarding@resend.dev>",
    to: ADMIN_EMAIL,
    subject: `Nouveau message de contact — ${subject}`,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Sujet:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/contacts">Gérer dans le dashboard</a></p>
    `,
  });
}
