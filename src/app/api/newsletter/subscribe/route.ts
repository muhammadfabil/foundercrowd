import { NextResponse } from "next/server";

import { subscribeToNewsletter } from "@/lib/beehiiv";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as { email?: unknown } | null;
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await subscribeToNewsletter(email);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Beehiiv newsletter subscription failed", error);

    return NextResponse.json(
      { error: "We couldn't subscribe you right now. Please try again." },
      { status: 502 }
    );
  }
}
