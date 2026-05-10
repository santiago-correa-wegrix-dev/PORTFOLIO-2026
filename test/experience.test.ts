import { describe, expect, it } from "vitest";
import { experiences } from "~/data/experience";

describe("Experience Data Logic", () => {
  it("should have valid experience entries", () => {
    expect(experiences.length).toBeGreaterThan(0);
  });

  it("should have correct structure for each experience", () => {
    experiences.forEach((exp) => {
      expect(exp.id).toBeDefined();
      expect(exp.company).toBeDefined();
      expect(exp.role).toBeDefined();
      expect(exp.period).toBeDefined();
      expect(exp.stack).toBeInstanceOf(Array);
    });
  });

  it("should be sorted by date (latest first)", () => {
    // Simple check: "Present" usually comes first
    const first = experiences[0];
    expect(first.period).toContain("Present");
  });
});
