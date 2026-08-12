import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const allowed = new Set(["new", "qualified", "follow_up", "booked", "won", "lost"]);

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  if (!user || !adminEmail || user.email?.toLowerCase() !== adminEmail) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await req.json();
  if (!id || !allowed.has(status)) return NextResponse.json({ error: "Invalid lead status" }, { status: 400 });

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: "Server configuration missing" }, { status: 500 });
  const headers = { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" };
  const patch: Record<string, unknown> = { lifecycle_status: status };
  if (status === "qualified") patch.qualification_status = "qualified";
  if (status === "booked") { patch.booking_status = "booked"; patch.follow_up_status = "stopped"; patch.follow_up_at = null; }
  if (status === "won" || status === "lost") { patch.follow_up_status = "stopped"; patch.follow_up_at = null; }
  if (status === "follow_up") { patch.follow_up_status = "pending"; patch.follow_up_at = new Date(Date.now() + 86400000).toISOString(); }

  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/ai_employee_leads?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers, body: JSON.stringify(patch) });
  if (!response.ok) return NextResponse.json({ error: "Unable to update lead" }, { status: 500 });
  return NextResponse.json({ success: true });
}
