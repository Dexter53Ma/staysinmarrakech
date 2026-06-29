import { NextResponse } from "next/server";
import { generateCsrfToken } from "@/lib/csrf";

export const dynamic = "force-dynamic";

export async function GET() {
  const { token, cookie } = generateCsrfToken();
  const response = NextResponse.json({ csrfToken: token });
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
