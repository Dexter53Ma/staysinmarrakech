import { redirect } from "next/navigation";

/**
 * Legacy villa route — redirects to the database-backed /properties/[slug].
 * Run `node scripts/seed-villas.js` to migrate hardcoded villa data to the DB.
 */
export default async function VillaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/properties/${slug}`);
}
