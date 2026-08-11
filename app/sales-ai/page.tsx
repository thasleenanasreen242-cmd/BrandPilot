"use client";

import Link from "next/link";

const tools = ["Lead qualification", "Customer replies", "Follow-up ideas", "Booking assistance"];

export default function SalesAIPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-blue-400 hover:text-blue-300">← Back to BrandPilot</Link>
        <div className="mt-12 max-w-3xl">
          <p className="uppercase tracking-[0.3em] text-blue-400 text-sm">AI Employee</p>
          <h1 className="text-5xl md:text-7xl font-black mt-4">Sales AI</h1>
          <p className="text-xl text-gray-400 mt-6 leading-8">Your AI Sales Assistant for qualifying leads, preparing customer responses, and improving conversions.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {tools.map((tool) => <div key={tool} className="rounded-2xl border border-white/10 bg-white/5 p-6"><span className="text-blue-400">✓</span><span className="ml-3 font-semibold">{tool}</span></div>)}
        </div>
        <div className="mt-12 rounded-3xl border border-blue-400/20 bg-blue-500/10 p-8">
          <h2 className="text-2xl font-bold">Want more qualified leads?</h2>
          <p className="text-gray-400 mt-3">Book a free call to discuss your sales funnel and conversion goals.</p>
          <a href="https://calendly.com/thasleenanasreen242/30min" target="_blank" rel="noopener noreferrer" className="inline-block mt-6 rounded-full bg-blue-500 px-7 py-3 font-bold hover:bg-blue-600 transition">Book a Free Call →</a>
        </div>
      </div>
    </main>
  );
}
