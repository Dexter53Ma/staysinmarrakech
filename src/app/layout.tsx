import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import { SettingsProvider } from "@/components/SettingsContext";
import { ServicesProvider } from "@/components/ServicesContext";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://staysinmarrakech.netlify.app"),
  title: {
    default: "Location et vente de villas de luxe à Marrakech - StaysInMarrakech",
    template: "%s | StaysInMarrakech",
  },
  description: "StaysInMarrakech est une société spécialisée dans la location de villas de luxe et de prestige à Marrakech. Découvrez nos villas avec piscine privée, locations pour vacances, mariages et événements.",
  keywords: ["location villa marrakech", "villa de luxe marrakech", "vente villa marrakech", "villa piscine privée marrakech", "location vacances marrakech", "villa mariage marrakech", "stays in marrakech"],
  authors: [{ name: "StaysInMarrakech" }],
  creator: "StaysInMarrakech",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://staysinmarrakech.netlify.app",
    siteName: "StaysInMarrakech",
    title: "Location et vente de villas de luxe à Marrakech - StaysInMarrakech",
    description: "Découvrez nos villas de luxe à Marrakech avec piscine privée. Location pour vacances, mariages et événements.",
    images: [
      {
        url: "https://staysinmarrakech.netlify.app/seo/og-default.svg",
        width: 1200,
        height: 630,
        alt: "StaysInMarrakech - Villas de luxe à Marrakech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Location et vente de villas de luxe à Marrakech - StaysInMarrakech",
    description: "Découvrez nos villas de luxe à Marrakech avec piscine privée. Location pour vacances, mariages et événements.",
    images: ["https://staysinmarrakech.netlify.app/seo/og-default.svg"],
  },
  icons: {
    icon: "/seo/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://staysinmarrakech.netlify.app",
    languages: {
      "fr": "https://staysinmarrakech.netlify.app",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${raleway.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col font-sans pb-[env(safe-area-inset-bottom)]">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-[#0d47a1] focus:text-white focus:px-4 focus:py-2 focus:rounded">
          Aller au contenu principal
        </a>
        <SettingsProvider>
          <ServicesProvider>
            <div id="main-content" className="flex-1 flex flex-col">
              {children}
            </div>
            <FloatingContact />
            <BackToTop />
          </ServicesProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
