import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du site StaysInMarrakech - Comment nous protégeons vos données.",
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 px-4 max-w-[800px] mx-auto">
          <h1 className="text-3xl font-bold text-[#0d47a1] mb-8">Politique de confidentialité</h1>

          <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
            <p><em>Dernière mise à jour : 28 juin 2026</em></p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles est StaysInMarrakech, situé Résidence Farah, Camp Mangin, Gueliz, 40000 Marrakech, Maroc.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">2. Données collectées</h2>
            <p>Nous collectons les données suivantes via nos formulaires :</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone (optionnel)</li>
              <li>Message et demandes spéciales</li>
              <li>Dates de séjour et nombre de voyageurs</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Finalité du traitement</h2>
            <p>Vos données sont collectées pour :</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Traiter vos demandes de réservation</li>
              <li>Vous recontacter dans le cadre de votre séjour</li>
              <li>Améliorer nos services</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">4. Base légale</h2>
            <p>
              Le traitement de vos données est fondé sur votre consentement (formulaire de contact) et l&apos;exécution d&apos;une mesure précontractuelle (demande de réservation).
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">5. Durée de conservation</h2>
            <p>
              Vos données sont conservées pendant une durée maximale de 3 ans à compter du dernier contact. Les données relatives à des transactions sont conservées conformément aux obligations légales comptables.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">6. Vos droits</h2>
            <p>Conformément au RGPD et à la loi marocaine 09-08, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
              <li><strong>Droit de suppression</strong> : demander la suppression de vos données</li>
              <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement</li>
            </ul>
            <p>
              Pour exercer vos droits, contactez-nous à : contact@staysinmarrakech.com
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">7. Sécurité</h2>
            <p>
              Nous mettons en œuvre les mesures techniques et organisationnelles nécessaires pour protéger vos données contre tout accès non autorisé, perte ou altération.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">8. Contact</h2>
            <p>
              Pour toute question relative à la protection de vos données personnelles, contactez-nous à : contact@staysinmarrakech.com
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
