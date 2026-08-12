import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

function verifySignature(body: string, signature: string | null, secret: string) {
  if (!signature) return false;
  const values = Object.fromEntries(signature.split(",").map((part) => part.split("=")));
  const timestamp = values.t;
  const received = values.v1;
  if (!timestamp || !received) return false;
  const age = Math.abs(Date.now() - Number(timestamp) * 1000);
  if (!Number.isFinite(age) || age > 300000) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(received, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const secret = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (!secret || !verifySignature(body, req.headers.get("Calendly-Webhook-Signature"), secret)) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Supabase server configuration is missing" }, { status: 500 });
  }

  try {
    const payload = JSON.parse(body) as { event?: string; payload?: { email?: string; invitee?: { email?: string } } };
    const email = payload.payload?.email || payload.payload?.invitee?.email;
    if (!email) return NextResponse.json({ received: true, matched: false });

    const headers = {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    };
    const lookup = await fetch(`${process.env.SUPABASE_URL}/rest/v1/ai_employee_leads?select=id&email=eq.${encodeURIComponent(email)}&limit=1`, { headers, cache: "no-store" });
    if (!lookup.ok) return NextResponse.json({ error: "Unable to find lead" }, { status: 500 });
    const leads = (await lookup.json()) as { id: string }[];
    if (!leads.length) return NextResponse.json({ received: true, matched: false });

    const id = leads[0].id;
    const booked = payload.event === "invitee.created";
    const canceled = payload.event === "invitee.canceled";
    if (booked || canceled) {
      await fetch(`${process.env.SUPABASE_URL}/rest/v1/ai_employee_leads?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(booked
          ? { booking_status: "booked", lifecycle_status: "booked", qualification_status: "qualified", follow_up_status: "stopped", follow_up_at: null }
          : { booking_status: "canceled", lifecycle_status: "follow_up", follow_up_status: "pending", follow_up_at: new Date(Date.now() + 86400000).toISOString() }),
      });
    }
    return NextResponse.json({ received: true, matched: true, event: payload.event });
  } catch (error) {
    console.error("Calendly webhook error:", error);
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }
}
