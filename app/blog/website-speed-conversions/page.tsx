import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Speed & Conversions | BrandPilot",
  description: "Learn how website speed affects user experience, SEO, trust, and conversions, with practical steps for faster mobile-friendly pages.",
  alternates: { canonical: "https://www.brandpilotcloud.com/blog/website-speed-conversions" },
};

export default function WebsiteSpeedArticle() {
  return (
    <ArticleLayout
      category="Web Design"
      title="How a Slow Website Is Costing You Customers"
      date="July 8, 2026"
      read="6 min read"
    >
      <p>
        A slow website is not just a technical problem. It can affect trust,
        engagement and the number of visitors who reach your enquiry or checkout
        page.
      </p>
      <h2>Speed changes the first impression</h2>
      <p>
        Visitors make quick judgments. If the page feels heavy, jumps around or
        takes too long to become useful, people are more likely to leave before
        seeing your offer.
      </p>
      <h2>Start with the biggest files</h2>
      <p>
        Large images and unnecessary video are common causes of slow pages.
        Compress media, use modern formats and only load visual assets when they
        are actually needed.
      </p>
      <h2>Remove unnecessary JavaScript</h2>
      <p>
        Every script adds work. Audit analytics, widgets, animations and third
        party tools. Keep the experiences that improve the customer journey and
        remove the ones that only add weight.
      </p>
      <h2>Design for mobile first</h2>
      <p>
        A fast desktop experience does not automatically mean a fast mobile
        experience. Test on realistic mobile connections and make the first
        screen useful without excessive loading.
      </p>
      <h2>Connect speed to conversion</h2>
      <p>
        Do not measure performance in isolation. Compare page speed with
        engagement, enquiries and sales so you know which improvements actually
        create business value.
      </p>
    </ArticleLayout>
  );
}

function ArticleLayout({
  children,
  category,
  title,
  date,
  read,
}: {
  children: React.ReactNode;
  category: string;
  title: string;
  date: string;
  read: string;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="font-black text-xl">Brand<span className="text-blue-400">Pilot</span></a>
          <a href="/blog" className="text-sm text-gray-400 hover:text-white transition">← All insights</a>
        </div>
      </header>
      <article className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-blue-400 text-xs uppercase tracking-[0.3em] font-semibold">{category}</p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mt-5">{title}</h1>
        <p className="text-gray-500 text-sm mt-5">{read} · {date}</p>
        <div className="mt-12 space-y-7 text-gray-300 text-lg leading-9 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:pt-5">
          {children}
        </div>
        <div className="mt-14 pt-8 border-t border-white/10">
          <a href="/#contact" className="inline-flex px-7 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold hover:scale-105 transition">Talk to BrandPilot →</a>
        </div>
      </article>
    </main>
  );
}
