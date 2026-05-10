const TIMEOUT_MS = 60_000;
const MAX_REQUESTS = 3;

const attempts = new Map<string, number[]>();

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - TIMEOUT_MS;
  const timestamps = (attempts.get(ip) ?? []).filter((ts) => ts > windowStart);

  if (timestamps.length >= MAX_REQUESTS) { return true; }

  timestamps.push(now);
  attempts.set(ip, timestamps);
  return false;
}
