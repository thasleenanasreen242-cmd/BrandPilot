"use client";

import Link from "next/link";

const aiEmployees = [
  {
    icon: "📈",
    name: "Marketing AI",
    role: "AI Marketing Manager",
    description:
      "Creates marketing strategies, analyzes competitors, generates campaigns, and helps grow your brand.",
    features: [
      "Marketing strategy",
      "Campaign ideas",
      "Content planning",
      "Competitor research",
    ],
    href: "/marketing-ai",
  },
  {
    icon: "🤝",
    name: "Sales AI",
    role: "AI Sales Assistant",
    description:
      "Qualifies leads, answers customer questions, and helps convert visitors into clients.",
    features: [
      "Lead qualification",
      "Customer replies",
      "Follow-ups",
      "Booking assistance",
    ],
    href: "/sales-ai",
  },
  {
    icon: "🔍",
    name: "SEO AI",
    role: "AI SEO Specialist",
    description:
      "Finds keywords, improves website SEO, and creates search optimization plans.",
    features: [
      "Keyword research",
      "SEO audits",
      "Content ideas",
      "Ranking strategy",
    ],
    href: "/seo-ai",
  },
];

export default function AIEmployees() {
  return (
    <section className="py-24 px-6" id="ai-employees">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center">AI Employees</h2>

        <p className="text-gray-400 text-center mt-4">
          Meet your digital team powered by artificial intelligence.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {aiEmployees.map((employee) => (
            <div
              key={employee.name}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-400/50 transition"
            >
              <div className="text-5xl">{employee.icon}</div>

              <h3 className="text-2xl font-bold mt-5">{employee.name}</h3>

              <p className="text-blue-400 mt-2">{employee.role}</p>

              <p className="text-gray-400 mt-4 leading-7">{employee.description}</p>

              <ul className="mt-6 space-y-3">
                {employee.features.map((feature) => (
                  <li key={feature} className="text-gray-300 text-sm">
                    ✓ {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={employee.href}
                className="mt-8 block w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition font-bold text-center"
              >
                Explore {employee.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
