"use client";

import { useState } from "react";

const statuses = ["new", "qualified", "follow_up", "booked", "won", "lost"];

export default function LeadStatusSelect({ id, initialStatus }: { id: string; initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus || "new");
  const [saving, setSaving] = useState(false);

  async function update(value: string) {
    setStatus(value);
    setSaving(true);
    try {
      const response = await fetch("/api/admin/leads/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: value }),
      });
      if (!response.ok) setStatus(initialStatus || "new");
    } finally {
      setSaving(false);
    }
  }

  return (
    <select value={status} disabled={saving} onChange={(e) => update(e.target.value)} className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white outline-none">
      {statuses.map((item) => <option key={item} value={item}>{item.replace("_", " ")}</option>)}
    </select>
  );
}
