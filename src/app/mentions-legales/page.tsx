import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site StaysInMarrakech - Location de villas de luxe à Marrakech.",
};

export default function MentionsLegales() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 px-4 max-w-[800px] mx-auto">
          <h1 className="text-3xl font-bold text-[#0d47a1] mb-8">Mentions légales</h1>

          <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 mt-8">1. Éditeur du site</h2>
            <p>
              <strong>StaysInMarrakech</strong><br />
              Résidence Farah, Camp Mangin, Gueliz<br />
              40000 Marrakech, Maroc<br />
              Téléphone : +212 6 21 18 94 96 / +212 6 21 94 74 93<br />
              Email : contact@staysinmarrakech.com
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">2. Hébergeur</h2>
            <p>
              Ce site est hébergé par Netlify, Inc.<br />
              44 Montgomery Street, Suite 300<br />
              San Francisco, CA 94104, USA
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, marques) est la propriété exclusive de StaysInMarrakech ou de ses partenaires. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">4. Données personnelles</h2>
            <p>
              Les informations recueillies via nos formulaires de contact et de réservation sont destinées à StaysInMarrakech pour le traitement de vos demandes. Conformément au RGPD et à la loi marocaine 09-08, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données en contactant contact@staysinmarrakech.com.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">5. Cookies</h2>
            <p>
              Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire n&apos;est utilisé sans votre consentement préalable.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">6. Litiges</h2>
            <p>
              Les présentes mentions légales sont régies par le droit marocain. En cas de litige, les tribunaux de Marrakech seront seuls compétents.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
