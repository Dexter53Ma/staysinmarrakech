import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const CSRF_SECRET = process.env.CSRF_SECRET || crypto.randomUUID();
const TOKEN_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const COOKIE_NAME = "csrf_token";

if (!process.env.CSRF_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("[CSRF] CSRF_SECRET is required in production. Set it in your environment variables.");
}

function hmac(data: string): string {
  return crypto.createHmac("sha256", CSRF_SECRET).update(data).digest("base64url");
}

export function generateCsrfToken(): { token: string; cookie: { name: string; value: string; options: object } } {
  const timestamp = Date.now();
  const signature = hmac(`${timestamp}`);
  const token = `${Buffer.from(String(timestamp)).toString("base64")}.${signature}`;

  return {
    token,
    cookie: {
      name: COOKIE_NAME,
      value: token,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge: TOKEN_EXPIRY_MS / 1000,
      },
    },
  };
}

export async function validateCsrfToken(request: NextRequest): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(COOKIE_NAME)?.value;

  if (!cookieToken) {
    return NextResponse.json({ error: "CSRF token manquant" }, { status: 403 });
  }

  const requestToken = request.headers.get("x-csrf-token");

  if (!requestToken) {
    return NextResponse.json({ error: "CSRF token manquant dans la requête" }, { status: 403 });
  }

  if (cookieToken !== requestToken) {
    return NextResponse.json({ error: "CSRF token invalide" }, { status: 403 });
  }

  const [timestampB64] = cookieToken.split(".");
  if (!timestampB64) {
    return NextResponse.json({ error: "CSRF token malformé" }, { status: 403 });
  }

  try {
    const timestamp = parseInt(Buffer.from(timestampB64, "base64").toString(), 10);
    if (isNaN(timestamp) || Date.now() - timestamp > TOKEN_EXPIRY_MS) {
      return NextResponse.json({ error: "CSRF token expiré" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "CSRF token invalide" }, { status: 403 });
  }

  return null;
}
