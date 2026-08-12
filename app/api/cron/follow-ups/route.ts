import { NextRequest, NextResponse } from "next/server";

type Lead = {
  id: string;
  employee: string;
  name: string | null;
  email: string | null;
  business_name: string | null;
  service: string | null;
  follow_up_count: number;
  lifecycle_status: string;
  booking_status: string;
  opted_out: boolean;
};

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || req.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Supabase server configuration is missing" }, { status: 500 });
  }

  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const dueResponse = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/ai_employee_leads?select=id,employee,name,email,business_name,service,follow_up_count,lifecycle_status,booking_status,opted_out&follow_up_status=eq.pending&follow_up_at=lte.${encodeURIComponent(new Date().toISOString())}&lifecycle_status=not.in.(booked,won,lost)&booking_status=neq.booked&opted_out=eq.false&limit=50`,
    { headers, cache: "no-store" }
  );

  if (!dueResponse.ok) {
    console.error("Follow-up query failed:", await dueResponse.text());
    return NextResponse.json({ error: "Unable to load follow-up leads" }, { status: 500 });
  }

  const leads = (await dueResponse.json()) as Lead[];
  const endpoint = process.env.FORMSPREE_LEAD_ENDPOINT || "https://formspree.io/f/xdarbpol";
  let notified = 0;

  for (const lead of leads) {
    if (!lead.email || lead.opted_out || lead.booking_status === "booked" || ["booked", "won", "lost"].includes(lead.lifecycle_status)) continue;

    const ownerNotification = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `Follow-up needed: BrandPilot ${lead.employee} lead`,
        type: "AI Employee follow-up reminder",
        lead_name: lead.name || "Website visitor",
        lead_email: lead.email,
        business: lead.business_name || "Not provided",
        service: lead.service || "Not specified",
        employee: lead.employee,
        message: "This lead is due for follow-up and is not marked booked, won, lost, or opted out.",
      }),
    });

    if (ownerNotification.ok) {
      notified += 1;
      await fetch(`${process.env.SUPABASE_URL}/rest/v1/ai_employee_leads?id=eq.${encodeURIComponent(lead.id)}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          lifecycle_status: "follow_up",
          follow_up_status: "reminded",
          follow_up_count: (lead.follow_up_count || 0) + 1,
          last_follow_up_at: new Date().toISOString(),
        }),
      });
    }
  }

  return NextResponse.json({ processed: leads.length, ownerNotificationsSent: notified });
}
