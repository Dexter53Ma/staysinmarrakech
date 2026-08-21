import { escapeHtml } from "./sanitize";

const SITE_URL = () => process.env.NEXT_PUBLIC_SITE_URL || "https://staysinmarrakech.netlify.app";
const LOGO_URL = () => `${SITE_URL()}/images/logo.png`;

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

export interface BookingEmailData {
  guestName: string;
  guestEmail: string;
  propertyTitle: string;
  checkIn: string;
  checkOut: string;
  totalPrice: string;
  referenceCode: string;
}

export async function sendBookingConfirmationEmail(data: BookingEmailData) {
  const content = `
    <h2 style="margin:0 0 4px;font-size:20px;color:#111;">Bonjour ${escapeHtml(data.guestName)},</h2>
    <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.6;">
      Votre réservation pour <strong>${escapeHtml(data.propertyTitle)}</strong> a été <strong style="color:#16a34a;">confirmée</strong> !
    </p>
    <p style="margin:0 0 24px;font-size:14px;color:#777;line-height:1.6;">
      Voici les détails de votre séjour :
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${infoRow("Propriété", escapeHtml(data.propertyTitle))}
      ${infoRow("Arrivée", escapeHtml(data.checkIn))}
      ${infoRow("Départ", escapeHtml(data.checkOut))}
      ${infoRow("Prix total", escapeHtml(data.totalPrice))}
      ${infoRow("Référence", escapeHtml(data.referenceCode))}
    </table>
    <div style="background-color:#f8f9fa;border-radius:10px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Politique d'annulation</p>
      <p style="margin:0;font-size:14px;color:#555;line-height:1.6;">
        Annulation gratuite jusqu'à 48 heures avant l'arrivée. En cas d'annulation tardière, la première nuit sera facturée.
      </p>
    </div>
    <div style="text-align:center;">
      ${button(`${SITE_URL()}/properties`, "Voir nos propriétés")}
    </div>
    <p style="margin:24px 0 0;font-size:13px;color:#999;">Cordialement,<br><strong>L&apos;quipe StaysInMarrakech</strong></p>`;

  const { getFromAddress, getAdminEmail } = await import("./resend");
  const { Resend } = await import("resend");
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  await resend.emails.send({
    from: getFromAddress(),
    to: data.guestEmail,
    subject: `Réservation confirmée — ${escapeHtml(data.propertyTitle)}`,
    html: emailWrapper(content),
  });
}

export async function sendPreArrivalEmail(data: BookingEmailData & { propertyAddress: string }) {
  const content = `
    <h2 style="margin:0 0 4px;font-size:20px;color:#111;">Bonjour ${escapeHtml(data.guestName)},</h2>
    <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.6;">
      Votre arrivée à <strong>${escapeHtml(data.propertyTitle)}</strong> est prévue dans <strong>48 heures</strong> !
    </p>
    <p style="margin:0 0 24px;font-size:14px;color:#777;line-height:1.6;">
      Voici les informations utiles pour votre séjour :
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${infoRow("Propriété", escapeHtml(data.propertyTitle))}
      ${infoRow("Adresse", escapeHtml(data.propertyAddress))}
      ${infoRow("Arrivée", escapeHtml(data.checkIn))}
      ${infoRow("Départ", escapeHtml(data.checkOut))}
      ${infoRow("Référence", escapeHtml(data.referenceCode))}
    </table>
    <div style="background-color:#f8f9fa;border-radius:10px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Informations pratiques</p>
      <p style="margin:0 0 12px;font-size:14px;color:#555;line-height:1.6;">
        <strong>WiFi :</strong> Connectez-vous au réseau indiqué dans la propriété
      </p>
      <p style="margin:0 0 12px;font-size:14px;color:#555;line-height:1.6;">
        <strong>Check-in :</strong> À partir de 15h00
      </p>
      <p style="margin:0;font-size:14px;color:#555;line-height:1.6;">
        <strong>Contact d'urgence :</strong> +212 6 00 00 00 00
      </p>
    </div>
    <div style="background-color:#f8f9fa;border-radius:10px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Conseils locaux</p>
      <p style="margin:0;font-size:14px;color:#555;line-height:1.6;">
        Découvrez nos restaurants recommandés et activités à Marrakech sur notre site.
      </p>
    </div>
    <div style="text-align:center;">
      ${button(`${SITE_URL()}/properties`, "Découvrir nos propriétés")}
    </div>
    <p style="margin:24px 0 0;font-size:13px;color:#999;">Cordialement,<br><strong>L&apos;quipe StaysInMarrakech</strong></p>`;

  const { getFromAddress } = await import("./resend");
  const { Resend } = await import("resend");
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  await resend.emails.send({
    from: getFromAddress(),
    to: data.guestEmail,
    subject: `Votre arrivée dans 48h — ${escapeHtml(data.propertyTitle)}`,
    html: emailWrapper(content),
  });
}

export async function sendReviewRequestEmail(data: BookingEmailData) {
  const content = `
    <h2 style="margin:0 0 4px;font-size:20px;color:#111;">Bonjour ${escapeHtml(data.guestName)},</h2>
    <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.6;">
      Nous espérons que vous avez passé un merveilleux séjour à <strong>${escapeHtml(data.propertyTitle)}</strong> !
    </p>
    <p style="margin:0 0 24px;font-size:14px;color:#777;line-height:1.6;">
      Votre avis compte énormément pour nous. Pourriez-vous prendre un moment pour laisser un avis sur votre expérience ?
    </p>
    <div style="text-align:center;margin-bottom:24px;">
      ${button(`${SITE_URL()}/testimonials`, "Laisser un avis")}
    </div>
    <div style="background-color:#f8f9fa;border-radius:10px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Code de réduction</p>
      <p style="margin:0;font-size:14px;color:#555;line-height:1.6;">
        En remerciement, voici un code de réduction de <strong>10%</strong> pour votre prochaine réservation : <strong>MARRAKECH10</strong>
      </p>
    </div>
    <p style="margin:24px 0 0;font-size:13px;color:#999;">Cordialement,<br><strong>L&apos;quipe StaysInMarrakech</strong></p>`;

  const { getFromAddress } = await import("./resend");
  const { Resend } = await import("resend");
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  await resend.emails.send({
    from: getFromAddress(),
    to: data.guestEmail,
    subject: `Comment s'est passé votre séjour ? — ${escapeHtml(data.propertyTitle)}`,
    html: emailWrapper(content),
  });
}
