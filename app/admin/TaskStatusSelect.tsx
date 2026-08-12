"use client";
import { useState } from "react";
const statuses = ["pending", "in_progress", "completed", "cancelled"];
export default function TaskStatusSelect({ id, initialStatus }: { id: string; initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus || "pending");
  const [saving, setSaving] = useState(false);
  async function update(value: string) {
    const previous = status;
    setStatus(value); setSaving(true);
    try { const response = await fetch("/api/admin/tasks", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: value }) }); if (!response.ok) setStatus(previous); }
    catch { setStatus(previous); } finally { setSaving(false); }
  }
  return <select value={status} disabled={saving} onChange={(e) => update(e.target.value)} className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white capitalize outline-none">{statuses.map((item) => <option key={item} value={item}>{item.replace("_", " ")}</option>)}</select>;
}
