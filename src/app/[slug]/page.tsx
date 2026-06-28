import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

/**
 * Legacy villa route — redirects to the database-backed /properties/[slug].
 * If the property doesn't exist, returns 404.
 */
export default async function VillaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await prisma.property.findUnique({ where: { slug }, select: { slug: true } });
  if (!property) notFound();
  redirect(`/properties/${slug}`);
}
