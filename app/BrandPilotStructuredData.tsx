export default function BrandPilotStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: "BrandPilot",
    url: "https://www.brandpilotcloud.com",
    logo: "https://www.brandpilotcloud.com/logo.png",
    description: "Web design, SEO, branding, social media marketing, paid advertising, email marketing, and AI-powered digital marketing services.",
    email: "info@brandpilotcloud.com",
    sameAs: ["https://www.instagram.com/brandpilotcloud/"],
    serviceType: [
      "Web Design",
      "Website Development",
      "SEO Services",
      "Social Media Marketing",
      "Google Ads",
      "Meta Ads",
      "Email Marketing",
      "Branding",
      "AI Marketing",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
