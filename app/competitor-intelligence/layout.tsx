import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Competitor Intelligence | BrandPilot",
  description: "Analyze competitors with BrandPilot AI to uncover market gaps, SEO opportunities, content ideas, ad opportunities, and actionable growth strategies.",
  alternates: { canonical: "https://www.brandpilotcloud.com/competitor-intelligence" },
};

export default function CompetitorIntelligenceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
