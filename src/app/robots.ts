import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/how-it-works", "/contact", "/login"],
        disallow: [
          "/api/",
          "/auth/",
          "/dashboard",
          "/billing",
          "/credits",
          "/dream-journal",
          "/dream-journal/",
          "/stories",
          "/stories/",
          "/error",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
