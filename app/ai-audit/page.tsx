"use client";

import { FormEvent, useState } from "react";

export default function AIAuditPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (!url.trim()) {
      setError("Please enter your website URL.");
      return;
    }

    let websiteUrl = url.trim();

    if (!websiteUrl.startsWith("http://") && !websiteUrl.startsWith("https://")) {
      websiteUrl = `https://${websiteUrl}`;
    }

    try {
      new URL(websiteUrl);
    } catch {
      setError("Please enter a valid website URL.");
      return;
    }

    setLoading(true);

    // Backend will be connected in the next step.
    setTimeout(() => {
      setLoading(false);
      setError("Audit engine is being connected. Please try again shortly.");
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#050b14] text-white px-6 py-20">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="text-center">
          <div className="mb-5 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            AI-Powered Website Audit
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Find Out How Strong
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Your Website Really Is
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Enter your website URL and let BrandPilot analyze your SEO,
            performance, content, branding, and overall digital presence.
          </p>
        </div>

        {/* Audit Form */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
          <form onSubmit={handleSubmit}>

            <label
              htmlFor="website"
              className="mb-3 block text-sm font-medium text-gray-300"
            >
              Website URL
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="website"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="h-14 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none placeholder:text-gray-600 focus:border-blue-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="h-14 rounded-xl bg-blue-600 px-7 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Analyzing..." : "Analyze Website"}
              </button>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-400">
                {error}
              </p>
            )}
          </form>
        </div>

        {/* What We Analyze */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <AuditCard
            title="SEO"
            description="Meta tags, headings, keywords and search visibility."
          />

          <AuditCard
            title="Performance"
            description="Page speed, technical issues and performance signals."
          />

          <AuditCard
            title="Content"
            description="Content quality, structure and optimization opportunities."
          />

          <AuditCard
            title="Brand"
            description="Branding, messaging and overall digital presence."
          />

          <AuditCard
            title="Technical"
            description="Important technical and website configuration checks."
          />

          <AuditCard
            title="AI Recommendations"
            description="Actionable recommendations generated from your audit."
          />

        </div>

      </div>
    </main>
  );
}

function AuditCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-gray-400">
        {description}
      </p>
    </div>
  );
}
