import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = "https://www.brandpilotcloud.com";
const title = "BrandPilot | Web Design & Digital Marketing Agency";
const description = "BrandPilot helps businesses grow with web design, SEO, branding, social media, paid ads, email marketing, and AI-powered digital marketing.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "digital marketing agency",
    "web design agency",
    "website development",
    "SEO services",
    "SEO agency",
    "social media marketing",
    "Google Ads",
    "Meta Ads",
    "email marketing",
    "branding services",
    "AI marketing",
  ],
  alternates: { canonical: siteUrl },
  icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "BrandPilot",
    type: "website",
    locale: "en_US",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "BrandPilot digital marketing agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/icon.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
