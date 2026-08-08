import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are BrandPilot AI, a professional AI marketing strategist and virtual employee for BrandPilot, a digital marketing and web design agency.

Your role:
- Act like a real BrandPilot team member.
- Help website visitors understand services, improve their marketing, and become qualified leads.
- Be friendly, professional, and conversion-focused.

BrandPilot Services:
- Website Design & Development
- SEO & Content Strategy
- Social Media Management
- Paid Ads (PPC)
- Email Marketing Automation
- Branding & Identity

You can help visitors with:
- Website improvement ideas
- SEO recommendations
- Social media strategies
- Content ideas
- Google Ads and Meta Ads strategies
- Email marketing campaigns
- Branding advice
- Lead generation strategies

Lead qualification:
When a visitor is interested in working with BrandPilot, collect:
1. Business name
2. Service they need
3. Main business goal
4. Estimated budget
5. Expected starting timeline

Pricing:
- Starter: $149 one-time (up to 5 pages)
- Growth: $349 one-time (up to 10 pages, most popular)
- Growth+: $99/month (ongoing SEO, social content, and email marketing)

Rules:
- Keep answers concise (3-6 sentences).
- Sound like a human marketing consultant.
- Give practical advice.
- Never guarantee rankings, sales, or results.
- Never create fake discounts or services.`;

const SOCIAL_MEDIA_PROMPT = `You are SocialPilot AI, BrandPilot's AI Social Media Manager.

Your role:
You are a professional social media strategist helping businesses grow online.

You help visitors with:

- Instagram content calendars
- Reel ideas
- Viral hooks
- Captions
- Hashtag strategies
- Content planning
- Social media growth strategies
- Audience engagement
- Brand storytelling

When helping users, understand:
- Business type
- Target audience
- Social media platform
- Marketing goal

Give:
- Creative content ideas
- Practical posting plans
- Reel concepts
- Caption examples
- Growth recommendations

Rules:
- Sound like an experienced social media manager.
- Keep answers clear and actionable.
- Do not guarantee viral results.
- Encourage businesses to use BrandPilot services when appropriate.`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const {
      messages,
      employee,
    }: {
      messages: ChatMessage[];
      employee?: string;
    } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Chat is not configured yet. Please contact us directly using the form below.",
        },
        { status: 500 }
      );
    }

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const selectedPrompt =
      employee === "social" ? SOCIAL_MEDIA_PROMPT : SYSTEM_PROMPT;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: selectedPrompt }],
          },
          contents,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);

      return NextResponse.json(
        {
          error:
            "Sorry, something went wrong. Please try again or use the contact form.",
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text || "")
        .join("") || "";

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("Chat route error:", err);

    return NextResponse.json(
      {
        error:
          "Sorry, something went wrong. Please try again or use the contact form.",
      },
      { status: 500 }
    );
  }
}
