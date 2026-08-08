"use client";

import { FormEvent, useState } from "react";

type Recommendation = {
  priority?: "high" | "medium" | "low";
  category?: string;
  title?: string;
  description?: string;
};

type AuditResponse = {
  success?: boolean;
  error?: string;

  website?: {
    url: string;
    hostname: string;
    status: number;
  };

  scores?: {
    overall: number;
    seo: number;
    performance: number;
    content: number;
    brand: number;
    technical: number;
  };

  audit?: {
    url: string;
    hostname: string;
    status: number;
    https: boolean;

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
  };

  ai?: {
    summary?: string;
    recommendations?: Recommendation[];
  };
};

/* =========================================================
   HELPERS
========================================================= */

function getWebsiteName(
  hostname: string,
  pageTitle?: string
) {
  /*
   * First try to use the actual website title.
   * Example:
   * "SensCore Technologies | Engineering Solutions"
   * becomes:
   * "SensCore Technologies"
   */

  if (pageTitle) {
    const cleanedTitle = pageTitle
      .split("|")[0]
      .split("•")[0]
      .split(" - ")[0]
      .trim();

    if (
      cleanedTitle &&
      cleanedTitle.length >= 2 &&
      cleanedTitle.length <= 60
    ) {
      return cleanedTitle;
    }
  }

  /*
   * Fallback to the domain.
   *
   * senscoretech.com
   * becomes:
   * Senscoretech
   */

  const domain = hostname
    .replace(/^www\./i, "")
    .split(".")[0]
    .replace(/[-_]+/g, " ")
    .trim();

  if (!domain) {
    return "Website";
  }

  return domain
    .split(" ")
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

function getScoreText(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Needs Improvement";
  return "Critical";
}

function getScoreColor(score: number) {
  if (score >= 90) return "text-emerald-400";
  if (score >= 75) return "text-cyan-400";
  if (score >= 60) return "text-yellow-400";

  return "text-red-400";
}

function getPriorityClass(priority?: string) {
  if (priority === "high") {
    return "border-red-500/20 bg-red-500/10 text-red-300";
  }

  if (priority === "medium") {
    return "border-yellow-500/20 bg-yellow-500/10 text-yellow-300";
  }

  return "border-blue-500/20 bg-blue-500/10 text-blue-300";
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function AIAuditPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] =
    useState<AuditResponse | null>(null);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setResult(null);

    let websiteUrl = url.trim();

    if (!websiteUrl) {
      setError("Please enter your website URL.");
      return;
    }

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

      const data: AuditResponse =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to complete the website audit."
        );
      }

      setResult(data);

      setTimeout(() => {
        document
          .getElementById("audit-results")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while auditing the website."
      );
    } finally {
      setLoading(false);
    }
  }

  function startNewAudit() {
    setResult(null);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050b14] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-300px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute bottom-[-250px] right-[-200px] h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        {!result ? (
          <Landing
            url={url}
            setUrl={setUrl}
            loading={loading}
            error={error}
            onSubmit={handleSubmit}
          />
        ) : (
          <Results
            result={result}
            onNewAudit={startNewAudit}
          />
        )}
      </div>
    </main>
  );
}

/* =========================================================
   LANDING
========================================================= */

function Landing({
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
  onSubmit: (
    event: FormEvent<HTMLFormElement>
  ) => void;
}) {
  return (
    <section>
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
          ✦ AI-Powered Website Audit
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Find Out How Strong
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Your Website Really Is
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
          Get an AI-powered analysis of your website&apos;s
          SEO, performance, content, branding and technical
          health — with practical recommendations from
          BrandPilot AI.
        </p>
      </div>

      {/* Form */}
      <div className="mx-auto mt-12 max-w-3xl">
        <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-white/[0.03] to-cyan-500/10 p-[1px] shadow-2xl shadow-blue-950/30">
          <div className="rounded-3xl bg-[#07101d]/95 p-6 sm:p-8">
            <form onSubmit={onSubmit}>
              <label
                htmlFor="website"
                className="mb-3 block text-sm font-medium text-slate-300"
              >
                Enter your website URL
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="website"
                  type="text"
                  value={url}
                  onChange={(event) =>
                    setUrl(event.target.value)
                  }
                  placeholder="https://yourwebsite.com"
                  disabled={loading}
                  className="h-14 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10 disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="h-14 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:from-blue-500 hover:to-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Analyzing..."
                    : "Analyze Website →"}
                </button>
              </div>

              {loading && (
                <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-sm text-blue-300">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-400" />

                    <span>
                      BrandPilot is analyzing your website.
                      This may take a few seconds...
                    </span>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                  <strong className="font-semibold">
                    Audit failed:
                  </strong>{" "}
                  {error}
                </div>
              )}

              <p className="mt-4 text-xs text-slate-500">
                Free website analysis • No credit card required
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto mt-20 max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            What We Analyze
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            A complete digital health check
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AuditCard
            symbol="⌕"
            title="SEO"
            description="Titles, meta descriptions, headings, canonical tags, robots and sitemap signals."
          />

          <AuditCard
            symbol="⚡"
            title="Performance"
            description="Website structure and resource signals that can influence user experience."
          />

          <AuditCard
            symbol="▤"
            title="Content"
            description="Content depth, headings, links and page structure."
          />

          <AuditCard
            symbol="◆"
            title="Brand"
            description="Messaging and important on-page brand signals."
          />

          <AuditCard
            symbol="✓"
            title="Technical"
            description="HTTPS, viewport, HTTP status and other technical checks."
          />

          <AuditCard
            symbol="✦"
            title="AI Recommendations"
            description="Actionable recommendations generated from your real audit data."
          />
        </div>
      </div>
    </section>
  );
}

function AuditCard({
  symbol,
  title,
  description,
}: {
  symbol: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-blue-500/[0.04]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/10 text-xl text-blue-300">
        {symbol}
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   RESULTS
========================================================= */

function Results({
  result,
  onNewAudit,
}: {
  result: AuditResponse;
  onNewAudit: () => void;
}) {
  const scores = result.scores;
  const audit = result.audit;
  const website = result.website;
  const ai = result.ai;

  if (!scores || !audit || !website) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
        <h1 className="text-2xl font-bold">
          Incomplete audit response
        </h1>

        <p className="mt-3 text-slate-400">
          The audit backend returned an incomplete result.
        </p>

        <button
          onClick={onNewAudit}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold"
        >
          Try Again
        </button>
      </div>
    );
  }

  const websiteName = getWebsiteName(
    website.hostname,
    audit.title
  );

  const checks = [
    ["HTTPS", audit.https],
    ["Page title", Boolean(audit.title)],
    ["Meta description", Boolean(audit.description)],
    ["Single H1", audit.h1 === 1],
    ["Canonical", audit.canonical],
    ["Viewport", audit.viewport],
    ["Robots", audit.robots],
    ["Sitemap", audit.sitemap],
  ] as const;

  const passed = checks.filter(
    (item) => item[1]
  ).length;

  return (
    <section id="audit-results">
      {/* Header */}
      <div className="flex flex-col gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
            ✓ Audit completed
          </div>

          <h1 className="text-3xl font-bold sm:text-5xl">
            {websiteName} Audit Report
          </h1>

          <p className="mt-3 break-all text-sm text-slate-400">
            {website.url}
          </p>
        </div>

        <button
          onClick={onNewAudit}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold transition hover:border-blue-500/30 hover:bg-white/[0.07]"
        >
          ← Audit Another Website
        </button>
      </div>

      {/* Score */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/15 via-white/[0.03] to-cyan-500/10 p-8">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative text-center">
            <p className="text-sm text-slate-400">
              Overall Website Score
            </p>

            <ScoreCircle
              score={scores.overall}
              large
            />

            <h2
              className={`mt-5 text-2xl font-bold ${getScoreColor(
                scores.overall
              )}`}
            >
              {getScoreText(scores.overall)}
            </h2>

            {/* DYNAMIC WEBSITE NAME */}
            <p className="mt-2 text-sm text-slate-500">
              {websiteName} Website Health Score
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ScoreCard
            title="SEO"
            score={scores.seo}
          />

          <ScoreCard
            title="Performance"
            score={scores.performance}
          />

          <ScoreCard
            title="Content"
            score={scores.content}
          />

          <ScoreCard
            title="Brand"
            score={scores.brand}
          />

          <ScoreCard
            title="Technical"
            score={scores.technical}
          />

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              HTTP Status
            </p>

            <p
              className={`mt-4 text-3xl font-bold ${
                website.status >= 200 &&
                website.status < 400
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {website.status}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Server response
            </p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-12">
        <SectionHeading
          eyebrow="Website Signals"
          title="Key Audit Metrics"
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            label="Page Title"
            value={
              audit.title
                ? "Present"
                : "Missing"
            }
            good={Boolean(audit.title)}
          />

          <Metric
            label="Title Length"
            value={`${audit.titleLength} chars`}
            good={
              audit.titleLength >= 30 &&
              audit.titleLength <= 60
            }
          />

          <Metric
            label="Meta Description"
            value={
              audit.description
                ? "Present"
                : "Missing"
            }
            good={Boolean(audit.description)}
          />

          <Metric
            label="Description Length"
            value={`${audit.descriptionLength} chars`}
            good={
              audit.descriptionLength >= 70 &&
              audit.descriptionLength <= 160
            }
          />

          <Metric
            label="H1 Headings"
            value={String(audit.h1)}
            good={audit.h1 === 1}
          />

          <Metric
            label="H2 Headings"
            value={String(audit.h2)}
            good={audit.h2 > 0}
          />

          <Metric
            label="Images"
            value={String(audit.images)}
            good={audit.images > 0}
          />

          <Metric
            label="Missing Alt"
            value={String(audit.imagesMissingAlt)}
            good={audit.imagesMissingAlt === 0}
          />

          <Metric
            label="Links"
            value={String(audit.links)}
            good={audit.links >= 3}
          />

          <Metric
            label="Word Count"
            value={String(audit.wordCount)}
            good={audit.wordCount >= 600}
          />

          <Metric
            label="Canonical"
            value={
              audit.canonical
                ? "Found"
                : "Missing"
            }
            good={audit.canonical}
          />

          <Metric
            label="Sitemap"
            value={
              audit.sitemap
                ? "Found"
                : "Missing"
            }
            good={audit.sitemap}
          />
        </div>
      </div>

      {/* Technical */}
      <div className="mt-12">
        <SectionHeading
          eyebrow="Technical Health"
          title={`${passed}/${checks.length} Checks Passed`}
        />

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
          {checks.map(
            ([name, isGood]) => (
              <div
                key={name}
                className="flex items-center justify-between border-b border-white/5 px-5 py-4 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={
                      isGood
                        ? "text-emerald-400"
                        : "text-red-400"
                    }
                  >
                    {isGood ? "✓" : "×"}
                  </span>

                  <span className="text-sm text-slate-200">
                    {name}
                  </span>
                </div>

                <span
                  className={
                    isGood
                      ? "text-xs font-medium text-emerald-400"
                      : "text-xs font-medium text-red-400"
                  }
                >
                  {isGood
                    ? "Passed"
                    : "Needs attention"}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mt-12">
        <div className="overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/[0.08] via-white/[0.025] to-cyan-500/[0.06]">
          <div className="border-b border-white/10 p-7 sm:p-9">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-lg text-blue-300">
                ✦
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                  BrandPilot AI
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  AI Recommendations
                </h2>
              </div>
            </div>

            <p className="mt-6 max-w-4xl text-sm leading-7 text-slate-300">
              {ai?.summary ||
                "Your technical audit has been completed successfully."}
            </p>
          </div>

          <div className="divide-y divide-white/5">
            {ai?.recommendations &&
            ai.recommendations.length > 0 ? (
              ai.recommendations.map(
                (
                  recommendation,
                  index
                ) => (
                  <Recommendation
                    key={`${recommendation.title}-${index}`}
                    number={index + 1}
                    recommendation={
                      recommendation
                    }
                  />
                )
              )
            ) : (
              <div className="p-8 text-sm leading-7 text-slate-400">
                The technical audit completed
                successfully. AI recommendations are
                currently unavailable. Check that your
                Gemini API key is configured in Vercel.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/15 via-blue-500/10 to-cyan-500/10 p-8 text-center sm:p-12">
        <div className="text-3xl">
          ✦
        </div>

        <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
          Ready to improve your website?
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          Turn your audit insights into a stronger
          digital presence, better visibility and more
          opportunities.
        </p>

        <a
          href="/#contact"
          className="mt-7 inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold transition hover:from-blue-500 hover:to-cyan-400"
        >
          Talk to BrandPilot →
        </a>
      </div>
    </section>
  );
}

/* =========================================================
   SCORE CIRCLE
========================================================= */

function ScoreCircle({
  score,
  large = false,
}: {
  score: number;
  large?: boolean;
}) {
  const radius = 52;

  const circumference =
    2 * Math.PI * radius;

  const safeScore = Math.max(
    0,
    Math.min(100, score)
  );

  const offset =
    circumference -
    (safeScore / 100) *
      circumference;

  const size = large ? 180 : 92;

  return (
    <div
      className="relative mx-auto mt-8"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        className="-rotate-90"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />

        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="url(#auditGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />

        <defs>
          <linearGradient
            id="auditGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#2563eb"
            />

            <stop
              offset="100%"
              stopColor="#22d3ee"
            />
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

        <span className="text-xs text-slate-500">
          /100
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SCORE CARD
========================================================= */

function ScoreCard({
  title,
  score,
}: {
  title: string;
  score: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div>
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p
          className={`mt-1 text-xs ${getScoreColor(
            score
          )}`}
        >
          {getScoreText(score)}
        </p>
      </div>

      <div className="text-2xl font-bold">
        {score}

        <span className="text-xs text-slate-600">
          /100
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   METRIC
========================================================= */

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
        <span className="text-lg font-semibold">
          {value}
        </span>

        <span
          className={
            good
              ? "text-emerald-400"
              : "text-yellow-400"
          }
        >
          {good ? "✓" : "!"}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   RECOMMENDATION
========================================================= */

function Recommendation({
  number,
  recommendation,
}: {
  number: number;
  recommendation: Recommendation;
}) {
  return (
    <div className="p-6 sm:p-7">
      <div className="flex gap-5">
        <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sm font-bold text-slate-500 sm:flex">
          {String(number).padStart(2, "0")}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${getPriorityClass(
                recommendation.priority
              )}`}
            >
              {recommendation.priority ||
                "low"}
            </span>

            {recommendation.category && (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-400">
                {recommendation.category}
              </span>
            )}
          </div>

          <h3 className="mt-3 text-lg font-semibold">
            {recommendation.title ||
              "Website improvement opportunity"}
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-400">
            {recommendation.description ||
              "Review this area of your website and improve it based on the audit results."}
          </p>
        </div>
      </div>
    </div>
  );
}
