"use client";

import { useEffect, useRef, useState } from "react";
import ChatWidget from "./components/ChatWidget";
import AIEmployees from "./components/AIEmployees";
import AIAudit from "./components/AIAudit";

// NOTE: Homepage SEO metadata (title/description/canonical) was previously
// exported from this file, but this is a Client Component ("use client"),
// and Next.js does not allow exporting `metadata` from a Client Component —
// it would fail the build. The metadata that was here also incorrectly
// described the /services page, not the homepage. Proper homepage metadata
// needs to be added to app/layout.tsx (or converted via a server wrapper) —
// happy to set that up as a separate step.

function AnimatedCounter({ value }: { value: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const match = value.match(/[\d.]+/);
            const numPart = match ? parseFloat(match[0]) : 0;
            const suffix = value.replace(/[\d.]+/, "");
            const duration = 1200;
            const startTime = performance.now();

            function tick(now: number) {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = numPart * eased;
              const formatted = Number.isInteger(numPart)
                ? Math.round(current).toString()
                : current.toFixed(1);
              setDisplay(formatted + suffix);
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <p ref={ref} className="text-4xl md:text-5xl font-black text-blue-400">
      {display}
    </p>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");
  const [heroVisible, setHeroVisible] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  // Hero entrance animation on mount
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Scroll-triggered reveal for any element with data-reveal
  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll("[data-reveal]");
    if (!nodes || nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      q: "How long does a typical project take?",
      a: "Most websites launch in 2–4 weeks. SEO and marketing campaigns are ongoing, with first results usually visible within 30–60 days.",
    },
    {
      q: "Do you offer ongoing support after launch?",
      a: "Yes. Every project includes a support window, and we offer monthly retainers for updates, SEO maintenance, and campaign management.",
    },
    {
      q: "Can you work with my existing brand?",
      a: "Absolutely. We can build on your current identity or start fresh with a full rebrand — whichever fits your goals and budget.",
    },
    {
      q: "What's included in the price?",
      a: "Design, development, copywriting, and one round of revisions are included in every package. Hosting and domain costs are billed separately.",
    },
  ];

  const stats = [
    { value: "15+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "3.5x", label: "Avg. Traffic Growth" },
    { value: "6+", label: "Industries Served" },
  ];

  const pricing = [
    {
      name: "Starter",
      price: "$149",
      period: "/one-time",
      desc: "For new businesses that need a clean, professional presence online.",
      features: ["Up to 5 pages", "Mobile responsive", "Basic on-page SEO", "1 revision round", "2-week delivery"],
      highlighted: false,
    },
    {
      name: "Growth",
      price: "$349",
      period: "/one-time",
      desc: "For businesses ready to scale traffic and conversions.",
      features: [
        "Up to 10 pages",
        "SEO strategy + keyword research",
        "Content + copywriting",
        "3 revision rounds",
        "1 month of post-launch support",
      ],
      highlighted: true,
    },
    {
      name: "Growth+",
      price: "$99",
      period: "/month",
      desc: "Ongoing marketing for brands that already have a site.",
      features: [
        "Monthly SEO maintenance",
        "Social media content calendar",
        "Email marketing setup",
        "Monthly performance report",
        "Cancel anytime",
      ],
      highlighted: false,
    },
  ];

  // Replace this with your own Formspree endpoint ID (see setup note below the form)
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdarbpol";

  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setFormSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setFormStatus("sent");
        form.reset();
      } else {
        setFormError("Something went wrong sending your message. Please try again or email us directly.");
      }
    } catch {
      setFormError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setFormSubmitting(false);
    }
  }

  const services = [
    {
      icon: "🖥️",
      title: "Website Design & Development",
      desc: "Custom-coded, mobile-first websites built on modern frameworks — no drag-and-drop templates. Optimized for load speed and Core Web Vitals.",
      tags: ["Next.js", "Responsive", "Fast load times"],
    },
    {
      icon: "🔍",
      title: "SEO & Content Strategy",
      desc: "Keyword research, on-page optimization, and technical SEO audits to help you rank for the terms your customers are actually searching.",
      tags: ["Keyword research", "Technical audits", "Content calendars"],
    },
    {
      icon: "📱",
      title: "Social Media Management",
      desc: "Consistent posting, content creation, and community engagement across Instagram, TikTok, and LinkedIn tailored to your industry.",
      tags: ["Content creation", "Scheduling", "Analytics"],
    },
    {
      icon: "🎯",
      title: "Paid Ads (PPC)",
      desc: "Google and Meta ad campaigns built around measurable ROI — from setup and targeting to ongoing optimization and reporting.",
      tags: ["Google Ads", "Meta Ads", "Conversion tracking"],
    },
    {
      icon: "🎨",
      title: "Branding & Identity",
      desc: "Logo design, color systems, and brand guidelines that give your business a consistent look across every touchpoint.",
      tags: ["Logo design", "Style guides", "Brand assets"],
    },
    {
      icon: "✉️",
      title: "Email Marketing",
      desc: "Automated email flows and newsletter campaigns that nurture leads and bring past customers back.",
      tags: ["Automation", "Newsletters", "List growth"],
    },
  ];

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "AI Audit", href: "#ai-audit" },
    { label: "AI Employees", href: "#ai-employees" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <main ref={rootRef} className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-hidden relative">

      <style>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        [data-reveal].reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes float-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, 80px) scale(1.15); }
          66% { transform: translate(-40px, 40px) scale(0.95); }
        }
        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-70px, -50px) scale(1.1); }
          66% { transform: translate(40px, -80px) scale(0.9); }
        }
        @keyframes float-orb-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, -60px) scale(1.2); }
        }
        @keyframes float-orb-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-60px, 50px) scale(0.85); }
        }
        .orb-1 { animation: float-orb-1 18s ease-in-out infinite; }
        .orb-2 { animation: float-orb-2 22s ease-in-out infinite; }
        .orb-3 { animation: float-orb-3 16s ease-in-out infinite; }
        .orb-4 { animation: float-orb-4 20s ease-in-out infinite; }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .gradient-text {
          background: linear-gradient(90deg, #ffffff, #93c5fd, #c4b5fd, #ffffff);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-shift 6s ease-in-out infinite;
        }

        .card-glow {
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card-glow:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.25), 0 0 60px rgba(139, 92, 246, 0.12);
          border-color: rgba(96, 165, 250, 0.4);
        }

        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #60a5fa, #a78bfa);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
        }
        .btn-pulse {
          animation: pulse-glow 2.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1; transform: none; transition: none; }
          .orb-1, .orb-2, .orb-3, .orb-4 { animation: none; }
          .gradient-text { animation: none; }
          .btn-pulse { animation: none; }
        }
      `}</style>

      {/* Background Glow */}
      <div className="orb-1 absolute top-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="orb-2 absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="orb-3 absolute top-1/2 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="orb-4 absolute bottom-1/3 left-1/4 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/20 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <a href="#home" className="text-3xl font-extrabold tracking-wide">
            BrandPilot<span className="text-blue-400">.</span>
          </a>

          <div className="hidden md:flex gap-8 text-gray-300">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link hover:text-white transition">
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-block bg-white text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Contact
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-black/90 border-t border-white/10 px-8 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-white transition"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="bg-white text-black px-6 py-2 rounded-full font-semibold text-center"
            >
              Contact
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

          {/* Avatar Video */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 blur-2xl scale-110"></div>
              <video
                id="avatar-video"
                src="/avatar.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="relative w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-blue-400/40 shadow-2xl shadow-blue-500/30"
              />
              <button
                onClick={() => {
                  const video = document.getElementById("avatar-video") as HTMLVideoElement;
                  if (video) {
                    video.muted = !video.muted;
                    const btn = document.getElementById("mute-btn");
                    if (btn) btn.textContent = video.muted ? "🔇 Muted" : "🔊 Sound on";
                  }
                }}
                id="mute-btn"
                className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/20 hover:bg-black/80 transition whitespace-nowrap"
              >
                🔇 Muted
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-4 text-center">AI Assistant · BrandPilot</p>
          </div>

         {/* Hero Text */}
<div
  className="text-center md:text-left"
  style={{
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 1s ease, transform 1s ease",
  }}
>
  <p className="uppercase tracking-[0.4em] text-gray-400">
    BrandPilot Digital
  </p>

 <h1 className="text-5xl md:text-8xl font-black mt-8 leading-tight text-white">
  Helping Brands
  <br />
  Take Off.
</h1>
<p className="text-blue-400 font-semibold text-lg md:text-xl mt-3 tracking-wide">
  AI-Powered Web Design & Digital Marketing Agency
</p>

  <p className="text-gray-400 mt-6 max-w-2xl text-xl leading-9">
    BrandPilot helps businesses grow online with custom website design,
    responsive web development, SEO, branding, social media marketing,
    Google Ads, Meta Ads, email marketing, and AI-powered digital
    marketing solutions that generate more traffic, leads, and sales.
  </p>

  <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-4">
    <a
      href="#contact"
      className="btn-pulse inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold hover:scale-105 transition shadow-lg shadow-blue-500/25"
    >
      Start Project
      <span aria-hidden="true">→</span>
    </a>

    <a
      href="https://calendly.com/thasleenanasreen242/30min"
      target="_blank"
      rel="noopener noreferrer"
      className="btn-pulse inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-blue-400 text-blue-300 hover:bg-blue-500/20 font-bold hover:scale-105 transition shadow-lg shadow-blue-500/10 backdrop-blur-sm"
    >
      📅 Book a Free Call
    </a>

    <a
      href="/portfolio"
      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/30 hover:bg-white/20 hover:border-white/50 text-white font-bold hover:scale-105 transition backdrop-blur-sm"
    >
      View Portfolio
      <span aria-hidden="true">↗</span>
    </a>
  </div>
</div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6 border-y border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={stat.label} data-reveal style={{ transitionDelay: `${i * 100}ms` }}>
              <AnimatedCounter value={stat.value} />
              <p className="text-gray-400 mt-2 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI AUDIT */}
      <AIAudit />

      {/* AI EMPLOYEES */}
      <AIEmployees />

      {/* SERVICES */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-5xl font-bold text-center">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {services.map((service, i) => (
              <div
                key={service.title}
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
                className="card-glow bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 hover:border-blue-400/30 transition-all"
              >
                <span className="text-3xl">{service.icon}</span>
                <h3 className="text-2xl font-bold mt-4 mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-6">{service.desc}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PORTFOLIO TEASER */}
      <section id="portfolio" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold">Our Work</h2>
          <p className="text-gray-400 mt-4">
            Real projects, real clients, real results — across web design, SEO, branding, and social media.
          </p>
          <a
            href="/portfolio"
            className="btn-pulse inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold hover:scale-105 transition shadow-lg shadow-blue-500/25"
          >
            View Full Portfolio
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center">Pricing</h2>
          <p className="text-gray-400 text-center mt-4">
            Simple packages that scale with your business
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12 items-stretch">
            {pricing.map((plan, i) => (
              <div
                key={plan.name}
                data-reveal
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`card-glow flex flex-col rounded-3xl p-8 border transition hover:scale-105 ${
                  plan.highlighted
                    ? "bg-blue-500/10 border-blue-400/50 shadow-xl shadow-blue-500/10"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {plan.highlighted && (
                  <span className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </p>
                <p className="text-gray-400 mt-4 text-sm">{plan.desc}</p>

                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-blue-400 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 text-center px-6 py-3 rounded-full font-semibold transition ${
                    plan.highlighted
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-5xl font-bold text-center">
            What Clients Say
          </h2>
          <p className="text-gray-400 text-center mt-4">
            Real feedback from businesses we've worked with
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <div data-reveal className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex text-yellow-400 text-sm mb-3">★★★★★</div>
              <p className="text-gray-300">
                "Orders started coming in within the first week of launch. The new site finally matches the quality of our products."
              </p>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold text-sm">
                  AR
                </div>
                <div>
                  <h4 className="font-bold text-sm">Anjali Raghunath</h4>
                  <p className="text-gray-500 text-xs">Founder, Coastal & Co.</p>
                </div>
              </div>
            </div>

            <div data-reveal style={{ transitionDelay: "100ms" }} className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex text-yellow-400 text-sm mb-3">★★★★★</div>
              <p className="text-gray-300">
                "We started getting inbound export inquiries from Google, not just referrals. That shift alone paid for the whole campaign."
              </p>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-bold text-sm">
                  MK
                </div>
                <div>
                  <h4 className="font-bold text-sm">Manoj Kurup</h4>
                  <p className="text-gray-500 text-xs">Director, Kerala Spice Traders</p>
                </div>
              </div>
            </div>

            <div data-reveal style={{ transitionDelay: "200ms" }} className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex text-yellow-400 text-sm mb-3">★★★★★</div>
              <p className="text-gray-300">
                "Investors commented on how polished the brand looked at our pitch. BrandPilot delivered a full identity in three weeks flat."
              </p>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-300 font-bold text-sm">
                  PS
                </div>
                <div>
                  <h4 className="font-bold text-sm">Priya Sundaram</h4>
                  <p className="text-gray-500 text-xs">Co-founder, Bloom Wellness</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* BLOG TEASER */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center">Insights</h2>
          <p className="text-gray-400 text-center mt-4">
            Practical tips on SEO, web design, and digital marketing — no fluff.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <a href="/blog/seo-tips-small-business" className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-400/30 hover:scale-105 transition-all block">
              <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500/60 to-teal-500/30"></div>
              <div className="p-6">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">SEO</span>
                <h3 className="text-lg font-bold mt-2 group-hover:text-blue-300 transition leading-6">5 SEO Fixes That Will Actually Move the Needle</h3>
                <p className="text-gray-500 text-sm mt-2">5 min read · July 14, 2026</p>
              </div>
            </a>

            <a href="/blog/website-speed-conversions" className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-400/30 hover:scale-105 transition-all block">
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500/60 to-indigo-500/30"></div>
              <div className="p-6">
                <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Web Design</span>
                <h3 className="text-lg font-bold mt-2 group-hover:text-blue-300 transition leading-6">How a Slow Website Is Costing You Customers</h3>
                <p className="text-gray-500 text-sm mt-2">6 min read · July 8, 2026</p>
              </div>
            </a>

            <a href="/blog/social-media-content-strategy" className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-400/30 hover:scale-105 transition-all block">
              <div className="h-1.5 w-full bg-gradient-to-r from-pink-500/60 to-rose-500/30"></div>
              <div className="p-6">
                <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold">Social Media</span>
                <h3 className="text-lg font-bold mt-2 group-hover:text-blue-300 transition leading-6">Why Posting More Isn't the Answer</h3>
                <p className="text-gray-500 text-sm mt-2">4 min read · July 2, 2026</p>
              </div>
            </a>
          </div>

          <div className="text-center mt-10">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/30 hover:bg-white/10 transition font-semibold"
            >
              View All Articles
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-center">FAQ</h2>
          <p className="text-gray-400 text-center mt-4">
            Answers to what clients usually ask before starting
          </p>

          <div className="mt-12 space-y-4">
            {faqs.map((item, i) => (
              <div
                key={item.q}
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center text-left px-6 py-5 font-semibold"
                >
                  {item.q}
                  <span className={`transition ${openFaq === i ? "rotate-45" : ""} text-blue-400 text-xl`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p className="px-6 pb-5 text-gray-400 text-sm leading-7">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase tracking-[0.4em] text-gray-400 text-sm mb-4">Our Story</p>
          <h2 className="text-5xl font-bold">One Laptop. A Handful of Believers.</h2>
          <p className="text-gray-400 mt-6 text-lg leading-8">
            BrandPilot didn't start as an agency — it started earlier this
            year with one person who couldn't stand watching good local
            businesses lose customers to outdated websites. Here's how that
            turned into a studio.
          </p>
          <a
            href="/about"
            className="btn-pulse inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 font-bold text-white transition shadow-lg shadow-blue-500/20 hover:scale-105"
          >
            Read Our Story
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Two options side by side */}
          <h2 className="text-4xl font-bold text-center">Get in Touch</h2>
          <p className="text-gray-400 text-center mt-4">
            Send us a message or book a free 30-minute call — whichever works for you.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12 items-start">

            {/* Contact Form */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-1">Send a Message</h3>
              <p className="text-gray-500 text-sm mb-6">We reply within 24 hours.</p>

          {formStatus === "sent" ? (
            <div className="mt-8 text-center py-10">
              <p className="text-2xl font-bold text-blue-400">Message sent 🎉</p>
              <p className="text-gray-400 mt-2">Thanks for reaching out — we'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="p-4 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-blue-400/50"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="p-4 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-blue-400/50"
              />
              <textarea
                name="message"
                placeholder="Tell us about your project"
                required
                rows={4}
                className="p-4 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-blue-400/50 resize-none"
              />

              {formError && (
                <p className="text-red-400 text-sm text-center">{formError}</p>
              )}

              <button
                type="submit"
                disabled={formSubmitting}
                className="px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formSubmitting ? "Sending..." : "Send Message"}
              </button>

              {FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID") && (
                <p className="text-xs text-yellow-500/80 text-center mt-2">
                  Setup needed: replace FORMSPREE_ENDPOINT with your real Formspree URL for this to send emails.
                </p>
              )}
            </form>
          )}
            </div>

            {/* Calendly Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
              <h3 className="text-xl font-bold mb-1">Book a Free Call</h3>
              <p className="text-gray-500 text-sm mb-6">30 minutes · No commitment</p>

              <div className="bg-black/30 rounded-2xl p-6 mb-6">
                <p className="text-4xl mb-3">📅</p>
                <p className="text-gray-300 text-sm leading-6">
                  Pick a time that works for you and we'll jump on a call to discuss your project, answer questions, and figure out the best next step together.
                </p>
              </div>

              <ul className="text-left space-y-3 text-sm text-gray-400 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> Talk through your goals
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> Get honest advice — no sales pitch
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> Leave with a clear next step
                </li>
              </ul>

              <a
                href="https://calendly.com/thasleenanasreen242/30min"
                target="_blank"
                className="btn-pulse inline-flex items-center justify-center gap-2 w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold transition shadow-lg shadow-blue-500/20"
              >
                Choose a Time →
              </a>

              <p className="text-xs text-gray-600 mt-3">Powered by Calendly · Free booking</p>
            </div>

          </div>
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center bg-white/5 border border-white/10 rounded-3xl p-10">

          <h2 className="text-4xl font-bold">
            Stay Updated
          </h2>

          <p className="text-gray-400 mt-4">
            Get digital marketing tips, SEO insights, and exclusive updates from BrandPilot.
          </p>

          <form
            action="https://gmail.us6.list-manage.com/subscribe/post?u=bd4cd98e814440d55a3cc4a9a&id=e0668f3b02&f_id=00fe8ae5f0"
            method="POST"
            target="_blank"
            className="mt-8 flex flex-col md:flex-row gap-4"
          >
            <input
              type="email"
              name="EMAIL"
              placeholder="Enter your email"
              required
              className="flex-1 p-4 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
            />

            {/* Hidden field to block bots */}
            <div
              style={{
                position: "absolute",
                left: "-5000px",
              }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="b_bd4cd98e814440d55a3cc4a9a_e0668f3b02"
                tabIndex={-1}
                defaultValue=""
              />
            </div>

            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 transition font-bold"
            >
              Subscribe
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            No spam. Unsubscribe anytime.
          </p>

        </div>
      </section>

{/* SEO CONTENT */}
<section className="py-24 px-6 border-t border-white/10">
  <div className="max-w-5xl mx-auto">

    <h2 className="text-4xl font-bold">
      Complete Digital Marketing & Website Development Solutions
    </h2>

    <p className="mt-8 text-gray-400 leading-8 text-lg">
      BrandPilot is an AI-powered web design and digital marketing agency that helps businesses build a strong online presence. We create modern, responsive websites that load quickly, look great on every device, and are optimized for search engines from day one. Every project is designed to improve user experience, generate more leads, and help businesses grow online.
    </p>

    <p className="mt-6 text-gray-400 leading-8 text-lg">
      Our website development services include custom business websites, landing pages, portfolio websites, corporate websites, e-commerce stores, and website redesigns. We build every website with clean code, mobile responsiveness, fast loading speeds, SEO best practices, and conversion-focused layouts that help turn visitors into customers.
    </p>

    <p className="mt-6 text-gray-400 leading-8 text-lg">
      Search engine optimization (SEO) is at the core of everything we build. We perform keyword research, optimize website structure, improve page speed, create SEO-friendly content, optimize metadata, and help businesses improve their visibility on Google Search. Our goal is to increase organic traffic and help businesses attract customers without relying only on paid advertising.
    </p>

    <p className="mt-6 text-gray-400 leading-8 text-lg">
      Beyond websites, BrandPilot offers complete digital marketing services including branding, social media marketing, Google Ads, Meta Ads, email marketing, content strategy, and AI-powered marketing automation. We combine creativity, technology, and data to create marketing systems that continue generating results long after launch.
    </p>

    <p className="mt-6 text-gray-400 leading-8 text-lg">
      Whether you're launching a new business, redesigning an existing website, or looking to improve your online visibility, BrandPilot provides end-to-end digital solutions tailored to your business goals. From strategy to execution, we help businesses build credibility, reach more customers, and grow with confidence.
    </p>

  </div>
</section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xl font-extrabold">
              BrandPilot<span className="text-blue-400">.</span>
            </p>
            <a
              href="mailto:info@brandpilotcloud.com"
              className="text-gray-500 text-sm hover:text-blue-400 transition"
            >
              info@brandpilotcloud.com
            </a>
            <a
              href="https://www.instagram.com/brandpilotcloud/"
              target="_blank"
              aria-label="BrandPilot on Instagram"
              className="flex items-center gap-2 text-gray-500 text-sm hover:text-pink-400 transition mt-1"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @brandpilotcloud
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white transition">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} BrandPilot. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-gray-600">
              <a href="/privacy" className="hover:text-gray-400 transition">Privacy Policy</a>
              <a href="/terms" className="hover:text-gray-400 transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />

      <a
        href="https://wa.me/919847641809"
        target="_blank"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.65 4.53 1.78 6.4L4 29l7.78-1.74A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818a9.78 9.78 0 0 1-4.99-1.36l-.358-.213-4.62 1.033 1.02-4.5-.234-.37A9.78 9.78 0 0 1 6.18 15c0-5.42 4.4-9.818 9.824-9.818S25.82 9.58 25.82 15s-4.4 9.818-9.816 9.818Zm5.4-7.34c-.295-.148-1.75-.864-2.02-.963-.272-.1-.47-.148-.667.148-.197.296-.764.963-.937 1.16-.173.198-.345.223-.64.075-.296-.148-1.248-.46-2.377-1.466-.879-.784-1.472-1.752-1.645-2.048-.173-.296-.018-.456.13-.604.134-.133.297-.346.445-.52.148-.173.197-.296.296-.494.099-.198.05-.371-.025-.52-.074-.148-.667-1.607-.914-2.202-.24-.578-.485-.5-.667-.51l-.568-.01c-.198 0-.52.074-.792.371-.272.296-1.04 1.016-1.04 2.478 0 1.462 1.065 2.876 1.213 3.074.148.198 2.096 3.2 5.08 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.75-.716 1.996-1.407.247-.692.247-1.284.173-1.407-.074-.124-.271-.198-.567-.346Z" />
        </svg>
      </a>
    </main>
  );
}
