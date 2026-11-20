import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Registration = {
  name?: unknown;
  feedback?: unknown;
  votes?: unknown;
};

const text = (value: unknown) => typeof value === "string" ? value.trim() : "";

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_FORM_SECRET;
  if (!webhookUrl || !secret) {
    return NextResponse.json({ error: "Бүртгэлийн холболт хараахан тохируулагдаагүй байна." }, { status: 503 });
  }

  let data: Registration;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object") throw new Error("Invalid request");
    data = parsed as Registration;
  } catch {
    return NextResponse.json({ error: "Илгээсэн мэдээллийн формат буруу байна." }, { status: 400 });
  }

  const name = text(data.name);
  const feedback = text(data.feedback);
  const allowedVotes = ["Ресторан · тухтай оройн зоог", "Караоке · дуу хөгжим, бүжиг", "Амралтын газар · бүтэн өдрийн хөтөлбөр"];
  const votes = Array.isArray(data.votes) ? data.votes.filter((v): v is string => typeof v === "string" && allowedVotes.includes(v)).slice(0, 3) : [];
  if (!name || name.length > 120 || feedback.length > 2000) {
    return NextResponse.json({ error: "Мэдээллээ шалгаад дахин илгээнэ үү." }, { status: 400 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, registration: { name, feedback, votes } }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.ok !== true) throw new Error("Sheets rejected the registration");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Мэдээллийг хадгалж чадсангүй. Түр хүлээгээд дахин оролдоно уу." }, { status: 502 });
  }
}
