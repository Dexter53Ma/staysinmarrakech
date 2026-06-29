import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

const upstashRedisUrl = process.env.UPSTASH_REDIS_REST_URL;

let ratelimit: Ratelimit | null = null;
let redis: Redis | null = null;

if (upstashRedisUrl) {
  redis = new Redis({
    url: upstashRedisUrl,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "60 s"),
    analytics: false,
  });
}

const inMemoryHits = new Map<string, { count: number; resetAt: number }>();

export async function rateLimit(
  request: Request,
  { limit = 10, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): Promise<{ allowed: boolean; response?: NextResponse }> {
  const ip = getClientIp(request);

  if (ratelimit) {
    return rateLimitWithUpstash(ip, limit);
  }

  return rateLimitInMemory(ip, limit, windowMs);
}

async function rateLimitWithUpstash(
  ip: string,
  limit: number
): Promise<{ allowed: boolean; response?: NextResponse }> {
  const key = `ratelimit:${ip}`;

  const { success, reset } = await ratelimit!.limit(key, { rate: limit });

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);
    return {
      allowed: false,
      response: NextResponse.json(
        { error: "Trop de requêtes. Réessayez dans quelques instants." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      ),
    };
  }

  return { allowed: true };
}

function rateLimitInMemory(
  ip: string,
  limit: number,
  windowMs: number
): { allowed: boolean; response?: NextResponse } {
  const now = Date.now();
  const entry = inMemoryHits.get(ip);

  if (!entry || now > entry.resetAt) {
    inMemoryHits.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  entry.count++;
  if (entry.count > limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return {
      allowed: false,
      response: NextResponse.json(
        { error: "Trop de requêtes. Réessayez dans quelques instants." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      ),
    };
  }

  return { allowed: true };
}
