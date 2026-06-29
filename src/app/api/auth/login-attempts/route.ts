import { NextRequest, NextResponse } from "next/server";
import { recordFailedAttempt, isBlocked, recordSuccessfulLogin } from "@/lib/brute-force";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const rl = await rateLimit(request, { limit: 10, windowMs: 60_000 });
  if (!rl.allowed) return rl.response!;

  try {
    const { email, action } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    if (action === "check") {
      return NextResponse.json(isBlocked(email));
    }

    if (action === "failed") {
      const result = recordFailedAttempt(email);
      return NextResponse.json(result);
    }

    if (action === "success") {
      recordSuccessfulLogin(email);
      return NextResponse.json({ blocked: false });
    }

    return NextResponse.json({ error: "Action invalide" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
