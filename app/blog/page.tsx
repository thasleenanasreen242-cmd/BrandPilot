const articles = [
  {
    slug: "seo-tips-small-business",
    category: "SEO",
    title: "5 SEO Fixes That Will Actually Move the Needle",
    excerpt:
      "Five practical SEO improvements small businesses can make without needing a huge content budget.",
    date: "July 14, 2026",
    read: "5 min read",
    accent: "from-emerald-500/70 to-teal-500/20",
  },
  {
    slug: "website-speed-conversions",
    category: "Web Design",
    title: "How a Slow Website Is Costing You Customers",
    excerpt:
      "Speed affects user experience, trust and conversions. Here is what to check first when a site feels slow.",
    date: "July 8, 2026",
    read: "6 min read",
    accent: "from-blue-500/70 to-indigo-500/20",
  },
  {
    slug: "social-media-content-strategy",
    category: "Social Media",
    title: "Why Posting More Isn&apos;t the Answer",
    excerpt:
      "A better social strategy starts with a clear audience, repeatable content pillars and a reason to act.",
    date: "July 2, 2026",
    read: "4 min read",
    accent: "from-pink-500/70 to-rose-500/20",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-blue-600/20 blur-[130px] rounded-full" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-600/15 blur-[130px] rounded-full" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="font-black text-xl">
            Brand<span className="text-blue-400">Pilot</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-gray-400">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/portfolio" className="hover:text-white transition">Portfolio</a>
            <a href="/about" className="hover:text-white transition">About</a>
            <a href="/blog" className="text-white">Blog</a>
          </nav>
          <a
            href="/#contact"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-semibold hover:scale-105 transition"
          >
            Start a Project
          </a>
        </div>
      </header>

      <section className="relative z-10 px-6 pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.4em] text-blue-400 text-xs font-semibold">
            BrandPilot Insights
          </p>
          <h1 className="text-5xl md:text-7xl font-black mt-5">
            Ideas that help your
            <span className="text-blue-400"> brand grow.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-8 max-w-2xl mx-auto mt-6">
            Practical insights on SEO, websites, social media, branding and
            AI-powered marketing — without the fluff.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-7">
          {articles.map((article) => (
            <a
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] hover:border-blue-400/30 hover:-translate-y-1 transition-all"
            >
              <div className={`h-2 bg-gradient-to-r ${article.accent}`} />
              <div className="h-44 bg-white/[0.02] p-6 flex items-end">
                <div>
                  <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">
                    {article.category}
                  </span>
                  <div className="mt-4 text-4xl font-black text-white/10 group-hover:text-blue-400/20 transition">
                    BP
                  </div>
                </div>
              </div>
              <div className="p-7">
                <h2 className="text-xl font-bold leading-7 group-hover:text-blue-300 transition">
                  {article.title.replace("&apos;", "'")}
                </h2>
                <p className="text-gray-400 text-sm leading-7 mt-3">
                  {article.excerpt}
                </p>
                <p className="text-gray-500 text-xs mt-5">
                  {article.read} · {article.date}
                </p>
                <span className="inline-flex mt-6 text-sm font-semibold text-blue-300">
                  Read article →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BrandPilot. All rights reserved.
      </footer>
    </main>
  );
}
