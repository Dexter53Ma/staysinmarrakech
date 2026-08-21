import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

interface LocationGridProps {
  locale: string;
}

export default async function LocationGrid({ locale }: LocationGridProps) {
  const locations = await prisma.location.findMany({
    orderBy: { sortOrder: "asc" },
  });

  if (locations.length === 0) {
    return null;
  }

  return (
    <section className="max-w-[1140px] mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-[#34495e] mb-6 text-center">
        {locale === "en" ? "Explore our locations" : "Découvrez nos quartiers"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => {
          const name = locale === "en" && location.nameEn ? location.nameEn : location.name;
          const description = locale === "en" && location.descriptionEn ? location.descriptionEn : location.description;

          return (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {location.image ? (
                <div className="relative h-48">
                  <Image
                    src={location.image}
                    alt={name}
                    fill
                    unoptimized={location.image.startsWith("http")}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
              <div className="p-6">
                <h3 className="font-bold text-[#34495e] text-lg mb-2">{name}</h3>
                {description && (
                  <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
                )}
                <span className="text-[#0d47a1] text-sm mt-3 inline-block font-medium">
                  {locale === "en" ? "Explore" : "Explorer"} →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
