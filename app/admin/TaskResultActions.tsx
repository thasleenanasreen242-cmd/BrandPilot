"use client";
import { useState } from "react";
export default function TaskResultActions({ id, result }: { id: string; result: string | null }) {
  const [value, setValue] = useState(result || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  async function regenerate() { setLoading(true); setMessage(""); try { const r = await fetch("/api/admin/tasks/regenerate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); const data = await r.json(); if (!r.ok) throw new Error(data.error || "Failed"); setValue(data.result || ""); setMessage("Regenerated"); } catch (e) { setMessage(e instanceof Error ? e.message : "Failed"); } finally { setLoading(false); } }
  async function copy() { await navigator.clipboard.writeText(value); setMessage("Copied"); setTimeout(() => setMessage(""), 1500); }
  return <div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={copy} disabled={!value} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 disabled:opacity-40">Copy</button><button type="button" onClick={regenerate} disabled={loading} className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-300 hover:bg-blue-500/20 disabled:opacity-50">{loading ? "Regenerating…" : "Regenerate"}</button>{message && <span className="self-center text-[11px] text-gray-500">{message}</span>}</div>;
}
