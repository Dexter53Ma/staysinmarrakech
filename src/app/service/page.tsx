import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icon, faArrowRight } from "@/components/icons";

const services = [
  { title: "Votre séjour", href: "/service/votre-sejour", image: "/images/activities/sonotherapie.webp", category: "Conciergerie" },
  { title: "Vos repas", href: "/service/vos-repas", image: "/images/activities/voiture-luxe.webp", category: "Gastronomie" },
  { title: "Votre transport sur place", href: "/service/votre-transport-sur-place", image: "/images/activities/van-chauffeur.webp", category: "Transport" },
  { title: "Van avec chauffeur", href: "/service/van-avec-chauffeur", image: "/images/activities/van-chauffeur.webp", category: "Transport" },
  { title: "Votre bien être", href: "/service/votre-bien-etre", image: "/images/activities/sonotherapie.webp", category: "Bien-être" },
  { title: "Vos activités", href: "/service/vos-activites", image: "/images/activities/quad-buggy.webp", category: "Activités" },
  { title: "Quad/Buggy", href: "/service/quad-buggy", image: "/images/activities/quad-buggy.webp", category: "Sensations fortes" },
  { title: "Montgolfière à Marrakech", href: "/service/montgolfiere", image: "/images/activities/montgolfiere.webp", category: "Expérience unique" },
  { title: "Wakeboard à Marrakech", href: "/service/wakeboard-marrakech", image: "/images/activities/wakeboard.jpg", category: "Sports nautiques" },
  { title: "Excursions VTT", href: "/service/vtt", image: "/images/activities/vtt.webp", category: "Aventure" },
  { title: "Grand Canyon", href: "/service/terres-d-amanar-polo-berbere-babyfoot-humain-tyrolienne-accrobranche", image: "/images/activities/grand-canyon.webp", category: "Aventure" },
  { title: "Golf", href: "/service/golf-1", image: "/images/activities/golf.webp", category: "Sport" },
  { title: "Désert sensation", href: "/service/desert-sensation", image: "/images/activities/desert-sensation.webp", category: "Aventure" },
  { title: "Visites découvertes", href: "/service/visites-decouvertes", image: "/images/activities/visites-decouvertes.webp", category: "Culture" },
  { title: "Equitation", href: "/service/equitation", image: "/images/activities/equitation.webp", category: "Nature" },
  { title: "Yoga et Pilates", href: "/service/yoga-et-pilates", image: "/images/activities/yoga-pilates.webp", category: "Bien-être" },
  { title: "Aqua Karting", href: "/service/aqua-karting", image: "/images/activities/aqua-karting.webp", category: "Famille" },
  { title: "Karting", href: "/service/karting", image: "/images/activities/karting.webp", category: "Sensations fortes" },
  { title: "Paintball", href: "/service/paintball", image: "/images/activities/paintball.webp", category: "Team building" },
  { title: "Side Car Vintage", href: "/service/side-car-vintage", image: "/images/activities/side-car.webp", category: "Expérience unique" },
  { title: "Jet Ski", href: "/service/jet-ski", image: "/images/activities/jet-ski.webp", category: "Sports nautiques" },
  { title: "Sonothérapie", href: "/service/sonographie", image: "/images/activities/sonotherapie.webp", category: "Bien-être" },
  { title: "Vos soirées festives", href: "/service/vos-soirees-festives", image: "/images/activities/voiture-luxe.webp", category: "Événementiel" },
  { title: "Vos demandes spécifiques", href: "/service/vos-demandes-specifiques", image: "/images/activities/van-chauffeur.webp", category: "Sur mesure" },
  { title: "Votre séminaire", href: "/service/votre-seminaire", image: "/images/activities/voiture-luxe.webp", category: "Entreprise" },
];

const categories = [...new Set(services.map((s) => s.category))];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0d47a1] to-[#1565c0] py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <span className="inline-block bg-white/10 text-white/90 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
              Marrakech
            </span>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Nos Services & Activités
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
              Découvrez notre sélection complète de services de conciergerie et d&apos;activités pour rendre votre séjour à Marrakech inoubliable.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="max-w-[1200px] mx-auto px-4 py-12 md:py-16">
          {/* Category quick nav */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <span
                key={cat}
                className="bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
              >
                <div className="relative w-full h-[200px] sm:h-[220px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0d47a1] text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <h2 className="text-base font-bold text-[#34495e] group-hover:text-[#0d47a1] transition-colors">
                    {service.title}
                  </h2>
                  <Icon icon={faArrowRight} className="text-gray-300 group-hover:text-[#0d47a1] transition-colors text-sm group-hover:translate-x-1 transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="max-w-[800px] mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#34495e] mb-4">
              Une demande spécifique ?
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Vous ne trouvez pas l&apos;activité que vous recherchez ? Notre équipe est capable d&apos;organiser n&apos;importe quelle expérience sur mesure à Marrakech.
            </p>
            <Link
              href="/contactez-nous"
              className="inline-flex items-center gap-2 bg-[#0d47a1] hover:bg-[#0a3a82] text-white font-bold py-3.5 px-8 rounded-xl transition-all hover:shadow-lg text-sm"
            >
              Contactez-nous
              <Icon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
