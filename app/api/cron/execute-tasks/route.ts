import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.GEMINI_API_KEY) return NextResponse.json({ error: "Server configuration missing" }, { status: 500 });
  const headers = { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" };
  const base = process.env.SUPABASE_URL;
  const due = await fetch(`${base}/rest/v1/ai_employee_tasks?select=id,lead_id,employee,task_type,title,description,priority,status,due_at&status=eq.pending&due_at=lte.${encodeURIComponent(new Date().toISOString())}&limit=10`, { headers, cache: "no-store" });
  if (!due.ok) return NextResponse.json({ error: "Unable to load tasks" }, { status: 500 });
  const tasks = await due.json() as { id: string; lead_id: string | null; employee: string; task_type: string; title: string; description: string | null }[];
  let executed = 0;
  for (const task of tasks) {
    let context = "";
    if (task.lead_id) {
      const lead = await fetch(`${base}/rest/v1/ai_employee_leads?select=name,business_name,service,goal,budget,timeline,conversation&id=eq.${encodeURIComponent(task.lead_id)}&limit=1`, { headers, cache: "no-store" });
      if (lead.ok) context = JSON.stringify((await lead.json())[0] || {});
    }
    const prompt = `You are ${task.employee} AI for BrandPilot. Execute this internal task now. Task: ${task.title}. Details: ${task.description || ""}. Lead context: ${context}. Produce a practical, ready-to-use result for the BrandPilot team. Do not claim external actions were completed. Return only the deliverable.`;
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }) });
    if (!response.ok) continue;
    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("") || "";
    if (!result) continue;
    const update = await fetch(`${base}/rest/v1/ai_employee_tasks?id=eq.${encodeURIComponent(task.id)}`, { method: "PATCH", headers, body: JSON.stringify({ status: "completed", result, executed_at: new Date().toISOString(), completed_at: new Date().toISOString() }) });
    if (update.ok) executed++;
  }
  return NextResponse.json({ processed: tasks.length, executed });
}
