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
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { faqs } from "@/lib/faqs";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getHeroSlides() {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return slides.filter((s) => s.image).map((s) => ({ image: s.image, title: s.title }));
  } catch {
    return [];
  }
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://staysinmarrakech.netlify.app";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE_URL}/#business`,
  name: "StaysInMarrakech",
  description: "Société spécialisée dans la location et la vente de villas de luxe à Marrakech",
  url: SITE_URL,
  telephone: "+212-6-21-18-94-96",
  email: "contact@staysinmarrakech.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Résidence Farah, Camp Mangin",
    addressLocality: "Gueliz, Marrakech",
    postalCode: "40000",
    addressCountry: "MA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.62951,
    longitude: -7.98112,
  },
  areaServed: [
    { "@type": "City", name: "Marrakech" },
    { "@type": "Place", name: "Palmeraie" },
    { "@type": "Place", name: "Gueliz" },
  ],
  priceRange: "$$$$",
  image: `${SITE_URL}/images/logo.png`,
  foundingDate: "2014",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "20:00",
  },
  sameAs: [],
};

const getWebsiteSchema = (locale: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "StaysInMarrakech",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/properties?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  inLanguage: locale === "en" ? "en" : "fr",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const heroSlides = await getHeroSlides();
  const websiteSchema = getWebsiteSchema(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <HeroWithSearch heroSlides={heroSlides} />
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
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
