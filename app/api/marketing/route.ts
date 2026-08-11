import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured." }, { status: 500 });
    }

    const body = await req.json();
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const business = body?.business ?? {};

    if (!prompt) {
      return NextResponse.json({ error: "Marketing request is required." }, { status: 400 });
    }

    const system = `You are BrandPilot Marketing AI, a senior full-service digital marketing manager.
You handle strategy, market research, competitor analysis, SEO, social media, content, Google Ads, Meta Ads, email marketing, lead generation, offers, campaign planning, creative briefs, analytics interpretation and optimization.
Give practical, client-ready work. Never claim to have actually published ads, posts, emails, changed analytics, or contacted customers unless a connected tool has explicitly done so.
When information is missing, make clearly labeled reasonable assumptions rather than inventing facts.
Return useful structured output with headings, bullets, tables when appropriate, and concrete next actions.
Business profile: ${JSON.stringify(business)}`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7 },
        }),
      }
    );

    if (!response.ok) {
      console.error("Gemini marketing error:", await response.text());
      return NextResponse.json({ error: "Gemini could not generate the marketing response." }, { status: 502 });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? "").join("") ?? "";

    if (!text) {
      return NextResponse.json({ error: "Gemini returned an empty response." }, { status: 502 });
    }

    return NextResponse.json({ success: true, answer: text });
  } catch (error) {
    console.error("Marketing API error:", error);
    return NextResponse.json({ error: "Unable to complete the marketing task." }, { status: 500 });
  }
}
