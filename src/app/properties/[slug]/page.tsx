import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PropertyDetailClient from "./PropertyDetailClient";

export const dynamic = "force-dynamic";

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
  );
}
