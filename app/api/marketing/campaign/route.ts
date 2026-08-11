import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "GEMINI_API_KEY is not configured." }, { status: 500 });
    const body = await req.json();
    const { business = {}, campaign = {} } = body;
    const prompt = `Create a complete client-ready ${campaign.duration || "30-day"} marketing campaign.\nBusiness: ${JSON.stringify(business)}\nCampaign: ${JSON.stringify(campaign)}\nReturn these sections: 1 Campaign objective, 2 target audience and positioning, 3 offer, 4 channel strategy, 5 content plan, 6 Meta Ads plan, 7 Google Ads plan, 8 email sequence, 9 SEO/content plan, 10 weekly execution calendar, 11 KPIs, 12 budget allocation, 13 experiments. Be specific and practical. Clearly label assumptions.`;
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { temperature: 0.7 } }),
    });
    if (!response.ok) return NextResponse.json({ error: "Gemini could not build the campaign." }, { status: 502 });
    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("") || "";
    return NextResponse.json({ success: true, answer });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to build campaign." }, { status: 500 });
  }
}
