import { prisma } from "@/lib/prisma";
import PropertiesPageClient from "./PropertiesPageClient";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 9;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const type = params.type || "ALL";
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : undefined;
  const bedrooms = params.bedrooms ? parseInt(params.bedrooms) : undefined;
  const quarter = params.quarter || undefined;
  const features = params.features ? params.features.split(",") : [];
  const sort = params.sort || "newest";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {};

  if (type && type !== "ALL") where.type = type;
  if (minPrice !== undefined) where.price = { ...where.price, gte: minPrice };
  if (maxPrice !== undefined) where.price = { ...where.price, lte: maxPrice };
  if (bedrooms !== undefined) where.bedrooms = { gte: bedrooms };
  if (quarter) where.quarter = { contains: quarter, mode: "insensitive" };
  if (features.length > 0) {
    where.AND = features.map((f) => ({
      features: { path: [], string_contains: f },
    }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let orderBy: Record<string, any> = { createdAt: "desc" };
  if (sort === "price-asc") orderBy = { price: "asc" };
  else if (sort === "price-desc") orderBy = { price: "desc" };
  else if (sort === "views") orderBy = { views: { _count: "desc" } };

  const skip = (page - 1) * ITEMS_PER_PAGE;

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        _count: { select: { views: true } },
      },
      orderBy,
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.property.count({ where }),
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <PropertiesPageClient
      properties={properties.map((p) => ({
        ...p,
        price: p.price,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      }))}
      total={total}
      page={page}
      totalPages={totalPages}
      initialFilters={{
        type,
        minPrice: params.minPrice || "",
        maxPrice: params.maxPrice || "",
        bedrooms: params.bedrooms || "",
        quarter: params.quarter || "",
        features,
        sort,
      }}
    />
  );
}
