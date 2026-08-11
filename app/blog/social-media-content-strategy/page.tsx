export default function SocialMediaArticle() {
  return (
    <ArticleLayout
      category="Social Media"
      title="Why Posting More Isn't the Answer"
      date="July 2, 2026"
      read="4 min read"
    >
      <p>
        More posts do not automatically create more growth. A better social
        strategy connects content to a specific audience, a clear message and a
        useful next step.
      </p>
      <h2>Choose three to five content pillars</h2>
      <p>
        Build repeatable themes around education, proof, behind-the-scenes,
        product or service value and customer questions. This makes planning
        easier without making your feed repetitive.
      </p>
      <h2>Create for the person, not the algorithm</h2>
      <p>
        Hooks matter, but relevance matters more. Start with a problem your
        target customer recognizes and make the first few seconds or lines
        immediately useful.
      </p>
      <h2>Give every post a job</h2>
      <p>
        Some posts should create awareness. Others should build trust, start a
        conversation, generate a click or drive an enquiry. A feed becomes much
        stronger when each piece has a purpose.
      </p>
      <h2>Repurpose winning ideas</h2>
      <p>
        When one topic performs well, expand it into a reel, carousel, story,
        email or blog article. One strong idea can become an entire content
        system.
      </p>
      <h2>Measure actions, not just likes</h2>
      <p>
        Track saves, shares, profile visits, website clicks, enquiries and
        qualified conversations. These signals tell you much more about business
        impact than follower count alone.
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
