import { describe, it, expect } from "vitest";
import { parseEntryFromPartial } from "./parse";
import type { PartialReadme } from "./types";

const scanned = { category: "media", serviceName: "plex" };

const validPartial: PartialReadme = {
  frontmatter: {
    description: "A media server for all your movies and shows.",
    sourceCode: "https://github.com/plexinc/pms-docker",
  },
  body: "## Storage\n\nSome storage info.\n",
};

describe("parseEntryFromPartial", () => {
  it("returns a valid AppEntry from partial frontmatter", () => {
    const entry = parseEntryFromPartial(validPartial, scanned);
    expect(entry.name).toBe("plex");
    expect(entry.description).toBe("A media server for all your movies and shows.");
    expect(entry.readmePath).toBe("apps/media/plex");
    expect(entry.sourceCodeUrl).toBe("https://github.com/plexinc/pms-docker");
  });

  it("uses serviceName as the app name", () => {
    const entry = parseEntryFromPartial(validPartial, { category: "media", serviceName: "jellyfin" });
    expect(entry.name).toBe("jellyfin");
  });

  it("builds readmePath from category and serviceName", () => {
    const entry = parseEntryFromPartial(validPartial, { category: "system", serviceName: "argocd" });
    expect(entry.readmePath).toBe("apps/system/argocd");
  });

  it("maps frontmatter sourceCode to sourceCodeUrl", () => {
    const partial: PartialReadme = {
      ...validPartial,
      frontmatter: { ...validPartial.frontmatter, sourceCode: "https://example.com/repo" },
    };
    const entry = parseEntryFromPartial(partial, scanned);
    expect(entry.sourceCodeUrl).toBe("https://example.com/repo");
  });
});
