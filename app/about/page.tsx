export default function AboutPage() {
  const values = [
    {
      icon: "01",
      title: "Strategy before aesthetics",
      text: "A beautiful website matters, but it has to support a business goal. We start with positioning, audience and conversion paths.",
    },
    {
      icon: "02",
      title: "Built for the real web",
      text: "Fast, responsive and search-friendly experiences using modern web technology instead of unnecessary complexity.",
    },
    {
      icon: "03",
      title: "AI with human direction",
      text: "We use AI to accelerate research, ideation and execution while keeping strategy, quality and brand voice human-led.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/15 blur-[130px] rounded-full" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="font-black text-xl">
            Brand<span className="text-blue-400">Pilot</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-gray-400">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/portfolio" className="hover:text-white transition">Portfolio</a>
            <a href="/about" className="text-white">About</a>
            <a href="/blog" className="hover:text-white transition">Blog</a>
          </nav>
          <a
            href="/#contact"
            className="px-5 py-2.5 rounded-full bg-white/10 border border-white/15 text-sm font-semibold hover:bg-white/15 transition"
          >
            Start a Project
          </a>
        </div>
      </header>

      <section className="relative z-10 px-6 pt-24 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.4em] text-gray-400 text-xs font-semibold">
            About BrandPilot
          </p>
          <h1 className="text-5xl md:text-7xl font-black mt-5 leading-tight">
            One laptop.
            <br />
            <span className="text-blue-400">A clear mission.</span>
          </h1>
          <p className="text-gray-400 text-xl leading-9 max-w-3xl mt-7">
            BrandPilot exists to help ambitious businesses stop looking
            invisible online. We combine modern web design, digital marketing
            and practical AI tools to create digital systems that work harder.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_.85fr] gap-10 items-stretch">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
            <p className="text-blue-400 text-sm uppercase tracking-widest font-semibold">
              The story
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              From frustration with outdated websites to a digital growth studio.
            </h2>
            <div className="space-y-5 text-gray-400 leading-8 mt-6">
              <p>
                BrandPilot started with a simple observation: too many good
                businesses were losing attention because their digital presence
                didn&apos;t reflect the quality of what they offered.
              </p>
              <p>
                Instead of treating a website as a digital brochure, we look at
                the full customer journey — discovery, trust, conversion and
                follow-up.
              </p>
              <p>
                Today, BrandPilot brings website development, SEO, social media,
                paid advertising, email marketing, branding and AI-powered
                workflows together under one roof.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-widest">
                Our approach
              </p>
              <div className="text-7xl font-black text-blue-400 mt-6">BP</div>
              <p className="text-2xl font-bold mt-5">
                Build. Position. Perform.
              </p>
              <p className="text-gray-400 leading-7 mt-4">
                Every project should leave your business with a stronger
                position, a better experience and a clearer path to growth.
              </p>
            </div>
            <a
              href="/#contact"
              className="inline-flex justify-center mt-10 px-7 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold hover:scale-105 transition"
            >
              Work With BrandPilot →
            </a>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-blue-400 text-sm uppercase tracking-widest font-semibold">
            What we believe
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-center mt-3">
            Principles behind the work.
          </h2>
          <div className="grid md:grid-cols-3 gap-7 mt-12">
            {values.map((value) => (
              <article
                key={value.icon}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 hover:border-blue-400/30 transition"
              >
                <div className="text-blue-400 font-black text-sm">{value.icon}</div>
                <h3 className="text-xl font-bold mt-5">{value.title}</h3>
                <p className="text-gray-400 leading-7 mt-3">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-4xl mx-auto text-center rounded-3xl border border-white/10 bg-white/[0.04] p-10 md:p-14">
          <h2 className="text-4xl md:text-5xl font-black">
            Ready to take your brand off the ground?
          </h2>
          <p className="text-gray-400 mt-5 leading-7">
            Let&apos;s turn your next idea, redesign or marketing challenge into
            a practical digital growth plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="/#contact"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold hover:scale-105 transition"
            >
              Start a Project
            </a>
            <a
              href="https://calendly.com/thasleenanasreen242/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full border border-blue-400/50 text-blue-300 font-bold hover:bg-blue-500/10 transition"
            >
              Book a Free Call
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BrandPilot. All rights reserved.
      </footer>
    </main>
  );
}
