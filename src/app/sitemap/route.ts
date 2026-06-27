import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://staysinmarrakech.netlify.app";

export async function GET() {
  try {
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

    const staticPages = [
      { url: "", changefreq: "daily", priority: "1.0" },
      { url: "/properties", changefreq: "daily", priority: "0.9" },
      { url: "/service", changefreq: "weekly", priority: "0.8" },
      { url: "/blog", changefreq: "weekly", priority: "0.7" },
      { url: "/testimonials", changefreq: "monthly", priority: "0.5" },
      { url: "/contactez-nous", changefreq: "monthly", priority: "0.6" },
      { url: "/agence", changefreq: "monthly", priority: "0.5" },
      { url: "/marrakech-villas/location-villa-marrakech", changefreq: "daily", priority: "0.9" },
      { url: "/marrakech-villas/vente-villa-marrakech", changefreq: "daily", priority: "0.8" },
      { url: "/marrakech-villas/villa-de-luxe", changefreq: "weekly", priority: "0.7" },
      { url: "/marrakech-villas/villa-exception", changefreq: "weekly", priority: "0.7" },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map((p) => `  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
${properties.map((p) => `  <url>
    <loc>${BASE_URL}/properties/${p.slug}</loc>
    <lastmod>${p.updatedAt.toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("\n")}
${blogPosts.map((p) => `  <url>
    <loc>${BASE_URL}/blog/${p.slug}</loc>
    <lastmod>${p.updatedAt.toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join("\n")}
${services.map((s) => `  <url>
    <loc>${BASE_URL}/service/${s.slug}</loc>
    <lastmod>${s.updatedAt.toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join("\n")}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
