import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./SignOutButton";

type Lead = {
  id: string;
  employee: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  business_name: string | null;
  service: string | null;
  goal: string | null;
  budget: string | null;
  timeline: string | null;
  status: string;
  created_at: string;
};

async function getLeads() {
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/ai_employee_leads?select=id,employee,name,email,phone,business_name,service,goal,budget,timeline,status,created_at&order=created_at.desc&limit=100`, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
    },
    cache: "no-store",
  });

  if (!response.ok) return [] as Lead[];
  return (await response.json()) as Lead[];
}

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  if (!adminEmail || user.email?.toLowerCase() !== adminEmail) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-md text-center rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h1 className="text-2xl font-black">Admin access not configured</h1>
          <p className="text-gray-400 mt-3 text-sm">Add ADMIN_EMAIL to the BrandPilot Vercel environment variables and set it to the email used for your Supabase admin account.</p>
          <div className="mt-6 flex justify-center"><SignOutButton /></div>
        </div>
      </main>
    );
  }

  const leads = await getLeads();
  const newCount = leads.filter((lead) => lead.status === "new").length;
  const salesCount = leads.filter((lead) => lead.employee === "sales").length;
  const marketingCount = leads.filter((lead) => lead.employee === "marketing").length;
  const seoCount = leads.filter((lead) => lead.employee === "seo").length;
  const socialCount = leads.filter((lead) => lead.employee === "social").length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-sm font-semibold text-blue-400">BRANDPILOT</p>
            <h1 className="text-3xl md:text-4xl font-black mt-1">AI Employee Control Center</h1>
            <p className="text-gray-400 mt-2 text-sm">Signed in as {user.email}</p>
          </div>
          <div className="flex gap-3"><a href="/" className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/10">Website</a><SignOutButton /></div>
        </header>

        <section className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {[
            ["Total leads", leads.length],
            ["New", newCount],
            ["Sales AI", salesCount],
            ["Marketing AI", marketingCount],
            ["SEO / Social", seoCount + socialCount],
          ].map(([label, value]) => (
            <div key={label as string} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-widest text-gray-500">{label}</p>
              <p className="text-3xl font-black mt-2">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div><h2 className="text-xl font-bold">Recent leads</h2><p className="text-sm text-gray-500 mt-1">Latest AI employee conversations showing buying intent.</p></div>
            <span className="text-sm text-gray-500">Up to 100 leads</span>
          </div>
          {leads.length === 0 ? (
            <div className="p-10 text-center text-gray-500">No leads captured yet. Your AI employees will populate this automatically.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-gray-500 border-b border-white/10"><th className="px-6 py-4">Lead</th><th className="px-6 py-4">Employee</th><th className="px-6 py-4">Business</th><th className="px-6 py-4">Service</th><th className="px-6 py-4">Budget</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Date</th></tr></thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                      <td className="px-6 py-4"><p className="font-semibold">{lead.name || "Website visitor"}</p><p className="text-gray-500">{lead.email || "No email"}</p></td>
                      <td className="px-6 py-4"><span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-300 capitalize">{lead.employee}</span></td>
                      <td className="px-6 py-4 text-gray-300">{lead.business_name || "—"}</td>
                      <td className="px-6 py-4 text-gray-300">{lead.service || "—"}</td>
                      <td className="px-6 py-4 text-gray-300">{lead.budget || "—"}</td>
                      <td className="px-6 py-4"><span className="rounded-full bg-white/5 px-3 py-1 capitalize text-gray-300">{lead.status}</span></td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{new Date(lead.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
