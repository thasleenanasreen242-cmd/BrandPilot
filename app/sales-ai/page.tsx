"use client";

import Link from "next/link";

const capabilities = [
  {
    icon: "🎯",
    title: "Qualify Leads",
    description: "Identify high-intent prospects, understand their needs, and prioritize the conversations most likely to convert.",
  },
  {
    icon: "💬",
    title: "Handle Sales Questions",
    description: "Create clear, helpful responses to common product, service, pricing, and process questions.",
  },
  {
    icon: "🔁",
    title: "Follow Up",
    description: "Turn missed opportunities into structured follow-ups with practical next-step messaging.",
  },
  {
    icon: "📅",
    title: "Drive Bookings",
    description: "Guide interested prospects toward the right next step, including booking a strategy call with BrandPilot.",
  },
];

const workflow = [
  ["01", "Capture", "Start with the visitor's question, goal, or buying intent."],
  ["02", "Qualify", "Understand what they need and separate curiosity from genuine sales opportunities."],
  ["03", "Respond", "Give a useful, brand-aligned answer without unnecessary friction."],
  ["04", "Convert", "Move qualified prospects toward a call, enquiry, or next action."],
];

export default function SalesAIPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-hidden">
      <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <nav className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight">BrandPilot<span className="text-blue-400">.</span></Link>
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition">← Back to BrandPilot</Link>
        </div>
      </nav>

      <section className="relative z-10 px-6 pt-20 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_.85fr] gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> AI Employee · Sales
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mt-7">
              Turn more conversations into <span className="text-blue-400">customers.</span>
            </h1>
            <p className="text-xl text-gray-400 mt-7 max-w-2xl leading-8">
              Sales AI helps your business qualify leads, answer sales questions, follow up with prospects, and guide high-intent visitors toward the next step.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a href="https://calendly.com/thasleenanasreen242/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-7 py-4 font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition">
                Book a Free Strategy Call →
              </a>
              <Link href="/ai-employees" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-4 font-semibold hover:bg-white/10 transition">
                Explore AI Employees
              </Link>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-blue-500/10">
            <div className="flex items-center gap-4 border-b border-white/10 pb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">🤖</div>
              <div>
                <p className="font-bold">Sales AI</p>
                <p className="text-sm text-emerald-400">Ready to qualify leads</p>
              </div>
            </div>
            <div className="space-y-4 py-6">
              <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-blue-500/20 border border-blue-400/20 p-4 text-sm text-gray-200">
                I need a website for my business. How much does it cost?
              </div>
              <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-white/5 border border-white/10 p-4 text-sm text-gray-300 leading-6">
                I can help with that. BrandPilot has website packages starting at $149. What type of business do you run, and are you looking for a new website or a redesign?
              </div>
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">Lead signal</p>
                <p className="text-sm text-gray-300 mt-2">Buying intent detected · Qualification in progress</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-black/30 border border-white/10 p-4"><p className="text-xs text-gray-500">Focus</p><p className="font-semibold mt-1">Lead qualification</p></div>
              <div className="rounded-xl bg-black/30 border border-white/10 p-4"><p className="text-xs text-gray-500">Next step</p><p className="font-semibold mt-1">Book a call</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.3em] text-blue-400 text-sm font-semibold">What Sales AI does</p>
            <h2 className="text-4xl md:text-5xl font-black mt-3">A sales teammate that works around the clock.</h2>
            <p className="text-gray-400 mt-5 leading-7">Give visitors a faster path from question to action while keeping your human team focused on the opportunities that matter most.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {capabilities.map((item) => (
              <div key={item.title} className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-xl font-bold mt-5">{item.title}</h3>
                <p className="text-gray-400 mt-3 leading-7">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="uppercase tracking-[0.3em] text-blue-400 text-sm font-semibold">The workflow</p>
            <h2 className="text-4xl md:text-5xl font-black mt-3">From visitor to qualified opportunity.</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5 mt-12">
            {workflow.map(([number, title, description]) => (
              <div key={number} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <span className="text-blue-400 font-black text-sm">{number}</span>
                <h3 className="text-xl font-bold mt-4">{title}</h3>
                <p className="text-gray-400 text-sm leading-6 mt-3">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-blue-400/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 md:p-12 text-center">
          <p className="text-blue-300 font-semibold">Ready to improve your sales process?</p>
          <h2 className="text-3xl md:text-4xl font-black mt-3">Build a smarter path from lead to customer.</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Talk to BrandPilot about how Sales AI can fit into your website and lead-generation workflow.</p>
          <a href="https://calendly.com/thasleenanasreen242/30min" target="_blank" rel="noopener noreferrer" className="inline-flex mt-8 rounded-full bg-white text-black px-8 py-4 font-bold hover:scale-105 transition">Book a Free Call →</a>
        </div>
      </section>
    </main>
  );
}
