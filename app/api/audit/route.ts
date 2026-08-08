import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const FETCH_TIMEOUT = 12000;
const MAX_HTML_SIZE = 1500000;

function normalizeUrl(value: string) {
  let url = value.trim();

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  const parsed = new URL(url);

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only HTTP and HTTPS websites are supported.");
  }

  return parsed;
}

function isPrivateHost(hostname: string) {
  const host = hostname.toLowerCase();

  const blockedHosts = [
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "::1",
    "metadata",
    "metadata.google.internal",
  ];

  if (blockedHosts.includes(host)) {
    return true;
  }

  const ip = host.match(
    /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/
  );

  if (!ip) return false;

  const a = Number(ip[1]);
  const b = Number(ip[2]);

  return (
    a === 10 ||
    a === 127 ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 169 && b === 254)
  );
}

async function fetchWebsite(url: string, timeout = FETCH_TIMEOUT) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    return await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "BrandPilot-AuditBot/1.0 (+https://www.brandpilotcloud.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function readLimitedHtml(
  response: Response,
  maxBytes: number
) {
  if (!response.body) return "";

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let total = 0;
  let html = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    total += value.byteLength;

    if (total > maxBytes) {
      await reader.cancel();
      break;
    }

    html += decoder.decode(value, {
      stream: true,
    });
  }

  html += decoder.decode();

  return html;
}

function getTitle(html: string) {
  const match = html.match(
    /<title[^>]*>([\s\S]*?)<\/title>/i
  );

  return match
    ? match[1].replace(/\s+/g, " ").trim()
    : "";
}

function getMetaDescription(html: string) {
  const first = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["'][^>]*>/i
  );

  if (first) return first[1].trim();

  const second = html.match(
    /<meta[^>]+content=["']([\s\S]*?)["'][^>]+name=["']description["'][^>]*>/i
  );

  return second ? second[1].trim() : "";
}

function getMeta(html: string, name: string) {
  const first = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([\\s\\S]*?)["'][^>]*>`,
    "i"
  );

  const second = new RegExp(
    `<meta[^>]+content=["']([\\s\\S]*?)["'][^>]+(?:name|property)=["']${name}["'][^>]*>`,
    "i"
  );

  const result = html.match(first);

  if (result) return result[1].trim();

  const reverse = html.match(second);

  return reverse ? reverse[1].trim() : "";
}

function countTag(html: string, tag: string) {
  const matches = html.match(
    new RegExp(`<${tag}\\b`, "gi")
  );

  return matches?.length ?? 0;
}

function getImages(html: string) {
  const images =
    html.match(/<img\b[^>]*>/gi) ?? [];

  let missingAlt = 0;

  for (const image of images) {
    const alt = image.match(
      /\balt=["']([\s\S]*?)["']/i
    );

    if (!alt || !alt[1].trim()) {
      missingAlt++;
    }
  }

  return {
    total: images.length,
    missingAlt,
  };
}

function getWordCount(html: string) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return 0;

  return text.split(/\s+/).length;
}

function getLinks(html: string) {
  const links =
    html.match(/<a\b[^>]*href=["'][^"']+["']/gi) ?? [];

  return links.length;
}

function calculateScores(data: {
  title: string;
  description: string;
  h1: number;
  h2: number;
  images: number;
  missingAlt: number;
  links: number;
  wordCount: number;
  canonical: boolean;
  viewport: boolean;
  robots: boolean;
  sitemap: boolean;
  https: boolean;
  status: number;
}) {
  let seo = 100;

  if (!data.title) {
    seo -= 20;
  } else if (
    data.title.length < 30 ||
    data.title.length > 60
  ) {
    seo -= 8;
  }

  if (!data.description) {
    seo -= 20;
  } else if (
    data.description.length < 70 ||
    data.description.length > 160
  ) {
    seo -= 8;
  }

  if (data.h1 === 0) seo -= 15;
  if (data.h1 > 1) seo -= 5;

  if (!data.canonical) seo -= 5;
  if (!data.robots) seo -= 5;
  if (!data.sitemap) seo -= 5;

  let content = 100;

  if (data.wordCount < 300) {
    content -= 25;
  } else if (data.wordCount < 600) {
    content -= 12;
  }

  if (data.h1 === 0) content -= 15;
  if (data.h2 === 0) content -= 8;
  if (data.links < 3) content -= 8;

  let technical = 100;

  if (!data.https) technical -= 25;
  if (!data.viewport) technical -= 20;

  if (data.status < 200 || data.status >= 400) {
    technical -= 25;
  }

  let brand = 100;

  if (!data.title) brand -= 20;
  if (!data.description) brand -= 15;
  if (!data.h1) brand -= 15;

  const performance = Math.max(
    40,
    100 -
      Math.min(35, Math.round(data.images / 10) * 5) -
      Math.min(20, Math.round(data.links / 50) * 5)
  );

  seo = Math.max(0, Math.min(100, seo));
  content = Math.max(0, Math.min(100, content));
  technical = Math.max(0, Math.min(100, technical));
  brand = Math.max(0, Math.min(100, brand));

  const overall = Math.round(
    seo * 0.3 +
      performance * 0.2 +
      content * 0.2 +
      brand * 0.15 +
      technical * 0.15
  );

  return {
    overall,
    seo,
    performance,
    content,
    brand,
    technical,
  };
}

async function generateAIRecommendations(audit: unknown) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      summary:
        "Your website was successfully analyzed. AI recommendations are unavailable because the Gemini API is not configured.",
      recommendations: [],
    };
  }

  const prompt = `
You are BrandPilot AI, an expert SEO, website and digital marketing auditor.

Analyze the website audit data below.

Return ONLY valid JSON:

{
  "summary": "A concise 2-3 sentence summary.",
  "recommendations": [
    {
      "priority": "high",
      "category": "SEO",
      "title": "Short title",
      "description": "Specific actionable recommendation."
    }
  ]
}

Rules:
- Provide 5 to 8 recommendations.
- Use only evidence contained in the audit data.
- Do not invent website facts.
- Prioritize high-impact issues.
- priority must be "high", "medium", or "low".
- Recommendations should be practical and specific.

AUDIT DATA:
${JSON.stringify(audit)}
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text:
                  "You are BrandPilot's website audit intelligence engine.",
              },
            ],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      console.error(
        "Gemini audit error:",
        await response.text()
      );

      return {
        summary:
          "The technical audit completed successfully, but AI recommendations could not be generated.",
        recommendations: [],
      };
    }

    const result = await response.json();

    const text =
      result.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text ?? "")
        .join("") ?? "";

    try {
      return JSON.parse(text);
    } catch {
      return {
        summary:
          "The technical audit completed successfully.",
        recommendations: [],
      };
    }
  } catch (error) {
    console.error("Gemini request failed:", error);

    return {
      summary:
        "The technical audit completed successfully, but AI recommendations could not be generated.",
      recommendations: [],
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.url || typeof body.url !== "string") {
      return NextResponse.json(
        {
          error: "Website URL is required.",
        },
        { status: 400 }
      );
    }

    const website = normalizeUrl(body.url);

    if (isPrivateHost(website.hostname)) {
      return NextResponse.json(
        {
          error:
            "Private or local websites cannot be audited.",
        },
        { status: 400 }
      );
    }

    const response = await fetchWebsite(
      website.toString()
    );

    const html = await readLimitedHtml(
      response,
      MAX_HTML_SIZE
    );

    if (!html) {
      return NextResponse.json(
        {
          error:
            "We could not read this website. It may block automated requests.",
        },
        { status: 422 }
      );
    }

    const title = getTitle(html);
    const description = getMetaDescription(html);

    const h1 = countTag(html, "h1");
    const h2 = countTag(html, "h2");

    const images = getImages(html);

    const links = getLinks(html);

    const wordCount = getWordCount(html);

    const canonical = Boolean(
      getMeta(html, "canonical")
    );

    const viewport = Boolean(
      getMeta(html, "viewport")
    );

    const robots = Boolean(
      getMeta(html, "robots")
    );

    let sitemap = false;

    try {
      const sitemapResponse = await fetchWebsite(
        new URL(
          "/sitemap.xml",
          website
        ).toString(),
        6000
      );

      sitemap = sitemapResponse.ok;
    } catch {
      sitemap = false;
    }

    const audit = {
      url: website.toString(),
      hostname: website.hostname,

      status: response.status,

      https: website.protocol === "https:",

      title,
      titleLength: title.length,

      description,
      descriptionLength: description.length,

      h1,
      h2,

      images: images.total,
      imagesMissingAlt: images.missingAlt,

      links,

      wordCount,

      canonical,
      viewport,
      robots,
      sitemap,
    };

    const scores = calculateScores({
      title,
      description,
      h1,
      h2,
      images: images.total,
      missingAlt: images.missingAlt,
      links,
      wordCount,
      canonical,
      viewport,
      robots,
      sitemap,
      https: website.protocol === "https:",
      status: response.status,
    });

    const ai = await generateAIRecommendations({
      audit,
      scores,
    });

    return NextResponse.json({
      success: true,

      website: {
        url: website.toString(),
        hostname: website.hostname,
        status: response.status,
      },

      scores,

      audit,

      ai,
    });
  } catch (error) {
    console.error("Audit route error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to audit this website.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}
