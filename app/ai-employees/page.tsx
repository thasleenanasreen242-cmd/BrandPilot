import Link from "next/link";

const employees = [
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
    accent: "from-blue-500/20 to-purple-500/10",
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
    accent: "from-emerald-500/15 to-cyan-500/10",
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
    accent: "from-violet-500/15 to-pink-500/10",
  },
];

export default function AIEmployeesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-extrabold tracking-wide">
            BrandPilot<span className="text-blue-400">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-gray-300 text-sm">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/services" className="hover:text-white transition">Services</Link>
            <Link href="/portfolio" className="hover:text-white transition">Portfolio</Link>
            <Link href="/ai-employees" className="text-white">AI Employees</Link>
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
          </nav>

          <Link
            href="/#contact"
            className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
          >
            Contact
          </Link>
        </div>
      </header>

      <section className="relative z-10 px-6 pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.4em] text-gray-400 text-xs font-semibold">
            BrandPilot AI
          </p>
          <h1 className="text-5xl md:text-7xl font-black mt-5 leading-tight">
            Meet Your AI Employees.
          </h1>
          <p className="text-blue-400 font-semibold text-lg md:text-xl mt-5">
            AI-powered specialists working alongside your business.
          </p>
          <p className="text-gray-400 text-lg md:text-xl leading-8 max-w-3xl mx-auto mt-6">
            From marketing and sales to SEO, BrandPilot AI Employees help you
            plan faster, respond smarter, and turn more opportunities into growth.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {employees.map((employee) => (
            <article
              key={employee.name}
              className={`group rounded-3xl border border-white/10 bg-gradient-to-br ${employee.accent} bg-white/[0.04] p-8 hover:border-blue-400/40 hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="text-5xl">{employee.icon}</div>
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                  AI ACTIVE
                </span>
              </div>

              <h2 className="text-2xl font-bold mt-6">{employee.name}</h2>
              <p className="text-blue-400 mt-2 font-semibold">{employee.role}</p>
              <p className="text-gray-400 mt-4 leading-7">{employee.description}</p>

              <ul className="mt-6 space-y-3">
                {employee.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-gray-300 text-sm">
                    <span className="text-blue-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={employee.href}
                className="mt-8 block w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-center font-bold transition"
              >
                Activate AI →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-4xl mx-auto text-center rounded-3xl border border-white/10 bg-white/[0.04] p-10 md:p-14">
          <p className="text-blue-400 uppercase tracking-widest text-sm font-semibold">
            Your digital team
          </p>
          <h2 className="text-4xl md:text-5xl font-black mt-3">
            More strategy. Less busywork.
          </h2>
          <p className="text-gray-400 leading-7 mt-5 max-w-2xl mx-auto">
            Use AI to handle repetitive marketing work while you focus on
            building your business. Start with one specialist and expand your
            digital team as you grow.
          </p>
          <Link
            href="/#contact"
            className="inline-flex mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold hover:scale-105 transition shadow-lg shadow-blue-500/20"
          >
            Talk to BrandPilot →
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BrandPilot. All rights reserved.
      </footer>
    </main>
  );
}
