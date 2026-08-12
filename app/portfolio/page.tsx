import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BrandPilot Portfolio | Web Design, SEO & Digital Marketing",
  description: "Explore BrandPilot projects in web design, SEO, branding, social media marketing, and AI-powered digital marketing built for business growth.",
  alternates: { canonical: "https://www.brandpilotcloud.com/portfolio" },
};

export default function PortfolioPage() {
  const projects = [
    {
      category: "Website Design",
      title: "Modern D2C Brand Website",
      description: "A conversion-focused, mobile-first website designed to turn product discovery into enquiries and sales.",
      tags: ["Next.js", "UI/UX", "SEO"],
      accent: "from-blue-500/30 to-cyan-400/10",
    },
    {
      category: "Digital Marketing",
      title: "Growth Marketing System",
      description: "A connected SEO, content and social strategy built to create consistent organic visibility and qualified traffic.",
      tags: ["SEO", "Content", "Social"],
      accent: "from-violet-500/30 to-fuchsia-400/10",
    },
    {
      category: "Branding",
      title: "Startup Brand Identity",
      description: "A complete visual direction with a sharper digital identity, messaging system and conversion-ready brand assets.",
      tags: ["Brand Strategy", "Identity", "Creative"],
      accent: "from-emerald-500/30 to-teal-400/10",
    },
    {
      category: "SEO & Performance",
      title: "Website Visibility Upgrade",
      description: "Technical improvements, on-page SEO and content structure designed to make a website easier to discover and use.",
      tags: ["Technical SEO", "On-page SEO", "Analytics"],
      accent: "from-orange-500/30 to-amber-400/10",
    },
    {
      category: "Social Media",
      title: "Content-to-Conversion System",
      description: "A social content framework connecting attention-grabbing creative with clear calls to action and measurable goals.",
      tags: ["Instagram", "Content", "Conversion"],
      accent: "from-pink-500/30 to-rose-400/10",
    },
    {
      category: "AI Marketing",
      title: "AI-Powered Marketing Workflow",
      description: "A practical AI workflow for research, content ideation, campaign planning and faster marketing execution.",
      tags: ["AI", "Automation", "Strategy"],
      accent: "from-cyan-500/30 to-blue-400/10",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 blur-[120px] rounded-full" />
      </div>
      <header className="relative z-10 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="font-black text-xl tracking-tight">Brand<span className="text-blue-400">Pilot</span></a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-gray-400">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/portfolio" className="text-white">Portfolio</a>
            <a href="/about" className="hover:text-white transition">About</a>
            <a href="/blog" className="hover:text-white transition">Blog</a>
            <a href="/#contact" className="hover:text-white transition">Contact</a>
          </nav>
          <a href="https://calendly.com/thasleenanasreen242/30min" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-sm hover:scale-105 transition">Book a Free Call</a>
        </div>
      </header>
      <section className="relative z-10 px-6 pt-24 pb-16"><div className="max-w-6xl mx-auto"><p className="uppercase tracking-[0.4em] text-blue-400 text-xs font-semibold">Selected Work</p><h1 className="text-5xl md:text-7xl font-black mt-5 leading-tight max-w-4xl">Work built to move<span className="text-blue-400"> brands forward.</span></h1><p className="text-gray-400 text-lg md:text-xl leading-8 max-w-2xl mt-6">Websites, branding and marketing systems designed around one goal: turning digital attention into real business growth.</p></div></section>
      <section className="relative z-10 px-6 pb-24"><div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-7">{projects.map((project)=><article key={project.title} className="group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] hover:border-blue-400/30 hover:-translate-y-1 transition-all"><div className={`h-44 bg-gradient-to-br ${project.accent} relative`}><div className="absolute inset-5 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm"><div className="absolute top-5 left-5 text-xs uppercase tracking-widest text-gray-300">BrandPilot / {project.category}</div><div className="absolute bottom-5 left-5 right-5"><div className="h-2 w-2/3 rounded-full bg-white/20" /><div className="h-2 w-1/2 rounded-full bg-white/10 mt-2" /></div></div></div><div className="p-7"><p className="text-xs uppercase tracking-widest text-blue-400 font-semibold">{project.category}</p><h2 className="text-2xl font-bold mt-2">{project.title}</h2><p className="text-gray-400 text-sm leading-7 mt-3">{project.description}</p><div className="flex flex-wrap gap-2 mt-5">{project.tags.map(tag=><span key={tag} className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20">{tag}</span>)}</div></div></article>)}</div></section>
      <section className="relative z-10 px-6 pb-24"><div className="max-w-4xl mx-auto rounded-3xl border border-blue-400/20 bg-blue-500/[0.06] p-10 md:p-14 text-center"><p className="text-blue-400 text-sm uppercase tracking-[0.3em] font-semibold">Your brand next?</p><h2 className="text-4xl md:text-5xl font-black mt-4">Let&apos;s build something that gets noticed.</h2><p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-7">Tell us what you&apos;re trying to achieve and we&apos;ll map out the clearest digital path forward.</p><a href="/#contact" className="inline-flex mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold hover:scale-105 transition">Start Your Project →</a></div></section>
      <footer className="relative z-10 border-t border-white/10 py-8 px-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} BrandPilot. All rights reserved.</footer>
    </main>
  );
}
