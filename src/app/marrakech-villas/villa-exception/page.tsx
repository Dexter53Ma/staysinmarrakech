import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icon, faCrown, faGem } from "@/components/icons";

const villas = [
  { slug: "villa-selma", name: "Villa Selma", image: "/images/villas/selma.jpg", chambres: 21, pax: 46 },
  { slug: "villa-ilana", name: "Villa Ilana", image: "/images/villas/ilana.jpg", chambres: 9, pax: 23 },
  { slug: "villa-nayma", name: "Villa Nayma", image: "/images/villas/nayma.jpeg", chambres: 6, pax: 12 },
  { slug: "villa-nemeno", name: "Villa Nemeno", image: "/images/villas/nemeno.jpg", chambres: 6, pax: 12 },
];

export default function VillaException() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-[#1a1a2e] to-[#16213e] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }} />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Icon icon={faCrown} className="text-[#d4af37] text-xs" />
            <span className="text-[#d4af37]/90 text-sm font-medium">Collection Prestige</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Villas d&apos;Exception
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            Un héritage d&apos;élégance marocaine — nos propriétés les plus prestigieuses
          </p>
        </div>
      </section>

      {/* Villa Grid */}
      <section className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {villas.map((villa) => (
            <a
              key={villa.slug}
              href={`/properties/${villa.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-[320px] overflow-hidden">
                <Image
                  src={villa.image}
                  alt={villa.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-[#d4af37] text-[#1a1a2e] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Icon icon={faGem} className="text-[8px]" />
                  Exception
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {villa.name}
                  </h3>
                  <div className="flex items-center gap-4 text-white/70 text-sm">
                    <span>{villa.chambres} chambres</span>
                    <span className="w-1 h-1 bg-white/40 rounded-full" />
                    <span>{villa.pax} personnes</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <div className="bg-[#d4af37] rounded-full p-3 shadow-lg">
                    <svg className="w-5 h-5 text-[#1a1a2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
