import { Resend } from "resend";
import { escapeHtml } from "./sanitize";

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

const SITE_URL = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const LOGO_URL = () => `${SITE_URL()}/images/logo.png`;

// IMPORTANT: "onboarding@resend.dev" is Resend's SANDBOX domain.
// It can ONLY send to the email that verified your Resend account.
// To send to any email, verify your own domain (e.g. staysinmarrakech.com)
// in Resend dashboard → Settings → Domains, then update the FROM address below.
const FROM_ADDRESS = process.env.RESEND_FROM || "StaysInMarrakech <onboarding@resend.dev>";

function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:#000000;padding:24px 32px;text-align:center;">
              <img src="${LOGO_URL()}" alt="StaysInMarrakech" width="180" style="display:inline-block;max-width:180px;height:auto;" />
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fa;padding:24px 32px;text-align:center;border-top:1px solid #eee;">
              <p style="margin:0 0 8px;font-size:13px;color:#999;">StaysInMarrakech — Location de villas de luxe à Marrakech</p>
              <p style="margin:0;font-size:12px;color:#bbb;">
                <a href="${SITE_URL()}" style="color:#999;text-decoration:underline;">staysinmarrakech.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background-color:#000000;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:10px;margin-top:8px;">${label}</a>`;
}

function infoRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#999;width:130px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#333;font-weight:500;">${value}</td>
  </tr>`;
}

export async function sendBookingNotification(booking: {
  guestName: string;
  guestEmail: string;
  propertyTitle: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  message?: string;
}) {
  const content = `
    <h2 style="margin:0 0 4px;font-size:20px;color:#111;">Nouvelle demande de réservation</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#999;">Un client souhaite réserver une propriété.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${infoRow("Propriété", escapeHtml(booking.propertyTitle))}
      ${infoRow("Client", escapeHtml(booking.guestName))}
      ${infoRow("Email", escapeHtml(booking.guestEmail))}
      ${infoRow("Arrivée", escapeHtml(booking.checkIn))}
      ${infoRow("Départ", escapeHtml(booking.checkOut))}
      ${infoRow("Voyageurs", String(booking.guestsCount))}
      ${booking.message ? infoRow("Message", escapeHtml(booking.message)) : ""}
    </table>
    <div style="text-align:center;">
      ${button(`${SITE_URL()}/admin/bookings`, "Gérer la réservation")}
    </div>`;

  await getResend().emails.send({
    from: FROM_ADDRESS,
    to: ADMIN_EMAIL,
    subject: `Nouvelle demande de réservation — ${escapeHtml(booking.propertyTitle)}`,
    html: emailWrapper(content),
  });
}

export async function sendBookingConfirmation(guestEmail: string, guestName: string, propertyTitle: string, status: string) {
  const isConfirmed = status === "CONFIRMED";
  const content = `
    <h2 style="margin:0 0 4px;font-size:20px;color:#111;">Bonjour ${escapeHtml(guestName)},</h2>
    <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.6;">
      Votre demande pour <strong>${escapeHtml(propertyTitle)}</strong> a été
      <strong style="color:${isConfirmed ? "#16a34a" : "#dc2626"};">${isConfirmed ? "confirmée" : "refusée"}</strong>.
    </p>
    ${isConfirmed
      ? `<p style="margin:0 0 24px;font-size:14px;color:#777;line-height:1.6;">Nous vous contacterons prochainement avec les détails de votre séjour.</p>
         <div style="text-align:center;">${button(`${SITE_URL()}/properties`, "Voir nos propriétés")}</div>`
      : `<p style="margin:0 0 24px;font-size:14px;color:#777;line-height:1.6;">Nous vous invitons à consulter nos autres propriétés disponibles.</p>
         <div style="text-align:center;">${button(`${SITE_URL()}/properties`, "Explorer les propriétés")}</div>`
    }
    <p style="margin:24px 0 0;font-size:13px;color:#999;">Cordialement,<br><strong>L&apos;quipe StaysInMarrakech</strong></p>`;

  await getResend().emails.send({
    from: FROM_ADDRESS,
    to: guestEmail,
    subject: isConfirmed
      ? `Réservation confirmée — ${escapeHtml(propertyTitle)}`
      : `Mise à jour de votre demande — ${escapeHtml(propertyTitle)}`,
    html: emailWrapper(content),
  });
}

export async function sendContactConfirmation(guestEmail: string, guestName: string) {
  const content = `
    <h2 style="margin:0 0 4px;font-size:20px;color:#111;">Bonjour ${escapeHtml(guestName)},</h2>
    <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.6;">
      Nous avons bien reçu votre message. Notre équipe vous répondra dans les plus brefs délais.
    </p>
    <div style="background-color:#f8f9fa;border-radius:10px;padding:20px;margin-bottom:24px;">
      <p style="margin:0;font-size:14px;color:#777;line-height:1.6;">
        En attendant, vous pouvez découvrir nos properties disponibles ou nous suivre sur les réseaux sociaux.
      </p>
    </div>
    <div style="text-align:center;">
      ${button(`${SITE_URL()}/properties`, "Découvrir nos propriétés")}
    </div>
    <p style="margin:24px 0 0;font-size:13px;color:#999;">Cordialement,<br><strong>L&apos;quipe StaysInMarrakech</strong></p>`;

  await getResend().emails.send({
    from: FROM_ADDRESS,
    to: guestEmail,
    subject: "Votre message a bien été envoyé",
    html: emailWrapper(content),
  });
}

export async function sendContactNotification(name: string, email: string, subject: string, message: string) {
  const content = `
    <h2 style="margin:0 0 4px;font-size:20px;color:#111;">Nouveau message de contact</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#999;">Un visiteur vous a envoyé un message.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${infoRow("Nom", escapeHtml(name))}
      ${infoRow("Email", escapeHtml(email))}
      ${infoRow("Sujet", escapeHtml(subject))}
    </table>
    <div style="background-color:#f8f9fa;border-radius:10px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 6px;font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
      <p style="margin:0;font-size:14px;color:#555;line-height:1.6;">${escapeHtml(message)}</p>
    </div>
    <div style="text-align:center;">
      ${button(`${SITE_URL()}/admin/contacts`, "Voir le message")}
    </div>`;

  await getResend().emails.send({
    from: FROM_ADDRESS,
    to: ADMIN_EMAIL,
    subject: `Nouveau message de contact — ${escapeHtml(subject)}`,
    html: emailWrapper(content),
  });
}
