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

    if (
      !websiteUrl.startsWith("http://") &&
      !websiteUrl.startsWith("https://")
    ) {
      websiteUrl = `https://${websiteUrl}`;
    }

    try {
      new URL(websiteUrl);
    } catch {
      setError("Please enter a valid website URL.");
      return;
    }

    setLoading(true);

    // Real audit API will be connected next.
    setTimeout(() => {
      setLoading(false);
      setError(
        "The audit engine is being connected. Your website URL is valid."
      );
    }, 1200);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-20 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-15%] top-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute right-[-10%] top-[15%] h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="absolute bottom-[-15%] left-[35%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <section className="text-center">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300 shadow-[0_0_30px_rgba(37,99,235,0.12)] backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

            AI-Powered Website Audit
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Find Out How Strong
            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Your Website Really Is
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Get a powerful AI-powered analysis of your website's SEO,
            performance, content, branding, and technical health — all in one
            report.
          </p>

          {/* Trust points */}
          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <CheckIcon />
              Free audit
            </span>

            <span className="flex items-center gap-2">
              <CheckIcon />
              AI-powered insights
            </span>

            <span className="flex items-center gap-2">
              <CheckIcon />
              Actionable recommendations
            </span>
          </div>
        </section>

        {/* Audit Form */}
        <section className="mx-auto mt-14 max-w-3xl">
          <div className="group relative">
            {/* Gradient glow */}
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-blue-600/50 via-cyan-400/30 to-purple-600/50 opacity-70 blur-sm transition duration-500 group-hover:opacity-100" />

            <div className="relative rounded-3xl border border-white/10 bg-[#0a111f]/90 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="website"
                  className="mb-3 block text-sm font-medium text-slate-300"
                >
                  Enter your website URL
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                      <GlobeIcon />
                    </div>

                    <input
                      id="website"
                      type="text"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="https://yourwebsite.com"
                      autoComplete="url"
                      className="h-14 w-full rounded-xl border border-white/10 bg-black/30 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:bg-black/40 focus:ring-2 focus:ring-blue-500/10"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="relative h-14 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 px-7 font-semibold text-white shadow-[0_10px_35px_rgba(37,99,235,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_45px_rgba(37,99,235,0.35)] disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[180px]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Spinner />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze Website
                          <ArrowIcon />
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {error && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                    <AlertIcon />
                    <span>{error}</span>
                  </div>
                )}

                <p className="mt-4 text-center text-xs text-slate-600">
                  No credit card required • Your website URL is only used for
                  the audit
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* What We Analyze */}
        <section className="mt-24">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Complete Analysis
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Everything Your Website
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {" "}
                Needs to Grow
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              BrandPilot checks the areas that directly affect your website's
              visibility, credibility, user experience, and growth potential.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AuditCard
              icon={<SearchIcon />}
              title="SEO"
              description="Analyze titles, meta descriptions, headings, keywords, indexing signals, and search optimization opportunities."
              accent="blue"
            />

            <AuditCard
              icon={<SpeedIcon />}
              title="Performance"
              description="Identify performance signals, page-loading issues, technical bottlenecks, and optimization opportunities."
              accent="cyan"
            />

            <AuditCard
              icon={<FileIcon />}
              title="Content"
              description="Review content structure, messaging, readability, relevance, and opportunities to improve conversions."
              accent="purple"
            />

            <AuditCard
              icon={<SparkleIcon />}
              title="Brand"
              description="Evaluate your brand presentation, messaging, consistency, credibility, and digital presence."
              accent="blue"
            />

            <AuditCard
              icon={<CodeIcon />}
              title="Technical"
              description="Check important technical website signals including metadata, links, structure, and configuration."
              accent="cyan"
            />

            <AuditCard
              icon={<BrainIcon />}
              title="AI Recommendations"
              description="Turn audit findings into prioritized, practical recommendations designed to help your business grow."
              accent="purple"
            />
          </div>
        </section>

        {/* Score Preview */}
        <section className="mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a111f]/80 p-8 backdrop-blur-xl sm:p-10">
            <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-[100px]" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-300">
                  Your Growth Snapshot
                </div>

                <h2 className="text-3xl font-bold sm:text-4xl">
                  One audit.
                  <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                    Clear next steps.
                  </span>
                </h2>

                <p className="mt-4 max-w-xl leading-7 text-slate-500">
                  Your final report will combine technical signals with AI
                  analysis to show what is working, what needs attention, and
                  what you should prioritize first.
                </p>
              </div>

              {/* Score visual */}
              <div className="relative mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-cyan-400/5 to-purple-500/10 shadow-[0_0_70px_rgba(37,99,235,0.12)]">
                <div className="absolute inset-3 rounded-full border border-white/5" />

                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    AI
                  </div>

                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Score
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Ready?
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
              See what's holding your
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                website back.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-slate-500">
              Run your free BrandPilot AI audit and discover your highest
              impact opportunities.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ------------------------------------------------ */
/* Audit Card                                       */
/* ------------------------------------------------ */

function AuditCard({
  icon,
  title,
  description,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: "blue" | "cyan" | "purple";
}) {
  const accentStyles = {
    blue: {
      icon: "border-blue-400/20 bg-blue-500/10 text-blue-300",
      glow: "group-hover:border-blue-400/30",
    },
    cyan: {
      icon: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
      glow: "group-hover:border-cyan-400/30",
    },
    purple: {
      icon: "border-purple-400/20 bg-purple-500/10 text-purple-300",
      glow: "group-hover:border-purple-400/30",
    },
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.04] ${accentStyles[accent].glow}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 transition group-hover:opacity-100" />

      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border ${accentStyles[accent].icon}`}
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* Icons                                            */
/* ------------------------------------------------ */

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="text-slate-500"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />

      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.3 3.5 2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.5a2 2 0 0 0-3.4 0Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 14a8 8 0 1 1 16 0" />
      <path d="m12 12 4-4" />
      <path d="M6 18h12" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4Z" />
      <path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6Z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m8 9-4 3 4 3" />
      <path d="m16 9 4 3-4 3" />
      <path d="m14 5-4 14" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M9.5 4.5a3.5 3.5 0 0 0-6 2.5v1a3.5 3.5 0 0 0 0 7v1a3.5 3.5 0 0 0 6 2.5" />
      <path d="M14.5 4.5a3.5 3.5 0 0 1 6 2.5v1a3.5 3.5 0 0 1 0 7v1a3.5 3.5 0 0 1-6 2.5" />
      <path d="M9.5 4.5v15" />
      <path d="M14.5 4.5v15" />
      <path d="M3.5 9h6" />
      <path d="M14.5 9h6" />
      <path d="M3.5 15h6" />
      <path d="M14.5 15h6" />
    </svg>
  );
}
