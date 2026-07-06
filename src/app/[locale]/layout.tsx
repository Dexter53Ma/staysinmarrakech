import type {Metadata, Viewport} from 'next';
import {Raleway} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {getTranslations, getMessages} from 'next-intl/server';
import {SettingsProvider} from '@/components/SettingsContext';
import {ServicesProvider} from '@/components/ServicesContext';
import {CurrencyProvider} from '@/components/CurrencyContext';
import FloatingContact from '@/components/FloatingContact';
import BackToTop from '@/components/BackToTop';
import ErrorBoundary from '@/components/ErrorBoundary';
import '../globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo'});

  return {
    metadataBase: new URL('https://staysinmarrakech.netlify.app'),
    title: {
      default: t('homepageTitle') + ' - StaysInMarrakech',
      template: '%s | StaysInMarrakech',
    },
    description: t('homepageDesc'),
    keywords: ['luxury villa rental marrakech', 'marrakech villa', 'villa sale marrakech', 'private pool villa marrakech', 'vacation rental marrakech', 'stays in marrakech'],
    authors: [{name: 'StaysInMarrakech'}],
    creator: 'StaysInMarrakech',
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_MA',
      url: 'https://staysinmarrakech.netlify.app',
      siteName: 'StaysInMarrakech',
      title: t('homepageTitle') + ' - StaysInMarrakech',
      description: t('homepageDesc'),
      images: [
        {
          url: 'https://staysinmarrakech.netlify.app/seo/og-default.svg',
          width: 1200,
          height: 630,
          alt: 'StaysInMarrakech - Luxury villas in Marrakech',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('homepageTitle') + ' - StaysInMarrakech',
      description: t('homepageDesc'),
      images: ['https://staysinmarrakech.netlify.app/seo/og-default.svg'],
    },
    icons: {
      icon: '/seo/favicon.png',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://staysinmarrakech.netlify.app',
      languages: {
        'fr': 'https://staysinmarrakech.netlify.app/fr',
        'en': 'https://staysinmarrakech.netlify.app/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  const messages = await getMessages({locale});
  const t = await getTranslations({locale, namespace: 'common'});

  return (
    <html
      lang={locale}
      className={`${raleway.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col font-sans pb-[env(safe-area-inset-bottom)]">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-[#0d47a1] focus:text-white focus:px-4 focus:py-2 focus:rounded">
          {t('skipToContent')}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SettingsProvider>
            <ServicesProvider>
              <CurrencyProvider>
                <div id="main-content" className="flex-1 flex flex-col">
                  <ErrorBoundary>{children}</ErrorBoundary>
                </div>
                <FloatingContact />
                <BackToTop />
              </CurrencyProvider>
            </ServicesProvider>
          </SettingsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
