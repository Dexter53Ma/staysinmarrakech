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
  title: "Location et vente de villas de luxe à Marrakech - StaysInMarrakech",
  description: "StaysInMarrakech est une société spécialisée dans la location de villas de luxe et de prestige à Marrakech.",
  icons: {
    icon: "/seo/favicon.png",
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
