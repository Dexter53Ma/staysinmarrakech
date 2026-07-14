import { prisma } from "@/lib/prisma";
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://staysinmarrakech.netlify.app";

const locales = ["fr", "en"] as const;

const staticPaths = [
  "/",
  "/properties",
  "/marrakech-villas/location-villa-marrakech",
  "/marrakech-villas/vente-villa-marrakech",
  "/marrakech-villas/villa-de-luxe",
  "/marrakech-villas/villa-exception",
  "/service",
  "/blog",
  "/testimonials",
  "/contactez-nous",
  "/agence",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/locations/palmeraie",
  "/locations/gueliz",
  "/locations/route-ourika",
  "/locations/amelkis",
  "/locations/targa",
];

const pathPriority: Record<string, { changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }> = {
  "/": { changeFrequency: "daily", priority: 1.0 },
  "/properties": { changeFrequency: "daily", priority: 0.9 },
  "/marrakech-villas/location-villa-marrakech": { changeFrequency: "daily", priority: 0.9 },
  "/marrakech-villas/vente-villa-marrakech": { changeFrequency: "daily", priority: 0.8 },
  "/marrakech-villas/villa-de-luxe": { changeFrequency: "weekly", priority: 0.7 },
  "/marrakech-villas/villa-exception": { changeFrequency: "weekly", priority: 0.7 },
  "/service": { changeFrequency: "weekly", priority: 0.8 },
  "/blog": { changeFrequency: "weekly", priority: 0.7 },
  "/testimonials": { changeFrequency: "monthly", priority: 0.5 },
  "/contactez-nous": { changeFrequency: "monthly", priority: 0.6 },
  "/agence": { changeFrequency: "monthly", priority: 0.5 },
  "/mentions-legales": { changeFrequency: "yearly", priority: 0.2 },
  "/politique-de-confidentialite": { changeFrequency: "yearly", priority: 0.2 },
  "/locations/palmeraie": { changeFrequency: "weekly", priority: 0.8 },
  "/locations/gueliz": { changeFrequency: "weekly", priority: 0.8 },
  "/locations/route-ourika": { changeFrequency: "weekly", priority: 0.8 },
  "/locations/amelkis": { changeFrequency: "weekly", priority: 0.8 },
  "/locations/targa": { changeFrequency: "weekly", priority: 0.8 },
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  if (!process.env.DATABASE_URL) {
    const staticPages: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
      locales.map((locale) => {
        const meta = pathPriority[path];
        return {
          url: `${BASE_URL}/${locale}${path === "/" ? "" : path}`,
          lastModified: now,
          changeFrequency: meta.changeFrequency,
          priority: meta.priority,
        };
      })
    );
    return staticPages;
  }

  const [properties, blogPosts, services] = await Promise.all([
    prisma.property.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.service.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const staticPages: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    locales.map((locale) => {
      const meta = pathPriority[path];
      return {
        url: `${BASE_URL}/${locale}${path === "/" ? "" : path}`,
        lastModified: now,
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
      };
    })
  );

  const propertyPages: MetadataRoute.Sitemap = properties.flatMap((p) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/properties/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  const blogPages: MetadataRoute.Sitemap = blogPosts.flatMap((p) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const servicePages: MetadataRoute.Sitemap = services.flatMap((s) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/service/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...propertyPages, ...blogPages, ...servicePages];
}
