import { describe, it, expect } from "vitest";
import { AppReadmeSchema } from "./schema";

const valid = {
  rawName: "plex",
  description: "A media server",
  sourceCodeUrl: "https://github.com/plexinc/pms-docker",
};

describe("AppReadmeSchema", () => {
  it("accepts a valid entry", () => {
    const result = AppReadmeSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects an empty rawName", () => {
    const result = AppReadmeSchema.safeParse({ ...valid, rawName: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/empty/i);
    }
  });

  it("rejects an empty description", () => {
    const result = AppReadmeSchema.safeParse({ ...valid, description: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid URL", () => {
    const result = AppReadmeSchema.safeParse({ ...valid, sourceCodeUrl: "not-a-url" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message.toLowerCase()).toMatch(/url/i);
    }
  });

  it("rejects a relative URL", () => {
    const result = AppReadmeSchema.safeParse({ ...valid, sourceCodeUrl: "/relative/path" });
    expect(result.success).toBe(false);
  });

  it("accepts an https URL with a path", () => {
    const result = AppReadmeSchema.safeParse({
      ...valid,
      sourceCodeUrl: "https://github.com/foo/bar",
    });
    expect(result.success).toBe(true);
  });
});
