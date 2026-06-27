import type { Metadata } from "next";
import { Raleway, Rubik } from "next/font/google";
import { SettingsProvider } from "@/components/SettingsContext";
import FloatingContact from "@/components/FloatingContact";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
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
        url: "/seo/og-default.jpg",
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
    images: ["/seo/og-default.jpg"],
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
      className={`${raleway.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SettingsProvider>
          {children}
          <FloatingContact />
        </SettingsProvider>
      </body>
    </html>
  );
}
