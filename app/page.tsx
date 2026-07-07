"use client";

import { useEffect, useRef, useState } from "react";

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
    { value: "120+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "4.2x", label: "Avg. Traffic Growth" },
    { value: "30+", label: "Industries Served" },
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
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

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
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
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
        @keyframes float-blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 40px) scale(1.1); }
        }
        @keyframes float-blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -30px) scale(1.15); }
        }
        .blob-1 { animation: float-blob-1 12s ease-in-out infinite; }
        .blob-2 { animation: float-blob-2 14s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1; transform: none; transition: none; }
          .blob-1, .blob-2 { animation: none; }
        }
      `}</style>

      {/* Background Glow */}
      <div className="blob-1 absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="blob-2 absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/20 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <a href="#home" className="text-3xl font-extrabold tracking-wide">
            BrandPilot<span className="text-blue-400">.</span>
          </a>

          <div className="hidden md:flex gap-8 text-gray-300">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white transition">
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
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div
          className="text-center px-6 relative z-10 max-w-5xl transition-all duration-1000 ease-out"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p className="uppercase tracking-[0.4em] text-gray-400">
            BrandPilot Digital
          </p>

          <h1 className="text-4xl md:text-8xl font-black mt-8 leading-tight">
            Helping Brands
            <br />
            Take Off.
          </h1>

          <p className="text-gray-400 mt-8 max-w-2xl mx-auto text-xl leading-9">
            We build beautiful websites, SEO strategies, branding, and digital marketing systems that help businesses grow online.
          </p>

          <div className="mt-12 flex justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition"
            >
              Start Project
            </a>

            <a
              href="#portfolio"
              className="px-8 py-4 rounded-full border border-white/30 hover:bg-white/10 transition"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6 border-y border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={stat.label} data-reveal style={{ transitionDelay: `${i * 100}ms` }}>
              <p className="text-4xl md:text-5xl font-black text-blue-400">{stat.value}</p>
              <p className="text-gray-400 mt-2 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

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
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 hover:border-blue-400/30 transition-all"
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

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-5xl font-bold text-center">
            Our Work
          </h2>

          <p className="text-gray-400 text-center mt-4">
            A few projects we've built for clients
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <div data-reveal className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:scale-105 transition">
              <h3 className="text-xl font-bold mb-2">E-commerce Website</h3>
              <p className="text-gray-400 text-sm">
                High converting online store.
              </p>
            </div>

            <div data-reveal style={{ transitionDelay: "100ms" }} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:scale-105 transition">
              <h3 className="text-xl font-bold mb-2">SEO Campaign</h3>
              <p className="text-gray-400 text-sm">
                Ranked page 1 on Google.
              </p>
            </div>

            <div data-reveal style={{ transitionDelay: "200ms" }} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:scale-105 transition">
              <h3 className="text-xl font-bold mb-2">Brand Identity</h3>
              <p className="text-gray-400 text-sm">
                Full startup branding system.
              </p>
            </div>

          </div>

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
                className={`flex flex-col rounded-3xl p-8 border transition hover:scale-105 ${
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

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <div data-reveal className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <p className="text-gray-300">
                "Great results in just 2 months."
              </p>
              <h4 className="mt-4 font-bold">— Alex</h4>
            </div>

            <div data-reveal style={{ transitionDelay: "100ms" }} className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <p className="text-gray-300">
                "Amazing design and support."
              </p>
              <h4 className="mt-4 font-bold">— Sarah</h4>
            </div>

            <div data-reveal style={{ transitionDelay: "200ms" }} className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <p className="text-gray-300">
                "Got real customers daily."
              </p>
              <h4 className="mt-4 font-bold">— David</h4>
            </div>

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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold">About BrandPilot</h2>
          <p className="text-gray-400 mt-6 text-lg leading-8">
            BrandPilot is a small digital studio focused on helping ambitious
            businesses look and perform their best online. From design to SEO
            to full marketing systems, we act as an extension of your team —
            not just a vendor.
          </p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-10">
          <h2 className="text-4xl font-bold text-center">Start Your Project</h2>
          <p className="text-gray-400 text-center mt-4">
            Tell us a bit about what you need and we'll reply within 24 hours.
          </p>

          {formStatus === "sent" ? (
            <div className="mt-8 text-center py-10">
              <p className="text-2xl font-bold text-blue-400">Message sent 🎉</p>
              <p className="text-gray-400 mt-2">Thanks for reaching out — we'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="mt-8 flex flex-col gap-4">
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

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xl font-extrabold">
            BrandPilot<span className="text-blue-400">.</span>
          </p>

          <div className="flex gap-6 text-gray-400 text-sm">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white transition">
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BrandPilot. All rights reserved.
          </p>
        </div>
      </footer>

      <a
        href="https://wa.me/919847641809"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        💬
      </a>
    </main>
  );
}
