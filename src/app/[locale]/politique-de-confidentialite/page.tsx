import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'legal'});
  const description = locale === 'en'
    ? "Privacy policy: how StaysInMarrakech collects, uses and protects your personal data."
    : "Politique de confidentialité : comment StaysInMarrakech collecte, utilise et protège vos données personnelles.";
  return {
    title: t('privacyPolicy'),
    description,
  };
}

export default async function PolitiqueConfidentialite({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'legal'});
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 px-4 max-w-[800px] mx-auto">
          <h1 className="text-3xl font-bold text-[#0d47a1] mb-8">{t('privacyPolicy')}</h1>

          <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
            <p><em>{t('lastUpdated')}</em></p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('controllerTitle')}</h2>
            <p>{t('controllerContent')}</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('collectedTitle')}</h2>
            <p>{t('collectedIntro')}</p>
            <ul className="list-disc pl-6 space-y-1">
              {t.raw('collectedItems').map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('purposeTitle')}</h2>
            <p>{t('purposeIntro')}</p>
            <ul className="list-disc pl-6 space-y-1">
              {t.raw('purposeItems').map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('legalBasisTitle')}</h2>
            <p>{t('legalBasisContent')}</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('retentionTitle')}</h2>
            <p>{t('retentionContent')}</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('rightsTitle')}</h2>
            <p>{t('rightsIntro')}</p>
            <ul className="list-disc pl-6 space-y-1">
              {t.raw('rightsItems').map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>{t('rightsContact')}</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('securityTitle')}</h2>
            <p>{t('securityContent')}</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('contactTitle')}</h2>
            <p>{t('contactContent')}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
