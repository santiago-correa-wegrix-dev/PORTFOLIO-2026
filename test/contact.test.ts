import { beforeEach, describe, expect, it, vi } from "vitest";
import { action } from "~/routes/api.contact";

process.env.RESEND_API_KEY = "test-key";

// Mock Resend to avoid actual emails
vi.mock("resend", () => ({
  Resend: class {
    emails = {
      send: vi.fn().mockResolvedValue({ id: "mock-id" }),
    };
  },
}));

const createRequest = (formData: Record<string, string>, ip = "1.2.3.4") => {
  const body = new URLSearchParams(formData);
  return new Request("http://localhost/api/contact", {
    body,
    headers: { "x-nf-client-connection-ip": ip },
    method: "POST",
  });
};

const parseResponse = async (response: unknown) => {
  if (response instanceof Response) {
    return await response.json();
  }
  if (response !== null && typeof response === "object" && "data" in response) {
    return (response as Record<string, unknown>).data;
  }
  return response;
};

const validPayload = {
  email: "recruiter@google.com",
  message: "We want to hire you immediately for a Staff Engineer role.",
  name: "Recruiter",
};

describe("Contact Action Logic", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should validate empty fields", async () => {
    const request = createRequest({ email: "", message: "", name: "" });
    const response = await action({ context: {}, params: {}, request });
    const json = await parseResponse(response);

    expect(json.error).toBe("Please check the form for errors.");
    expect(json.details.name).toBeDefined();
  });

  it("should validate invalid email", async () => {
    const request = createRequest({ email: "not-an-email", message: "Hello", name: "Santi" });
    const response = await action({ context: {}, params: {}, request });
    const json = await parseResponse(response);

    expect(json.error).toBe("Please check the form for errors.");
    expect(json.details.email).toBeDefined();
  });

  it("should validate short message", async () => {
    const request = createRequest({ email: "test@example.com", message: "Hi", name: "Santi" });
    const response = await action({ context: {}, params: {}, request });
    const json = await parseResponse(response);

    expect(json.error).toBe("Please check the form for errors.");
    expect(json.details.message).toBeDefined();
  });

  it("should accept valid submission", async () => {
    const request = createRequest(validPayload, "10.0.0.1");
    const response = await action({ context: {}, params: {}, request });
    const json = await parseResponse(response);

    expect(json.success).toBe(true);
  });

  it("should rate limit after 3 requests from the same IP", async () => {
    const ip = "192.168.1.1";
    await action({ context: {}, params: {}, request: createRequest(validPayload, ip) });
    await action({ context: {}, params: {}, request: createRequest(validPayload, ip) });
    await action({ context: {}, params: {}, request: createRequest(validPayload, ip) });

    const response = await action({
      context: {},
      params: {},
      request: createRequest(validPayload, ip),
    });
    const json = await parseResponse(response);

    expect(json.error).toContain("Too many requests");
  });

  it("should not rate limit different IPs", async () => {
    const ip = "172.16.0.1";
    await action({ context: {}, params: {}, request: createRequest(validPayload, ip) });
    await action({ context: {}, params: {}, request: createRequest(validPayload, ip) });
    await action({ context: {}, params: {}, request: createRequest(validPayload, ip) });

    const otherIp = "172.16.0.2";
    const response = await action({
      context: {},
      params: {},
      request: createRequest(validPayload, otherIp),
    });
    const json = await parseResponse(response);

    expect(json.success).toBe(true);
  });
});
