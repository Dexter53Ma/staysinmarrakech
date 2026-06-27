import Header from "@/components/Header";
import HeroWithSearch from "@/components/HeroWithSearch";
import IconsSection from "@/components/IconsSection";
import VillaCarousel from "@/components/VillaCarousel";
import LocationSection from "@/components/LocationSection";
import ShortTermRental from "@/components/ShortTermRental";
import QuartiersCarousel from "@/components/QuartiersCarousel";
import EventsSection from "@/components/EventsSection";
import ActivitiesCarousel from "@/components/ActivitiesCarousel";
import Newsletter from "@/components/Newsletter";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import HomepageContent from "@/components/HomepageContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "StaysInMarrakech — Location et vente de villas de luxe à Marrakech",
  description: "StaysInMarrakech, votre partenaire de confiance pour la location et la vente de villas de luxe à Marrakech. Villas avec piscine privée, locations vacances, mariages et événements.",
  openGraph: {
    title: "StaysInMarrakech — Location et vente de villas de luxe à Marrakech",
    description: "Découvrez nos villas de luxe à Marrakech avec piscine privée. Location pour vacances, mariages et événements.",
    url: "https://staysinmarrakech.netlify.app",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "StaysInMarrakech",
  description: "Société spécialisée dans la location et la vente de villas de luxe à Marrakech",
  url: "https://staysinmarrakech.netlify.app",
  telephone: "+212-XXX-XXX-XXX",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marrakech",
    addressCountry: "MA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.6295,
    longitude: -7.9811,
  },
  areaServed: {
    "@type": "City",
    name: "Marrakech",
  },
  priceRange: "$$$$",
  image: "/images/logo.png",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Header />
      <HeroWithSearch />
      <main className="flex-1">
        <IconsSection />
        <VillaCarousel />
        <LocationSection />
        <ShortTermRental />
        <QuartiersCarousel />
        <EventsSection />
        <ActivitiesCarousel />
        <Newsletter />
        <BlogSection />
        <HomepageContent />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
