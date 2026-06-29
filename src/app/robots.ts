import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staysinmarrakech.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/villas/wishlist"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
