"use client";

import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  Globe2,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";
import { FormEvent, useState } from "react";

type AuditResult = {
  success: boolean;
  website: {
    url: string;
    hostname: string;
    status: number;
  };
  scores: {
    overall: number;
    seo: number;
    performance: number;
    content: number;
    brand: number;
    technical: number;
  };
  audit: {
    title: string;
    titleLength: number;
    description: string;
    descriptionLength: number;
    h1: number;
    h2: number;
    images: number;
    imagesMissingAlt: number;
    links: number;
    wordCount: number;
    canonical: boolean;
    viewport: boolean;
    robots: boolean;
    sitemap: boolean;
    https: boolean;
    status: number;
  };
  ai: {
    summary?: string;
    recommendations?: {
      priority: "high" | "medium" | "low";
      category: string;
      title: string;
      description: string;
    }[];
  };
};

function scoreLabel(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Needs Improvement";
  return "Critical";
}

function scoreRing(score: number) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  return {
    radius,
    circumference,
    progress,
  };
}

export default function AIAuditPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");
    setResult(null);

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

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: websiteUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to complete the website audit."
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to complete the website audit."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAudit = () => {
    setResult(null);
    setError("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050b14] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute left-1/2 top-[-300px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-[-300px] right-[-200px] h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        {!result ? (
          <AuditLanding
            url={url}
            setUrl={setUrl}
            loading={loading}
            error={error}
            onSubmit={handleSubmit}
          />
        ) : (
          <AuditResults result={result} onReset={resetAudit} />
        )}
      </div>
    </main>
  );
}

function AuditLanding({
  url,
  setUrl,
  loading,
  error,
  onSubmit,
}: {
  url: string;
  setUrl: (value: string) => void;
  loading: boolean;
  error: string;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
          <Sparkles className="h-4 w-4" />
          AI-Powered Website Audit
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Find Out How Strong
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Your Website Really Is
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
          Get an AI-powered analysis of your website's SEO, performance,
          content, branding and technical health — with actionable
          recommendations from BrandPilot AI.
        </p>
      </section>

      {/* Form */}
      <section className="mx-auto mt-12 max-w-3xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-2 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-white/5 bg-[#07101d]/90 p-5 sm:p-7"
          >
            <label
              htmlFor="website"
              className="mb-3 block text-sm font-medium text-slate-300"
            >
              Enter your website URL
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Globe2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <input
                  id="website"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  disabled={loading}
                  className="h-14 w-full rounded-xl border border-white/10 bg-black/30 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10 disabled:opacity-60"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:from-blue-500 hover:to-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Website
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <p className="mt-4 text-xs text-slate-500">
              Free website analysis • No credit card required
            </p>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto mt-20 max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            What We Analyze
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            A complete digital health check
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AuditCard
            icon={<Search />}
            title="SEO"
            description="Meta tags, headings, search visibility and on-page SEO signals."
          />

          <AuditCard
            icon={<Zap />}
            title="Performance"
            description="Technical signals and website factors that can affect user experience."
          />

          <AuditCard
            icon={<BarChart3 />}
            title="Content"
            description="Content structure, page depth and optimization opportunities."
          />

          <AuditCard
            icon={<Target />}
            title="Brand"
            description="Messaging, positioning and digital brand presence."
          />

          <AuditCard
            icon={<ShieldCheck />}
            title="Technical"
            description="HTTPS, viewport, sitemap, robots and other technical checks."
          />

          <AuditCard
            icon={<Sparkles />}
            title="AI Recommendations"
            description="Actionable recommendations generated from your website data."
          />
        </div>
      </section>
    </>
  );
}

function AuditCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-blue-500/[0.04]">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/10 text-blue-300">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}

function AuditResults({
  result,
  onReset,
}: {
  result: AuditResult;
  onReset: () => void;
}) {
  const { scores, audit, website, ai } = result;

  const checks = [
    {
      name: "HTTPS enabled",
      passed: audit.https,
    },
    {
      name: "Page title",
      passed: Boolean(audit.title),
    },
    {
      name: "Meta description",
      passed: Boolean(audit.description),
    },
    {
      name: "H1 heading",
      passed: audit.h1 === 1,
    },
    {
      name: "Canonical URL",
      passed: audit.canonical,
    },
    {
      name: "Viewport configuration",
      passed: audit.viewport,
    },
    {
      name: "Robots configuration",
      passed: audit.robots,
    },
    {
      name: "XML sitemap",
      passed: audit.sitemap,
    },
  ];

  const passedChecks = checks.filter((check) => check.passed).length;

  return (
    <section>
      {/* Results Header */}
      <div className="flex flex-col gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            Audit completed
          </div>

          <h1 className="text-3xl font-bold sm:text-5xl">
            Website Audit Report
          </h1>

          <p className="mt-3 flex items-center gap-2 break-all text-sm text-slate-400">
            <Globe2 className="h-4 w-4 shrink-0" />
            {website.url}
          </p>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-blue-500/30 hover:bg-white/[0.07]"
        >
          <Search className="h-4 w-4" />
          Audit another website
        </button>
      </div>

      {/* Overall Score */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-white/[0.03] to-cyan-500/5 p-8">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-medium text-slate-400">
              Overall Website Score
            </p>

            <div className="mt-8 flex justify-center">
              <ScoreCircle score={scores.overall} large />
            </div>

            <div className="mt-6 text-center">
              <p className="text-2xl font-bold">
                {scoreLabel(scores.overall)}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Based on BrandPilot's website audit signals
              </p>
            </div>
          </div>
        </div>

        {/* Score Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <ScoreCard
            icon={<Search />}
            title="SEO"
            score={scores.seo}
          />

          <ScoreCard
            icon={<Gauge />}
            title="Performance"
            score={scores.performance}
          />

          <ScoreCard
            icon={<TrendingUp />}
            title="Content"
            score={scores.content}
          />

          <ScoreCard
            icon={<Target />}
            title="Brand"
            score={scores.brand}
          />

          <ScoreCard
            icon={<ShieldCheck />}
            title="Technical"
            score={scores.technical}
          />

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <p className="text-sm text-slate-400">HTTP Status</p>

            <div className="mt-5 flex items-center gap-3">
              {website.status >= 200 && website.status < 400 ? (
                <CheckCircle2 className="h-7 w-7 text-emerald-400" />
              ) : (
                <XCircle className="h-7 w-7 text-red-400" />
              )}

              <span className="text-2xl font-bold">
                {website.status}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Server response
            </p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-10">
        <SectionTitle
          eyebrow="Website Signals"
          title="Key audit metrics"
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            label="Page title"
            value={audit.title ? "Present" : "Missing"}
            good={Boolean(audit.title)}
          />

          <Metric
            label="Meta description"
            value={
              audit.description
                ? `${audit.descriptionLength} chars`
                : "Missing"
            }
            good={Boolean(audit.description)}
          />

          <Metric
            label="H1 headings"
            value={String(audit.h1)}
            good={audit.h1 === 1}
          />

          <Metric
            label="H2 headings"
            value={String(audit.h2)}
            good={audit.h2 > 0}
          />

          <Metric
            label="Images"
            value={String(audit.images)}
            good={audit.images > 0}
          />

          <Metric
            label="Missing alt text"
            value={String(audit.imagesMissingAlt)}
            good={audit.imagesMissingAlt === 0}
          />

          <Metric
            label="Links"
            value={String(audit.links)}
            good={audit.links >= 3}
          />

          <Metric
            label="Word count"
            value={String(audit.wordCount)}
            good={audit.wordCount >= 600}
          />
        </div>
      </div>

      {/* Checks */}
      <div className="mt-12">
        <SectionTitle
          eyebrow="Technical Health"
          title={`${passedChecks}/${checks.length} checks passed`}
        />

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
          {checks.map((check) => (
            <div
              key={check.name}
              className="flex items-center justify-between border-b border-white/5 px-5 py-4 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                {check.passed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}

                <span className="text-sm text-slate-200">
                  {check.name}
                </span>
              </div>

              <span
                className={
                  check.passed
                    ? "text-xs font-medium text-emerald-400"
                    : "text-xs font-medium text-red-400"
                }
              >
                {check.passed ? "Passed" : "Needs attention"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI */}
      <div className="mt-12">
        <div className="overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/[0.08] via-white/[0.025] to-cyan-500/[0.05]">
          <div className="border-b border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-400">
                  BrandPilot AI
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  AI Recommendations
                </h2>
              </div>
            </div>

            {ai.summary && (
              <p className="mt-6 max-w-4xl text-sm leading-7 text-slate-300">
                {ai.summary}
              </p>
            )}
          </div>

          <div className="divide-y divide-white/5">
            {ai.recommendations &&
            ai.recommendations.length > 0 ? (
              ai.recommendations.map((recommendation, index) => (
                <Recommendation
                  key={`${recommendation.title}-${index}`}
                  index={index + 1}
                  recommendation={recommendation}
                />
              ))
            ) : (
              <div className="p-8 text-sm text-slate-400">
                No AI recommendations were returned. The technical
                audit is still available above.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/15 via-blue-500/10 to-cyan-500/10 p-8 text-center sm:p-12">
        <Sparkles className="mx-auto h-8 w-8 text-blue-300" />

        <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
          Ready to improve your website?
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          BrandPilot can help turn these insights into a stronger
          digital presence, better visibility and more opportunities.
        </p>

        <a
          href="/#contact"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold transition hover:from-blue-500 hover:to-cyan-400"
        >
          Talk to BrandPilot
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function ScoreCircle({
  score,
  large = false,
}: {
  score: number;
  large?: boolean;
}) {
  const { radius, circumference, progress } =
    scoreRing(score);

  const size = large ? 180 : 90;

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 130 130"
        className="-rotate-90"
      >
        <circle
          cx="65"
          cy="65"
          r={radius}
          fill="transparent"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="9"
        />

        <circle
          cx="65"
          cy="65"
          r={radius}
          fill="transparent"
          stroke="url(#scoreGradient)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />

        <defs>
          <linearGradient
            id="scoreGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={
            large
              ? "text-4xl font-bold"
              : "text-xl font-bold"
          }
        >
          {score}
        </span>

        <span className="text-xs text-slate-500">/100</span>
      </div>
    </div>
  );
}

function ScoreCard({
  icon,
  title,
  score,
}: {
  icon: React.ReactNode;
  title: string;
  score: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
          {icon}
        </div>

        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs text-slate-500">
            {scoreLabel(score)}
          </p>
        </div>
      </div>

      <ScoreCircle score={score} />
    </div>
  );
}

function Metric({
  label,
  value,
  good,
}: {
  label: string;
  value: string;
  good: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-lg font-semibold text-white">
          {value}
        </span>

        {good ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        ) : (
          <AlertCircle className="h-5 w-5 text-amber-400" />
        )}
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        {title}
      </h2>
    </div>
  );
}

function Recommendation({
  index,
  recommendation,
}: {
  index: number;
  recommendation: {
    priority: "high" | "medium" | "low";
    category: string;
    title: string;
    description: string;
  };
}) {
  const priorityStyles = {
    high: "border-red-500/20 bg-red-500/10 text-red-300",
    medium: "border-amber-500/20 bg-amber-500/10 text-amber-300",
    low: "border-blue-500/20 bg-blue-500/10 text-blue-300",
  };

  return (
    <div className="p-6 sm:p-7">
      <div className="flex gap-5">
        <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sm font-bold text-slate-400 sm:flex">
          {String(index).padStart(2, "0")}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                priorityStyles[recommendation.priority]
              }`}
            >
              {recommendation.priority}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-400">
              {recommendation.category}
            </span>
          </div>

          <h3 className="mt-3 text-lg font-semibold">
            {recommendation.title}
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-400">
            {recommendation.description}
          </p>
        </div>
      </div>
    </div>
  );
}
