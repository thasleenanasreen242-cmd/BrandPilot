import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Marketing Manager | BrandPilot",
  description: "Use BrandPilot's AI Marketing Manager for campaign strategy, social content, SEO, paid ads, email marketing, analytics, and growth planning.",
  alternates: { canonical: "https://www.brandpilotcloud.com/marketing-ai" },
};

export default function MarketingAILayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
