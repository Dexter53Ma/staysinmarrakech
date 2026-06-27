import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PropertyDetailClient from "./PropertyDetailClient";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://staysinmarrakech.netlify.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await prisma.property.findUnique({ where: { slug } });
  if (!property) return {};
  return {
    title: `${property.title} — Location de villa à Marrakech`,
    description: property.description?.slice(0, 160) || `Découvrez ${property.title}, une villa de luxe à Marrakech avec ${property.bedrooms} chambres.`,
    openGraph: {
      title: `${property.title} | StaysInMarrakech`,
      description: property.description?.slice(0, 200) || "",
      url: `${BASE_URL}/properties/${property.slug}`,
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const property = await prisma.property.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      bookings: {
        where: { status: { in: ["PENDING", "CONFIRMED"] } },
        select: { checkIn: true, checkOut: true },
      },
      _count: { select: { views: true } },
    },
  });

  if (!property) notFound();

  const testimonials = await prisma.testimonial.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const propertyTestimonials = testimonials.filter(
    (t) => t.propertyName === property.title
  );

  const ratingCount = propertyTestimonials.filter((t) => t.rating != null).length;
  const avgRating = ratingCount > 0
    ? propertyTestimonials.reduce((sum, t) => sum + (t.rating ?? 0), 0) / ratingCount
    : 0;

  const statusMap: Record<string, string> = {
    AVAILABLE: "https://schema.org/InStock",
    SOLD: "https://schema.org/SoldOut",
    RENTED: "https://schema.org/SoldOut",
    PENDING: "https://schema.org/PreOrder",
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description,
    image: property.images[0]?.url ? `${BASE_URL}${property.images[0].url}` : undefined,
    url: `${BASE_URL}/properties/${property.slug}`,
    brand: { "@type": "Organization", name: "StaysInMarrakech" },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: property.currency,
      availability: statusMap[property.status] || "https://schema.org/InStock",
      url: `${BASE_URL}/properties/${property.slug}`,
      seller: { "@type": "Organization", name: "StaysInMarrakech" },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Chambres", value: property.bedrooms },
      { "@type": "PropertyValue", name: "Salles de bain", value: property.bathrooms },
      ...(property.builtArea ? [{ "@type": "PropertyValue", name: "Surface habitable", value: `${property.builtArea} m²` }] : []),
      ...(property.maxGuests ? [{ "@type": "PropertyValue", name: "Capacité max", value: `${property.maxGuests} personnes` }] : []),
    ],
    ...(ratingCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: Math.round(avgRating * 10) / 10,
        reviewCount: ratingCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Propriétés", item: `${BASE_URL}/properties` },
      { "@type": "ListItem", position: 3, name: property.title, item: `${BASE_URL}/properties/${property.slug}` },
    ],
  };

  const similarProperties = await prisma.property.findMany({
    where: {
      id: { not: property.id },
      OR: [{ type: property.type }, { quarter: property.quarter }],
    },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      _count: { select: { views: true } },
    },
    take: 3,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PropertyDetailClient
      property={{
        ...property,
        features: Array.isArray(property.features)
          ? (property.features as string[]).filter((f): f is string => typeof f === "string")
          : typeof property.features === "string"
          ? property.features
          : [],
        price: property.price,
        cleaningFee: property.cleaningFee ?? undefined,
        serviceFee: property.serviceFee ?? undefined,
        plotArea: property.plotArea ?? undefined,
        builtArea: property.builtArea ?? undefined,
        yearBuilt: property.yearBuilt ?? undefined,
        maxGuests: property.maxGuests ?? undefined,
        minStay: property.minStay ?? undefined,
        maxStay: property.maxStay ?? undefined,
        checkInTime: property.checkInTime ?? undefined,
        checkOutTime: property.checkOutTime ?? undefined,
        latitude: property.latitude ?? undefined,
        longitude: property.longitude ?? undefined,
        quarter: property.quarter ?? undefined,
        pricePeriod: property.pricePeriod ?? undefined,
        createdAt: property.createdAt.toISOString(),
        updatedAt: property.updatedAt.toISOString(),
      }}
      bookings={property.bookings.map((b) => ({
        checkIn: b.checkIn.toISOString(),
        checkOut: b.checkOut.toISOString(),
      }))}
      viewCount={property._count.views}
      testimonials={propertyTestimonials.map((t) => ({
        id: t.id,
        guestName: t.guestName,
        guestCountry: t.guestCountry ?? undefined,
        duration: t.duration ?? undefined,
        year: t.year ?? undefined,
        rating: t.rating ?? undefined,
        reviewText: t.reviewText ?? undefined,
      }))}
      similarProperties={similarProperties.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        type: p.type,
        price: p.price,
        currency: p.currency,
        pricePeriod: p.pricePeriod ?? undefined,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        address: p.address,
        city: p.city,
        quarter: p.quarter ?? undefined,
        image: p.images[0]?.url || null,
        viewCount: p._count.views,
      }))}
    />
    </>
  );
}
