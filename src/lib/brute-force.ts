interface AttemptEntry {
  count: number;
  resetAt: number;
}

const attempts = new Map<string, AttemptEntry>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function cleanup() {
  const now = Date.now();
  for (const [key, entry] of attempts) {
    if (now > entry.resetAt) attempts.delete(key);
  }
}

export function recordFailedAttempt(email: string): { blocked: boolean; retryAfter: number } {
  cleanup();
  const key = email.toLowerCase().trim();
  const now = Date.now();
  const existing = attempts.get(key);

  if (existing && now > existing.resetAt) {
    attempts.delete(key);
  }

  const entry = attempts.get(key) || { count: 0, resetAt: now + WINDOW_MS };
  entry.count++;
  entry.resetAt = now + WINDOW_MS;
  attempts.set(key, entry);

  if (entry.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { blocked: true, retryAfter };
  }
  return { blocked: false, retryAfter: 0 };
}

export function isBlocked(email: string): { blocked: boolean; retryAfter: number } {
  cleanup();
  const key = email.toLowerCase().trim();
  const entry = attempts.get(key);
  if (!entry) return { blocked: false, retryAfter: 0 };

  const now = Date.now();
  if (now > entry.resetAt) {
    attempts.delete(key);
    return { blocked: false, retryAfter: 0 };
  }

  return { blocked: true, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
}

export function recordSuccessfulLogin(email: string) {
  const key = email.toLowerCase().trim();
  attempts.delete(key);
}
