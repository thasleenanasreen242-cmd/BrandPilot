"use client";

import { createClient } from "@/lib/supabase/browser";

export default function SignOutButton() {
  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <button onClick={signOut} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition">
      Sign out
    </button>
  );
}
