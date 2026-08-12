import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Website SEO Audit | BrandPilot",
  description: "Run an AI-powered website SEO audit to check search visibility, performance, content, branding, and technical website health.",
  alternates: { canonical: "https://www.brandpilotcloud.com/ai-audit" },
};

export default function AIAuditLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
