import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Sales Assistant for Lead Generation & Conversions | BrandPilot",
  description: "Use BrandPilot Sales AI to qualify leads, prepare customer responses, improve follow-ups, and support a stronger sales conversion process.",
  alternates: { canonical: "https://www.brandpilotcloud.com/sales-ai" },
};

export default function SalesAILayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
