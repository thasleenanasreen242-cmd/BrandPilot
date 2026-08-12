import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are BrandPilot AI, a professional AI employee for BrandPilot, a digital marketing and web design agency.

Act like a real BrandPilot team member. Help visitors, answer questions, understand their needs, and move genuine prospects toward the right next step.

BrandPilot Services:
- Website Design & Development
- SEO & Content Strategy
- Social Media Management
- Paid Ads (PPC)
- Email Marketing Automation
- Branding & Identity

Pricing:
- Starter: $149 one-time (up to 5 pages)
- Growth: $349 one-time (up to 10 pages, most popular)
- Growth+: $99/month (ongoing SEO, social content, and email marketing)

When a visitor shows buying intent, naturally qualify them. Collect the details you still need: name, email, business name, service needed, main goal, estimated budget, and expected starting timeline. Do not ask for every field at once unless appropriate.

Rules:
- Keep answers concise and conversational.
- Give practical advice.
- Never guarantee rankings, sales, or results.
- Never create fake discounts or services.
- Never pretend a lead was contacted or booked unless the application confirms it.`;

const EMPLOYEE_PROMPTS: Record<string, string> = {
  sales: `You are BrandPilot Sales AI. Focus on lead qualification, sales questions, objections, follow-ups, and moving qualified prospects toward a BrandPilot call or enquiry. Identify buying intent and collect missing lead details naturally.`,
  marketing: `You are BrandPilot Marketing AI. Focus on marketing strategy, campaigns, content planning, positioning, audience research, social media, and lead-generation ideas. When a visitor wants BrandPilot services, qualify the opportunity naturally.`,
  seo: `You are BrandPilot SEO AI. Focus on SEO strategy, technical SEO, keywords, content opportunities, local SEO, and search visibility. When a visitor wants BrandPilot services, qualify the opportunity naturally.`,
};

const SOCIAL_MEDIA_PROMPT = `You are SocialPilot AI, BrandPilot's AI Social Media Manager. Help businesses with Instagram content calendars, Reel ideas, hooks, captions, hashtags, content planning, engagement, brand storytelling, and social growth. Understand business type, audience, platform, and goal. Do not guarantee viral results. When a visitor wants BrandPilot services, qualify the opportunity naturally.`;

type ChatMessage = { role: "user" | "assistant"; content: string };
type LeadData = {
  name?: string;
  email?: string;
  phone?: string;
  business_name?: string;
  service?: string;
  goal?: string;
  budget?: string;
  timeline?: string;
};

function extractLeadData(messages: ChatMessage[]): LeadData {
  const text = messages.filter((m) => m.role === "user").map((m) => m.content).join("\n");
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
  const phone = text.match(/(?:\+?\d[\d\s().-]{7,}\d)/)?.[0];
  const budget = text.match(/(?:budget|spend|invest)\s*(?:is|:|around|of)?\s*([$€£₹]?\s?[\d,.]+\s?(?:k|K|per month|\/month)?)/i)?.[1];
  const timeline = text.match(/(?:start|starting|timeline|launch)\s*(?:is|:|around|in|by)?\s*([^.!?\n]{2,50})/i)?.[1]?.trim();
  return { email, phone, budget, timeline };
}

function isLeadIntent(messages: ChatMessage[]) {
  const text = messages.filter((m) => m.role === "user").map((m) => m.content).join(" ").toLowerCase();
  return /(hire|work with|interested|price|pricing|cost|quote|book|call|website|seo service|social media service|marketing service|need a website|start a project|proposal)/i.test(text);
}

export async function POST(req: NextRequest) {
  try {
    const { messages, employee = "general" }: { messages: ChatMessage[]; employee?: string } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Chat is not configured yet. Please contact us directly using the form below." }, { status: 500 });
    }

    const selectedPrompt = [SYSTEM_PROMPT, EMPLOYEE_PROMPTS[employee] || "", employee === "social" ? SOCIAL_MEDIA_PROMPT : ""].filter(Boolean).join("\n\n");
    const contents = messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
      body: JSON.stringify({ system_instruction: { parts: [{ text: selectedPrompt }] }, contents }),
    });

    if (!response.ok) {
      console.error("Gemini API error:", await response.text());
      return NextResponse.json({ error: "Sorry, something went wrong. Please try again." }, { status: 500 });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("") || "";

    let leadSaved = false;
    if (isLeadIntent(messages) && process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const lead = extractLeadData(messages);
      const userText = messages.filter((m) => m.role === "user").map((m) => m.content).join("\n");
      const supabaseResponse = await fetch(`${process.env.SUPABASE_URL}/rest/v1/ai_employee_leads`, {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ employee, ...lead, conversation: messages, source: "website_chat", status: "new" }),
      });
      leadSaved = supabaseResponse.ok;
      if (!supabaseResponse.ok) console.error("Lead save error:", await supabaseResponse.text());
      void userText;
    }

    return NextResponse.json({ reply: text, leadSaved });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Sorry, something went wrong. Please try again." }, { status: 500 });
  }
}
