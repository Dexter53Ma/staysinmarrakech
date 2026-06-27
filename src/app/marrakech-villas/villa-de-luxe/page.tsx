import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Icon, faStar } from "@/components/icons";

const villas = [
  { slug: "villa-selma", name: "Villa Selma", image: "/images/villas/selma.jpg", chambres: 21, pax: 46 },
  { slug: "villa-nayma", name: "Villa Nayma", image: "/images/villas/nayma.jpeg", chambres: 6, pax: 12 },
  { slug: "villa-nouma", name: "Villa Nouma", image: "/images/villas/nouma.jpg", chambres: 6, pax: 16 },
  { slug: "villa-shakira", name: "Villa Shakira", image: "/images/villas/shakira.jpeg", chambres: 5, pax: 16 },
  { slug: "villa-ilana", name: "Villa Ilana", image: "/images/villas/ilana.jpg", chambres: 9, pax: 23 },
  { slug: "villa-nera", name: "Villa Nera", image: "/images/villas/nera.jpg", chambres: 5, pax: 10 },
  { slug: "villa-gabriella", name: "Villa Gabriella", image: "/images/villas/gabriella.jpg", chambres: 5, pax: 10 },
  { slug: "villa-paloma", name: "Villa Paloma", image: "/images/villas/paloma.jpg", chambres: 4, pax: 8 },
];

export default function VillaDeLuxe() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-[#0d47a1] to-[#1976d2] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }} />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Icon icon={faStar} className="text-[#ffb000] text-xs" />
            <span className="text-white/90 text-sm font-medium">Sélection Premium</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Villas de Luxe
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            L&apos;art de vivre à Marrakech dans nos villas les plus raffinées
          </p>
        </div>
      </section>

      {/* Villa Grid */}
      <section className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {villas.map((villa) => (
            <Link
              key={villa.slug}
              href={`/properties/${villa.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={villa.image}
                  alt={villa.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-[#ffb000] text-[#0d47a1] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Luxe
                </div>

                {/* Arrow */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <svg className="w-4 h-4 text-[#0d47a1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-[#0d47a1] transition-colors">
                  {villa.name}
                </h3>
                <div className="flex items-center gap-3 text-gray-500 text-xs">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-[#0d47a1]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    {villa.chambres} ch.
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-[#0d47a1]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    {villa.pax} pers.
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
