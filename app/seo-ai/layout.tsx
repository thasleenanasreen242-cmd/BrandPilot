import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI SEO Audit & SEO Strategy | BrandPilot",
  description: "Use BrandPilot AI to audit SEO, content, technical health, performance, and on-page factors, then get actionable SEO recommendations.",
  alternates: { canonical: "https://www.brandpilotcloud.com/seo-ai" },
};

export default function SEOAILayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
