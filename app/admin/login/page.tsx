"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white flex items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,.15),transparent_45%)]" />
      <form onSubmit={signIn} className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 shadow-2xl">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-400">BRANDPILOT</p>
          <h1 className="text-3xl font-black mt-2">AI Employee Control Center</h1>
          <p className="text-gray-400 mt-2 text-sm">Private team access only.</p>
        </div>
        <label className="block text-sm text-gray-300 mb-2">Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-blue-400/50" />
        <label className="block text-sm text-gray-300 mt-5 mb-2">Password</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-blue-400/50" />
        {error && <p className="text-sm text-red-300 mt-4">{error}</p>}
        <button disabled={loading} className="w-full mt-6 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-3 font-bold transition">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
