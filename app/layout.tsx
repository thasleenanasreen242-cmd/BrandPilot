import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrandPilot | AI-Powered Web Design & Digital Marketing Agency",
  description:
    "BrandPilot helps businesses grow online with custom website design, SEO, branding, social media marketing, paid advertising, email marketing, and AI-powered digital solutions.",
  keywords: [
    "BrandPilot",
    "web design",
    "website development",
    "SEO",
    "digital marketing",
    "branding",
    "social media marketing",
    "Google Ads",
    "Meta Ads",
    "email marketing",
    "AI marketing",
    "AI employees",
    "AI audit",
  ],
  alternates: {
    canonical: "https://www.brandpilotcloud.com",
  },
  openGraph: {
    title: "BrandPilot | AI-Powered Web Design & Digital Marketing Agency",
    description:
      "BrandPilot helps businesses grow online with custom website design, SEO, branding, social media marketing, paid advertising, email marketing, and AI-powered digital solutions.",
    url: "https://www.brandpilotcloud.com",
    siteName: "BrandPilot",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandPilot | AI-Powered Web Design & Digital Marketing Agency",
    description:
      "BrandPilot helps businesses grow online with custom website design, SEO, branding, social media marketing, paid advertising, email marketing, and AI-powered digital solutions.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
