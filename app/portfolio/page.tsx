import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BrandPilot Portfolio | Web Design, SEO & Digital Marketing",
  description: "Explore BrandPilot projects in web design, SEO, branding, social media marketing, and AI-powered digital marketing built for business growth.",
  alternates: { canonical: "https://www.brandpilotcloud.com/portfolio" },
};

export default function PortfolioPage() {
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
      <section className="relative z-10 px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <article className="overflow-hidden rounded-3xl border border-blue-400/25 bg-gradient-to-br from-blue-500/[0.10] via-white/[0.04] to-cyan-500/[0.06]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-8 md:p-12">
                <p className="text-xs uppercase tracking-[0.35em] text-blue-300 font-semibold">Featured Client Project · UAE</p>
                <h2 className="text-4xl md:text-5xl font-black mt-4">SensCore</h2>
                <p className="text-blue-200 font-medium mt-2">Industrial technology · Instrumentation · Automation · IIoT</p>
                <p className="text-gray-300 leading-8 mt-6">A digital platform for a UAE-based industrial solutions provider, presenting its engineering capabilities across instrumentation, automation and connectivity, valves, analysers, pumps and engineered services.</p>
                <p className="text-gray-400 leading-7 mt-4">The website brings SensCore’s positioning, product and service portfolio, industry applications, global brand ecosystem and contact pathways together in a clear, professional experience built for industrial decision-makers.</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {["Corporate Website","Industrial B2B","UI/UX","Next.js"].map(tag=><span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-200 border border-blue-400/20">{tag}</span>)}
                </div>
                <a href="https://senscoretech.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 font-bold hover:scale-105 transition">Take the tour <span aria-hidden="true">↗</span></a>
              </div>
              <a href="https://senscoretech.com" target="_blank" rel="noopener noreferrer" className="min-h-[280px] lg:min-h-full bg-gradient-to-br from-slate-900 via-blue-950 to-black p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
                <div className="text-sm tracking-[0.35em] text-blue-200 font-bold">SENSCORE</div>
                <div>
                  <p className="text-3xl md:text-4xl font-black leading-tight">Industrial systems that <span className="text-cyan-300">sense, decide, and act.</span></p>
                  <p className="text-sm text-gray-400 mt-4">Engineering intelligence for real operating environments.</p>
                </div>
                <p className="text-xs uppercase tracking-widest text-blue-300">senscoretech.com ↗</p>
              </a>
            </div>
          </article>
        </div>
      </section>
      <section className="relative z-10 px-6 pb-24"><div className="max-w-4xl mx-auto rounded-3xl border border-blue-400/20 bg-blue-500/[0.06] p-10 md:p-14 text-center"><p className="text-blue-400 text-sm uppercase tracking-[0.3em] font-semibold">Your brand next?</p><h2 className="text-4xl md:text-5xl font-black mt-4">Let&apos;s build something that gets noticed.</h2><p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-7">Tell us what you&apos;re trying to achieve and we&apos;ll map out the clearest digital path forward.</p><a href="/#contact" className="inline-flex mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold hover:scale-105 transition">Start Your Project →</a></div></section>
      <footer className="relative z-10 border-t border-white/10 py-8 px-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} BrandPilot. All rights reserved.</footer>
    </main>
  );
}
