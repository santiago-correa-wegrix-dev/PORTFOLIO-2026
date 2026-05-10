import { beforeEach, describe, expect, it, vi } from "vitest";
import { getClientIp, isRateLimited } from "~/lib/rate-limit";

describe("getClientIp", () => {
  it("returns Netlify header when present", () => {
    const req = new Request("http://localhost", {
      headers: { "x-nf-client-connection-ip": "1.2.3.4" },
    });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it("returns first IP from x-forwarded-for", () => {
    const req = new Request("http://localhost", {
      headers: { "x-forwarded-for": "5.6.7.8, 9.10.11.12" },
    });
    expect(getClientIp(req)).toBe("5.6.7.8");
  });

  it("falls back to unknown when no headers", () => {
    const req = new Request("http://localhost");
    expect(getClientIp(req)).toBe("unknown");
  });

  it("prefers x-nf-client-connection-ip over x-forwarded-for", () => {
    const req = new Request("http://localhost", {
      headers: {
        "x-forwarded-for": "5.6.7.8",
        "x-nf-client-connection-ip": "1.2.3.4",
      },
    });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });
});

describe("isRateLimited", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("allows up to 3 requests per minute", () => {
    const ip = `test-allow-${Date.now()}`;
    expect(isRateLimited(ip)).toBe(false);
    expect(isRateLimited(ip)).toBe(false);
    expect(isRateLimited(ip)).toBe(false);
  });

  it("blocks the 4th request within the window", () => {
    const ip = `test-block-${Date.now()}`;
    isRateLimited(ip);
    isRateLimited(ip);
    isRateLimited(ip);
    expect(isRateLimited(ip)).toBe(true);
  });

  it("resets after the window expires", () => {
    const ip = `test-reset-${Date.now()}`;
    isRateLimited(ip);
    isRateLimited(ip);
    isRateLimited(ip);
    expect(isRateLimited(ip)).toBe(true);

    vi.advanceTimersByTime(61_000);

    expect(isRateLimited(ip)).toBe(false);
  });

  it("tracks different IPs independently", () => {
    const ipA = `test-ip-a-${Date.now()}`;
    const ipB = `test-ip-b-${Date.now()}`;
    isRateLimited(ipA);
    isRateLimited(ipA);
    isRateLimited(ipA);
    isRateLimited(ipA); // Blocked — 4th request over limit

    expect(isRateLimited(ipB)).toBe(false);
  });
});
