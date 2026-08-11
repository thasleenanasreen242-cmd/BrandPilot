import type { MetadataRoute } from "next";

const baseUrl = "https://www.brandpilotcloud.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/login", "/signup", "/customer-dashboard", "/customer-marketing"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
