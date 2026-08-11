import { NextResponse } from "next/server";

const MODEL = "gemini-2.5-flash";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "GEMINI_API_KEY is not configured in Vercel." }, { status: 500 });
    const { customer, audit } = await request.json();
    if (!customer?.website) return NextResponse.json({ error: "Customer website is required." }, { status: 400 });
    const prompt = `You are BrandPilot's AI Marketing Manager. Build a practical marketing workspace for this CUSTOMER. Do not talk about BrandPilot's own website. Use the supplied audit as evidence and clearly label reasonable assumptions. Return ONLY JSON.
CUSTOMER: ${JSON.stringify(customer)}
SEO AUDIT: ${JSON.stringify(audit || {})}
Return this shape: {"businessSummary":"string","strategy":"string","seo":{"priorities":["string"],"keywords":["string"]},"content":{"topics":["string"],"formats":["string"]},"social":{"platforms":["string"],"ideas":["string"]},"ads":{"channels":["string"],"campaigns":["string"]},"email":{"campaigns":["string"]},"competitorStrategy":["string"],"next30Days":[{"week":"Week 1","actions":["string"]}]}`;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.45, responseMimeType: "application/json" } }) });
    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data?.error?.message || "Gemini marketing workspace failed." }, { status: response.status });
    const text = data?.candidates?.[0]?.content?.parts?.map((p: {text?:string}) => p.text || "").join("") || "";
    let workspace; try { workspace = JSON.parse(text); } catch { const match = text.match(/\{[\s\S]*\}/); workspace = match ? JSON.parse(match[0]) : null; }
    if (!workspace) return NextResponse.json({ error: "Gemini returned invalid workspace data." }, { status: 502 });
    return NextResponse.json({ success: true, workspace });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create marketing workspace." }, { status: 500 }); }
}
