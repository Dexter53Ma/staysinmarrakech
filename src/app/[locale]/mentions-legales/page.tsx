import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'legal'});
  const description = locale === 'en'
    ? "Legal notices: publisher, host, intellectual property, data protection and cookies for StaysInMarrakech."
    : "Mentions légales : éditeur, hébergeur, propriété intellectuelle, protection des données et cookies de StaysInMarrakech.";
  return {
    title: t('mentionsLegales'),
    description,
  };
}

export default async function MentionsLegales({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'legal'});
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 px-4 max-w-[800px] mx-auto">
          <h1 className="text-3xl font-bold text-[#0d47a1] mb-8">{t('mentionsLegales')}</h1>

          <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('editorTitle')}</h2>
            <p>{t.rich('editorContent', { strong: (chunks) => <strong>{chunks}</strong>, br: () => <br /> })}</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('hostTitle')}</h2>
            <p>{t.rich('hostContent', { br: () => <br /> })}</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('ipTitle')}</h2>
            <p>{t('ipContent')}</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('dataTitle')}</h2>
            <p>{t('dataContent')}</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('cookiesTitle')}</h2>
            <p>{t('cookiesContent')}</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">{t('disputesTitle')}</h2>
            <p>{t('disputesContent')}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
