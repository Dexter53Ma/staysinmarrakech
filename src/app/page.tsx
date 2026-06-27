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
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
