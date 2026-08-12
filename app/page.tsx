"use client";

import { useEffect, useRef, useState } from "react";
import ChatWidget from "./components/ChatWidget";
import AIEmployees from "./components/AIEmployees";
import AIAudit from "./components/AIAudit";

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

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

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
    { q: "How long does a typical project take?", a: "Most websites launch in 2–4 weeks. SEO and marketing campaigns are ongoing, with first results usually visible within 30–60 days." },
    { q: "Do you offer ongoing support after launch?", a: "Yes. Every project includes a support window, and we offer monthly retainers for updates, SEO maintenance, and campaign management." },
    { q: "Can you work with my existing brand?", a: "Absolutely. We can build on your current identity or start fresh with a full rebrand — whichever fits your goals and budget." },
    { q: "What's included in the price?", a: "Design, development, copywriting, and one round of revisions are included in every package. Hosting and domain costs are billed separately." },
  ];

  const stats = [
    { value: "15+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "3.5x", label: "Avg. Traffic Growth" },
    { value: "6+", label: "Industries Served" },
  ];

  const pricing = [
    { name: "Starter", price: "$149", period: "/one-time", desc: "For new businesses that need a clean, professional presence online.", features: ["Up to 5 pages", "Mobile responsive", "Basic on-page SEO", "1 revision round", "2-week delivery"], highlighted: false },
    { name: "Growth", price: "$349", period: "/one-time", desc: "For businesses ready to scale traffic and conversions.", features: ["Up to 10 pages", "SEO strategy + keyword research", "Content + copywriting", "3 revision rounds", "1 month of post-launch support"], highlighted: true },
    { name: "Growth+", price: "$99", period: "/month", desc: "Ongoing marketing for brands that already have a site.", features: ["Monthly SEO maintenance", "Social media content calendar", "Email marketing setup", "Monthly performance report", "Cancel anytime"], highlighted: false },
  ];

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
      const res = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (res.ok) { setFormStatus("sent"); form.reset(); }
      else setFormError("Something went wrong sending your message. Please try again or email us directly.");
    } catch {
      setFormError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setFormSubmitting(false);
    }
  }

  const services = [
    { icon: "🖥️", title: "Website Design & Development", desc: "Custom-coded, mobile-first websites built on modern frameworks — no drag-and-drop templates. Optimized for load speed and Core Web Vitals.", tags: ["Next.js", "Responsive", "Fast load times"] },
    { icon: "🔍", title: "SEO & Content Strategy", desc: "Keyword research, on-page optimization, and technical SEO audits to help you rank for the terms your customers are actually searching.", tags: ["Keyword research", "Technical audits", "Content calendars"] },
    { icon: "📱", title: "Social Media Management", desc: "Consistent posting, content creation, and community engagement across Instagram, TikTok, and LinkedIn tailored to your industry.", tags: ["Content creation", "Scheduling", "Analytics"] },
    { icon: "🎯", title: "Paid Ads (PPC)", desc: "Google and Meta ad campaigns built around measurable ROI — from setup and targeting to ongoing optimization and reporting.", tags: ["Google Ads", "Meta Ads", "Conversion tracking"] },
    { icon: "🎨", title: "Branding & Identity", desc: "Logo design, color systems, and brand guidelines that give your business a consistent look across every touchpoint.", tags: ["Logo design", "Style guides", "Brand assets"] },
    { icon: "✉️", title: "Email Marketing", desc: "Automated email flows and newsletter campaigns that nurture leads and bring past customers back.", tags: ["Automation", "Newsletters", "List growth"] },
  ];

  const navLinks = [
    { label: "Home", href: "#home" }, { label: "AI Audit", href: "#ai-audit" }, { label: "AI Employees", href: "#ai-employees" },
    { label: "Services", href: "#services" }, { label: "Portfolio", href: "/portfolio" }, { label: "Pricing", href: "#pricing" },
    { label: "About", href: "/about" }, { label: "Blog", href: "/blog" }, { label: "FAQ", href: "#faq" },
  ];

  return (
    <main ref={rootRef} className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-hidden relative">
      <style>{`
        [data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease}
        [data-reveal].reveal-visible{opacity:1;transform:translateY(0)}
        @keyframes float-orb-1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,80px) scale(1.15)}66%{transform:translate(-40px,40px) scale(.95)}}
        @keyframes float-orb-2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-70px,-50px) scale(1.1)}66%{transform:translate(40px,-80px) scale(.9)}}
        @keyframes float-orb-3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(50px,-60px) scale(1.2)}}
        @keyframes float-orb-4{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-60px,50px) scale(.85)}}
        .orb-1{animation:float-orb-1 18s ease-in-out infinite}.orb-2{animation:float-orb-2 22s ease-in-out infinite}.orb-3{animation:float-orb-3 16s ease-in-out infinite}.orb-4{animation:float-orb-4 20s ease-in-out infinite}
        @keyframes gradient-shift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .gradient-text{background:linear-gradient(90deg,#fff,#93c5fd,#c4b5fd,#fff);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:gradient-shift 6s ease-in-out infinite}
        .card-glow{position:relative;transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}.card-glow:hover{transform:translateY(-4px);box-shadow:0 0 30px rgba(59,130,246,.25),0 0 60px rgba(139,92,246,.12);border-color:rgba(96,165,250,.4)}
        .nav-link{position:relative}.nav-link::after{content:"";position:absolute;left:0;bottom:-4px;width:0%;height:2px;background:linear-gradient(90deg,#60a5fa,#a78bfa);transition:width .3s ease}.nav-link:hover::after{width:100%}
        @keyframes pulse-glow{0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,.5)}50%{box-shadow:0 0 0 10px rgba(59,130,246,0)}}.btn-pulse{animation:pulse-glow 2.5s ease-in-out infinite}
        @media (prefers-reduced-motion:reduce){[data-reveal]{opacity:1;transform:none;transition:none}.orb-1,.orb-2,.orb-3,.orb-4,.gradient-text,.btn-pulse{animation:none}}
      `}</style>

      <div className="orb-1 absolute top-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="orb-2 absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="orb-3 absolute top-1/2 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="orb-4 absolute bottom-1/3 left-1/4 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/20 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3" aria-label="BrandPilot home">
            <span className="text-3xl font-black tracking-tight text-white">BrandPilot</span>
          </a>
          <div className="hidden md:flex gap-8 text-gray-300">
            {navLinks.map((link)=><a key={link.href} href={link.href} className="nav-link hover:text-white transition">{link.label}</a>)}
          </div>
          <a href="#contact" className="hidden md:inline-block bg-white text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition">Contact</a>
          <button onClick={()=>setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
            <span className={`block w-6 h-0.5 bg-white transition ${menuOpen?"rotate-45 translate-y-2":""}`} /><span className={`block w-6 h-0.5 bg-white transition ${menuOpen?"opacity-0":""}`} /><span className={`block w-6 h-0.5 bg-white transition ${menuOpen?"-rotate-45 -translate-y-2":""}`} />
          </button>
        </div>
        {menuOpen&&<div className="md:hidden bg-black/90 border-t border-white/10 px-8 py-6 flex flex-col gap-4">{navLinks.map(link=><a key={link.href} href={link.href} onClick={()=>setMenuOpen(false)} className="text-gray-300 hover:text-white transition">{link.label}</a>)}<a href="#contact" onClick={()=>setMenuOpen(false)} className="bg-white text-black px-6 py-2 rounded-full font-semibold text-center">Contact</a></div>}
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 blur-2xl scale-110"></div>
              <video id="avatar-video" src="/avatar.mp4" autoPlay muted loop playsInline className="relative w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-blue-400/40 shadow-2xl shadow-blue-500/30" />
              <button onClick={()=>{const video=document.getElementById("avatar-video") as HTMLVideoElement;if(video){video.muted=!video.muted;const btn=document.getElementById("mute-btn");if(btn)btn.textContent=video.muted?"🔇 Muted":"🔊 Sound on";}}} id="mute-btn" className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/20 hover:bg-black/80 transition whitespace-nowrap">🔇 Muted</button>
            </div>
            <p className="text-gray-500 text-xs mt-4 text-center">AI Assistant · BrandPilot</p>
          </div>

          <div className="text-center md:text-left" style={{opacity:heroVisible?1:0,transform:heroVisible?"translateY(0)":"translateY(30px)",transition:"opacity 1s ease, transform 1s ease"}}>
            <h1 className="gradient-text text-5xl md:text-8xl font-black mt-8 leading-tight">Helping Brands<br />Take Off.</h1>
            <p className="text-blue-400 font-semibold text-lg md:text-xl mt-3 tracking-wide">AI-Powered Web Design & Digital Marketing Agency</p>
