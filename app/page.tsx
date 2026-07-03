export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/20 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wide">
            BrandPilot<span className="text-blue-400">.</span>
          </h1>

          <div className="hidden md:flex gap-8 text-gray-300">
            <a href="#" className="hover:text-white">Home</a>
            <a href="#" className="hover:text-white">Services</a>
            <a href="#" className="hover:text-white">Portfolio</a>
            <a href="#" className="hover:text-white">About</a>
          </div>

          <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition">
            Contact
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center px-6 relative z-10 max-w-5xl">
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
            <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition">
              Start Project
            </button>

            <button className="px-8 py-4 rounded-full border border-white/30 hover:bg-white/10 transition">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-5xl font-bold text-center">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 transition">
              <h3 className="text-2xl font-bold mb-4">Website Design</h3>
              <p className="text-gray-400">
                Modern websites built for speed, SEO and conversions.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 transition">
              <h3 className="text-2xl font-bold mb-4">SEO</h3>
              <p className="text-gray-400">
                Rank higher on Google and attract organic traffic.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 transition">
              <h3 className="text-2xl font-bold mb-4">Digital Marketing</h3>
              <p className="text-gray-400">
                Grow your business using ads, content and email marketing.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-5xl font-bold text-center">
            Our Work
          </h2>

          <p className="text-gray-400 text-center mt-4">
            A few projects we've built for clients
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:scale-105 transition">
              <h3 className="text-xl font-bold mb-2">E-commerce Website</h3>
              <p className="text-gray-400 text-sm">
                High converting online store.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:scale-105 transition">
              <h3 className="text-xl font-bold mb-2">SEO Campaign</h3>
              <p className="text-gray-400 text-sm">
                Ranked page 1 on Google.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:scale-105 transition">
              <h3 className="text-xl font-bold mb-2">Brand Identity</h3>
              <p className="text-gray-400 text-sm">
                Full startup branding system.
              </p>
            </div>

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

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <p className="text-gray-300">
                "Great results in just 2 months."
              </p>
              <h4 className="mt-4 font-bold">— Alex</h4>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <p className="text-gray-300">
                "Amazing design and support."
              </p>
              <h4 className="mt-4 font-bold">— Sarah</h4>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <p className="text-gray-300">
                "Got real customers daily."
              </p>
              <h4 className="mt-4 font-bold">— David</h4>
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
</section><a
  href="https://wa.me/919847641809"
  target="_blank"
  className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
>
  💬
</a>
    </main>
  );
}
