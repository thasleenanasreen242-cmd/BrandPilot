import { NextResponse } from "next/server";

const MODEL = "gemini-2.5-flash";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "GEMINI_API_KEY is not configured in Vercel." }, { status: 500 });
    const body = await request.json();
    const audit = body?.audit;
    if (!audit?.website || !audit?.scores || !audit?.audit) return NextResponse.json({ error: "A completed customer audit is required." }, { status: 400 });
    const prompt = `You are BrandPilot's sales strategist. Create a client-ready digital growth proposal from the customer's real website audit below.
IMPORTANT: The customer website is the object being analyzed. Use only supplied audit evidence. Recommend only relevant services. Never invent pricing. Return ONLY valid JSON.
FIXED BRANDPILOT PACKAGES:
Starter: $149 one-time — up to 5 pages.
Growth: $349 one-time — up to 10 pages.
Growth+: $99/month — ongoing SEO, social content and email marketing.
Return: {"title":"string","website":"string","summary":"string","currentHealth":"string","keyIssues":["string"],"recommendedServices":[{"service":"string","reason":"string"}],"package":{"name":"Starter|Growth|Growth+","price":"$149|$349|$99/month","reason":"string"},"actionPlan":[{"week":"Week 1","focus":"string","actions":["string"]}],"expectedOutcomes":["string"],"closing":"string"}
CUSTOMER AUDIT:
${JSON.stringify(audit)}`;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.35, responseMimeType: "application/json" } }) });
    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data?.error?.message || "Gemini proposal generation failed." }, { status: response.status });
    const text = data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || "").join("") || "";
    let proposal;
    try { proposal = JSON.parse(text); } catch { const match = text.match(/\{[\s\S]*\}/); proposal = match ? JSON.parse(match[0]) : null; }
    if (!proposal) return NextResponse.json({ error: "Gemini returned an invalid proposal." }, { status: 502 });
    return NextResponse.json({ success: true, proposal });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to generate proposal." }, { status: 500 }); }
}
