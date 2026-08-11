"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type Business = {
  name: string;
  industry: string;
  audience: string;
  location: string;
  offer: string;
  goal: string;
  budget: string;
};

const quickTasks = [
  ["🚀", "Campaign Builder", "Create a complete campaign from strategy to execution."],
  ["📱", "Social Content", "Generate posts, reels, captions, hooks and CTAs."],
  ["📅", "Content Calendar", "Build a 30-day marketing content calendar."],
  ["📢", "Ad Campaign", "Create Google or Meta campaign structure and copy."],
  ["📧", "Email Marketing", "Write newsletters, sequences and promotional emails."],
  ["🔎", "SEO Strategy", "Create keywords, content ideas and on-page priorities."],
  ["🕵️", "Competitor Plan", "Turn competitor observations into opportunities."],
  ["📊", "Analytics Coach", "Interpret marketing results and recommend improvements."],
];

const defaultBusiness: Business = { name: "", industry: "", audience: "", location: "", offer: "", goal: "", budget: "" };

export default function MarketingAIPage() {
  const [business, setBusiness] = useState<Business>(defaultBusiness);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof Business, value: string) {
    setBusiness((current) => ({ ...current, [field]: value }));
  }

  async function runTask(event?: FormEvent, task?: string) {
    event?.preventDefault();
    const request = task || prompt;
    if (!request.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");
    setPrompt(request);

    try {
      const response = await fetch("/api/marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: request, business }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Marketing task failed.");
      setAnswer(data.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to complete the task.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black px-5 py-10 text-white md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-medium text-blue-400 hover:text-blue-300">← Back to BrandPilot</Link>

        <header className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-blue-400"><span className="text-2xl">✦</span> AI Employee</div>
            <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">Marketing AI</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">Your AI Marketing Manager. Plan campaigns, create content, build ads, improve SEO, generate emails and turn marketing goals into an actionable growth plan.</p>
          </div>
          <button onClick={() => setShowProfile((value) => !value)} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-blue-400/40">
            <p className="text-sm text-gray-500">Business profile</p>
            <p className="mt-1 font-bold">{business.name || "Set up your business context"}</p>
            <p className="mt-2 text-sm text-blue-400">{showProfile ? "Hide profile ↑" : "Configure AI employee →"}</p>
          </button>
        </header>

        {showProfile && (
          <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="mb-6"><h2 className="text-2xl font-bold">Business Profile</h2><p className="mt-1 text-sm text-gray-500">Give your AI employee context so its work is specific to your business.</p></div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {([["name", "Business name"], ["industry", "Industry"], ["audience", "Target audience"], ["location", "Target location"], ["offer", "Main product / service"], ["goal", "Main marketing goal"], ["budget", "Monthly marketing budget"]] as const).map(([field, label]) => (
                <input key={field} value={business[field]} onChange={(e) => update(field, e.target.value)} placeholder={label} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-blue-500" />
              ))}
            </div>
          </section>
        )}

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickTasks.map(([icon, title, description]) => (
            <button key={title} onClick={() => runTask(undefined, `Act as my marketing manager and ${title.toLowerCase()}. ${description} Create a practical, ready-to-use deliverable with steps and examples.`)} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/5">
              <span className="text-2xl">{icon}</span><h2 className="mt-4 font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-gray-500 group-hover:text-gray-400">{description}</p>
            </button>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-blue-400/20 bg-blue-500/[0.06] p-5 md:p-7">
          <p className="mb-3 text-sm font-semibold text-blue-400">ASK YOUR MARKETING EMPLOYEE</p>
          <form onSubmit={runTask} className="flex flex-col gap-3 md:flex-row">
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g. Create a 30-day marketing plan for my business..." className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/50 px-5 py-4 outline-none placeholder:text-gray-600 focus:border-blue-500" />
            <button disabled={loading || !prompt.trim()} className="rounded-xl bg-blue-500 px-7 py-4 font-bold transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Working…" : "Ask Marketing AI →"}</button>
          </form>
          {error && <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">{error}</p>}
        </section>

        {(loading || answer) && (
          <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-center gap-3"><span className="text-xl">✦</span><h2 className="text-2xl font-bold">Marketing AI Output</h2></div>
            {loading ? <div className="mt-8 flex items-center gap-3 text-gray-400"><span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" /><span>Marketing AI is building your strategy…</span></div> : <article className="prose prose-invert mt-7 max-w-none whitespace-pre-wrap leading-7 text-gray-300">{answer}</article>}
          </section>
        )}

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
          <h2 className="text-2xl font-bold">One AI employee. Your full marketing team.</h2>
          <div className="mt-6 grid gap-4 text-sm text-gray-400 md:grid-cols-3">
            <div><strong className="text-white">Strategy</strong><p className="mt-1">Positioning, audience, offers, campaigns and growth plans.</p></div>
            <div><strong className="text-white">Execution</strong><p className="mt-1">Social posts, ads, emails, SEO content, hooks and creative briefs.</p></div>
            <div><strong className="text-white">Optimization</strong><p className="mt-1">KPIs, performance analysis, experiments and next actions.</p></div>
          </div>
        </section>
      </div>
    </main>
  );
}
