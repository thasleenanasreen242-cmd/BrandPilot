import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  if (!user || !adminEmail || user.email?.toLowerCase() !== adminEmail) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.GEMINI_API_KEY) return NextResponse.json({ error: "Server configuration missing" }, { status: 500 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Task id is required" }, { status: 400 });
  const headers = { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, "Content-Type": "application/json" };
  const base = process.env.SUPABASE_URL;
  const taskResponse = await fetch(`${base}/rest/v1/ai_employee_tasks?select=id,lead_id,employee,title,description&id=eq.${encodeURIComponent(id)}&limit=1`, { headers, cache: "no-store" });
  if (!taskResponse.ok) return NextResponse.json({ error: "Unable to load task" }, { status: 500 });
  const task = (await taskResponse.json())[0];
  if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
  let context = "";
  if (task.lead_id) { const lead = await fetch(`${base}/rest/v1/ai_employee_leads?select=name,business_name,service,goal,budget,timeline,conversation&id=eq.${encodeURIComponent(task.lead_id)}&limit=1`, { headers, cache: "no-store" }); if (lead.ok) context = JSON.stringify((await lead.json())[0] || {}); }
  const prompt = `You are ${task.employee} AI for BrandPilot. Regenerate a better, ready-to-use deliverable for this task. Task: ${task.title}. Details: ${task.description || ""}. Lead context: ${context}. Do not invent facts or claim external actions. Clearly label assumptions. Return only the deliverable with useful headings and bullets.`;
  const ai = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { temperature: 0.5, maxOutputTokens: 1800 } }) });
  if (!ai.ok) return NextResponse.json({ error: "AI regeneration failed" }, { status: 500 });
  const data = await ai.json();
  const result = data.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("") || "";
  if (!result) return NextResponse.json({ error: "AI returned no deliverable" }, { status: 500 });
  const update = await fetch(`${base}/rest/v1/ai_employee_tasks?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers, body: JSON.stringify({ result, status: "completed", executed_at: new Date().toISOString(), completed_at: new Date().toISOString() }) });
  if (!update.ok) return NextResponse.json({ error: "Unable to save deliverable" }, { status: 500 });
  return NextResponse.json({ result });
}
