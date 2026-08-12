import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const allowed = new Set(["pending", "in_progress", "completed", "cancelled"]);

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  if (!user || !adminEmail || user.email?.toLowerCase() !== adminEmail) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await req.json();
  if (!id || !allowed.has(status)) return NextResponse.json({ error: "Invalid task update" }, { status: 400 });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: "Server configuration missing" }, { status: 500 });
  const headers = { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" };
  const patch: Record<string, unknown> = { status };
  if (status === "completed") patch.completed_at = new Date().toISOString();
  if (status !== "completed") patch.completed_at = null;
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/ai_employee_tasks?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers, body: JSON.stringify(patch) });
  if (!response.ok) return NextResponse.json({ error: "Unable to update task" }, { status: 500 });
  return NextResponse.json({ success: true });
}
