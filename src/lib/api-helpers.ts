import { NextResponse } from "next/server";

/**
 * Generate a URL-safe slug from text with proper unicode normalization.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Validate that required fields are present in the request body.
 * Returns an error response if any field is missing, or null if all valid.
 */
export function validateFields(
  body: Record<string, unknown>,
  requiredFields: string[]
): NextResponse | null {
  const missing = requiredFields.filter((f) => !body[f]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Champs requis manquants: ${missing.join(", ")}` },
      { status: 400 }
    );
  }
  return null;
}

/**
 * Create a standardized success JSON response.
 */
export function apiSuccess(data: unknown, status = 200): NextResponse {
  return NextResponse.json(data, { status });
}

/**
 * Create a standardized error JSON response.
 */
export function apiError(message: string, status = 500): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Make a slug unique by appending a timestamp suffix if it already exists.
 */
export async function ensureUniqueSlug(
  slug: string,
  finder: (slug: string) => Promise<{ id: string } | null>
): Promise<string> {
  const existing = await finder(slug);
  if (existing) {
    return `${slug}-${Date.now()}`;
  }
  return slug;
}
