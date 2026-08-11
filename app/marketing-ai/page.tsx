"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type Business = { name: string; industry: string; audience: string; location: string; offer: string; goal: string; budget: string };
type Campaign = { product: string; audience: string; goal: string; duration: string; budget: string; channels: string };

const tasks = [
  ["🚀", "Campaign Builder", "Build a complete campaign with strategy, ads, content, email, SEO and KPIs."],
  ["📱", "Social Content", "Generate posts, reels, captions, hooks and CTAs."],
  ["📅", "Content Calendar", "Create a practical 30-day publishing calendar."],
  ["📢", "Ad Campaign", "Build Meta and Google campaign structures and copy."],
  ["📧", "Email Marketing", "Create newsletters, nurture and promotional sequences."],
  ["🔎", "SEO Strategy", "Find content opportunities and on-page priorities."],
  ["🕵️", "Competitor Plan", "Turn competitor observations into differentiation ideas."],
  ["📊", "Analytics Coach", "Interpret metrics and decide what to improve next."],
];
const blankBusiness: Business = { name: "", industry: "", audience: "", location: "", offer: "", goal: "", budget: "" };
const blankCampaign: Campaign = { product: "", audience: "", goal: "", duration: "30 days", budget: "", channels: "Instagram, Facebook, Google, Email, SEO" };

export default function MarketingAIPage() {
  const [business, setBusiness] = useState(blankBusiness);
  const [campaign, setCampaign] = useState(blankCampaign);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [activeTask, setActiveTask] = useState("Marketing Command Center");

  async function ask(request: string, endpoint = "/api/marketing", payload: Record<string, unknown> = {}) {
    if (!request.trim()) return;
    setLoading(true); setError(""); setAnswer("");
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: request, business, ...payload }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Marketing task failed.");
      setAnswer(data.answer || "No response returned.");
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to complete the task."); }
    finally { setLoading(false); }
  }

  function submitPrompt(e: FormEvent) { e.preventDefault(); setActiveTask("Custom Marketing Task"); ask(prompt); }
  function runTask(title: string) {
    setActiveTask(title);
    const request = title === "Campaign Builder"
      ? "Build a complete marketing campaign using the campaign details below."
      : `Act as my senior marketing manager and create a ready-to-use ${title.toLowerCase()} deliverable. Include strategy, concrete examples, execution steps and KPIs where relevant.`;
    if (title === "Campaign Builder") setCampaignOpen(true);
    else ask(request);
  }

  function buildCampaign(e: FormEvent) {
    e.preventDefault();
    setActiveTask("Campaign Builder");
    ask("Build my complete campaign.", "/api/marketing/campaign", { campaign });
  }

  const updateBusiness = (field: keyof Business, value: string) => setBusiness((v) => ({ ...v, [field]: value }));
  const updateCampaign = (field: keyof Campaign, value: string) => setCampaign((v) => ({ ...v, [field]: value }));

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black px-5 py-10 text-white md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-medium text-blue-400 hover:text-blue-300">← Back to BrandPilot</Link>

        <header className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-blue-400"><span className="text-2xl">✦</span> AI Employee · Marketing</div>
            <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">Your AI Marketing Manager</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">One intelligent workspace for strategy, content, SEO, ads, email campaigns, analytics and growth.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3">
            {[['8','AI tools'],['24/7','Available'],['1','Marketing team']].map(([value,label]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"><div className="text-xl font-black text-blue-400">{value}</div><div className="mt-1 text-xs text-gray-500">{label}</div></div>)}
          </div>
        </header>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_300px]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs uppercase tracking-widest text-blue-400">Command Center</p><h2 className="mt-2 text-2xl font-bold">What should your marketing employee do?</h2></div><button onClick={() => setProfileOpen(!profileOpen)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 hover:border-blue-400/40">{profileOpen ? "Hide business profile" : "Set business profile"}</button></div>
            {profileOpen && <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{([['name','Business name'],['industry','Industry'],['audience','Target audience'],['location','Target location'],['offer','Main product / service'],['goal','Main marketing goal'],['budget','Monthly budget']] as const).map(([f,l]) => <input key={f} value={business[f]} onChange={(e) => updateBusiness(f,e.target.value)} placeholder={l} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-gray-600 focus:border-blue-500" />)}</div>}
            <form onSubmit={submitPrompt} className="mt-7 flex flex-col gap-3 md:flex-row"><input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask: Create a launch campaign for my new product..." className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/50 px-5 py-4 outline-none placeholder:text-gray-600 focus:border-blue-500" /><button disabled={loading || !prompt.trim()} className="rounded-xl bg-blue-500 px-7 py-4 font-bold hover:bg-blue-600 disabled:opacity-50">{loading ? "Working…" : "Ask AI →"}</button></form>
          </section>
          <aside className="rounded-3xl border border-blue-400/20 bg-blue-500/5 p-6"><p className="text-xs uppercase tracking-widest text-blue-400">AI Employee</p><p className="mt-3 text-3xl font-black">Marketing OS</p><p className="mt-3 text-sm leading-6 text-gray-400">Strategy → execution → measurement → optimization.</p><div className="mt-6 space-y-3 text-sm text-gray-300"><p>✓ Strategy planning</p><p>✓ Content production</p><p>✓ Paid advertising</p><p>✓ SEO & growth</p><p>✓ Email marketing</p><p>✓ Analytics guidance</p></div></aside>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tasks.map(([icon,title,description]) => <button key={title} onClick={() => runTask(title)} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/5"><span className="text-2xl">{icon}</span><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-500 group-hover:text-gray-400">{description}</p></button>)}
        </section>

        {campaignOpen && <section className="mt-8 rounded-3xl border border-blue-400/20 bg-blue-500/5 p-6 md:p-8"><div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-widest text-blue-400">Campaign Builder</p><h2 className="mt-2 text-2xl font-bold">Build your campaign</h2></div><button onClick={() => setCampaignOpen(false)} className="text-gray-500 hover:text-white">✕</button></div><form onSubmit={buildCampaign} className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{([['product','Product / service'],['audience','Target audience'],['goal','Campaign goal'],['duration','Duration'],['budget','Campaign budget'],['channels','Channels']] as const).map(([f,l]) => <input key={f} value={campaign[f]} onChange={(e) => updateCampaign(f,e.target.value)} placeholder={l} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-gray-600 focus:border-blue-500" />)}<button disabled={loading} className="rounded-xl bg-blue-500 px-6 py-3 font-bold md:col-span-2 lg:col-span-3">{loading ? "Building campaign…" : "Generate Complete Campaign →"}</button></form></section>}

        {(loading || answer || error) && <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"><div className="flex items-center gap-3"><span className="text-xl text-blue-400">✦</span><h2 className="text-2xl font-bold">{activeTask}</h2></div>{error ? <p className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">{error}</p> : loading ? <div className="mt-7 flex items-center gap-3 text-gray-400"><span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" /> Marketing AI is working…</div> : <article className="mt-7 whitespace-pre-wrap leading-7 text-gray-300">{answer}</article>}</section>}

        <section className="mt-10 grid gap-4 md:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><p className="text-blue-400">01</p><h3 className="mt-2 font-bold">Plan</h3><p className="mt-2 text-sm text-gray-500">Build strategy, audience, positioning and offers.</p></div><div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><p className="text-blue-400">02</p><h3 className="mt-2 font-bold">Execute</h3><p className="mt-2 text-sm text-gray-500">Create content, ads, emails and SEO actions.</p></div><div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><p className="text-blue-400">03</p><h3 className="mt-2 font-bold">Optimize</h3><p className="mt-2 text-sm text-gray-500">Measure KPIs, test ideas and decide what to improve.</p></div></section>
      </div>
    </main>
  );
}
