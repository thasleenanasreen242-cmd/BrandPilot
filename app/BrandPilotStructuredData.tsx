export default function BrandPilotStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: "BrandPilot",
    url: "https://www.brandpilotcloud.com",
    logo: "https://www.brandpilotcloud.com/logo.png",
    description: "AI-powered digital marketing and web design agency serving businesses in Kerala, Kozhikode and across India with technical SEO, on-page SEO, local SEO, web development, paid advertising, social media, branding and AI solutions.",
    email: "info@brandpilotcloud.com",
    sameAs: ["https://www.instagram.com/brandpilotcloud/"],
    serviceType: [
      "Web Design",
      "Website Development",
      "SEO Services",
      "Technical SEO",
      "On-Page SEO",
      "Off-Page SEO",
      "Local SEO",
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
