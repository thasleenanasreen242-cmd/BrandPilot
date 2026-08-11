import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const item = body?.item;
    if (!item || typeof item !== "object") return NextResponse.json({ error: "Invalid workspace item." }, { status: 400 });
    return NextResponse.json({ success: true, item });
  } catch {
    return NextResponse.json({ error: "Unable to save workspace item." }, { status: 500 });
  }
}
