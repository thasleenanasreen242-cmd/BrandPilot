"use client";

export default function AIAudit() {
  return (
    <section id="ai-audit" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center">Free AI Website & SEO Audit</h2>
        <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto">
          Find SEO, website performance, branding, and digital marketing opportunities that can help your business grow online.
        </p>

        <div
          data-reveal
          className="card-glow mt-12 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center hover:border-blue-400/30 transition-all"
        >
          {/* Left: copy */}
          <div>
            <span className="text-3xl">📊</span>
            <h3 className="text-3xl font-bold mt-4 mb-3">Free AI-Powered SEO & Marketing Audit</h3>
            <p className="text-gray-400 leading-6">
              Get an instant AI-generated health score for your website, SEO, brand, and digital marketing. Discover technical SEO issues, content opportunities, website performance improvements, and practical recommendations to strengthen your online presence.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Website, SEO, brand & performance scores",
                "AI-generated SEO and marketing recommendations",
                "Competitor benchmarking and growth opportunities",
                "Free forever, no credit card required",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/ai-audit"
              className="btn-pulse inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold hover:scale-105 transition shadow-lg shadow-blue-500/25"
            >
              Get Your Free Audit
              <span aria-hidden="true">→</span>
            </a>
            <p className="text-xs text-gray-500 mt-3">
              Takes 30 seconds · No credit card required
            </p>
          </div>

          {/* Right: score preview */}
          <div className="rounded-2xl border border-white/10 bg-black/30 p-8">
            <div className="flex justify-center mb-6">
              <ScoreGauge value={84} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Website", value: 90 },
                { label: "SEO", value: 72 },
                { label: "Brand", value: 80 },
                { label: "Performance", value: 94 },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="text-xs text-gray-400">{s.label}</div>
                  <div className="text-xl font-semibold text-blue-300">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreGauge({ value }: { value: number }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width="140" height="140" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="54" fill="none" stroke="#ffffff1a" strokeWidth="8" />
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="66" textAnchor="middle" fontSize="28" fontWeight="700" fill="white">
        {value}
      </text>
    </svg>
  );
}
