"use client";

const employees = [
  {
    icon: "📈",
    role: "Marketing AI",
    title: "AI Marketing Manager",
    desc: "Creates marketing strategies, analyzes competitors, generates campaigns, and helps grow your brand.",
    features: ["Marketing strategy", "Campaign ideas", "Content planning", "Competitor research"],
    href: "/marketing-ai",
  },
  {
    icon: "🤝",
    role: "Sales AI",
    title: "AI Sales Assistant",
    desc: "Qualifies leads, answers customer questions, and helps convert visitors into clients.",
    features: ["Lead qualification", "Customer replies", "Follow-ups", "Booking assistance"],
    href: "/marketing-ai",
  },
  {
    icon: "🔍",
    role: "SEO AI",
    title: "AI SEO Specialist",
    desc: "Finds keywords, improves website SEO, and creates search optimization plans.",
    features: ["Keyword research", "SEO audits", "Content ideas", "Ranking strategy"],
    href: "/marketing-ai",
  },
];

export default function AIEmployees() {
  return (
    <section id="ai-employees" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center">AI Employees</h2>
        <p className="text-gray-400 text-center mt-4">
          Meet your digital team powered by artificial intelligence.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {employees.map((emp, i) => (
            <div
              key={emp.role}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="card-glow bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 hover:border-blue-400/30 transition-all flex flex-col"
            >
              <span className="text-3xl">{emp.icon}</span>
              <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold mt-4">
                {emp.role}
              </span>
              <h3 className="text-2xl font-bold mt-1 mb-3">{emp.title}</h3>
              <p className="text-gray-400 text-sm leading-6">{emp.desc}</p>

              <ul className="mt-5 space-y-2 flex-1">
                {emp.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={emp.href}
                className="mt-6 text-center px-6 py-3 rounded-full font-semibold bg-blue-500 hover:bg-blue-600 transition"
              >
                Activate AI
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
