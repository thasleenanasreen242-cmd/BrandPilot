import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5 SEO Fixes for Small Businesses | BrandPilot",
  description: "Learn five practical SEO fixes for small businesses, from search intent and title tags to internal links, technical SEO, and useful content.",
  alternates: { canonical: "https://www.brandpilotcloud.com/blog/seo-tips-small-business" },
};

export default function SEOTipsArticle() {
  return (
    <ArticleLayout
      category="SEO"
      title="5 SEO Fixes That Will Actually Move the Needle"
      date="July 14, 2026"
      read="5 min read"
    >
      <p>
        SEO does not always require a massive content operation. For many small
        businesses, fixing the fundamentals can create a much stronger base for
        search visibility.
      </p>
      <h2>1. Make every important page target a clear search intent</h2>
      <p>
        A page should have one clear purpose. Align the title, headings, copy
        and calls to action around what a visitor is actually trying to find.
      </p>
      <h2>2. Rewrite weak title tags and descriptions</h2>
      <p>
        Your title is one of the first signals users see in search results.
        Make it specific, useful and relevant to the page rather than repeating
        the same generic brand phrase everywhere.
      </p>
      <h2>3. Improve internal linking</h2>
      <p>
        Connect related pages with descriptive links. This helps visitors
        discover more useful content and gives search engines a clearer map of
        your website.
      </p>
      <h2>4. Fix technical friction</h2>
      <p>
        Check mobile usability, broken links, indexing, page speed, image sizes
        and unnecessary scripts. A technically clean site gives your content a
        better foundation.
      </p>
      <h2>5. Create content around real customer questions</h2>
      <p>
        Instead of publishing just to hit a content quota, build useful pages
        around questions your customers repeatedly ask. Helpful content is more
        likely to earn attention, links and enquiries.
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
          <a href="/#contact" className="inline-flex px-7 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold hover:scale-105 transition">
            Talk to BrandPilot →
          </a>
        </div>
      </article>
    </main>
  );
}
