import { describe, expect, it, vi } from "vitest";
import { action } from "~/routes/api.contact";

// Mock Resend to avoid actual emails
vi.mock("resend", () => ({
    Resend: class {
      emails = {
        send: vi.fn().mockResolvedValue({ id: "mock-id" }),
      };
    },
  }));

describe("Contact Action Logic", () => {
  // Helper to mock request
  const createRequest = (formData: Record<string, string>) => {
    const body = new URLSearchParams(formData);
    return new Request("http://localhost/api/contact", {
      body,
      method: "POST",
    });
  };

  // Helper to parse response
  const parseResponse = async (response: unknown) => {
    if (response instanceof Response) {
      return response.json();
    }
    if (response !== null && typeof response === "object" && "data" in response) {
      return (response as Record<string, unknown>).data;
    }
    return response;
  };

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
    const request = createRequest({
      email: "recruiter@google.com",
      message: "We want to hire you immediately for a Staff Engineer role.",
      name: "Recruiter",
    });
    const response = await action({ context: {}, params: {}, request });
    const json = await parseResponse(response);

    expect(json.success).toBe(true);
  });
});
