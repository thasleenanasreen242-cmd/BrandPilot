import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./SignOutButton";
import LeadStatusSelect from "./LeadStatusSelect";
import TaskStatusSelect from "./TaskStatusSelect";

type Lead = { id: string; employee: string; name: string | null; email: string | null; phone: string | null; business_name: string | null; service: string | null; goal: string | null; budget: string | null; timeline: string | null; status: string; lifecycle_status: string | null; qualification_status: string | null; booking_status: string | null; follow_up_status: string | null; follow_up_at: string | null; created_at: string; };
type Task = { id: string; lead_id: string | null; employee: string; task_type: string; title: string; description: string | null; priority: string; status: string; due_at: string | null; created_at: string; };

async function getData() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return { leads: [] as Lead[], tasks: [] as Task[] };
  const headers = { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` };
  const base = process.env.SUPABASE_URL;
  const [leadResponse, taskResponse] = await Promise.all([
    fetch(`${base}/rest/v1/ai_employee_leads?select=id,employee,name,email,phone,business_name,service,goal,budget,timeline,status,lifecycle_status,qualification_status,booking_status,follow_up_status,follow_up_at,created_at&order=created_at.desc&limit=100`, { headers, cache: "no-store" }),
    fetch(`${base}/rest/v1/ai_employee_tasks?select=id,lead_id,employee,task_type,title,description,priority,status,due_at,created_at&order=created_at.desc&limit=100`, { headers, cache: "no-store" }),
  ]);
  return { leads: leadResponse.ok ? await leadResponse.json() as Lead[] : [], tasks: taskResponse.ok ? await taskResponse.json() as Task[] : [] };
}

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  if (!adminEmail || user.email?.toLowerCase() !== adminEmail) return <main className="min-h-screen bg-black text-white flex items-center justify-center px-6"><div className="max-w-md text-center rounded-3xl border border-white/10 bg-white/[0.04] p-8"><h1 className="text-2xl font-black">Admin access not configured</h1><p className="text-gray-400 mt-3 text-sm">Add ADMIN_EMAIL to Vercel and use that email for your Supabase admin account.</p><SignOutButton /></div></main>;

  const { leads, tasks } = await getData();
  const count = (value: string) => leads.filter((lead) => lead.lifecycle_status === value || (value === "new" && lead.status === "new")).length;
  const employees = ["sales", "marketing", "seo", "social"];
  return <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white px-6 py-8"><div className="max-w-7xl mx-auto">
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6"><div><p className="text-sm font-semibold text-blue-400">BRANDPILOT</p><h1 className="text-3xl md:text-4xl font-black mt-1">AI Employee Control Center</h1><p className="text-gray-400 mt-2 text-sm">Signed in as {user.email}</p></div><div className="flex gap-3"><a href="/" className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/10">Website</a><SignOutButton /></div></header>
    <section className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">{[["Total leads", leads.length],["New",count("new")],["Qualified",count("qualified")],["Follow-ups",count("follow_up")],["Booked",count("booked")]].map(([label,value]) => <div key={label as string} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><p className="text-xs uppercase tracking-widest text-gray-500">{label}</p><p className="text-3xl font-black mt-2">{value}</p></div>)}</section>
    <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">{employees.map((employee) => <div key={employee} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"><p className="text-xs uppercase tracking-widest text-gray-500">{employee} AI</p><p className="text-2xl font-bold mt-1">{leads.filter((l) => l.employee === employee).length} leads</p><p className="text-xs text-gray-600 mt-1">{tasks.filter((t) => t.employee === employee && t.status !== "completed").length} open tasks</p></div>)}</section>
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden"><div className="px-6 py-5 border-b border-white/10"><h2 className="text-xl font-bold">AI Employee Tasks</h2><p className="text-sm text-gray-500 mt-1">Actions generated from qualified opportunities.</p></div>{tasks.length === 0 ? <div className="p-10 text-center text-gray-500">No AI tasks yet.</div> : <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-gray-500 border-b border-white/10"><th className="px-6 py-4">Task</th><th className="px-6 py-4">Employee</th><th className="px-6 py-4">Priority</th><th className="px-6 py-4">Due</th><th className="px-6 py-4">Status</th></tr></thead><tbody>{tasks.map((task) => <tr key={task.id} className="border-b border-white/5"><td className="px-6 py-4"><p className="font-semibold">{task.title}</p><p className="text-xs text-gray-500">{task.description || task.task_type}</p></td><td className="px-6 py-4 capitalize">{task.employee}</td><td className="px-6 py-4 capitalize">{task.priority}</td><td className="px-6 py-4 text-gray-500">{task.due_at ? new Date(task.due_at).toLocaleString() : "—"}</td><td className="px-6 py-4"><TaskStatusSelect id={task.id} initialStatus={task.status} /></td></tr>)}</tbody></table></div>}</section>
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden"><div className="px-6 py-5 border-b border-white/10"><h2 className="text-xl font-bold">Lead Pipeline</h2></div>{leads.length === 0 ? <div className="p-10 text-center text-gray-500">No leads captured yet.</div> : <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-gray-500 border-b border-white/10"><th className="px-6 py-4">Lead</th><th className="px-6 py-4">Employee</th><th className="px-6 py-4">Business</th><th className="px-6 py-4">Pipeline</th><th className="px-6 py-4">Follow-up</th><th className="px-6 py-4">Action</th></tr></thead><tbody>{leads.map((lead) => <tr key={lead.id} className="border-b border-white/5"><td className="px-6 py-4"><p className="font-semibold">{lead.name || "Website visitor"}</p><p className="text-gray-500">{lead.email || "No email"}</p></td><td className="px-6 py-4 capitalize">{lead.employee}</td><td className="px-6 py-4">{lead.business_name || "—"}</td><td className="px-6 py-4 capitalize">{lead.lifecycle_status || lead.status}<div className="text-xs text-gray-600">{lead.booking_status === "booked" ? "Calendly booked" : lead.qualification_status || "unqualified"}</div></td><td className="px-6 py-4 capitalize">{lead.follow_up_status || "not_due"}</td><td className="px-6 py-4"><LeadStatusSelect id={lead.id} initialStatus={lead.lifecycle_status || lead.status || "new"} /></td></tr>)}</tbody></table></div>}</section>
  </div></main>;
}
