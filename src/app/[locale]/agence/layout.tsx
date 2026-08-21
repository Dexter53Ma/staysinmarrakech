import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo'});
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://staysinmarrakech.netlify.app';
  return {
    title: t('agencyTitle'),
    description: t('homepageDesc'),
    alternates: {
      canonical: `${siteUrl}/${locale}/agence`,
      languages: {
        'fr': `${siteUrl}/fr/agence`,
        'en': `${siteUrl}/en/agence`,
      },
    },
    openGraph: {
      title: t('agencyTitle'),
      description: t('homepageDesc'),
      url: `${siteUrl}/${locale}/agence`,
      siteName: 'StaysInMarrakech',
      locale: locale === 'fr' ? 'fr_MA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('agencyTitle'),
      description: t('homepageDesc'),
    },
  };
}

export default function AgenceLayout({children}: {children: React.ReactNode}) {
  return children;
}
