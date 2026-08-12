import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Employees for Marketing & Business Growth | BrandPilot",
  description: "Explore BrandPilot AI employees for marketing, SEO, sales, content, and business growth, built to support research, strategy, and execution.",
  alternates: { canonical: "https://www.brandpilotcloud.com/ai-employees" },
};

export default function AIEmployeesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
