import type { MetadataRoute } from "next";

const baseUrl = "https://www.brandpilotcloud.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/ai-employees", changeFrequency: "monthly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/competitor-intelligence", changeFrequency: "monthly", priority: 0.7 },
    { path: "/marketing-ai", changeFrequency: "monthly", priority: 0.7 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
