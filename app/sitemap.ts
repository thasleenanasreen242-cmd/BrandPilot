import type { MetadataRoute } from "next";

const baseUrl = "https://www.brandpilotcloud.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/ai-employees",
    "/blog",
    "/competitor-intelligence",
    "/marketing-ai",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
